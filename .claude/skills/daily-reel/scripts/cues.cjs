// Sound-effect cue sheet from the film itself: every typed character (a key tick) plus the film's own cues in sfx.json,
// whose times may be beats ({"beat": 12}) or seconds ({"t": 3.2}). Output is read by sfx.py.
//   node cues.cjs <film.html> <sfx.json> <out_cues.json>
// sfx.json: {"dur": 15, "type": {"g": 0.5}, "cues": [{"beat": 12, "k": "ding"}, {"beat": 1, "k": "count", "dur": 0.9}, ...]}
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [film, spec, outFile] = process.argv.slice(2), S = JSON.parse(fs.readFileSync(spec, 'utf8')), STEP = 1 / 240;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(film)); await p.evaluate(() => document.fonts.ready);
  const cues = [];
  for (const c of S.cues) { const t = c.beat !== undefined ? await p.evaluate(x => tb(x), c.beat) : c.t; cues.push({ ...c, t }); }
  if (S.type) {   // typed characters: count the visible (not visibility:hidden) letters of every [data-full] line, frame by frame
    const ticks = await p.evaluate(([dur, step]) => {
      const seen = new Map(), out = [];
      for (let t = 0; t < dur; t += step) {
        render(t);
        for (const el of document.querySelectorAll('[data-full]')) {
          if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) { seen.set(el, 0); continue; }
          let hidden = 0; el.querySelectorAll('span').forEach(s => { if (s.style.visibility === 'hidden') hidden += s.textContent.length; });
          const n = el.textContent.length - hidden, was = seen.get(el) || 0;
          if (n > was && n - was < 4) out.push(t);   // a jump of many letters at once is a reset, not typing
          seen.set(el, n);
        }
      }
      return out;
    }, [S.dur, STEP]);
    let last = -1; for (const t of ticks) if (t - last >= .028) { cues.push({ t, k: S.type.k ?? 'tick', g: S.type.g ?? .5, wet: S.type.wet ?? 0 }); last = t; }
  }
  cues.sort((a, b) => a.t - b.t); fs.writeFileSync(outFile, JSON.stringify({ ...S, cues }, null, 1));
  await b.close(); console.log(`${cues.length} cues -> ${outFile}`);
})();
