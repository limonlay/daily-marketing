/* Daily platform art: every image the platform kit needs, drawn in HTML and screenshotted by ../render.cjs.
   window.JOBS lists the images; window.renderJob(job) draws one into #stage at its real pixel size.
   Numbers on images are demo data from brand/screens (tagged "example" where they look like real money). */
(function () {
  const SHOT = (l) => `../../brand/screens/shot-${l}-dark.webp`;
  const LEMON = 'lemon.svg';
  const URL_ = 'daily.limonlay.com';

  // ---------- copy per language ----------
  // hook: the question; line: what Daily does; chips: three facts; ex: the "example" tag.
  const T = {
    th: { hook: 'เงินหายไปไหน\nทุกเดือน?', line: 'ถ่ายบิล แล้ว AI กรอกให้', chips: ['ไม่มีโฆษณา', 'ไม่ต้องโหลดแอป', '18 ภาษา'], ex: 'ตัวอย่าง' },
    en: { hook: 'Where does your money go every month?', line: 'Snap a receipt. AI fills it in.', chips: ['No ads', 'No download', '18 languages'], ex: 'example' },
    ja: { hook: '毎月、お金は\nどこに消えてる？', line: 'レシートを撮れば、AIが入力', chips: ['広告なし', 'ダウンロード不要', '18言語'], ex: '例' },
    ko: { hook: '매달 돈이\n어디로 사라질까?', line: '영수증을 찍으면 AI가 입력', chips: ['광고 없음', '설치 필요 없음', '18개 언어'], ex: '예시' },
    'zh-CN': { hook: '每个月的钱\n都去哪儿了？', line: '拍下小票，AI 帮你记', chips: ['无广告', '无需下载', '18 种语言'], ex: '示例' },
    'zh-TW': { hook: '每個月的錢\n都去哪了？', line: '拍下收據，AI 幫你記', chips: ['無廣告', '免下載', '18 種語言'], ex: '範例' },
    vi: { hook: 'Mỗi tháng tiền đi đâu hết?', line: 'Chụp hóa đơn, AI điền giúp', chips: ['Không quảng cáo', 'Không cần tải app', '18 ngôn ngữ'], ex: 'ví dụ' },
    id: { hook: 'Tiap bulan uangnya ke mana?', line: 'Foto struk, AI yang isi', chips: ['Tanpa iklan', 'Tanpa unduh', '18 bahasa'], ex: 'contoh' },
    ms: { hook: 'Setiap bulan duit pergi ke mana?', line: 'Ambil gambar resit, AI isikan', chips: ['Tiada iklan', 'Tak perlu muat turun', '18 bahasa'], ex: 'contoh' },
    es: { hook: '¿A dónde se va tu dinero cada mes?', line: 'Foto del ticket y la IA lo anota', chips: ['Sin anuncios', 'Sin descargas', '18 idiomas'], ex: 'ejemplo' },
    pt: { hook: 'Pra onde vai seu dinheiro todo mês?', line: 'Foto do recibo e a IA anota', chips: ['Sem anúncios', 'Sem baixar nada', '18 idiomas'], ex: 'exemplo' },
    fr: { hook: 'Où passe votre argent chaque mois ?', line: 'Photo du ticket, l’IA s’occupe du reste', chips: ['Sans pub', 'Rien à installer', '18 langues'], ex: 'exemple' },
    de: { hook: 'Wohin verschwindet dein Geld jeden Monat?', line: 'Beleg fotografieren, die KI trägt ein', chips: ['Keine Werbung', 'Kein Download', '18 Sprachen'], ex: 'Beispiel' },
    it: { hook: 'Dove finiscono i tuoi soldi ogni mese?', line: 'Foto allo scontrino, l’IA lo registra', chips: ['Senza pubblicità', 'Niente da scaricare', '18 lingue'], ex: 'esempio' },
    nl: { hook: 'Waar blijft je geld elke maand?', line: 'Foto van je bon, de AI vult het in', chips: ['Geen advertenties', 'Geen download', '18 talen'], ex: 'voorbeeld' },
    pl: { hook: 'Gdzie co miesiąc znikają Twoje pieniądze?', line: 'Zdjęcie paragonu, AI wpisze resztę', chips: ['Bez reklam', 'Bez pobierania', '18 języków'], ex: 'przykład' },
    tr: { hook: 'Paran her ay nereye gidiyor?', line: 'Fişin fotoğrafını çek, yapay zekâ girsin', chips: ['Reklamsız', 'İndirme yok', '18 dil'], ex: 'örnek' },
    ru: { hook: 'Куда каждый месяц уходят деньги?', line: 'Сфотографируйте чек — ИИ всё запишет', chips: ['Без рекламы', 'Без скачивания', '18 языков'], ex: 'пример' },
  };
  const LANGS = Object.keys(T);

  // carousel / gallery copy (th, en, ja). <hl> = lemon highlight.
  const C = {
    th: {
      cover: 'จดเงิน\nแบบ\n<hl>ไม่ต้องพยายาม</hl>', hint: 'ปัดดู ›',
      scanT: 'ถ่ายบิล', scanS: 'AI อ่านร้าน ยอด วันที่ แล้วเดาหมวดให้ เราแค่ตรวจแล้วกดบันทึก',
      rc: { shop: 'Café Lemon', date: '14 ต.ค.', items: [['ลาเต้เย็น', '฿85'], ['ครัวซองต์', '฿65']], total: ['รวม', '฿150'] },
      kv: [['ร้าน', 'Café Lemon'], ['ยอด', '฿150'], ['วันที่', '14 ต.ค.'], ['หมวด', 'อาหาร']],
      typeT: 'พิมพ์ประโยคเดียว', typeS: 'จดได้หลายรายการพร้อมกัน หรือพูดผ่านไมค์ก็ได้',
      typed: 'กาแฟ 150 ข้าวมันไก่ 120', rows: [['อาหาร', 'กาแฟ', '−฿150'], ['อาหาร', 'ข้าวมันไก่', '−฿120']],
      save: 'บันทึกทั้งหมด', askT: 'ถาม AI', askS: 'คำตอบมาจากรายการของคุณเอง และ AI ไม่แก้ข้อมูลเอง',
      q: 'เดือนนี้ค่าอาหารไปเท่าไร?', a: 'เดือนนี้ค่าอาหาร <b>฿270</b> คือกาแฟ ฿150 และข้าวมันไก่ ฿120',
      endT: 'เปิดใช้ได้เลย', endS: 'ไม่ต้องโหลดแอป เพิ่มไปยังหน้าจอโฮมได้',
    },
    en: {
      cover: 'Track money\n<hl>without trying.</hl>', hint: 'Swipe ›',
      scanT: 'Snap the receipt', scanS: 'AI reads the shop, total and date, and suggests a category. You check it and tap Save.',
      rc: { shop: 'Café Lemon', date: 'Oct 14', items: [['Iced latte', '$3.20'], ['Croissant', '$1.30']], total: ['Total', '$4.50'] },
      kv: [['Shop', 'Café Lemon'], ['Total', '$4.50'], ['Date', 'Oct 14'], ['Category', 'Food']],
      typeT: 'Type one sentence', typeS: 'Log several entries at once, or say it with your keyboard mic.',
      typed: 'coffee 4.50 chicken rice 3.75', rows: [['Food', 'Coffee', '−$4.50'], ['Food', 'Chicken rice', '−$3.75']],
      save: 'Save all', askT: 'Ask AI', askS: 'Answers come from your own entries. AI never changes your data on its own.',
      q: 'How much did I spend on food this month?', a: 'You spent <b>$8.25</b> on food this month: coffee $4.50 and chicken rice $3.75.',
      endT: 'Open it now', endS: 'No download needed. Add it to your home screen.',
    },
    ja: {
      cover: '<hl>がんばらない</hl>\n家計簿。', hint: 'スワイプ ›',
      scanT: 'レシートを撮る', scanS: 'お店・金額・日付をAIが読み取り、カテゴリも提案。確認して保存するだけ。',
      rc: { shop: 'Café Lemon', date: '10月14日', items: [['カフェラテ', '¥480'], ['クロワッサン', '¥195']], total: ['合計', '¥675'] },
      kv: [['お店', 'Café Lemon'], ['金額', '¥675'], ['日付', '10月14日'], ['カテゴリ', '食費']],
      typeT: '一文で入力', typeS: '何件でもまとめて記録。キーボードの音声入力でもOK。',
      typed: 'コーヒー 675 チキンライス 550', rows: [['食費', 'コーヒー', '−¥675'], ['食費', 'チキンライス', '−¥550']],
      save: 'すべて保存', askT: 'AIに聞く', askS: '答えはあなたの記録から。AIが勝手にデータを変えることはありません。',
      q: '今月の食費はいくら？', a: '今月の食費は <b>¥1,225</b> です。コーヒー ¥675、チキンライス ¥550。',
      endT: '今すぐ使える', endS: 'ダウンロード不要。ホーム画面に追加できます。',
    },
  };

  const S = { // story, banners, covers
    th: { story: 'เงินหายไปไหน\nทุกเดือน?', storyS: 'Daily บอกได้ในไม่กี่วินาที', link: 'แตะลิงก์ด้านล่าง', tag: 'จดเงินได้ในไม่กี่วินาที', tagS: 'ถ่ายบิล · ถาม AI · 18 ภาษา · ไม่มีโฆษณา' },
    en: { story: 'Where does your money go every month?', storyS: 'Daily shows you in seconds.', link: 'Tap the link below', tag: 'Log money in seconds.', tagS: 'Snap receipts · Ask AI · 18 languages · No ads' },
    ja: { story: '毎月、お金は\nどこに消えてる？', storyS: 'Dailyなら数秒でわかる。', link: '下のリンクをタップ', tag: '数秒で記録できる家計簿。', tagS: 'レシート読取・AIに質問・18言語・広告なし' },
  };

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rich = (s) => esc(s).replace(/&lt;hl&gt;/g, '<span class="hl">').replace(/&lt;\/hl&gt;/g, '</span>')
    .replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>').replace(/\n/g, '<br>');
  function el(tag, cls, html, style) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (style) Object.assign(e.style, style);
    return e;
  }
  const px = (n) => n + 'px';
  function box(parent, x, y, w, h, cls, html, style) {
    const e = el('div', cls, html, Object.assign({ position: 'absolute', left: px(x), top: px(y), width: px(w) }, h ? { height: px(h) } : {}, style || {}));
    parent.appendChild(e);
    return e;
  }
  // shrink text until it fits its box (fixed width + height)
  function fit(e, max, min) {
    let s = max;
    e.style.fontSize = px(s);
    e.style.overflow = 'hidden';
    while ((e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1) && s > min) { s -= 2; e.style.fontSize = px(s); }
    return s;
  }
  // a heading/sub block that fits its box, then shrinks to its content height (returns the height)
  function tb(parent, x, y, w, maxH, cls, text, max, min, style) {
    const e = box(parent, x, y, w, maxH, cls + (String(text).includes('\n') ? ' nw' : ''), rich(text), style);
    fit(e, max, min);
    e.style.height = 'auto';
    return e.offsetHeight;
  }
  function lemon(parent, x, y, w, rot) {
    const i = el('img', 'lemonimg');
    i.src = LEMON;
    Object.assign(i.style, { left: px(x), top: px(y), width: px(w), transform: `rotate(${rot || 0}deg)` });
    parent.appendChild(i);
    return i;
  }
  function phone(parent, lang, x, y, w, shadow) {
    const p = el('div', 'phone', `<img src="${SHOT(lang)}" alt="">`, { left: px(x), top: px(y), width: px(w), fontSize: px(shadow || w * 0.33) });
    parent.appendChild(p);
    return p;
  }
  function wordmark(parent, x, y, size, color) {
    return box(parent, x, y, size * 4, null, 'wm', `Daily<img src="${LEMON}" alt="">`, { fontSize: px(size), color: color || 'inherit' });
  }
  function shape(parent, kind, x, y, s, color) {
    return box(parent, x, y, s, s, 'shp ' + kind, '', { background: color });
  }
  function canvas(w, h, lang, extra) {
    const st = document.getElementById('stage');
    st.innerHTML = '';
    st.style.width = px(w); st.style.height = px(h);
    const c = el('div', `cv L-${lang} ${extra || ''}`, '', { width: px(w), height: px(h) });
    c.lang = lang;
    st.appendChild(c);
    return c;
  }
  const chipsHtml = (arr) => arr.map((t) => `<span class="chip">${esc(t)}</span>`).join('');

  // ---------- layouts ----------
  const L = {};

  L.avatar = (j) => {
    const c = canvas(j.w, j.h, 'en');
    const s = j.w;
    lemon(c, s * 0.17, s * 0.27, s * 0.66, -8);
  };

  L.square = (j) => {
    const c = canvas(1080, 1080, j.lang); const t = T[j.lang];
    wordmark(c, 72, 70, 46);
    let y = 168;
    y += tb(c, 72, y, 560, 420, 'hd', t.hook, 92, 44) + 30;
    y += tb(c, 72, y, 540, 130, 'sub', t.line, 46, 26, { color: 'var(--lm)' }) + 40;
    box(c, 72, y, 560, null, 'chips', chipsHtml(t.chips), { fontSize: '32px' });
    box(c, 72, 930, 560, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '40px' });
    shape(c, 'drop', 900, -60, 220, 'var(--pr2)');
    phone(c, j.lang, 660, 150, 370, 26);
    lemon(c, 860, 60, 170, -12);
  };

  L.og = (j) => {
    const c = canvas(1200, 630, j.lang); const t = T[j.lang];
    wordmark(c, 64, 56, 40);
    let y = 140;
    y += tb(c, 64, y, 640, 250, 'hd', t.hook, 74, 36) + 22;
    tb(c, 64, y, 620, 80, 'sub', t.line, 38, 22, { color: 'var(--lm)' });
    box(c, 64, 500, 640, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '34px' });
    shape(c, 'c', 1040, 440, 260, 'var(--pr2)');
    phone(c, j.lang, 790, 70, 330, 22);
    lemon(c, 1010, 20, 150, -12);
  };

  // carousel slides, portrait 1080x1350
  function slideHead(c, lang, title, sub, y, w, onLemon, big) {
    const col = onLemon ? 'var(--pr)' : 'var(--cream)';
    y += tb(c, 80, y, w || 920, 150, 'hd', title, big || 100, 50, { color: col }) + 24;
    y += tb(c, 80, y, w || 900, 150, 'sub', sub, big ? 34 : 44, 24, { color: col });
    return y;
  }
  function receiptBlock(c, lang, x, y, w, k, ex) {
    const r = C[lang].rc;
    const rc = box(c, x, y, w, null, 'receipt', `<div class="shop">${esc(r.shop)}</div><div class="dt">${esc(r.date)}</div>` +
      r.items.map((i) => `<div class="ln"><span>${esc(i[0])}</span><span>${esc(i[1])}</span></div>`).join('') +
      `<div class="gap"></div><div class="tot"><span>${esc(r.total[0])}</span><span>${esc(r.total[1])}</span></div>`, { fontSize: px(k) });
    box(rc, 0, 0, 0, null, 'scan', '', { top: '58%', width: 'auto' });
    return rc;
  }
  function kvBlock(c, lang, x, y, w, k) {
    const kv = C[lang].kv;
    return box(c, x, y, w, null, 'appcard', `<dl class="kv">${kv.map((p) => `<dt>${esc(p[0])}</dt><dd>${esc(p[1])}</dd>`).join('')}</dl>` +
      `<div style="margin-top:.7em"><span class="tag" style="font-size:.62em">${esc(T[lang].ex)}</span></div>`, { fontSize: px(k) });
  }
  function typeBlock(c, lang, x, y, w, k) {
    const d = C[lang];
    const wrap = box(c, x, y, w, null, '', '', { fontSize: px(k), display: 'flex', flexDirection: 'column', gap: '.8em' });
    wrap.appendChild(el('div', 'inbar', `<span class="t">${esc(d.typed)}<span class="caret"></span></span><span class="go"><span class="ms">arrow_upward</span></span>`));
    const card = el('div', 'appcard', d.rows.map((r, i) =>
      `<div class="row"><span class="ic ${i ? 'c' : 'drop'}"><span class="ms">restaurant</span></span><span class="tx"><b>${esc(r[0])}</b><span>${esc(r[1])}</span></span><span class="amt">${esc(r[2])}</span></div>`).join('') +
      `<div style="margin-top:.35em"><span class="tag" style="font-size:.62em">${esc(T[lang].ex)}</span></div>`);
    wrap.appendChild(card);
    const t = wrap.querySelector('.inbar .t');
    let f = 1;
    while (t.scrollWidth > t.clientWidth + 1 && f > 0.6) { f -= 0.04; t.style.fontSize = f + 'em'; }
    return wrap;
  }
  function chatBlock(c, lang, x, y, w, k) {
    const d = C[lang];
    const wrap = box(c, x, y, w, null, '', '', { fontSize: px(k), display: 'flex', flexDirection: 'column', gap: '.7em' });
    wrap.appendChild(el('div', 'bub me', esc(d.q)));
    wrap.appendChild(el('div', 'bub ai', rich(d.a)));
    wrap.appendChild(el('div', '', `<span class="tag" style="font-size:.62em">${esc(T[lang].ex)}</span>`));
    return wrap;
  }

  L.carousel = (j) => {
    const lang = j.lang, d = C[lang], n = j.n;
    if (n === 1) {
      const c = canvas(1080, 1350, lang);
      wordmark(c, 80, 80, 52);
      tb(c, 80, 300, 920, 560, 'hd', d.cover, 170, 80);
      box(c, 80, 1180, 400, null, 'sub', esc(d.hint), { fontSize: '40px', opacity: 0.85 });
      shape(c, 'c', 640, 880, 520, 'var(--pr2)');
      lemon(c, 600, 920, 420, -10);
    } else if (n === 2) {
      const c = canvas(1080, 1350, lang, 'lemon');
      slideHead(c, lang, d.scanT, d.scanS, 90, 920, true);
      const rc = receiptBlock(c, lang, 80, 430, 460, 40);
      const kv = kvBlock(c, lang, 556, 430 + rc.offsetHeight - 110, 450, 36);
      kv.style.top = px(Math.min(kv.offsetTop, 1350 - kv.offsetHeight - 60));
    } else if (n === 3) {
      const c = canvas(1080, 1350, lang);
      slideHead(c, lang, d.typeT, d.typeS, 90);
      const tbk = typeBlock(c, lang, 80, 430, 920, 48);
      box(c, 80, Math.min(430 + tbk.offsetHeight + 50, 1350 - 170), 600, null, '', `<span class="btn">${esc(d.save)}</span>`, { fontSize: '50px' });
      lemon(c, 800, 1110, 200, -12);
    } else if (n === 4) {
      const c = canvas(1080, 1350, lang, 'lemon');
      slideHead(c, lang, d.askT, d.askS, 90, 920, true);
      chatBlock(c, lang, 80, 500, 920, 54);
      shape(c, 'c', 760, 1080, 380, 'var(--pr)');
      lemon(c, 790, 1100, 220, -12);
    } else {
      const c = canvas(1080, 1350, lang);
      const h = box(c, 80, 90, 920, 130, 'hd', rich(d.endT));
      fit(h, 100, 50);
      const s = box(c, 80, 230, 560, 140, 'sub', esc(d.endS));
      fit(s, 40, 24);
      box(c, 80, 420, 520, null, 'chips', chipsHtml(T[lang].chips), { fontSize: '38px', flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'nowrap' });
      box(c, 80, 1180, 560, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '46px' });
      phone(c, lang, 640, 330, 380, 26);
      lemon(c, 820, 230, 200, -12);
    }
  };

  L.story = (j) => {
    const c = canvas(1080, 1920, j.lang); const s = S[j.lang];
    wordmark(c, 80, 260, 56);
    // top 250 px and bottom 300 px are covered by the app's own UI; put the link sticker on the pill
    let y = 380;
    y += tb(c, 80, y, 920, 330, 'hd', s.story, 110, 56) + 26;
    y += tb(c, 80, y, 900, 80, 'sub', s.storyS, 48, 28, { color: 'var(--lm)' }) + 50;
    box(c, 80, y, 920, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '52px' });
    shape(c, 'leaf', 640, y + 180, 460, 'var(--pr2)');
    phone(c, j.lang, 230, y + 210, 560, 34);
    lemon(c, 700, y + 140, 240, -12);
  };

  const COV = {
    'lemon8-th': { lang: 'th', t: 'แอปจดเงิน\n<hl>ที่ไม่มีโฆษณา</hl>', s: 'ถ่ายบิลแล้ว AI กรอกให้ · ไม่ต้องโหลดแอป', shot: 'th' },
    'lemon8-ja': { lang: 'ja', t: '家計簿が\n<hl>続かない人へ</hl>', s: 'レシートを撮るだけ。AIが入力。', shot: 'ja' },
    'xhs-zh-CN': { lang: 'zh-CN', t: '留学生记账\n<hl>外币自动换算</hl>', s: '日元、美元、英镑…记一笔，自动换算成你的主币种', shot: 'zh-CN' },
  };
  L.cover34 = (j) => {
    const v = COV[j.key]; const c = canvas(1080, 1440, v.lang);
    wordmark(c, 80, 80, 48);
    const hh = tb(c, 80, 190, 920, 400, 'hd', v.t, 140, 64);
    tb(c, 80, 190 + hh + 30, 920, 110, 'sub', v.s, 46, 26, { color: 'var(--lm)' });
    shape(c, 'c', -120, 1000, 520, 'var(--pr2)');
    phone(c, v.shot, 290, 740, 500, 30);
    lemon(c, 760, 700, 220, -12);
  };

  function brandShapes(c, list) { list.forEach((s) => shape(c, s[0], s[1], s[2], s[3], s[4])); }

  L.yt = () => {
    const c = canvas(2560, 1440, 'en'); const s = S.en;
    // safe area for all devices: 1546x423 centred (x 507-2053, y 508-931)
    brandShapes(c, [['c', 120, 260, 300, 'var(--lm)'], ['shp', 2150, 180, 260, 'var(--night)'], ['drop', 2200, 900, 280, 'var(--pr2)'], ['leaf', 200, 980, 260, 'var(--pr2)']]);
    box(c, 507, 540, 1546, null, '', `<span class="wm">Daily<img src="${LEMON}" alt=""></span>`, { fontSize: '170px', textAlign: 'center' });
    box(c, 507, 740, 1546, null, 'hd', esc(s.tag), { fontSize: '76px', textAlign: 'center' });
    box(c, 507, 846, 1546, null, 'sub', esc(s.tagS), { fontSize: '44px', textAlign: 'center', color: 'var(--lm)' });
  };

  L.x = (j) => {
    const c = canvas(1500, 500, j.lang); const s = S[j.lang];
    // the profile photo covers the lower left on X; keep text right of x≈420
    brandShapes(c, [['c', -80, -120, 360, 'var(--pr2)'], ['drop', 230, 330, 150, 'var(--lm)']]);
    const t = box(c, 470, 110, 760, 150, 'hd', rich(s.tag));
    fit(t, 84, 40);
    const sb = box(c, 470, 270, 760, 70, 'sub', esc(s.tagS), { color: 'var(--lm)' });
    fit(sb, 36, 22);
    box(c, 470, 370, 700, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '34px' });
    lemon(c, 1250, 150, 210, -12);
  };

  L.fb = (j) => {
    const c = canvas(1640, 624, j.lang); const s = S[j.lang];
    // phones crop the sides: keep text in the middle ~1100px
    brandShapes(c, [['c', -100, 300, 400, 'var(--pr2)'], ['shp', 1480, -60, 220, 'var(--night)'], ['drop', 1430, 400, 180, 'var(--lm)']]);
    wordmark(c, 300, 130, 110);
    const t = box(c, 300, 290, 1000, 120, 'hd', rich(s.tag));
    fit(t, 76, 40);
    const sb = box(c, 300, 410, 1000, 70, 'sub', esc(s.tagS), { color: 'var(--lm)' });
    fit(sb, 40, 22);
    lemon(c, 1110, 90, 220, -12);
  };

  L.li = () => {
    const c = canvas(1128, 191, 'en');
    brandShapes(c, [['c', 980, 20, 150, 'var(--pr2)'], ['drop', 40, 120, 90, 'var(--lm)']]);
    wordmark(c, 300, 50, 58);
    box(c, 560, 62, 440, 70, 'sub', esc(S.en.tag), { fontSize: '34px', fontWeight: 700 });
    box(c, 560, 108, 460, 40, 'sub', esc('by limonlay · ' + URL_), { fontSize: '24px', color: 'var(--lm)' });
  };

  const RICH = {
    th: [['open_in_new', 'เปิด Daily'], ['menu_book', 'คู่มือการใช้'], ['shield_lock', 'ความปลอดภัย']],
    ja: [['open_in_new', 'Dailyを開く'], ['menu_book', '使い方'], ['shield_lock', '安全性']],
  };
  L.richmenu = (j) => {
    const c = canvas(2500, 843, j.lang, 'night');
    const bg = ['var(--lm)', 'var(--pr)', 'var(--night)'], fg = ['var(--pr)', 'var(--cream)', 'var(--cream)'];
    RICH[j.lang].forEach((it, i) => {
      const w = i === 2 ? 834 : 833;
      const b = box(c, i * 833, 0, w, 843, '', '', { background: bg[i], color: fg[i], display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '36px' });
      b.appendChild(el('span', 'ms', it[0], { fontSize: '230px', color: i ? 'var(--lm)' : 'var(--pr)' }));
      const lab = el('div', 'hd', esc(it[1]), { fontSize: '104px', textAlign: 'center' });
      b.appendChild(lab);
    });
  };

  L.linecover = (j) => {
    const c = canvas(1080, 878, j.lang); const s = S[j.lang];
    brandShapes(c, [['c', 760, 520, 460, 'var(--pr2)'], ['drop', -60, -60, 220, 'var(--night)']]);
    wordmark(c, 80, 250, 120);
    const t = box(c, 80, 420, 860, 150, 'hd', rich(s.tag));
    fit(t, 78, 40);
    const sb = box(c, 80, 580, 900, 120, 'sub', esc(s.tagS), { color: 'var(--lm)' });
    fit(sb, 40, 24);
    lemon(c, 800, 640, 210, -12);
  };

  // Product Hunt gallery 1270x760 (en) + thumbnail
  L.ph = (j) => {
    const n = j.n, lang = 'en', d = C.en;
    if (n === 1) {
      const c = canvas(1270, 760, lang);
      wordmark(c, 80, 80, 64);
      const h = box(c, 80, 200, 640, 200, 'hd', rich('Log money\n<hl>in seconds.</hl>'));
      fit(h, 100, 50);
      const s = box(c, 80, 430, 600, 130, 'sub', esc('Snap a receipt and AI fills it in. Ask AI where your money went. 18 languages, any currency.'));
      fit(s, 34, 22);
      box(c, 80, 600, 640, null, 'chips', chipsHtml(T.en.chips), { fontSize: '28px' });
      shape(c, 'drop', 1060, 520, 300, 'var(--pr2)');
      phone(c, 'en', 820, 70, 330, 24);
      lemon(c, 1050, 40, 170, -12);
    } else if (n === 2) {
      const c = canvas(1270, 760, lang, 'lemon');
      slideHead(c, lang, d.scanT, d.scanS, 80, 520, true);
      receiptBlock(c, lang, 640, 90, 300, 30);
      kvBlock(c, lang, 900, 420, 300, 28);
    } else if (n === 3) {
      const c = canvas(1270, 760, lang);
      slideHead(c, lang, d.typeT, d.typeS, 80, 500);
      typeBlock(c, lang, 640, 200, 560, 32);
    } else if (n === 4) {
      const c = canvas(1270, 760, lang, 'lemon');
      slideHead(c, lang, d.askT, d.askS, 80, 520, true);
      chatBlock(c, lang, 640, 190, 560, 32);
    } else {
      const c = canvas(1270, 760, lang);
      const h = box(c, 80, 70, 1110, 120, 'hd', rich('Your language. <hl>Your money.</hl>'));
      fit(h, 84, 40);
      box(c, 80, 190, 1110, 60, 'sub', esc('Log in any currency, see it in yours. 18 languages. No ads.'), { fontSize: '34px', color: 'var(--lm)' });
      ['en', 'ja', 'es', 'th', 'ko'].forEach((l, i) => phone(c, l, 70 + i * 232, 300 + (i % 2) * 40, 210, 16));
    }
  };
  L.phthumb = () => { const c = canvas(240, 240, 'en'); lemon(c, 34, 62, 172, -8); };

  // Pinterest 1000x1500 (en)
  L.pin = (j) => {
    const c = canvas(1000, 1500, 'en');
    wordmark(c, 70, 70, 52);
    if (j.n === 1) {
      const h = box(c, 70, 180, 860, 330, 'hd', rich('Where does your money <hl>go?</hl>'));
      fit(h, 120, 60);
      // a sequence without numbers: one lemon path that gets thicker, ending at the lemon
      const steps = [['photo_camera', 'Snap the receipt', 'AI fills it in'], ['forum', 'Ask AI', '"How much on food?"'], ['insights', 'See every coin', 'by category, by month']];
      steps.forEach((s, i) => {
        const y = 600 + i * 230;
        box(c, 110, y + 70, 14 + i * 12, 230, '', '', { background: 'var(--lm)', left: px(150 - (14 + i * 12) / 2) });
        const ic = box(c, 90 - i * 6, y, 120 + i * 12, 120 + i * 12, '', `<span class="ms">${s[0]}</span>`, { background: 'var(--lm)', color: 'var(--pr)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: px(64 + i * 6) });
        box(c, 270, y + 8, 660, null, 'hd', esc(s[1]), { fontSize: px(58 + i * 6) });
        box(c, 270, y + 80 + i * 6, 660, null, 'sub', esc(s[2]), { fontSize: '36px', color: 'var(--lm)' });
      });
      lemon(c, 70, 1290, 170, -10);
      box(c, 300, 1340, 640, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '44px' });
    } else {
      const h = box(c, 70, 180, 860, 330, 'hd', rich('Travel budget\nin <hl>any currency</hl>'));
      fit(h, 120, 60);
      const s = box(c, 70, 520, 860, 120, 'sub', esc('Log it in yen, won or euros. Daily converts it to your main currency.'));
      fit(s, 42, 26);
      box(c, 70, 670, 400, 560, 'chips', ['¥', '₩', '€', '฿', '$'].map((x) => `<span class="chip" style="font-size:96px;padding:.2em .45em">${x}</span>`).join(''), { gap: '22px' });
      shape(c, 'leaf', 620, 1180, 420, 'var(--pr2)');
      phone(c, 'en', 520, 680, 400, 26);
      box(c, 70, 1340, 640, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '44px' });
    }
  };

  // backgrounds for the video cut-downs (cutdowns.sh puts the 9:16 film into the hole on the right)
  L.frame = (j) => {
    const s = S[j.lang];
    if (j.fmt === '16x9') {
      const c = canvas(1920, 1080, j.lang);
      brandShapes(c, [['c', -160, 760, 520, 'var(--pr2)'], ['drop', 1000, 70, 150, 'var(--lm)']]);
      wordmark(c, 120, 200, 120);
      let y = 400;
      y += tb(c, 120, y, 960, 260, 'hd', s.tag, 96, 50) + 28;
      y += tb(c, 120, y, 960, 120, 'sub', s.tagS, 44, 26, { color: 'var(--lm)' }) + 60;
      box(c, 120, y, 900, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '52px' });
      box(c, 1192, 0, 608, 1080, '', '', { background: '#000' });
    } else {
      const c = canvas(1080, 1080, j.lang);
      brandShapes(c, [['c', -140, 820, 420, 'var(--pr2)']]);
      wordmark(c, 56, 70, 64);
      tb(c, 56, 200, 370, 420, 'hd', s.tag, 72, 36);
      lemon(c, 90, 720, 200, -12);
      box(c, 0, 960, 472, null, '', `<span class="pill">${URL_}</span>`, { fontSize: '30px', textAlign: 'center' });
      box(c, 472, 0, 608, 1080, '', '', { background: '#000' });
    }
  };

  // ---------- jobs ----------
  const J = [];
  J.push({ kind: 'avatar', w: 1080, h: 1080, file: 'avatar-1080.png' });
  J.push({ kind: 'phthumb', w: 240, h: 240, file: 'producthunt-thumb-240.png' });
  LANGS.forEach((l) => J.push({ kind: 'square', lang: l, w: 1080, h: 1080, file: `square-${l}-1080.png` }));
  LANGS.forEach((l) => J.push({ kind: 'og', lang: l, w: 1200, h: 630, file: `blog-${l}-1200x630.png` }));
  ['th', 'en', 'ja'].forEach((l) => [1, 2, 3, 4, 5].forEach((n) => J.push({ kind: 'carousel', lang: l, n, w: 1080, h: 1350, file: `carousel-${l}-${n}-1080x1350.png` })));
  ['th', 'en', 'ja'].forEach((l) => J.push({ kind: 'story', lang: l, w: 1080, h: 1920, file: `story-${l}-1080x1920.png` }));
  Object.keys(COV).forEach((k) => J.push({ kind: 'cover34', key: k, lang: COV[k].lang, w: 1080, h: 1440, file: `${k}-1080x1440.png` }));
  J.push({ kind: 'yt', w: 2560, h: 1440, file: 'youtube-banner-2560x1440.png' });
  ['en', 'ja'].forEach((l) => J.push({ kind: 'x', lang: l, w: 1500, h: 500, file: `x-header-${l}-1500x500.png` }));
  ['th', 'en'].forEach((l) => J.push({ kind: 'fb', lang: l, w: 1640, h: 624, file: `facebook-cover-${l}-1640x624.png` }));
  J.push({ kind: 'li', w: 1128, h: 191, file: 'linkedin-cover-1128x191.png' });
  ['th', 'ja'].forEach((l) => J.push({ kind: 'richmenu', lang: l, w: 2500, h: 843, file: `line-richmenu-${l}-2500x843.png` }));
  ['th', 'ja'].forEach((l) => J.push({ kind: 'linecover', lang: l, w: 1080, h: 878, file: `line-cover-${l}-1080x878.png` }));
  [1, 2, 3, 4, 5].forEach((n) => J.push({ kind: 'ph', n, w: 1270, h: 760, file: `producthunt-gallery-${n}-1270x760.png` }));
  [1, 2].forEach((n) => J.push({ kind: 'pin', n, w: 1000, h: 1500, file: `pinterest-${n}-en-1000x1500.png` }));

  ['en', 'th'].forEach((l) => ['16x9', '1x1'].forEach((f) => J.push({ kind: 'frame', lang: l, fmt: f, w: f === '16x9' ? 1920 : 1080, h: 1080, file: `frames/frame-${l}-${f}.png` })));
  window.JOBS = J;
  window.renderJob = async function (job) {
    L[job.kind](job);
    await document.fonts.ready;
    const imgs = Array.from(document.querySelectorAll('#stage img'));
    await Promise.all(imgs.map((i) => (i.complete ? (i.decode ? i.decode().catch(() => {}) : 0) : new Promise((r) => { i.onload = i.onerror = r; }))));
    // re-run once fonts are in, so fit() measures real glyphs
    L[job.kind](job);
    await document.fonts.ready;
    await Promise.all(Array.from(document.querySelectorAll('#stage img')).map((i) => (i.decode ? i.decode().catch(() => {}) : 0)));
    return true;
  };

  // manual preview: art.html?i=12
  const q = new URLSearchParams(location.search);
  if (q.has('i')) window.renderJob(J[+q.get('i')]);
})();
