// Quick look: render a few moments of a reel (2x, sharp) and tile them into one sheet.
//   node stills.cjs <film.html> <t,t,t...> <out.png>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
const [film, times, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.resolve(film)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-')), files = [];
  for (const t of times.split(',')) { await p.evaluate(t => render(t), +t); const f = path.join(dir, `${t}.png`); await p.screenshot({ path: f }); files.push(f); }
  await b.close();
  const n = files.length;
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...files.flatMap(f => ['-i', f]), '-filter_complex',
    (n > 1 ? `${files.map((_, i) => `[${i}]`).join('')}hstack=${n},` : '') + `scale=${Math.min(2400, 300 * n)}:-1`, out]);
  fs.rmSync(dir, { recursive: true, force: true }); console.log('sheet', out);
})();
