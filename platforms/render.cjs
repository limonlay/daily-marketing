// Renders every image in platforms/art/art.js → platforms/out/img/*.png
// Usage: node platforms/render.cjs [filter]   (filter = substring of the file name, optional)
// Needs Playwright (preinstalled in cloud sessions) and the network for Google Fonts (Noto Sans CJK, Material Symbols).
const http = require('http');
const fs = require('fs');
const path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'out', 'img');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error('pageerror', e.message));
  await page.goto(`http://localhost:${port}/platforms/art/art.html`, { waitUntil: 'networkidle' });
  const jobs = await page.evaluate(() => window.JOBS);
  const filter = process.argv[2] || '';
  let n = 0;
  for (let i = 0; i < jobs.length; i++) {
    const j = jobs[i];
    if (filter && !j.file.includes(filter)) continue;
    await page.setViewportSize({ width: j.w, height: j.h });
    await page.evaluate((k) => window.renderJob(window.JOBS[k]), i);
    await page.waitForTimeout(60);
    fs.mkdirSync(path.dirname(path.join(OUT, j.file)), { recursive: true });
    await page.locator('#stage').screenshot({ path: path.join(OUT, j.file) });
    n++;
  }
  console.log(`rendered ${n} images → ${path.relative(ROOT, OUT)}`);
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
