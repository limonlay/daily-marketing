#!/usr/bin/env node
// Render a Daily film page (pure window.render(t)) to stills or an MP4.
//
//   node render.mjs <film.html> --stills 0.5,3,7.2 [--out dir]           contact sheet of a few moments
//   node render.mjs <film.html> --out film.mp4 [--audio track.wav]       full film
//        [--dur 15] [--fps 30] [--w 1080 --h 1920] [--sub 4] [--beats beats.json] [--from 0 --to 15]
//
// --sub N   motion blur: N sub-frames per frame, averaged (1 = off). Use 4-6 for the master, 1 for drafts.
// --beats   JSON array of beat times (s); exposed to the page as window.BEATS.
// The page gets ?w=&h= so one timeline can lay out 9:16, 1:1, 4:5 and 16:9.
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
// playwright: local install, else the global one (cloud sessions: /opt/node22/lib/node_modules)
const req = createRequire(import.meta.url);
const { chromium } = (() => { for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright', '/usr/lib/node_modules/playwright'])
  try { return req(p); } catch {} throw new Error('playwright not found: npm i playwright'); })();

const a = process.argv.slice(2);
const opt = (k, d) => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : d; };
const page = a.find((x, i) => !x.startsWith('--') && !(a[i - 1] || '').startsWith('--'));
if (!page) { console.error('usage: node render.mjs <film.html> (--stills t,t | --out film.mp4) [opts]'); process.exit(2); }
const W = +opt('w', 1080), H = +opt('h', 1920), FPS = +opt('fps', 30), DUR = +opt('dur', 15), SUB = Math.max(1, +opt('sub', 1));
const from = +opt('from', 0), to = +opt('to', DUR);
const stills = opt('stills'), out = opt('out', stills ? 'stills' : 'film.mp4'), audio = opt('audio'), beats = opt('beats');
const exe = ['/opt/pw-browsers/chromium', process.env.CHROME_PATH].find(p => p && fs.existsSync(p));

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--force-color-profile=srgb', '--font-render-hinting=none'] });
const p = await browser.newPage({ viewport: { width: W, height: H } });
p.on('pageerror', e => console.error('page error:', e.message));
if (beats) await p.addInitScript(b => { window.BEATS = b; }, JSON.parse(fs.readFileSync(beats, 'utf8')));
await p.goto('file://' + path.resolve(page) + `?w=${W}&h=${H}`);
await p.evaluate(() => document.fonts.ready);
await p.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))));
await p.waitForTimeout(600);
const shot = async (t, file) => { await p.evaluate(t => window.render(t), t); await p.screenshot({ path: file }); };

if (stills) {
  fs.mkdirSync(out, { recursive: true });
  const ts = stills.split(',').map(Number), files = [];
  for (const t of ts) { const f = path.join(out, `still_${t.toFixed(2)}s.png`); await shot(t, f); files.push(f); }
  await browser.close();
  const n = files.length, sw = Math.round(1800 / n);
  spawnSync('ffmpeg', ['-loglevel', 'error', '-y', ...files.flatMap(f => ['-i', f]), '-filter_complex',
    `${files.map((_, i) => `[${i}]`).join('')}hstack=${n},scale=${sw * n}:-2`, path.join(out, 'sheet.png')], { stdio: 'inherit' });
  if (n === 1) fs.copyFileSync(files[0], path.join(out, 'sheet.png'));
  console.log('sheet:', path.join(out, 'sheet.png'));
  process.exit(0);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dv-'));
const N = Math.round((to - from) * FPS * SUB);
for (let i = 0; i < N; i++) {
  await shot(from + i / (FPS * SUB), path.join(tmp, String(i).padStart(6, '0') + '.png'));
  if (i % (FPS * SUB) === 0) process.stdout.write(`\r${(i / (FPS * SUB)).toFixed(0)}s / ${(to - from).toFixed(0)}s`);
}
await browser.close();
const vf = (SUB > 1 ? `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/${FPS}/TB,` : '') +
  'scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p';
const args = ['-loglevel', 'error', '-y', '-framerate', String(FPS * SUB), '-i', path.join(tmp, '%06d.png')];
if (audio) args.push('-ss', String(from), '-i', audio);
args.push('-vf', vf, '-r', String(FPS), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-color_range', 'tv', '-colorspace', 'bt709');
if (audio) args.push('-c:a', 'aac', '-b:a', '256k', '-shortest');
args.push('-movflags', '+faststart', out);
const r = spawnSync('ffmpeg', args, { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(r.status === 0 ? `\nwrote ${out}` : '\nffmpeg failed');
process.exit(r.status ?? 1);
