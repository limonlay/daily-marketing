/* Mockups for a possible rename Daily → Lemo / Lemoly / Lemolo. Not the real brand yet: nothing here ships.
   Same rules as brand/DESIGN.md. The app screenshots are the real ones with the header wordmark painted over. */
(function () {
  const LEMON = '../../platforms/art/lemon.svg';
  const ICON = '../../brand/icon-512.png';
  const SHOT = (l, t) => `../../brand/screens/shot-${l}-${t || 'dark'}.webp`;
  let NAME = 'Lemo';
  let WM = 'A';
  const low = () => NAME.toLowerCase();
  const url = () => `${low()}.limonlay.com`; // placeholder: the domain is the owner's call

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rich = (s) => esc(s).replace(/&lt;hl&gt;/g, '<span class="hl">').replace(/&lt;\/hl&gt;/g, '</span>').replace(/\n/g, '<br>');
  const px = (n) => n + 'px';
  function el(tag, cls, html, style) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (style) Object.assign(e.style, style); return e; }
  function box(p, x, y, w, h, cls, html, style) { const e = el('div', cls, html, Object.assign({ position: 'absolute', left: px(x), top: px(y), width: px(w) }, h ? { height: px(h) } : {}, style || {})); p.appendChild(e); return e; }
  function fit(e, max, min) { let s = max; e.style.fontSize = px(s); e.style.overflow = 'hidden'; while ((e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1) && s > min) { s -= 2; e.style.fontSize = px(s); } }
  function tb(p, x, y, w, maxH, cls, text, max, min, style) { const e = box(p, x, y, w, maxH, cls + (String(text).includes('\n') ? ' nw' : ''), rich(text), style); fit(e, max, min); e.style.height = 'auto'; return e.offsetHeight; }
  function lemon(p, x, y, w, rot) { const i = el('img', 'lemonimg'); i.src = LEMON; Object.assign(i.style, { left: px(x), top: px(y), width: px(w), transform: `rotate(${rot || 0}deg)` }); p.appendChild(i); return i; }
  function shape(p, k, x, y, s, c) { return box(p, x, y, s, s, 'shp ' + k, '', { background: c }); }
  function canvas(w, h, lang, extra) { const st = document.getElementById('stage'); st.innerHTML = ''; st.style.width = px(w); st.style.height = px(h); const c = el('div', `cv L-${lang} ${extra || ''}`, '', { width: px(w), height: px(h) }); st.appendChild(c); return c; }

  // the wordmark: A "Lemo"+lemon · B "Lem"+lemon-as-o · C "lem"+lemon-as-o · D the current "Daily"
  function wmHtml(k) {
    k = k || WM;
    if (k === 'D') return `<span class="wm">Daily<img src="${LEMON}" alt=""></span>`;
    if (k === 'A') return `<span class="lw A">${NAME}<img src="${LEMON}" alt=""></span>`;
    const n = k === 'C' ? low() : NAME, i = n.indexOf('o');
    return `<span class="lw ${k}">${n.slice(0, i)}<img src="${LEMON}" alt="">${n.slice(i + 1)}</span>`;
  }
  function wordmark(p, x, y, size, k, style) { return box(p, x, y, size * 5, null, '', wmHtml(k), Object.assign({ fontSize: px(size) }, style || {})); }

  // a phone with the real screenshot; the "Daily" header is painted over with the Lemo wordmark
  function phone(p, lang, x, y, w, theme, k) {
    theme = theme || 'dark';
    const ph = el('div', 'phone', `<img src="${SHOT(lang, theme)}" alt="">`, { left: px(x), top: px(y), width: px(w), fontSize: px(w * 0.07), background: theme === 'light' ? '#e9e7e1' : '#000' });
    p.appendChild(ph);
    const img = ph.querySelector('img');
    const s = img.offsetWidth / 600; // screenshot px → canvas px
    const m = el('div', 'hdrmask' + (theme === 'light' ? ' light' : ''), wmHtml(k), {
      left: px(img.offsetLeft + 26 * s), top: px(img.offsetTop + 18 * s), minWidth: px(104 * s), height: px(44 * s), paddingRight: px(6 * s),
      fontSize: px(30 * s), color: theme === 'light' ? '#14213d' : '#fff', paddingLeft: px(6 * s),
    });
    ph.appendChild(m);
    return ph;
  }

  const L = {};

  L.wordmarks = () => {
    const c = canvas(1600, 1080, 'th', 'night');
    const rows = [['D', 'ตอนนี้'], ['A', 'A · ชื่อ + มะนาว'], ['B', 'B · มะนาวเป็นตัว o'], ['C', 'C · ตัวเล็ก มะนาวเป็น o']];
    rows.forEach(([k, n], i) => {
      const y = 40 + i * 255;
      box(c, 40, y + 90, 330, null, 'lbl', esc(n), { fontSize: '28px', color: k === 'D' ? '#9aa3b5' : 'var(--cream)' });
      const a = box(c, 380, y, 580, 225, '', '', { background: 'var(--pr)', borderRadius: '0 36px 0 36px', display: 'grid', placeItems: 'center', color: 'var(--cream)', fontSize: '112px' });
      a.innerHTML = wmHtml(k);
      const b = box(c, 990, y, 560, 225, '', '', { background: '#FAF9F6', borderRadius: '0 36px 0 36px', display: 'grid', placeItems: 'center', color: 'var(--pr)', fontSize: '112px' });
      b.innerHTML = wmHtml(k);
      if (k === 'D') { a.style.opacity = '.55'; b.style.opacity = '.55'; }
    });
  };

  L.compare = () => {
    const c = canvas(1920, 1000, 'th', 'night');
    const cols = [['Daily', 'D'], ['Lemo', 'A'], ['Lemoly', 'A'], ['Lemoly', 'B'], ['Lemolo', 'A'], ['Lemolo', 'B']];
    const head = ['ตอนนี้', 'Lemo · A', 'Lemoly · A', 'Lemoly · B', 'Lemolo · A', 'Lemolo · B'];
    cols.forEach(([n, k], i) => {
      NAME = n;
      const x = 30 + i * 314;
      box(c, x, 40, 294, null, 'lbl', head[i], { fontSize: '28px', color: '#9aa3b5', textAlign: 'center' });
      [[60, 120, 'var(--pr)', 'var(--cream)'], [40, 330, 'var(--pr)', 'var(--cream)'], [24, 470, '#000', '#fff'], [24, 560, '#fbf9f5', '#14213d']].forEach(([fs, y, bg, fg]) => {
        const b = box(c, x, y, 294, fs > 60 ? 180 : fs > 30 ? 110 : 70, '', wmHtml(k), { background: bg, color: fg, fontSize: px(fs), display: 'grid', placeItems: 'center', borderRadius: '0 24px 0 24px', overflow: 'hidden' });
      });
      const ic = box(c, x + 97, 680, 100, 100, 'ico', `<img src="${ICON}" alt="" style="width:100%;height:100%;display:block">`, {});
      box(c, x, 790, 294, null, 'lbl', esc(n), { fontSize: '26px', textAlign: 'center', color: 'var(--cream)' });
    });
    box(c, 30, 880, 1860, null, 'lbl', 'ขนาดใหญ่ (โปสเตอร์) · กลาง (โพสต์) · เล็ก (หัวแอป มืด / สว่าง) · ชื่อใต้ไอคอน', { fontSize: '26px', color: '#9aa3b5', textAlign: 'center' });
    NAME = 'Lemo';
  };

  // more name ideas, one row each: big A, big B, and both at app-header size
  const SHORT = [['Daily', 'ตอนนี้', 'D'], ['Lemolo', 'เลโมโล · レモロ'], ['Lemodo', 'เลโมโด · レモド'], ['Lemosa', 'เลโมซ่า · レモサ'], ['Lemoka', 'เลโมก้า · レモカ'], ['Lemoly', 'เลโมลี่ · レモリー']];
  L.shortlist = () => {
    const c = canvas(1600, 60 + SHORT.length * 150, 'th', 'night');
    ['', 'แบบ A', 'แบบ B', 'หัวแอป A', 'หัวแอป B'].forEach((h, i) => box(c, [40, 300, 700, 1100, 1350][i], 16, 300, null, 'lbl', h, { fontSize: '24px', color: '#9aa3b5' }));
    SHORT.forEach(([n, say, only], r) => {
      NAME = n;
      const y = 60 + r * 150;
      box(c, 40, y + 22, 250, null, 'lbl', `<b style="font-size:34px;color:var(--cream)">${esc(n)}</b><br>${esc(say)}`, { fontSize: '22px', color: '#9aa3b5', lineHeight: 1.35 });
      const cell = (x, w, k, fs, bg, fg) => box(c, x, y, w, 130, '', k ? wmHtml(k) : '', { background: bg, color: fg, fontSize: px(fs), display: 'grid', placeItems: 'center', borderRadius: '0 24px 0 24px', overflow: 'hidden' });
      const dim = only ? { opacity: '.55' } : {};
      Object.assign(cell(300, 380, only || 'A', 64, 'var(--pr)', 'var(--cream)').style, dim);
      Object.assign(cell(700, 380, only ? '' : 'B', 64, 'var(--pr)', 'var(--cream)').style, dim);
      Object.assign(cell(1100, 230, only || 'A', 26, '#000', '#fff').style, dim);
      Object.assign(cell(1350, 230, only ? '' : 'B', 26, '#000', '#fff').style, dim);
    });
    NAME = 'Lemo';
  };

  L.app = () => {
    const c = canvas(1600, 1180, 'th');
    shape(c, 'c', -160, 760, 560, 'var(--pr2)');
    shape(c, 'drop', 1380, -80, 300, 'var(--pr2)');
    phone(c, 'th', 110, 70, 440, 'dark');
    phone(c, 'en', 580, 70, 440, 'light');
    phone(c, 'ja', 1050, 70, 440, 'dark');
  };

  L.home = () => {
    const c = canvas(1080, 1350, 'en');
    // a plain home screen: generic apps as flat blocks, the Lemo icon with its label
    box(c, 70, 40, 200, null, 'lbl', '9:41', { fontSize: '40px', fontWeight: 700 });
    const apps = [['edit_note', 'Notes', '#e5e5e5', '#14213d'], ['music_note', 'Music', '#1d2c50', '#ffd23f'], ['partly_cloudy_day', 'Weather', '#1d2c50', '#f2f0ea'], ['calendar_month', 'Calendar', '#e5e5e5', '#14213d'],
      ['photo_camera', 'Camera', '#0a0d14', '#f2f0ea'], ['LEMO', NAME], ['map', 'Maps', '#1d2c50', '#f2f0ea'], ['schedule', 'Clock', '#0a0d14', '#ffd23f'],
      ['mail', 'Mail', '#e5e5e5', '#14213d'], ['calculate', 'Calculator', '#0a0d14', '#f2f0ea'], ['settings', 'Settings', '#1d2c50', '#f2f0ea'], ['fitness_center', 'Fitness', '#e5e5e5', '#14213d']];
    apps.forEach((a, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 72 + col * 240, y = 180 + row * 290;
      const ic = box(c, x, y, 190, 190, 'ico', '', { background: a[2] || 'var(--pr)', color: a[3] });
      if (a[0] === 'LEMO') ic.innerHTML = `<img src="${ICON}" alt="" style="width:100%;height:100%;display:block">`;
      else ic.innerHTML = `<span class="ms" style="font-size:96px">${a[0]}</span>`;
      box(c, x - 25, y + 202, 240, null, 'lbl', esc(a[1]), { fontSize: '34px', textAlign: 'center', fontWeight: a[0] === 'LEMO' ? 700 : 500, color: a[0] === 'LEMO' ? 'var(--lm)' : 'var(--cream)' });
    });
    const dock = box(c, 40, 1080, 1000, 230, '', '', { background: 'var(--pr2)', borderRadius: '60px' });
    [['call', '#e5e5e5', '#14213d'], ['chat_bubble', '#0a0d14', '#f2f0ea'], ['public', '#e5e5e5', '#14213d'], ['headphones', '#0a0d14', '#ffd23f']].forEach((d, i) => {
      box(dock, 42 + i * 240, 20, 190, 190, 'ico', `<span class="ms" style="font-size:96px">${d[0]}</span>`, { background: d[1], color: d[2] });
    });
  };

  L.splash = () => {
    const c = canvas(1080, 1920, 'en');
    box(c, 0, 860, 1080, null, '', wmHtml(), { fontSize: '200px', textAlign: 'center', color: 'var(--cream)' });
    box(c, 0, 1760, 1080, null, 'lbl', 'by limonlay', { fontSize: '36px', textAlign: 'center', color: '#9aa3b5' });
  };

  L.profile = () => {
    const c = canvas(1080, 1560, 'th', 'night');
    box(c, 48, 50, 800, null, 'lbl', `${low()}.limonlay`, { fontSize: '44px', fontWeight: 700 });
    const av = box(c, 48, 150, 230, 230, '', `<img src="${ICON}" alt="" style="width:100%;height:100%;display:block">`, { borderRadius: '50%', overflow: 'hidden' });
    box(c, 320, 190, 700, null, '', wmHtml(), { fontSize: '96px', color: 'var(--cream)' });
    box(c, 320, 310, 700, null, 'lbl', 'แอปจดรายรับรายจ่าย', { fontSize: '36px', color: '#9aa3b5' });
    const bio = box(c, 48, 420, 980, null, 'sub', 'ถ่ายบิล → AI กรอกให้ · ถาม AI ได้ว่าเงินไปไหน<br>ไม่มีโฆษณา · 18 ภาษา · ไม่ต้องโหลดแอป', { fontSize: '36px', lineHeight: 1.45 });
    box(c, 48, 540, 600, null, 'lbl', esc(url()), { fontSize: '36px', color: 'var(--lm)', fontWeight: 700 });
    box(c, 48, 620, 480, 90, 'lbl', 'ติดตาม', { background: 'var(--lm)', color: 'var(--pr)', borderRadius: '0 22px 0 22px', display: 'grid', placeItems: 'center', fontSize: '36px', fontWeight: 700 });
    box(c, 552, 620, 480, 90, 'lbl', 'ข้อความ', { background: 'var(--pr2)', color: 'var(--cream)', borderRadius: '0 22px 0 22px', display: 'grid', placeItems: 'center', fontSize: '36px', fontWeight: 700 });
    const T = 356, G = 6, Y = 760;
    const tile = (i, bg) => box(c, (i % 3) * (T + G), Y + Math.floor(i / 3) * (T + G), T, T, '', '', { background: bg, overflow: 'hidden' });
    let t = tile(0, 'var(--pr)');
    tb(t, 30, 40, 300, 220, 'hd', 'เงินหายไปไหน\nทุกเดือน?', 52, 30);
    lemon(t, 200, 240, 130, -12);
    t = tile(1, 'var(--lm)');
    box(t, 0, 70, T, null, 'ms', 'document_scanner', { fontSize: '150px', color: 'var(--pr)', textAlign: 'center' });
    box(t, 0, 250, T, null, 'hd', 'ถ่ายบิล', { fontSize: '46px', color: 'var(--pr)', textAlign: 'center' });
    t = tile(2, 'var(--pr)');
    phone(t, 'th', 63, 40, 230, 'dark');
    t = tile(3, 'var(--night)');
    box(t, 0, 40, T, null, '', '18', { fontFamily: "'Big Shoulders Display'", fontWeight: 900, fontSize: '210px', color: 'var(--lm)', textAlign: 'center', lineHeight: 1 });
    box(t, 0, 262, T, null, 'hd', 'ภาษา', { fontSize: '46px', textAlign: 'center' });
    t = tile(4, 'var(--lm)');
    box(t, 30, 70, 296, null, 'bub me', 'เดือนนี้ค่ากินเท่าไร?', { position: 'absolute', fontSize: '32px', maxWidth: 'none' });
    box(t, 30, 190, 260, null, 'bub ai', 'ค่าอาหาร <b>฿270</b>', { position: 'absolute', fontSize: '32px', maxWidth: 'none' });
    t = tile(5, 'var(--pr)');
    lemon(t, 58, 98, 240, -10);
  };

  L.square = (j) => {
    const lang = j.lang;
    const t = { th: { hook: 'เงินหายไปไหน\nทุกเดือน?', line: 'ถ่ายบิล แล้ว AI กรอกให้', chips: ['ไม่มีโฆษณา', 'ไม่ต้องโหลดแอป', '18 ภาษา'] },
      en: { hook: 'Where does your money go every month?', line: 'Snap a receipt. AI fills it in.', chips: ['No ads', 'No download', '18 languages'] } }[lang];
    const c = canvas(1080, 1080, lang);
    wordmark(c, 72, 66, 50);
    let y = 168;
    y += tb(c, 72, y, 560, 420, 'hd', t.hook, 92, 44) + 30;
    y += tb(c, 72, y, 540, 130, 'sub', t.line, 46, 26, { color: 'var(--lm)' }) + 40;
    box(c, 72, y, 560, null, 'chips', t.chips.map((x) => `<span class="chip">${esc(x)}</span>`).join(''), { fontSize: '32px' });
    box(c, 72, 930, 560, null, '', `<span class="pill">${url()}</span>`, { fontSize: '40px' });
    shape(c, 'drop', 900, -60, 220, 'var(--pr2)');
    phone(c, lang, 660, 150, 370, 'dark');
    lemon(c, 860, 60, 170, -12);
  };

  L.xheader = () => {
    const c = canvas(1500, 500, 'en');
    shape(c, 'c', -80, -120, 360, 'var(--pr2)');
    shape(c, 'drop', 230, 330, 150, 'var(--lm)');
    box(c, 470, 90, 760, null, '', wmHtml(), { fontSize: '120px', color: 'var(--cream)' });
    box(c, 470, 250, 760, null, 'hd', 'Log money in seconds.', { fontSize: '64px' });
    box(c, 470, 350, 760, null, 'sub', 'Snap receipts · Ask AI · 18 languages · No ads', { fontSize: '34px', color: 'var(--lm)' });
    lemon(c, 1250, 150, 210, -12);
  };

  const J = [];
  J.push({ kind: 'compare', w: 1920, h: 1000, file: 'names-compare.png' });
  J.push({ kind: 'shortlist', w: 1600, h: 960, file: 'names-shortlist.png' });
  ['Lemo', 'Lemoly', 'Lemolo'].forEach((name) => {
    const f = name.toLowerCase();
    J.push({ kind: 'wordmarks', name, w: 1600, h: 1080, file: `${f}-wordmarks.png` });
    ['A', 'B'].forEach((k) => {
      J.push({ kind: 'app', name, wm: k, w: 1600, h: 1180, file: `${f}-${k}-app.png` });
      J.push({ kind: 'splash', name, wm: k, w: 1080, h: 1920, file: `${f}-${k}-splash.png` });
      J.push({ kind: 'profile', name, wm: k, w: 1080, h: 1560, file: `${f}-${k}-profile.png` });
      J.push({ kind: 'square', name, wm: k, lang: 'th', w: 1080, h: 1080, file: `${f}-${k}-square-th.png` });
      J.push({ kind: 'square', name, wm: k, lang: 'en', w: 1080, h: 1080, file: `${f}-${k}-square-en.png` });
      J.push({ kind: 'xheader', name, wm: k, w: 1500, h: 500, file: `${f}-${k}-x-header.png` });
    });
    J.push({ kind: 'home', name, w: 1080, h: 1350, file: `${f}-home-screen.png` });
  });

  window.JOBS = J;
  window.renderJob = async function (job) {
    WM = job.wm || 'A'; NAME = job.name || 'Lemo';
    L[job.kind](job);
    await document.fonts.ready;
    await Promise.all(Array.from(document.querySelectorAll('#stage img')).map((i) => (i.complete ? (i.decode ? i.decode().catch(() => {}) : 0) : new Promise((r) => { i.onload = i.onerror = r; }))));
    NAME = job.name || 'Lemo';
    L[job.kind](job);
    await document.fonts.ready;
    await Promise.all(Array.from(document.querySelectorAll('#stage img')).map((i) => (i.decode ? i.decode().catch(() => {}) : 0)));
    return true;
  };
})();
