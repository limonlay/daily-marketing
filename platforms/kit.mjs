// Daily — platform marketing kit (source of truth). build.mjs turns this into KIT.md and page/index.html.
// Owner-facing notes are Thai; post texts are in the language they are posted in.
// Facts must stay true to the live app (pricing.html, docs.html, about.html in limonlay/daily). Never the word "free" in posts
// (owner removed it from the reels: paid plans are coming); answer price questions with the FAQ text.

export const kit = {
  updated: '2026-11-22',
  link: 'https://daily.limonlay.com',

  handles: [
    { where: 'Instagram · TikTok · Threads · Lemon8 (ไทย / หลัก)', handle: '@daily.limonlay' },
    { where: 'Instagram · TikTok · Lemon8 (ญี่ปุ่น)', handle: '@daily.limonlay.jp' },
    { where: 'X (อังกฤษ)', handle: '@dailylimonlay' },
    { where: 'X (ญี่ปุ่น) — X จำกัด 15 ตัวอักษร', handle: '@dailylimonlayjp' },
    { where: 'YouTube · Pinterest · Reddit · Product Hunt · Telegram', handle: '@dailylimonlay' },
    { where: 'Facebook Page · LINE OA', handle: 'Daily (ชื่อเพจ) · @dailylimonlay' },
  ],

  rules: [
    'บอกทุกครั้งว่าเราเป็นคนทำ Daily — ห้ามรีวิวปลอม ห้ามใช้บัญชีอื่นมาชม ห้ามซื้อไลก์หรือผู้ติดตาม',
    'ไม่ใช้คำว่า "ฟรี" ในโพสต์ (แพ็กเกจเสียเงินกำลังมา) ใช้ "ไม่มีโฆษณา" "ไม่ต้องโหลดแอป" "18 ภาษา" แทน ถ้ามีคนถามราคา ตอบด้วยข้อความใน FAQ',
    'ตัวเลขเงินในรูปและวิดีโอเป็นข้อมูลตัวอย่าง ติดป้าย "ตัวอย่าง" และใช้สกุลเงินของภาษานั้น ภาษาอื่นห้ามใช้ ฿ หรือคำว่า "บาท"',
    'หน้าจอที่โชว์ต้องเป็น UI จริงของ Daily และพูดถึงเฉพาะฟีเจอร์ที่เปิดใช้อยู่แล้ว',
    'ห้ามเอ่ยชื่อผู้ให้บริการอัตราแลกเปลี่ยน และไม่บอกว่า AI แม่น 100% (AI อ่านผิดได้ ให้ตรวจก่อนบันทึก)',
    'ไม่ทำให้คนรู้สึกผิดเรื่องการใช้เงิน ชวนคุย ไม่สั่งสอน',
    'ยังไม่ยิงโฆษณาจนกว่าแพ็กเกจเสียเงินจะเปิด และไม่ส่งอีเมลการตลาดหาผู้ใช้ที่ยังไม่ได้กดยอมรับรับข่าว',
    'ตอบคอมเมนต์ภายใน 24 ชั่วโมงในภาษาของคนถาม (ใช้คำตอบสำเร็จรูปใน FAQ ได้)',
  ],

  // the films that already exist (silent unless noted); 9:16 goes everywhere vertical
  films: [
    { id: 'payday', name: 'Payday → day 25 (15 วิ, อังกฤษ)', files: ['films/payday-ui/payday-ui.mp4 (เงียบ ใส่เพลงเอง)', 'films/payday-ui/payday-ui-sfx.mp4 (มีเสียงที่ทำเอง โพสต์ได้เลย)', 'platforms/out/video/payday-en-16x9.mp4', 'platforms/out/video/payday-en-1x1.mp4'] },
    { id: 'click30', name: 'Click → ระเบิดออกมา (30 วิ, อังกฤษ)', files: ['films/click-30/click-30.mp4 (เงียบ ใส่เพลงเอง)', 'platforms/out/video/click30-en-16x9.mp4', 'platforms/out/video/click30-en-1x1.mp4'] },
    { id: 'everywhere', name: 'เที่ยวที่ไหน จดเป็นเงินที่นั่น (15 วิ, ฮุคไทย)', files: ['films/everywhere/final.mp4 (มีเพลงที่ทำเอง)', 'platforms/out/video/everywhere-th-16x9.mp4', 'platforms/out/video/everywhere-th-1x1.mp4'] },
  ],

  // content pieces: one idea, cross-posted to every vertical-video platform. captions = ready to paste.
  pieces: [
    {
      id: 'P1', name: 'เงินเดือนออก → วันที่ 25', asset: 'payday (มีแล้ว: อังกฤษ) · ไทย/ญี่ปุ่น ต้องทำด้วย daily-reel', when: 'วันเงินเดือนออก (TH สิ้นเดือน, JP วันที่ 25)',
      captions: {
        th: 'เงินเดือนเพิ่งออก แต่กลางเดือนเหลือนิดเดียว…หายไปไหน? 🍋\nDaily บอกได้ว่าเงินไปไหน ถ่ายบิลแล้ว AI กรอกให้ในไม่กี่วินาที\nไม่ต้องโหลดแอป · daily.limonlay.com (ลิงก์ในโปรไฟล์)\n#จดรายรับรายจ่าย #เงินเดือนออก #ออมเงิน #มนุษย์เงินเดือน #แอปจดเงิน',
        en: 'Payday on the 1st. By the 25th… where did it go? 🍋\nDaily shows you where every coin went. Snap a receipt and AI logs it in seconds.\nNo download needed · daily.limonlay.com (link in bio)\n#budgeting #payday #moneytips #expensetracker #savingmoney',
        ja: '給料日にはあったのに、気づけば残りわずか。どこに消えた？🍋\nDailyならお金の行き先がひと目でわかる。レシートを撮ればAIが数秒で入力。\nダウンロード不要・daily.limonlay.com（プロフィールのリンクから）\n#家計簿 #家計簿アプリ #給料日 #節約 #貯金',
      },
    },
    {
      id: 'P2', name: 'กดทีเดียวรู้ว่าเงินไปไหน (สรุป · สแกน · งบ · AI)', asset: 'click-30 (มีแล้ว: อังกฤษ)', when: 'สัปดาห์แรก แล้วปักหมุดไว้บนโปรไฟล์',
      captions: {
        th: 'เงินไปไหนหมด? กดดูทีเดียวรู้เลย 🍋\nสรุปตามหมวด · ถ่ายบิลทีละหลายใบ · ตั้งงบครั้งเดียว · ถาม AI ได้ว่าเดือนนี้ค่ากินเท่าไร\nเงินเดือนเท่าเดิม แต่เหลือมากขึ้น\ndaily.limonlay.com\n#จดรายรับรายจ่าย #วางแผนการเงิน #ออมเงิน #AI #แอปจดเงิน',
        en: 'Where did your money go? One tap and you know. 🍋\nSummary by category · several receipts in one photo · budgets you set once · ask AI what you spent on food\nSame salary. More left.\ndaily.limonlay.com\n#budgeting #personalfinance #AI #expensetracker #moneytips',
        ja: 'お金どこ行った？タップひとつでわかる🍋\nカテゴリ別の概要・レシートをまとめて読取・予算は一度決めるだけ・「今月の食費いくら？」とAIに聞ける\n同じ給料で、残るお金が増える。\ndaily.limonlay.com\n#家計簿 #家計簿アプリ #AI #節約 #予算管理',
      },
    },
    {
      id: 'P3', name: 'เที่ยวที่ไหน จดเป็นเงินที่นั่น (หลายสกุลเงิน)', asset: 'everywhere (มีแล้ว: ฮุคไทย)', when: 'ช่วงเที่ยวปลายปี / ปีใหม่',
      captions: {
        th: 'เที่ยวที่ไหน จดเป็นเงินที่นั่น 🍋\nจดเป็นเยน วอน ดอลลาร์ หรือคริปโต แล้ว Daily แปลงเป็นสกุลหลักให้ ใช้ได้ 18 ภาษา\ndaily.limonlay.com\n#เที่ยวญี่ปุ่น #เที่ยวต่างประเทศ #จดรายจ่าย #ทริปเที่ยว #แอปจดเงิน',
        en: 'Wherever you go, log it in the money you are spending. 🍋\nYen, won, dollars, even crypto: Daily converts it to your main currency. 18 languages.\ndaily.limonlay.com\n#travelbudget #digitalnomad #studyabroad #expensetracker #travel',
        ja: '旅先では、その国のお金でそのまま記録🍋\nドル・ウォン・バーツ、暗号資産もOK。Dailyがメイン通貨に換算。18言語対応。\ndaily.limonlay.com\n#海外旅行 #旅行費用 #家計簿 #留学 #ワーホリ',
      },
    },
    {
      id: 'P4', name: 'ถ่ายบิลรูปเดียว จดเสร็จ', asset: 'carousel ช่อง 2 · reel ใหม่ (daily-reel)', when: 'ทุก 2 สัปดาห์ (ฟีเจอร์ขายหลัก)',
      captions: {
        th: 'ถ่ายบิลรูปเดียว จดเสร็จ 🍋\nAI อ่านร้าน ยอด วันที่ แล้วเดาหมวดให้ เราแค่ตรวจแล้วกดบันทึก\ndaily.limonlay.com\n#จดรายจ่าย #สแกนบิล #AI #ออมเงิน #ไลฟ์แฮ็ก',
        en: 'One photo of the receipt. Done. 🍋\nAI reads the shop, total and date, and suggests a category. You check it and tap Save.\ndaily.limonlay.com\n#receiptscanner #budgeting #AI #lifehack #expensetracker',
        ja: 'レシートを1枚撮るだけ🍋\nお店・金額・日付をAIが読み取り、カテゴリも提案。確認して保存するだけ。\ndaily.limonlay.com\n#家計簿 #レシート #AI #時短 #家計簿アプリ',
      },
    },
    {
      id: 'P5', name: 'พิมพ์ประโยคเดียว จดได้ทั้งวัน', asset: 'carousel ช่อง 3 · reel ใหม่', when: 'สัปดาห์ที่ 3',
      captions: {
        th: 'พิมพ์ประโยคเดียว จดได้หลายรายการ 🍋\n"กาแฟ 65 ข้าวมันไก่ 120" → AI แยกเป็น 2 รายการให้ ตรวจแล้วกดบันทึกทั้งหมด\nพูดผ่านไมค์ก็ได้\ndaily.limonlay.com\n#จดรายรับรายจ่าย #AI #ไลฟ์แฮ็ก #ออมเงิน',
        en: 'Type one sentence, log the whole day. 🍋\n"coffee 4.50 lunch 12 taxi 9" → AI splits it into 3 entries. Check them, then Save all.\nOr just say it with your keyboard mic.\ndaily.limonlay.com\n#AI #budgeting #lifehack #productivity',
        ja: '一文打つだけで、まとめて記録🍋\n「コーヒー 450 ランチ 1200」→ AIが2件に分けて入力。確認して「すべて保存」。\n音声入力でもOK。\ndaily.limonlay.com\n#家計簿 #AI #時短 #家計簿アプリ',
      },
    },
    {
      id: 'P6', name: 'ถาม AI ว่าเดือนนี้ค่ากินเท่าไร', asset: 'carousel ช่อง 4 · ตัดจาก click-30', when: 'สัปดาห์ที่ 4',
      captions: {
        th: 'ถาม AI ว่า "เดือนนี้ค่ากินไปเท่าไร" แล้วได้คำตอบจากรายการของเราเอง 🍋\nไม่ต้องเปิดตาราง ไม่ต้องบวกเอง และ AI ไม่แก้ข้อมูลเอง\ndaily.limonlay.com\n#AI #จดรายรับรายจ่าย #วางแผนการเงิน #ออมเงิน',
        en: 'Asked AI "how much did I spend on food this month?" and it answered from my own entries. 🍋\nNo spreadsheets, no adding up, and AI never changes your data on its own.\ndaily.limonlay.com\n#AI #budgeting #personalfinance #moneytips',
        ja: '「今月の食費いくら？」とAIに聞くと、自分の記録から答えてくれる🍋\n表計算も手計算もいらない。AIが勝手にデータを変えることもありません。\ndaily.limonlay.com\n#AI #家計簿 #家計簿アプリ #食費 #節約',
      },
    },
    {
      id: 'P7', name: 'ตั้งงบครั้งเดียว', asset: 'ตัดจาก click-30 (ช่วง Budgets)', when: 'ก่อนวันเซล 12.12',
      captions: {
        th: 'ตั้งงบครั้งเดียว แล้วดูแถบเติมทั้งเดือน 🍋\nหมวดไหนเกินงบรู้ทันที ไม่ต้องจำ ไม่ต้องคำนวณ\ndaily.limonlay.com\n#ตั้งงบ #ออมเงิน #วางแผนการเงิน #จดรายรับรายจ่าย',
        en: 'Set a budget once. Watch the bars all month. 🍋\nYou know the moment a category goes over, no math needed.\ndaily.limonlay.com\n#budgeting #budget #savingmoney #moneytips',
        ja: '予算は一度決めるだけ。あとはバーを見るだけ🍋\nカテゴリが予算オーバーしたらすぐわかる。計算いらず。\ndaily.limonlay.com\n#予算管理 #家計簿 #節約 #貯金',
      },
    },
    {
      id: 'P8', name: 'ย้ายจาก Excel / Google Sheets', asset: 'reel ใหม่ (หน้านำเข้า)', when: 'ต้นปี (คนเริ่มจดใหม่)',
      captions: {
        th: 'ย้ายจาก Excel / Google Sheets มาได้ในไม่กี่นาที 🍋\nเลือกไฟล์ CSV หรือ Excel จับคู่หมวด แล้วได้กราฟทันที\ndaily.limonlay.com\n#Excel #GoogleSheets #จดรายรับรายจ่าย #ไลฟ์แฮ็ก',
        en: 'From a messy spreadsheet to charts in minutes. 🍋\nPick a CSV or Excel file, match the categories, and your history is in.\ndaily.limonlay.com\n#excel #googlesheets #budgeting #productivity',
        ja: 'Excelやスプレッドシートの家計簿から数分で引っ越し🍋\nCSV・Excelを選んでカテゴリを合わせるだけ。すぐグラフに。\ndaily.limonlay.com\n#家計簿 #Excel家計簿 #家計簿アプリ #時短',
      },
    },
    {
      id: 'P9', name: 'แอปเงินที่ไม่มีโฆษณาและไม่ขายข้อมูล', asset: 'reel ใหม่ (ล็อกแอป) · square รูปเดียวก็ได้', when: 'สัปดาห์ที่ 5',
      captions: {
        th: 'แอปเงินที่ไม่มีโฆษณา และไม่ขายข้อมูล 🍋\nล็อกแอปด้วย PIN หรือ Face ID · ยืนยันตัวตน 2 ชั้น · Passkey\nรายการเห็นได้แค่เจ้าของบัญชี ส่งออกหรือลบได้ทุกเมื่อ\ndaily.limonlay.com\n#ความเป็นส่วนตัว #จดรายรับรายจ่าย #แอปจดเงิน',
        en: 'A money app with no ads that never sells your data. 🍋\nLock it with a PIN or Face ID · two-step sign-in · passkeys\nOnly you can see your entries. Export or delete them any time.\ndaily.limonlay.com\n#privacy #budgeting #expensetracker',
        ja: '広告なし、データも売らない家計簿🍋\nPIN・Face IDでアプリロック／2段階認証／パスキー対応\n記録は本人だけが見られる。いつでもエクスポート・削除OK。\ndaily.limonlay.com\n#プライバシー #家計簿アプリ #セキュリティ',
      },
    },
    {
      id: 'P10', name: 'ไม่ต้องโหลดจาก App Store', asset: 'story · reel สั้นวิธีเพิ่มไปหน้าจอโฮม', when: 'ทุกครั้งที่มีคนถามว่าโหลดที่ไหน',
      captions: {
        th: 'ไม่ต้องโหลดจาก App Store 🍋\nเปิด daily.limonlay.com แล้วกด "เพิ่มไปยังหน้าจอโฮม" ได้แอปเต็มจอ ใช้ได้ทั้งมือถือ iPad และคอม ข้อมูลตรงกันทุกเครื่อง\n#ไลฟ์แฮ็ก #iPhone #Android #แอปจดเงิน',
        en: 'No app store needed. 🍋\nOpen daily.limonlay.com, add it to your home screen, and it runs full screen on phone, iPad and computer, synced everywhere.\n#PWA #iphonetips #androidtips #productivity',
        ja: 'App Storeからのダウンロード不要🍋\ndaily.limonlay.com を開いて「ホーム画面に追加」するだけ。スマホ・iPad・PCで同期。\n#iPhone便利技 #家計簿アプリ #ライフハック',
      },
    },
  ],

  seasonal: [
    { date: '2026-11-27', name: 'Black Friday (อังกฤษ)', where: 'X · Threads · YouTube Shorts', lang: 'en',
      text: 'Black Friday haul? Log it before you forget. 🍋\nSnap the receipts tonight: Daily\'s AI fills them in, and the Summary shows what the weekend really cost.\ndaily.limonlay.com\n#blackfriday #budgeting #shoppinghaul #moneytips' },
    { date: '2026-11-30', name: 'เงินเดือนออก (ไทย)', where: 'TikTok · IG · FB · LINE VOOM', lang: 'th',
      text: 'เงินเดือนออกแล้ว 🍋 ก่อนกดอะไร ลองตั้งงบ 3 หมวดที่ใช้บ่อยก่อน\nใช้เวลา 1 นาที แล้วดูแถบเติมไปทั้งเดือน\ndaily.limonlay.com\n#เงินเดือนออก #ตั้งงบ #ออมเงิน #มนุษย์เงินเดือน' },
    { date: '2026-12-08', name: '12.12 (ไทย)', where: 'TikTok · IG · FB · Lemon8', lang: 'th',
      text: '12.12 ปีนี้ ช้อปได้ แต่รู้ด้วยว่าใช้ไปเท่าไร 🍋\nตั้งงบหมวดช้อปปิ้งไว้ก่อนวันเซล แล้วดูแถบเติมระหว่างกดจ่าย\ndaily.limonlay.com\n#1212 #ช้อปปิ้ง #ออมเงิน #ตั้งงบ' },
    { date: '2026-12-08', name: '12.12 (อินโดนีเซีย)', where: 'FB groups · Threads', lang: 'id',
      text: 'Harbolnas 12.12! Pasang anggaran belanja dulu sebelum checkout 🍋\nLihat bar anggarannya terisi sambil belanja.\ndaily.limonlay.com\n#harbolnas #1212 #hematuang #catatankeuangan' },
    { date: '2026-12-08', name: '12.12 (เวียดนาม)', where: 'FB groups · Threads', lang: 'vi',
      text: 'Săn sale 12.12? Đặt ngân sách mua sắm trước khi chốt đơn 🍋\nNhìn thanh ngân sách đầy dần trong lúc mua.\ndaily.limonlay.com\n#sale1212 #tietkiem #quanlychitieu' },
    { date: '2026-12-08', name: '12.12 (อังกฤษ: ฟิลิปปินส์ / มาเลเซีย)', where: 'FB groups · X', lang: 'en',
      text: '12.12 sale is coming. Set a shopping budget before the cart fills up. 🍋\nWatch the bar while you check out. No guilt, just numbers.\ndaily.limonlay.com\n#1212sale #budgeting #ipon #moneytips' },
    { date: '2026-12-10', name: '冬のボーナス (ญี่ปุ่น)', where: 'X · TikTok · IG · LINE VOOM', lang: 'ja',
      text: '冬のボーナス、使い道は決めた？🍋\n「貯める」「使う」「投資」をDailyで記録。投資は支出と分けて管理できる。\ndaily.limonlay.com\n#冬のボーナス #ボーナス #家計簿 #貯金 #投資' },
    { date: '2026-12-22', name: 'สรุปทั้งปี (ไทย)', where: 'ทุกช่อง', lang: 'th',
      text: 'ปีนี้เงินไปไหนบ้าง? กด "ปี" ดูทั้งปีในหน้าเดียว 🍋\nหมวดไหนใช้มากสุด เดือนไหนเหลือมากสุด เห็นหมด\ndaily.limonlay.com\n#สรุปปี #วางแผนการเงิน #ปีใหม่ #ออมเงิน' },
    { date: '2026-12-22', name: 'Year in review (อังกฤษ)', where: 'ทุกช่อง', lang: 'en',
      text: 'Where did your money go this year? Tap "Year" and see all 12 months on one screen. 🍋\ndaily.limonlay.com\n#yearinreview #budgeting #newyear #moneytips' },
    { date: '2026-12-22', name: '年末の振り返り (ญี่ปุ่น)', where: 'ทุกช่อง', lang: 'ja',
      text: '今年、お金はどこへ？「年」をタップすれば12か月がひと目で🍋\n来年の家計簿は今日から。\ndaily.limonlay.com\n#家計簿 #年末 #2027年 #家計見直し' },
    { date: '2027-01-01', name: 'ปีใหม่ (ไทย)', where: 'ทุกช่อง + LINE บรอดแคสต์', lang: 'th',
      text: 'ปีใหม่ เริ่มจดตั้งแต่วันแรก 🍋\nตั้งงบ 3 หมวดที่ใช้บ่อย + ใส่รายการประจำ (ค่าห้อง ค่าเน็ต) ใช้เวลา 2 นาที\ndaily.limonlay.com\n#ปีใหม่ #เป้าหมายปีใหม่ #ออมเงิน #จดรายรับรายจ่าย' },
    { date: '2027-01-01', name: 'New year (อังกฤษ)', where: 'ทุกช่อง', lang: 'en',
      text: 'New year, first entry. 🍋\nSet budgets for your top 3 categories and add your recurring bills. It takes about 2 minutes.\ndaily.limonlay.com\n#newyearresolution #budgeting #2027goals #savingmoney' },
    { date: '2027-01-01', name: '元日 (ญี่ปุ่น)', where: 'ทุกช่อง + LINE', lang: 'ja',
      text: '2027年の家計簿、元日からスタート🍋\nよく使う3カテゴリに予算を設定、家賃やスマホ代は定期取引に。2分で準備完了。\ndaily.limonlay.com\n#家計簿 #2027年 #今年の目標 #節約' },
  ],

  // one intro per language (YouTube Shorts title + description, FB groups, any platform in that language)
  intro: {
    th: { hook: 'เงินหายไปไหนทุกเดือน?', text: 'Daily จดรายรับรายจ่ายได้ในไม่กี่วินาที ถ่ายบิลแล้ว AI กรอกให้ ถาม AI ได้ว่าใช้เงินไปกับอะไร ไม่มีโฆษณา', cta: 'ไม่ต้องโหลดแอป เปิดได้เลยที่ daily.limonlay.com', tags: '#จดรายรับรายจ่าย #แอปจดเงิน #ออมเงิน #วางแผนการเงิน' },
    en: { hook: 'Where does your money go every month?', text: 'Daily logs income and expenses in seconds. Snap a receipt and AI fills it in; ask AI where your money went. No ads.', cta: 'No download needed: daily.limonlay.com', tags: '#budgeting #expensetracker #moneytips #personalfinance' },
    ja: { hook: '毎月、お金はどこに消えてる？', text: 'Dailyは数秒で記録できる家計簿。レシートを撮ればAIが入力、使い道もAIに聞ける。広告なし。', cta: 'ダウンロード不要 daily.limonlay.com', tags: '#家計簿 #家計簿アプリ #節約 #貯金' },
    ko: { hook: '매달 돈이 어디로 사라질까?', text: 'Daily는 몇 초 만에 수입과 지출을 기록하는 가계부예요. 영수증을 찍으면 AI가 입력하고, 어디에 썼는지 AI에게 물어볼 수 있어요. 광고 없음.', cta: '설치 없이 바로 daily.limonlay.com', tags: '#가계부 #가계부앱 #절약 #짠테크' },
    'zh-CN': { hook: '每个月的钱都去哪儿了？', text: 'Daily 几秒就能记一笔收支。拍下小票，AI 帮你填好；还能问 AI 钱都花在哪了。无广告。', cta: '无需下载 daily.limonlay.com', tags: '#记账 #记账app #省钱 #存钱' },
    'zh-TW': { hook: '每個月的錢都去哪了？', text: 'Daily 幾秒就能記一筆收支。拍下收據，AI 幫你填好；還能問 AI 錢都花在哪。沒有廣告。', cta: '免下載 daily.limonlay.com', tags: '#記帳 #記帳app #省錢 #存錢' },
    vi: { hook: 'Mỗi tháng tiền đi đâu hết?', text: 'Daily ghi thu chi chỉ trong vài giây. Chụp hóa đơn là AI điền giúp, hỏi AI xem bạn đã tiêu vào đâu. Không quảng cáo.', cta: 'Không cần tải app: daily.limonlay.com', tags: '#quanlychitieu #tietkiem #taichinhcanhan' },
    id: { hook: 'Tiap bulan uangnya ke mana?', text: 'Daily mencatat pemasukan dan pengeluaran dalam hitungan detik. Foto struk, AI yang isi; tanya AI uangmu habis ke mana. Tanpa iklan.', cta: 'Tanpa unduh aplikasi: daily.limonlay.com', tags: '#catatankeuangan #keuanganpribadi #hematuang' },
    ms: { hook: 'Setiap bulan duit pergi ke mana?', text: 'Daily merekod pendapatan dan perbelanjaan dalam beberapa saat. Ambil gambar resit, AI isikan; tanya AI duit anda habis ke mana. Tiada iklan.', cta: 'Tak perlu muat turun: daily.limonlay.com', tags: '#kewanganperibadi #simpanduit #bajet' },
    es: { hook: '¿A dónde se va tu dinero cada mes?', text: 'Daily registra ingresos y gastos en segundos. Toma foto del ticket y la IA lo completa; pregúntale a la IA en qué gastaste. Sin anuncios.', cta: 'Sin descargar nada: daily.limonlay.com', tags: '#finanzaspersonales #ahorro #presupuesto' },
    pt: { hook: 'Pra onde vai seu dinheiro todo mês?', text: 'O Daily registra receitas e despesas em segundos. Tire foto do recibo e a IA preenche; pergunte à IA onde você gastou. Sem anúncios.', cta: 'Sem precisar baixar: daily.limonlay.com', tags: '#financaspessoais #controlefinanceiro #economizar' },
    fr: { hook: 'Où passe votre argent chaque mois ?', text: 'Daily enregistre revenus et dépenses en quelques secondes. Prenez le ticket en photo, l’IA remplit tout ; demandez à l’IA où part votre argent. Sans pub.', cta: 'Rien à installer : daily.limonlay.com', tags: '#budget #financespersonnelles #economies' },
    de: { hook: 'Wohin verschwindet dein Geld jeden Monat?', text: 'Daily erfasst Einnahmen und Ausgaben in Sekunden. Beleg fotografieren, die KI füllt alles aus; frag die KI, wofür dein Geld draufgeht. Ohne Werbung.', cta: 'Kein Download nötig: daily.limonlay.com', tags: '#haushaltsbuch #finanzen #sparen' },
    it: { hook: 'Dove finiscono i tuoi soldi ogni mese?', text: 'Daily registra entrate e uscite in pochi secondi. Fotografa lo scontrino e l’IA compila tutto; chiedi all’IA dove hai speso. Senza pubblicità.', cta: 'Niente da scaricare: daily.limonlay.com', tags: '#finanzapersonale #risparmio #budget' },
    nl: { hook: 'Waar blijft je geld elke maand?', text: 'Daily legt inkomsten en uitgaven in een paar seconden vast. Maak een foto van je bon en de AI vult het in; vraag de AI waar je geld naartoe ging. Geen advertenties.', cta: 'Niets te downloaden: daily.limonlay.com', tags: '#huishoudboekje #besparen #budgetteren' },
    pl: { hook: 'Gdzie co miesiąc znikają Twoje pieniądze?', text: 'Daily zapisuje przychody i wydatki w kilka sekund. Zrób zdjęcie paragonu, a AI wszystko uzupełni; zapytaj AI, na co wydajesz. Bez reklam.', cta: 'Bez pobierania: daily.limonlay.com', tags: '#budzetdomowy #oszczedzanie #finanseosobiste' },
    tr: { hook: 'Paran her ay nereye gidiyor?', text: 'Daily gelir ve giderlerini saniyeler içinde kaydeder. Fişin fotoğrafını çek, yapay zekâ doldursun; paranı nereye harcadığını yapay zekâya sor. Reklamsız.', cta: 'İndirmeye gerek yok: daily.limonlay.com', tags: '#bütçe #birikim #kişiselfinans' },
    ru: { hook: 'Куда каждый месяц уходят деньги?', text: 'Daily записывает доходы и расходы за пару секунд. Сфотографируйте чек, и ИИ всё заполнит; спросите ИИ, на что ушли деньги. Без рекламы.', cta: 'Ничего не нужно скачивать: daily.limonlay.com', tags: '#учетрасходов #личныефинансы #экономия' },
  },

  platforms: [
    // ---------------- Tier 1: start this week ----------------
    {
      id: 'tiktok', name: 'TikTok', tier: 1, langs: 'ไทย (หลัก) · ญี่ปุ่น (บัญชีที่ 2) · อังกฤษ (ทีหลัง)',
      why: 'ที่ที่คนอายุ 18–30 หาวิธีจัดการเงิน คลิปเดียวไปได้ไกลโดยไม่ต้องมีผู้ติดตาม',
      setup: [
        'สมัครเป็นบัญชี Business (หมวด "Apps" หรือ "Finance") แล้วตั้งชื่อ @daily.limonlay · ญี่ปุ่นแยกบัญชี @daily.limonlay.jp (TikTok แจกคลิปตามประเทศและภาษา ผสมกันแล้วคนดูงง)',
        'รูปโปรไฟล์: avatar-1080.png · ชื่อที่โชว์: "Daily 🍋 จดรายรับรายจ่าย" / "Daily 🍋 家計簿"',
        'ใส่ลิงก์ daily.limonlay.com ในโปรไฟล์ ถ้ายังใส่ไม่ได้ (บางประเทศต้องมีผู้ติดตามก่อน) ให้พิมพ์ชื่อเว็บไว้ในไบโอแทน',
      ],
      bio: [
        { lang: 'th', limit: 80, text: 'จดเงินในไม่กี่วินาที 🍋 ถ่ายบิลให้ AI กรอก · ไม่มีโฆษณา · ไม่ต้องโหลดแอป' },
        { lang: 'ja', limit: 80, text: '数秒で記録できる家計簿🍋 レシートはAIが入力・広告なし・ダウンロード不要' },
        { lang: 'en', limit: 80, text: 'Log money in seconds 🍋 Snap a receipt, AI fills it in · No ads · No download' },
      ],
      specs: ['9:16 · 1080×1920 · 15–30 วิ', 'ข้อความอยู่ในช่วง y 170–1500 และห่างขอบขวา (ปุ่มของ TikTok บัง)', 'ใส่เพลงในแอป TikTok เอง (ไฟล์เราเงียบ) หรือใช้ payday-ui-sfx.mp4 ที่มีเสียงทำเอง'],
      rhythm: '3–5 คลิป/สัปดาห์ · ไทย 19:00–21:00 · ญี่ปุ่น 20:00–22:00 (เวลาท้องถิ่น)',
      tips: ['ฮุคต้องอยู่ในเฟรมแรก คลิปเราทำแบบนี้อยู่แล้ว', 'ปักหมุด 3 คลิปที่ดีที่สุด (เริ่มจาก P2 click-30)', 'ตอบคอมเมนต์ด้วยคลิปสั้น (Reply with video) คือคอนเทนต์ฟรีที่ดีที่สุด', 'โพสต์ไฟล์ต้นฉบับไปที่อื่น อย่าโหลดจาก TikTok ที่มีลายน้ำ'],
      posts: 'ใช้ P1–P10 + ตามเทศกาล (ดูหัวข้อ "คอนเทนต์")',
      images: ['avatar-1080.png'],
    },
    {
      id: 'instagram', name: 'Instagram (Reels · Carousel · Stories)', tier: 1, langs: 'ไทย (หลัก) · ญี่ปุ่น (บัญชีที่ 2)',
      why: 'คนเซฟ carousel เก็บไว้อ่าน · Reels ใช้คลิปเดียวกับ TikTok · Threads ผูกกับบัญชีนี้',
      setup: [
        'Professional account → Creator หรือ Business หมวด "App page" · @daily.limonlay และ @daily.limonlay.jp',
        'ลิงก์ในไบโอ: daily.limonlay.com · Highlights 4 อัน: วิธีใช้ · สแกนบิล · AI · 18 ภาษา (ปกเป็นสีกรมท่า + มะนาว)',
      ],
      bio: [
        { lang: 'th', limit: 150, text: 'Daily 🍋 แอปจดรายรับรายจ่าย\nถ่ายบิล → AI กรอกให้ · ถาม AI ได้ว่าเงินไปไหน\nไม่มีโฆษณา · 18 ภาษา · ไม่ต้องโหลดแอป\n👇 เปิดใช้ได้เลย' },
        { lang: 'ja', limit: 150, text: 'Daily 🍋 数秒で記録できる家計簿\nレシートを撮ればAIが入力・使い道はAIに質問\n広告なし・18言語・ダウンロード不要\n👇 ブラウザですぐ使える' },
        { lang: 'en', limit: 150, text: 'Daily 🍋 income & expense tracker\nSnap a receipt → AI fills it in · Ask AI where it went\nNo ads · 18 languages · No download\n👇 Open it now' },
      ],
      specs: ['Reels 9:16 1080×1920 (ไฟล์เดียวกับ TikTok)', 'Carousel 4:5 1080×1350 สูงสุด 20 รูป', 'Story 9:16 1080×1920 · ส่วนบน 250px และล่าง 300px ถูก UI บัง'],
      rhythm: 'Reels 3/สัปดาห์ (คลิปเดียวกับ TikTok) · Carousel 1/สัปดาห์ · Story 2–3/สัปดาห์',
      tips: ['Carousel ชุดแรก: carousel-th-1…5 (ภาษาไทย) / carousel-ja-1…5', 'Story: วาง Link sticker ทับป้ายลิงก์สีมะนาวในรูป', 'แคปชัน carousel ใช้ข้อความด้านล่าง'],
      posts: [
        { title: 'Carousel "จดเงินแบบไม่ต้องพยายาม"', lang: 'th', img: 'carousel-th-1-1080x1350.png', text: 'จดเงินแบบไม่ต้องพยายาม 🍋 ปัดดู 4 อย่างที่ทำให้จดได้ทุกวัน\n📷 ถ่ายบิล AI กรอกให้\n⌨️ พิมพ์ประโยคเดียว จดได้หลายรายการ\n💬 ถาม AI ว่าเดือนนี้ค่ากินเท่าไร\n📱 ไม่ต้องโหลดแอป\nเซฟไว้ แล้วลองที่ daily.limonlay.com (ลิงก์ในโปรไฟล์)\n#จดรายรับรายจ่าย #ออมเงิน #วางแผนการเงิน #แอปจดเงิน #ไลฟ์แฮ็ก' },
        { title: 'Carousel "がんばらない家計簿"', lang: 'ja', img: 'carousel-ja-1-1080x1350.png', text: 'がんばらない家計簿🍋 毎日続く4つのしくみ\n📷 レシートを撮ればAIが入力\n⌨️ 一文でまとめて記録\n💬「今月の食費は？」とAIに聞ける\n📱 ダウンロード不要\n保存して、daily.limonlay.com で試してみてください（プロフィールのリンク）\n#家計簿 #家計簿アプリ #節約 #貯金 #ズボラ家計簿' },
        { title: 'Carousel "Track money without trying"', lang: 'en', img: 'carousel-en-1-1080x1350.png', text: 'Track money without trying. 🍋 Swipe for the 4 things that make it stick:\n📷 Snap a receipt, AI fills it in\n⌨️ Type one sentence, log the whole day\n💬 Ask AI what you spent on food\n📱 No download needed\nSave this, then try it at daily.limonlay.com (link in bio)\n#budgeting #moneytips #expensetracker #personalfinance' },
      ],
      images: ['carousel-th-1-1080x1350.png', 'carousel-ja-1-1080x1350.png', 'carousel-en-1-1080x1350.png', 'story-th-1080x1920.png', 'story-ja-1080x1920.png', 'story-en-1080x1920.png'],
    },
    {
      id: 'youtube', name: 'YouTube (Shorts + ช่อง)', tier: 1, langs: 'ช่องเดียว ทุกภาษา (แปลชื่อคลิปได้)',
      why: 'Shorts ค้นเจอใน Google และอยู่ได้นานกว่า TikTok · ตั้งชื่อ/คำอธิบายได้ 18 ภาษาในคลิปเดียว',
      setup: [
        'สร้างช่อง "Daily · limonlay" handle @dailylimonlay · รูป avatar-1080.png · แบนเนอร์ youtube-banner-2560x1440.png',
        'ทุกคลิป: Subtitles → Add language → ใส่ชื่อและคำอธิบายแปลตาม "แนะนำ 18 ภาษา" (คนแต่ละประเทศเห็นชื่อเป็นภาษาตัวเอง)',
        'ทำ Playlist: "Daily ภาษาไทย", "Daily 日本語", "Daily in English"',
      ],
      bio: [
        { lang: 'en', limit: 1000, text: 'Daily is an income and expense tracker that runs in your browser and installs to your home screen. Snap a receipt and AI fills it in, type a whole day in one sentence, or ask AI where your money went. 18 languages, any currency, no ads.\n\nDaily จดรายรับรายจ่ายได้ในไม่กี่วินาที ถ่ายบิลแล้ว AI กรอกให้ ไม่มีโฆษณา ไม่ต้องโหลดแอป\nDailyは数秒で記録できる家計簿。レシートを撮ればAIが入力。広告なし・ダウンロード不要。\n\n→ https://daily.limonlay.com\nMade by limonlay.' },
      ],
      specs: ['Shorts 9:16 ≤ 60 วิ (ใช้ไฟล์ 9:16 เดิม)', 'วิดีโอปกติ 16:9: platforms/out/video/*-16x9.mp4', 'แบนเนอร์ 2560×1440 ของสำคัญอยู่ตรงกลาง 1546×423'],
      rhythm: 'Shorts ทุกคลิปที่ลง TikTok (ลงหลัง TikTok 1 วัน) · 16:9 เดือนละ 1 คลิป',
      tips: ['ชื่อคลิป = ฮุคของภาษานั้น + " · Daily" เช่น "เงินหายไปไหนทุกเดือน? · Daily"', 'ปักคอมเมนต์แรกเป็นลิงก์ daily.limonlay.com', 'คลิปสอนใช้ 60–90 วิ (ไทย/อังกฤษ/ญี่ปุ่น) ทีหลังเมื่อมีคนถามซ้ำ'],
      posts: 'ชื่อ + คำอธิบาย: ใช้ "แนะนำ 18 ภาษา" (ฮุค = ชื่อ · ข้อความ + ลิงก์ + แท็ก = คำอธิบาย)',
      images: ['youtube-banner-2560x1440.png', 'avatar-1080.png'],
    },
    {
      id: 'facebook', name: 'Facebook Page + Reels', tier: 1, langs: 'ไทย (เพจ) · กลุ่มในหลายประเทศ (ดู Tier 3)',
      why: 'คนไทยวัยทำงานยังอยู่บน Facebook มาก · Reels ใช้คลิปเดิม · เพจเป็นที่ให้คนมาถามและรีวิว',
      setup: [
        'สร้างเพจ "Daily" หมวด "App page" · ชื่อผู้ใช้ @dailylimonlay · ปก facebook-cover-th-1640x624.png · รูป avatar-1080.png',
        'ปุ่มบนเพจ: "Use app" (ใช้แอป) → https://daily.limonlay.com',
        'ผูกเพจกับ Instagram ใน Meta Business Suite เพื่อโพสต์ Reels พร้อมกัน',
      ],
      bio: [{ lang: 'th', limit: 101, text: 'แอปจดรายรับรายจ่าย ถ่ายบิลแล้ว AI กรอกให้ ไม่มีโฆษณา ไม่ต้องโหลดแอป ใช้ได้ 18 ภาษา' }],
      specs: ['ปก 1640×624 (มือถือครอปด้านข้าง ของสำคัญอยู่ตรงกลาง)', 'Reels 9:16 · โพสต์ฟีด 1:1 หรือ 4:5'],
      rhythm: 'Reels พร้อม IG (Business Suite) · โพสต์รูป 1/สัปดาห์ (square-th / carousel-th)',
      tips: ['ตอบทุกข้อความใน Messenger ภายในวัน (ใช้ FAQ)', 'เปิดรีวิวของเพจ แต่ไม่ขอรีวิวแลกของ'],
      posts: 'ใช้ P1–P10 ภาษาไทย',
      images: ['facebook-cover-th-1640x624.png', 'facebook-cover-en-1640x624.png', 'square-th-1080.png'],
    },
    {
      id: 'threads', name: 'Threads', tier: 1, langs: 'ไทย · อังกฤษ · จีนตัวเต็ม (ไต้หวันใช้ Threads มาก)',
      why: 'คุยเป็นข้อความ เล่าเบื้องหลังการทำแอปคนเดียวได้ ไทยและไต้หวันใช้เยอะ',
      setup: ['ใช้บัญชีเดียวกับ Instagram @daily.limonlay · ไบโอเหมือน IG'],
      specs: ['ข้อความ ≤ 500 ตัวอักษร + รูป/คลิปได้'],
      rhythm: '3–5 โพสต์/สัปดาห์ · ตอบโพสต์ที่ถามหาแอปจดเงิน (บอกว่าเราเป็นคนทำ)',
      tips: ['ถามคำถามปลายเปิด คนตอบเยอะกว่าโพสต์ขาย', 'เล่าเรื่องจริง: ฟีเจอร์ที่เพิ่งทำ คำติชมที่ได้ สิ่งที่ตัดออก'],
      posts: [
        { title: 'ถามคนอ่าน', lang: 'th', text: 'ทำแอปจดรายรับรายจ่ายคนเดียวมาหลายเดือน ตอนนี้ใช้ได้ 18 ภาษาแล้ว 🍋\nอยากรู้ว่าทุกคนจดเงินยังไง จดในแอป จดในโน้ต ใช้ Excel หรือไม่จดเลย?' },
        { title: 'เล่าเบื้องหลัง', lang: 'th', text: 'สิ่งที่ตั้งใจไม่ใส่ในแอปจดเงิน: โฆษณา การขายข้อมูล และ streak ที่ทำให้รู้สึกผิดเวลาลืมจด\nสิ่งที่ใส่: ถ่ายบิลให้ AI กรอก ถาม AI ได้ ล็อกแอปด้วย Face ID 🍋\ndaily.limonlay.com' },
        { title: 'Ask', lang: 'en', text: 'I have been building a money app on my own for months. It now speaks 18 languages. 🍋\nHonest question: how do you track spending? An app, a note, a spreadsheet, or not at all?' },
        { title: '提問', lang: 'zh-TW', text: '一個人做了一款記帳 App，現在支援 18 種語言了 🍋\n想問大家平常怎麼記帳？用 App、記事本、Excel，還是乾脆不記？' },
      ],
      images: ['square-th-1080.png', 'square-zh-TW-1080.png'],
    },
    {
      id: 'line', name: 'LINE Official Account + VOOM', tier: 1, langs: 'ไทย · ญี่ปุ่น (แยกบัญชีตามประเทศ)',
      why: 'คนไทยและญี่ปุ่นใช้ LINE ทุกวัน · ผู้ติดตาม OA ได้ข่าวโดยตรง · ต่อไปใช้ OA เดียวกันทำบอทจดเงินผ่าน LINE ได้ (docs/LINE_BOT_BRIEF.md ในแอป)',
      setup: [
        'สร้าง LINE OA ที่ manager.line.biz ชื่อ "Daily" รูป avatar-1080.png ปก line-cover-th-1080x878.png (ญี่ปุ่นสร้างอีกบัญชีในประเทศญี่ปุ่น)',
        'ข้อความสถานะ: ไทย "จดเงินในไม่กี่วินาที" · ญี่ปุ่น "数秒で記録できる家計簿"',
        'Rich menu แบบ Compact 2500×843 แบ่ง 3 ช่อง: เปิด Daily → https://daily.limonlay.com · คู่มือ → https://daily.limonlay.com/docs · ความปลอดภัย → https://daily.limonlay.com/security',
        'แพ็กเกจฟรีส่งข้อความได้จำกัดต่อเดือน: บรอดแคสต์เดือนละ 1–2 ครั้งพอ · ห้ามเปลี่ยนเป็นแพ็กเกจเสียเงินเอง',
      ],
      bio: [
        { lang: 'th', limit: 500, label: 'ข้อความทักทาย', text: 'สวัสดี {Nickname} 🍋 ขอบคุณที่เพิ่ม Daily เป็นเพื่อน\nDaily จดรายรับรายจ่ายได้ในไม่กี่วินาที ถ่ายบิลแล้ว AI กรอกให้ ไม่มีโฆษณา\nเปิดใช้ได้เลยจากเมนูด้านล่าง ไม่ต้องโหลดแอป\nเราจะส่งเคล็ดลับการจดเงินเดือนละ 1–2 ครั้งเท่านั้น' },
        { lang: 'ja', limit: 500, label: 'あいさつメッセージ', text: '{Nickname}さん、友だち追加ありがとうございます🍋\nDailyは数秒で記録できる家計簿。レシートを撮ればAIが入力、広告もありません。\n下のメニューからすぐ使えます（ダウンロード不要）。\nお知らせは月1〜2回だけお送りします。' },
      ],
      specs: ['Rich menu 2500×843 · ปก 1080×878', 'VOOM: ลงคลิป 9:16 เดียวกับ TikTok'],
      rhythm: 'VOOM 2–3 คลิป/สัปดาห์ · บรอดแคสต์ 1–2 ครั้ง/เดือน (วันเงินเดือนออก / ปีใหม่)',
      tips: ['ใส่ QR เพิ่มเพื่อน LINE ไว้ในหน้า "เกี่ยวกับ" ของ Daily ได้ทีหลัง (งานฝั่งแอป ต้องผ่าน Planner)'],
      posts: [
        { title: 'บรอดแคสต์ปีใหม่', lang: 'th', text: 'สวัสดีปีใหม่ 🍋 เริ่มปีด้วยการตั้งงบ 3 หมวดที่ใช้บ่อย ใช้เวลา 1 นาที\nเปิด Daily → เมนู → งบประมาณ\nhttps://daily.limonlay.com' },
        { title: 'お正月の配信', lang: 'ja', text: 'あけましておめでとうございます🍋 今年の家計簿は、よく使う3カテゴリの予算設定から（1分で完了）。\nDaily → メニュー → 予算\nhttps://daily.limonlay.com' },
      ],
      images: ['line-richmenu-th-2500x843.png', 'line-richmenu-ja-2500x843.png', 'line-cover-th-1080x878.png', 'line-cover-ja-1080x878.png'],
    },
    {
      id: 'lemon8', name: 'Lemon8', tier: 1, langs: 'ไทย · ญี่ปุ่น',
      why: 'โพสต์แบบรูปหลายภาพ + บทความสั้น สายไลฟ์สไตล์และเก็บเงิน ชื่อเข้ากับมะนาวของเราพอดี',
      setup: ['@daily.limonlay (ไทย) · @daily.limonlay.jp · ไบโอใช้แบบ Instagram'],
      specs: ['รูป 3:4 1080×1440 · หัวข้อสั้นบนรูปปก · ข้อความยาวได้'],
      rhythm: '1–2 โพสต์/สัปดาห์ (ใช้รูป carousel เดิมได้)',
      tips: ['หัวข้อเป็นประโยชน์ก่อน แอปทีหลัง เช่น "วิธีจดเงินให้ได้ทุกวัน" แล้วค่อยบอกว่าใช้ Daily'],
      posts: [
        { title: 'ปก "แอปจดเงินที่ไม่มีโฆษณา"', lang: 'th', img: 'lemon8-th-1080x1440.png', text: 'แอปจดเงินที่ไม่มีโฆษณา 🍋 (เราเป็นคนทำเอง)\nทำไมจดเงินไม่เคยรอด? ส่วนใหญ่เพราะ "ขี้เกียจกรอก"\nเลยทำให้ Daily กรอกให้แทน:\n• ถ่ายบิล AI อ่านร้าน ยอด วันที่ แล้วเดาหมวดให้\n• พิมพ์ "กาแฟ 65 ข้าวมันไก่ 120" ได้ 2 รายการทันที\n• ตั้งงบรายหมวด เกินเมื่อไรรู้เลย\n• ไม่ต้องโหลดแอป เปิด daily.limonlay.com แล้วเพิ่มไปหน้าจอโฮม\n#จดรายรับรายจ่าย #เก็บเงิน #แอปจดเงิน #มนุษย์เงินเดือน' },
        { title: '表紙「家計簿が続かない人へ」', lang: 'ja', img: 'lemon8-ja-1080x1440.png', text: '家計簿が続かない人へ🍋（作った本人です）\n続かない理由は、たぶん「入力が面倒」。\nだからDailyは入力をAIに任せました：\n• レシートを撮ると、お店・金額・日付を読み取り\n• 「コーヒー 450 ランチ 1200」で2件まとめて記録\n• カテゴリ別の予算で使いすぎにすぐ気づける\n• ダウンロード不要。daily.limonlay.com をホーム画面に追加\n#家計簿 #ズボラ家計簿 #節約 #貯金 #家計簿アプリ' },
      ],
      images: ['lemon8-th-1080x1440.png', 'lemon8-ja-1080x1440.png'],
    },
    {
      id: 'x', name: 'X (Twitter)', tier: 1, langs: 'ญี่ปุ่น (หลัก ญี่ปุ่นใช้ X มาก) · อังกฤษ (build in public)',
      why: 'ญี่ปุ่นคุยเรื่องแอปและ 個人開発 บน X มาก · ภาษาอังกฤษใช้เล่าเบื้องหลังให้ dev/indie สนใจ',
      setup: ['@dailylimonlayjp (ญี่ปุ่น) · @dailylimonlay (อังกฤษ) · รูป avatar-1080.png · หัว x-header-ja / x-header-en'],
      bio: [
        { lang: 'ja', limit: 160, text: '数秒で記録できる家計簿Webアプリ「Daily」公式🍋 レシートはAIが入力、使い道はAIに質問。広告なし・18言語・ダウンロード不要。個人開発 by limonlay' },
        { lang: 'en', limit: 160, text: 'Daily 🍋 log money in seconds. Snap receipts, ask AI where it went. No ads, 18 languages, no app store. Built in public by limonlay.' },
      ],
      specs: ['รูป 16:9 หรือ 1:1 · วิดีโอ 16:9 / 1:1 จาก platforms/out/video', 'หัวโปรไฟล์ 1500×500 (รูปโปรไฟล์บังมุมซ้ายล่าง)'],
      rhythm: 'ญี่ปุ่น 1 โพสต์/วันทำงาน · อังกฤษ 3/สัปดาห์',
      tips: ['ญี่ปุ่น: ใช้แท็ก #個人開発 #家計簿 และตอบคนที่บ่นว่า 家計簿 続かない', 'อังกฤษ: โพสต์ตัวเลขจริง (ผู้ใช้ใหม่ ฟีเจอร์ที่ปล่อย) พร้อม #buildinpublic'],
      posts: [
        { title: '続かない理由', lang: 'ja', text: '家計簿が続かない理由No.1は「入力が面倒」だと思う。\nなのでDailyはレシートを撮るだけでAIが入力する仕組みにしました🍋\nダウンロード不要、ブラウザからすぐ使えます。\ndaily.limonlay.com\n#家計簿 #個人開発' },
        { title: '18言語', lang: 'ja', text: '個人開発の家計簿Webアプリ「Daily」、18言語に対応しました🍋\n旅行先の通貨でそのまま記録して、メイン通貨に換算できます。\n#個人開発 #家計簿 #海外旅行' },
        { title: 'AIに質問', lang: 'ja', text: '「今月の食費いくら？」ってAIに聞けるようにした。\n自分の記録だけを見て答えるので、表計算いらず🍋\nAIが勝手にデータを変えることはありません。\n#家計簿 #個人開発 #AI' },
        { title: 'Shipped', lang: 'en', text: 'Shipped: Daily now speaks 18 languages and converts any currency to your main one. 🍋\nVanilla JS PWA, no framework, CSP script-src \'self\', no ad trackers.\ndaily.limonlay.com\n#buildinpublic #indiehackers' },
        { title: 'Refused to add', lang: 'en', text: 'Things I refused to add to my money app: ads, ad trackers, selling data, streaks that guilt you.\nThings I did add: receipt scan, AI you can ask, app lock with Face ID. 🍋\n#buildinpublic' },
      ],
      images: ['x-header-ja-1500x500.png', 'x-header-en-1500x500.png'],
    },

    // ---------------- Tier 2: launch moments (English) ----------------
    {
      id: 'producthunt', name: 'Product Hunt', tier: 2, langs: 'อังกฤษ',
      why: 'วันเดียวได้คนลองหลักพันจากทั่วโลก + ลิงก์กลับที่ช่วย SEO',
      setup: [
        'สมัครบัญชีผู้ทำ (maker) ล่วงหน้า 1–2 สัปดาห์ แล้วเข้าไปคอมเมนต์โปรดักต์อื่นจริงๆ บ้าง',
        'วันเปิดตัวแนะนำ: อังคาร 19 ม.ค. 2027 (หรืออังคาร–พฤหัสใดก็ได้ที่ไม่ใช่วันหยุดสหรัฐ) เริ่ม 00:01 เวลาแปซิฟิก = 15:01 เวลาไทย',
        'ถ้าแพ็กเกจเสียเงิน (T-26 Paddle live) พร้อมแล้ว เปิดตัวพร้อมกันได้ ถ้ายังไม่พร้อมก็เปิดได้ บอกตรงๆ ว่าช่วงนี้ทุกฟีเจอร์เปิดให้ลอง',
      ],
      bio: [
        { lang: 'en', limit: 60, label: 'Tagline', text: 'Log money in seconds: snap receipts, ask AI, 18 languages' },
        { lang: 'en', limit: 260, label: 'Description', text: 'Daily is an income and expense tracker that runs in your browser and installs to your home screen. Snap a receipt and AI fills in the entry, type a whole day in one sentence, or ask AI where your money went. No ads, 18 languages, any currency.' },
      ],
      specs: ['Thumbnail 240×240', 'Gallery 1270×760 (5 รูปในชุดนี้) + วิดีโอ 16:9 (click30-en-16x9.mp4 อัปขึ้น YouTube แล้วใส่ลิงก์)', 'Topics: Personal Finance · Productivity · Artificial Intelligence'],
      rhythm: 'ครั้งเดียว + ตอบทุกคอมเมนต์ทั้งวัน (เตรียมเวลา 15:00–03:00 เวลาไทย)',
      tips: ['ห้ามขอโหวต ให้ชวน "ลองแล้วบอกความเห็น" แทน (กฎ Product Hunt)', 'แชร์ลิงก์ใน X / Threads / LinkedIn / Indie Hackers ตอนเช้าสหรัฐ'],
      posts: [
        { title: 'First comment (maker)', lang: 'en', text: 'Hi Product Hunt! I am the maker of Daily 🍋\n\nI kept quitting money apps because logging felt like homework, and many were full of ads. So I built the one I wanted:\n\n• Snap a receipt: AI reads the shop, total and date, then suggests a category\n• Type "coffee 4.50 lunch 12" and it becomes two entries\n• Ask "how much did I spend on food this month?" and get an answer from your own entries (AI never changes your data on its own)\n• Budgets, recurring items, any currency incl. crypto, CSV / Excel import and CSV export\n• 18 languages, app lock with PIN or Face ID, passkeys, no ads, no data selling\n\nIt is a PWA, so there is no app store: open daily.limonlay.com on your phone and add it to your home screen.\n\nRight now every feature is open while we test, and logging and charts stay unlimited on every plan. I would love blunt feedback, especially on your first 60 seconds. What would make you keep logging after week one?' },
      ],
      images: ['producthunt-thumb-240.png', 'producthunt-gallery-1-1270x760.png', 'producthunt-gallery-2-1270x760.png', 'producthunt-gallery-3-1270x760.png', 'producthunt-gallery-4-1270x760.png', 'producthunt-gallery-5-1270x760.png'],
    },
    {
      id: 'hackernews', name: 'Hacker News (Show HN)', tier: 2, langs: 'อังกฤษ',
      why: 'คนสาย dev สนใจ PWA ที่ไม่ใช้ framework, CSP เข้ม และไม่มีตัวติดตาม ได้คำติชมเชิงเทคนิคดีมาก',
      setup: ['โพสต์วันธรรมดา 7–9 โมงเช้าเวลาสหรัฐฝั่งตะวันออก (19:00–21:00 ไทย) · คนละวันกับ Product Hunt', 'ใส่ URL https://daily.limonlay.com แล้วคอมเมนต์แรกทันที'],
      bio: [{ lang: 'en', limit: 80, label: 'Title', text: 'Show HN: Daily – a money tracker PWA with receipt scan, 18 languages, no ads' }],
      specs: ['ไม่มีรูป ข้อความล้วน'],
      rhythm: 'ครั้งเดียว · ตอบทุกคอมเมนต์ช่วง 3 ชั่วโมงแรก',
      tips: ['ไม่ใช้ภาษาขายของ HN ชอบเรื่องเทคนิคและข้อจำกัดที่บอกตรงๆ', 'บอกตั้งแต่ต้นว่าต้องสมัครบัญชี (อีเมลหรือ Google) เพราะข้อมูลซิงก์ข้ามเครื่อง', 'ไม่ลงรายละเอียดช่องโหว่หรือการตั้งค่าความปลอดภัยภายใน'],
      posts: [
        { title: 'First comment', lang: 'en', text: 'Maker here. I built Daily because I kept giving up on money apps: logging felt like homework and many were full of ads.\n\nWhat it does: snap a receipt and AI reads the shop, total and date; type "coffee 4.50 lunch 12" and it becomes two entries; ask "how much did I spend on food this month?" and it answers from your own entries. Budgets, recurring items, any currency, CSV / Excel import and CSV export, 18 languages.\n\nHow it is built: plain JavaScript, no framework; Supabase (Postgres with row-level security, Edge Functions) in Singapore; served as static assets from Cloudflare Workers. Strict CSP (script-src \'self\', no inline scripts). Errors-only Sentry with heavy scrubbing, no analytics or ad trackers. AI calls go through an Edge Function, so no keys reach the browser, and AI never writes to your data on its own.\n\nYou need an account (email or Google) because entries sync across devices. It installs as a PWA, so there is no app store yet.\n\nHappy to answer anything, especially about the PWA side: install on iOS, the offline shell, and running i18n for 18 languages keyed by the source text.' },
      ],
    },
    {
      id: 'reddit', name: 'Reddit', tier: 2, langs: 'อังกฤษ',
      why: 'คนถามหาแอปจดเงินทุกวัน · ซับที่ยอมให้โชว์ผลงานส่งคนลองจริงจัง',
      setup: ['บัญชี u/dailylimonlay · ใช้งานจริงก่อนโพสต์ (คอมเมนต์ช่วยคนอื่น 2–3 สัปดาห์)', 'อ่านกฎแต่ละซับก่อนโพสต์ทุกครั้ง · ซับที่ห้ามโปรโมต (r/personalfinance, r/Frugal, r/povertyfinance) ให้ช่วยตอบอย่างเดียว ไม่ใส่ลิงก์'],
      specs: ['รูป: blog-en-1200x630.png หรือ producthunt-gallery-*', 'กฎ 9:1 = โพสต์ช่วยคนอื่น 9 ครั้งต่อโปรโมต 1 ครั้ง'],
      rhythm: 'โพสต์ผลงาน 1 ซับ/สัปดาห์ (ไม่โพสต์ข้อความเดียวกันหลายซับในวันเดียว) · ตอบคำถาม 3–5 ครั้ง/สัปดาห์',
      tips: ['r/webdev ให้โชว์ผลงานเฉพาะวันเสาร์ (Showoff Saturday)', 'ห้ามขอโหวต ห้ามใช้หลายบัญชี'],
      posts: [
        { title: 'r/SideProject', lang: 'en', text: 'Title: I built a money tracker that logs a receipt from one photo and speaks 18 languages (PWA, no ads)\n\nI kept quitting budgeting apps because typing every coffee felt like homework. So Daily does the typing: snap a receipt and AI reads the shop, total and date; or type "coffee 4.50 lunch 12" and it splits it into entries. You can also ask "how much did I spend on food this month?"\n\nIt is a PWA (open daily.limonlay.com, add to home screen), works in 18 languages and any currency, and has no ads or ad trackers.\n\nI would love feedback on the first minute: what was confusing, what made you leave?' },
        { title: 'r/webdev (Showoff Saturday)', lang: 'en', text: 'Title: Showoff Saturday: a vanilla-JS PWA in 18 languages with a strict CSP, lessons from shipping it\n\nDaily is an income / expense tracker: no framework, one app.js, Supabase behind it, static assets on Cloudflare Workers.\n\nThings that worked:\n• i18n keyed by the source-language text, with a check that fails the release when a key is untranslated\n• CSP script-src \'self\' with a test that fails if an inline script comes back\n• the service-worker version stamped by the build, never by hand\n• Playwright smoke tests against a stubbed backend\n\nThings I would like to compare notes on: getting iOS users to install, and number formats across 18 locales.\n\nLive: daily.limonlay.com. Happy to go deeper on any of these.' },
        { title: 'r/PWA', lang: 'en', text: 'Title: Daily, an expense tracker PWA: what helped people install it on iOS and Android\n\nDaily has an "Install app" item in its own menu for Android and desktop. iOS Safari has no install prompt, so our docs walk people through Share → Add to Home Screen.\n\nApp: daily.limonlay.com. Curious what others do to get iOS users to install: a hint after the first action, a banner, or nothing at all?' },
        { title: 'Reply template (threads asking for an app)', lang: 'en', text: 'Disclosure: I make one of these, so take it with a grain of salt. Daily (daily.limonlay.com) is a web app you add to your home screen. You can snap a receipt and AI fills it in, or type "coffee 4.50 lunch 12" in one go. No ads. Whatever you pick, the thing that matters most is how fast you can log on the spot.' },
      ],
      images: ['blog-en-1200x630.png'],
    },
    {
      id: 'indiehackers', name: 'Indie Hackers', tier: 2, langs: 'อังกฤษ',
      why: 'คนทำโปรดักต์คนเดียวอ่านกันเอง ให้คำแนะนำเรื่องราคาและการตลาดได้ดี',
      setup: ['สร้างหน้า Product "Daily" ใส่ลิงก์ + tagline เดียวกับ Product Hunt', 'โพสต์ milestone ทุกเดือน (ผู้ใช้ใหม่, ฟีเจอร์, สิ่งที่เรียนรู้)'],
      rhythm: 'เดือนละ 1 โพสต์',
      posts: [
        { title: 'First post', lang: 'en', text: 'Launching Daily: a money tracker in 18 languages, built solo\n\nWhat: an income / expense PWA. Snap a receipt and AI fills it in; ask AI where your money went. No ads.\nWhy: most money apps lost me in week one because logging felt like work.\nWhere I am: the app is live at daily.limonlay.com, every feature is open while we test, paid plans for heavier AI use come next.\nWhat I would love advice on: getting the first 1,000 users in Thailand and Japan without paid ads.' },
      ],
    },
    {
      id: 'directories', name: 'รายชื่อเว็บรวมแอป (directories)', tier: 2, langs: 'อังกฤษ',
      why: 'ลงครั้งเดียว คนค้นหา "alternative to …" เจอเราไปเรื่อยๆ และได้ลิงก์กลับ',
      setup: [
        'AlternativeTo: เพิ่ม Daily เป็นทางเลือกของแอปจดเงินยอดนิยม ใส่ tag: expense tracker, budgeting, receipt scanner, PWA',
        'SaaSHub · BetaList · Uneed · store.app (รวม PWA) — เช็กก่อนว่ายังเปิดรับอยู่',
        'ใช้ tagline / description เดียวกับ Product Hunt และรูป producthunt-gallery-*',
      ],
      rhythm: 'สัปดาห์ก่อน Product Hunt ลงให้ครบทีเดียว',
    },

    // ---------------- Tier 3: by country ----------------
    {
      id: 'pantip', name: 'Pantip (ไทย)', tier: 3, langs: 'ไทย',
      why: 'คนไทยค้น "แอปจดรายรับรายจ่าย ตัวไหนดี" แล้วเจอกระทู้ Pantip บน Google',
      setup: ['ตั้งกระทู้ในห้องซิลิคอนวัลเลย์ (ไอที) ติดแท็ก แอปพลิเคชัน, การเงิน · ห้องสินธรให้ตอบกระทู้อย่างเดียว', 'อ่านกฎเรื่องโฆษณาของห้องก่อน และบอกในบรรทัดแรกว่าเราเป็นคนทำ'],
      rhythm: 'กระทู้แนะนำตัว 1 ครั้ง · ตอบกระทู้ที่ถามหาแอป 1–2 ครั้ง/สัปดาห์',
      posts: [
        { title: 'กระทู้แนะนำตัว', lang: 'th', img: 'blog-th-1200x630.png', text: 'หัวข้อ: ทำแอปจดรายรับรายจ่ายขึ้นมาเอง ไม่มีโฆษณา อยากได้คำติชม\n\nขอบอกก่อนว่าเราเป็นคนทำแอปนี้เอง ไม่ได้รับจ้างรีวิว\n\nจดเงินกี่ครั้งก็เลิกกลางทาง เพราะต้องกรอกเยอะ เลยทำ Daily ขึ้นมา:\n- ถ่ายบิล แล้ว AI อ่านร้าน ยอด วันที่ และเดาหมวดให้ (ตรวจก่อนบันทึกได้ทุกช่อง)\n- พิมพ์ "กาแฟ 65 ข้าวมันไก่ 120" ได้ 2 รายการในทีเดียว\n- ถาม AI ได้ เช่น "เดือนนี้ค่ากินเท่าไร"\n- ตั้งงบรายหมวด รายการประจำ หลายสกุลเงิน นำเข้า Excel / Google Sheets ได้\n- ล็อกแอปด้วย PIN / Face ID ไม่มีโฆษณา ไม่ขายข้อมูล\n\nเป็นเว็บแอป เปิด daily.limonlay.com แล้วกด "เพิ่มไปยังหน้าจอโฮม" ไม่ต้องโหลดจาก App Store\n\nอยากรู้ว่าลองแล้วติดตรงไหน หรืออยากให้มีอะไรเพิ่ม ขอบคุณที่อ่านจนจบ 🍋' },
        { title: 'ตอบกระทู้ที่ถามหาแอป', lang: 'th', text: '(ขอเปิดเผยก่อนว่าเราเป็นคนทำนะ) ลอง Daily ดูได้ เป็นเว็บแอป เปิด daily.limonlay.com แล้วเพิ่มไปหน้าจอโฮม ถ่ายบิลให้ AI กรอก หรือพิมพ์ "กาแฟ 65" ก็จดแล้ว ไม่มีโฆษณา ไม่ว่าจะใช้แอปไหน ขอให้เลือกตัวที่จดได้เร็วที่สุดตอนจ่ายเงิน จะจดรอดกว่า' },
      ],
      images: ['blog-th-1200x630.png'],
    },
    {
      id: 'note', name: 'note / Zenn (ญี่ปุ่น)', tier: 3, langs: 'ญี่ปุ่น',
      why: 'บทความ "個人開発で〜を作った話" อ่านกันเยอะ และติด Google ญี่ปุ่นนาน',
      setup: ['note: บทความเรื่องเล่า (คนทั่วไป) · Zenn: บทความเทคนิค (dev) · ใช้รูป blog-ja-1200x630.png เป็นปก'],
      rhythm: 'note 1 บทความ/เดือน · Zenn 1 บทความตอนเปิดตัว',
      posts: [
        { title: 'note: 作った話', lang: 'ja', img: 'blog-ja-1200x630.png', text: 'タイトル: 家計簿が続かなかった私が、18言語の家計簿Webアプリを作った話\n\n構成:\n1. 家計簿アプリを何度もやめた理由（入力が面倒、広告が多い）\n2. 「入力をAIに任せる」という決め方（レシート読取、一文入力）\n3. 使い道をAIに聞ける機能と、AIが勝手にデータを変えない設計\n4. 広告なし・データを売らない、を続けるために決めたこと\n5. ダウンロード不要のWebアプリ（PWA）にした理由\n6. これから（プラン、LINEとの連携など）\n\n書き出し: 家計簿アプリは何度も入れては消してきました。続かない理由はいつも同じで、「入力が面倒」でした。だから自分で作ることにしました。Dailyは、レシートを撮ればAIが入力してくれる家計簿です。（作った本人が書いています）\n\n最後に: daily.limonlay.com' },
        { title: 'Zenn: 技術記事', lang: 'ja', text: 'タイトル: フレームワークなしのPWAを18言語で運用する（CSP script-src \'self\' / i18n / Service Worker）\n\n構成: 素のJSを選んだ理由 / 原文キーのi18nと未翻訳チェック / インラインスクリプト禁止のCSPとテスト / ビルドでService Workerのバージョンを刻む / Playwrightのスモークテスト / iOSのインストール導線' },
      ],
      images: ['blog-ja-1200x630.png'],
    },
    {
      id: 'naver', name: 'Naver Blog (เกาหลี)', tier: 3, langs: 'เกาหลี',
      why: 'คนเกาหลีค้น 가계부 앱 추천 บน Naver ไม่ใช่ Google',
      setup: ['บล็อก Naver ชื่อ "Daily 가계부" · ปก blog-ko-1200x630.png · ใส่รูป square-ko-1080.png ในบทความ'],
      rhythm: '2 บทความ/เดือน',
      posts: [
        { title: '소개 글', lang: 'ko', img: 'blog-ko-1200x630.png', text: '제목: 가계부 앱 찾는 분께: 영수증 찍으면 AI가 입력하는 가계부 Daily (만든 사람이 직접 소개)\n\n안녕하세요, Daily를 만든 사람입니다. 직접 만든 서비스라 솔직하게 소개할게요.\n\n가계부가 작심삼일로 끝나는 이유는 대부분 "입력이 귀찮아서"예요. 그래서 Daily는 입력을 AI에게 맡겼어요.\n• 영수증을 찍으면 AI가 가게, 금액, 날짜를 읽고 카테고리를 추천해요\n• "커피 4500 점심 9000"처럼 한 문장으로 여러 건을 기록해요\n• "이번 달 식비 얼마야?" 하고 AI에게 물어볼 수 있어요\n• 카테고리별 예산, 정기 거래, 여러 통화, 엑셀 가져오기\n• 광고 없음, 앱 잠금(PIN / Face ID)\n\n설치 없이 daily.limonlay.com 을 열고 홈 화면에 추가하면 앱처럼 쓸 수 있어요.\n\n#가계부 #가계부앱 #가계부앱추천 #가계부쓰는법 #짠테크' },
      ],
      images: ['blog-ko-1200x630.png', 'square-ko-1080.png'],
    },
    {
      id: 'xiaohongshu', name: 'Xiaohongshu 小红书 (จีน)', tier: 3, langs: 'จีนตัวย่อ',
      why: 'นักเรียนจีนในต่างประเทศ (留学生) ใช้ XHS หาเครื่องมือ และต้องจดหลายสกุลเงิน ตรงกับจุดเด่นเรา',
      setup: ['บัญชี "Daily记账" · ปก xhs-zh-CN-1080x1440.png', 'XHS ไม่ชอบลิงก์ออกนอกแอป: ชื่อเว็บอยู่ในรูปแล้ว ไม่ต้องใส่ลิงก์ในข้อความ ตอบคนถามในคอมเมนต์', 'ห้ามใช้คำเกินจริงแบบ "最" "第一" (กฎโฆษณาจีน)'],
      specs: ['รูป 3:4 1080×1440 · หัวข้อ ≤ 20 ตัวอักษร'],
      rhythm: '1 โน้ต/สัปดาห์',
      posts: [
        { title: '留学生记账', lang: 'zh-CN', img: 'xhs-zh-CN-1080x1440.png', text: '标题：留学生记账｜外币自动换算\n\n在国外生活，日元、美元、英镑混着花，月底根本算不清🍋\n我自己做了一个记账网页应用 Daily（开发者本人，非广告投放）：\n✅ 用当地货币记一笔，自动换算成你的主币种\n✅ 拍下小票，AI 帮你填好店名、金额、日期\n✅ 一句话记多笔：“咖啡 4.5 午饭 12”\n✅ 问 AI：“这个月吃饭花了多少？”\n✅ 无广告，支持 18 种语言\n不用下载，浏览器打开就能用，网址在图里～\n#留学生 #记账 #留学生活 #省钱 #记账app' },
      ],
      images: ['xhs-zh-CN-1080x1440.png', 'square-zh-CN-1080.png'],
    },
    {
      id: 'dcard', name: 'Dcard · Threads (ไต้หวัน)', tier: 3, langs: 'จีนตัวเต็ม',
      why: 'นักศึกษาไต้หวันคุยเรื่องเงินและแอปบน Dcard · Threads ก็ใช้มาก',
      setup: ['Dcard: โพสต์ในบอร์ด 理財 หรือ 3C (อ่านกฎบอร์ดเรื่องโฆษณาก่อน) และบอกว่าเราเป็นคนทำ', 'รูป square-zh-TW-1080.png · blog-zh-TW-1200x630.png'],
      rhythm: 'Dcard 1 โพสต์/เดือน · Threads 2/สัปดาห์',
      posts: [
        { title: '分享', lang: 'zh-TW', img: 'square-zh-TW-1080.png', text: '標題：自己做了一款記帳網頁 App，拍收據 AI 幫你記（開發者本人分享）\n\n記帳總是撐不過一週，因為輸入太麻煩，所以做了 Daily 🍋\n• 拍下收據，AI 讀出店名、金額、日期，還會建議分類\n• 一句話記多筆：「咖啡 65 午餐 120」\n• 直接問 AI：「這個月伙食費多少？」\n• 分類預算、定期收支、多幣別、可匯入 Excel\n• 沒有廣告，支援 18 種語言\n免下載，打開 daily.limonlay.com 加到主畫面就能用。想聽聽大家的意見！' },
      ],
      images: ['square-zh-TW-1080.png', 'blog-zh-TW-1200x630.png'],
    },
    {
      id: 'sea-groups', name: 'Facebook groups อินโดนีเซีย · เวียดนาม · ฟิลิปปินส์ · มาเลเซีย', tier: 3, langs: 'อินโดนีเซีย · เวียดนาม · อังกฤษ · มาเลย์',
      why: 'คนใน SEA คุยเรื่องเก็บเงินในกลุ่ม Facebook มากกว่าที่อื่น',
      setup: ['ค้นกลุ่มด้วยคำ: ID "catatan keuangan", "keuangan pribadi" · VN "quản lý tài chính cá nhân" · PH "ipon", "personal finance philippines" · MY "kewangan peribadi"', 'เข้ากลุ่มที่อนุญาตให้โปรโมตหรือมีวันโปรโมตเท่านั้น และบอกว่าเราเป็นคนทำ'],
      specs: ['รูป square-id / square-vi / square-en / square-ms (1080×1080)'],
      rhythm: 'ประเทศละ 1–2 กลุ่ม/สัปดาห์',
      posts: [
        { title: 'Indonesia', lang: 'id', img: 'square-id-1080.png', text: 'Halo! Saya pembuat Daily, aplikasi web untuk mencatat pemasukan dan pengeluaran 🍋\n• Foto struk, AI mengisi toko, jumlah, dan tanggal\n• Ketik "kopi 25000 makan siang 30000" jadi 2 catatan sekaligus\n• Tanya AI: "Bulan ini habis berapa untuk makan?"\n• Anggaran per kategori, banyak mata uang, tanpa iklan\nTanpa unduh: buka daily.limonlay.com lalu tambahkan ke layar utama. Saya senang sekali kalau ada masukan!' },
        { title: 'Việt Nam', lang: 'vi', img: 'square-vi-1080.png', text: 'Chào mọi người! Mình là người làm ra Daily, ứng dụng web ghi thu chi 🍋\n• Chụp hóa đơn, AI tự điền cửa hàng, số tiền, ngày\n• Gõ "cà phê 35000 cơm trưa 50000" là có ngay 2 khoản\n• Hỏi AI: "Tháng này ăn uống hết bao nhiêu?"\n• Ngân sách theo danh mục, nhiều loại tiền, không quảng cáo\nKhông cần tải app: mở daily.limonlay.com rồi thêm vào màn hình chính. Rất mong nhận góp ý!' },
        { title: 'Philippines (English)', lang: 'en', img: 'square-en-1080.png', text: 'Hi everyone! I made Daily, a web app for tracking your ipon and gastos 🍋\n• Snap a receipt and AI fills in the shop, amount and date\n• Type "coffee 120 lunch 180" and get two entries at once\n• Ask AI: "How much did I spend on food this month?"\n• Budgets per category, any currency, no ads\nNo download: open daily.limonlay.com and add it to your home screen. Feedback very welcome!' },
        { title: 'Malaysia', lang: 'ms', img: 'square-ms-1080.png', text: 'Hai semua! Saya pembuat Daily, aplikasi web untuk rekod pendapatan dan perbelanjaan 🍋\n• Ambil gambar resit, AI isikan kedai, jumlah dan tarikh\n• Taip "kopi 8 makan tengah hari 12" terus jadi 2 rekod\n• Tanya AI: "Bulan ini habis berapa untuk makan?"\n• Bajet ikut kategori, pelbagai mata wang, tiada iklan\nTak perlu muat turun: buka daily.limonlay.com dan tambah ke skrin utama. Sebarang maklum balas amat dihargai!' },
      ],
      images: ['square-id-1080.png', 'square-vi-1080.png', 'square-en-1080.png', 'square-ms-1080.png'],
    },
    {
      id: 'latam', name: 'สเปน · โปรตุเกส (ละตินอเมริกา)', tier: 3, langs: 'สเปน · โปรตุเกส',
      why: 'ตลาดใหญ่ที่ใช้ TikTok / Instagram / Facebook groups หนัก เริ่มจาก YouTube Shorts (แปลชื่อ) แล้วค่อยเปิดบัญชีภาษาของตัวเอง',
      setup: ['ตอนนี้: แปลชื่อ/คำอธิบาย Shorts เป็น es / pt (ใช้ "แนะนำ 18 ภาษา") · โพสต์ในกลุ่ม Facebook การเงินส่วนตัวที่อนุญาต', 'ทีหลัง: ทำ reel ภาษาสเปน/โปรตุเกสด้วย daily-reel แล้วเปิดบัญชี TikTok'],
      posts: [
        { title: 'Español', lang: 'es', img: 'square-es-1080.png', text: '¡Hola! Soy quien hizo Daily, una app web para llevar tus ingresos y gastos 🍋\n• Toma foto del ticket y la IA llena la tienda, el monto y la fecha\n• Escribe "café 45 comida 120" y se crean 2 movimientos\n• Pregúntale a la IA: "¿Cuánto gasté en comida este mes?"\n• Presupuestos por categoría, cualquier moneda, sin anuncios\nSin descargar nada: abre daily.limonlay.com y agrégala a tu pantalla de inicio. ¡Me encantaría tu opinión!' },
        { title: 'Português', lang: 'pt', img: 'square-pt-1080.png', text: 'Oi! Eu criei o Daily, um app web pra controlar receitas e despesas 🍋\n• Tire foto do recibo e a IA preenche loja, valor e data\n• Digite "café 8 almoço 25" e pronto: 2 lançamentos\n• Pergunte à IA: "Quanto gastei com comida este mês?"\n• Orçamento por categoria, qualquer moeda, sem anúncios\nSem baixar nada: abra daily.limonlay.com e adicione à tela inicial. Adoraria saber o que você acha!' },
      ],
      images: ['square-es-1080.png', 'square-pt-1080.png'],
    },
    {
      id: 'telegram-vk', name: 'Telegram · VK (รัสเซีย)', tier: 3, langs: 'รัสเซีย',
      why: 'คนพูดรัสเซียติดตามช่อง Telegram มากกว่าโซเชียลอื่น',
      setup: ['ช่อง Telegram t.me/dailylimonlay (ถ้าชื่อว่าง) · รูป avatar-1080.png', 'VK: เพจชุมชน "Daily" ใช้รูป square-ru-1080.png · ลงคลิป 9:16 เป็น VK Clips'],
      bio: [{ lang: 'ru', limit: 255, text: 'Daily 🍋 учёт доходов и расходов за пару секунд. Сфотографируйте чек, и ИИ всё заполнит. Без рекламы, 18 языков, ничего не нужно скачивать: daily.limonlay.com' }],
      rhythm: '1–2 โพสต์/สัปดาห์',
      posts: [
        { title: 'Первый пост', lang: 'ru', img: 'square-ru-1080.png', text: 'Привет! Я сделал Daily, веб-приложение для учёта доходов и расходов 🍋\n• Сфотографируйте чек, и ИИ заполнит магазин, сумму и дату\n• Напишите «кофе 250 обед 450», и получится 2 записи\n• Спросите ИИ: «Сколько я потратил на еду в этом месяце?»\n• Бюджеты по категориям, любые валюты, без рекламы\nНичего не нужно скачивать: откройте daily.limonlay.com и добавьте на главный экран.' },
      ],
      images: ['square-ru-1080.png'],
    },
    {
      id: 'pinterest', name: 'Pinterest', tier: 3, langs: 'อังกฤษ (ทีหลัง สเปน/เยอรมัน)',
      why: 'Pinterest คือเครื่องมือค้นหา คนหา "budget ideas" แล้วเซฟเก็บ พินอยู่ได้เป็นปี',
      setup: ['บัญชี Business @dailylimonlay · ยืนยันเว็บ daily.limonlay.com (ต้องใส่ meta tag ในแอป = งานฝั่งแอปผ่าน Planner)', 'บอร์ด: "Budgeting made easy", "Travel budget", "Money tips"'],
      specs: ['พิน 2:3 1000×1500'],
      rhythm: '3 พิน/สัปดาห์ (ใช้รูปเดิมสลับ: pinterest-1/2, carousel-en-*)',
      posts: [
        { title: 'Pin 1', lang: 'en', img: 'pinterest-1-en-1000x1500.png', text: 'Title: Where does your money go? A 3-step habit that sticks\nDescription: Snap the receipt, ask AI, see every coin by category. Daily logs income and expenses in seconds, with no ads and no download. #budgeting #moneytips #budgetplanner' },
        { title: 'Pin 2', lang: 'en', img: 'pinterest-2-en-1000x1500.png', text: 'Title: Travel budget in any currency\nDescription: Log it in yen, won or euros and Daily converts it to your main currency. Works in 18 languages. #travelbudget #travelplanning #studyabroad' },
      ],
      images: ['pinterest-1-en-1000x1500.png', 'pinterest-2-en-1000x1500.png'],
    },
    {
      id: 'linkedin', name: 'LinkedIn', tier: 3, langs: 'อังกฤษ',
      why: 'เล่าเรื่องสตูดิโอ limonlay และหาพาร์ตเนอร์ ไม่ใช่ที่หาผู้ใช้หลัก',
      setup: ['Company page "limonlay" · ปก linkedin-cover-1128x191.png · โลโก้ avatar-1080.png'],
      rhythm: 'เดือนละ 1 โพสต์ (เปิดตัว / milestone)',
      posts: [
        { title: 'Launch post', lang: 'en', text: 'Daily is live in 18 languages. 🍋\nIt is a money tracker that does the typing for you: snap a receipt and AI fills in the entry, or ask "how much did I spend on food this month?" No ads, no data selling, no app store needed.\nBuilt by a small independent studio, limonlay. Feedback welcome: daily.limonlay.com' },
      ],
      images: ['linkedin-cover-1128x191.png'],
    },
  ],

  faq: [
    { q: 'ฟรีไหม / ราคาเท่าไร',
      a: { th: 'จดเองและดูกราฟได้ไม่จำกัดทุกแพ็กเกจ ไม่มีโฆษณา ตอนนี้อยู่ช่วงทดลอง ใช้ได้ทุกฟีเจอร์โดยยังไม่มีค่าใช้จ่าย ถ้าจะเปิดแพ็กเกจเสียเงินจะแจ้งล่วงหน้า ดูรายละเอียดที่ daily.limonlay.com/pricing',
           en: 'Logging and charts are unlimited on every plan, with no ads. Right now we are in a test period, so every feature is open at no cost. We will announce paid plans before they start: daily.limonlay.com/pricing',
           ja: '記録とグラフはどのプランでも無制限、広告もありません。現在はテスト期間中で、すべての機能を費用なしで使えます。有料プランを始める前に必ずお知らせします：daily.limonlay.com/pricing' } },
    { q: 'โหลดที่ไหน / มี iPhone Android ไหม',
      a: { th: 'ไม่ต้องโหลดจาก App Store เปิด daily.limonlay.com บน Safari (iPhone) กดแชร์ → เพิ่มไปยังหน้าจอโฮม หรือบน Chrome (Android) กด "ติดตั้งแอป" ได้แอปเต็มจอ ใช้ได้บนคอมด้วย',
           en: 'No app store needed. Open daily.limonlay.com in Safari (iPhone) and tap Share → Add to Home Screen, or in Chrome (Android) tap "Install app". It works on computers too.',
           ja: 'App Storeは不要です。iPhoneはSafariで daily.limonlay.com を開き「共有→ホーム画面に追加」、AndroidはChromeで「アプリをインストール」。パソコンでも使えます。' } },
    { q: 'ข้อมูลปลอดภัยไหม',
      a: { th: 'รายการเห็นได้แค่เจ้าของบัญชี ไม่ขายและไม่แชร์ข้อมูล ล็อกแอปด้วย PIN / Face ID ได้ มียืนยันตัวตน 2 ชั้นและ Passkey ส่งออกหรือลบข้อมูลได้ทุกเมื่อ รายละเอียด daily.limonlay.com/security',
           en: 'Only you can see your entries, and we never sell or share data. You can lock the app with a PIN or Face ID, turn on two-step sign-in and passkeys, and export or delete everything any time: daily.limonlay.com/security',
           ja: '記録は本人だけが見られ、データの販売・共有はしません。PIN・Face IDでのアプリロック、2段階認証、パスキーに対応。いつでもエクスポート・削除できます：daily.limonlay.com/security' } },
    { q: 'ย้ายข้อมูลจากแอปเก่าได้ไหม',
      a: { th: 'ได้ นำเข้าไฟล์ CSV, Excel หรือ Google Sheets แล้วจับคู่หมวดได้ในแอป (เมนู → นำเข้า)',
           en: 'Yes. Import a CSV, Excel or Google Sheets file and match the categories in the app (Menu → Import).',
           ja: 'できます。CSV・Excel・Googleスプレッドシートを読み込み、アプリ内でカテゴリを合わせるだけです（メニュー→インポート）。' } },
    { q: 'AI อ่านบิลแม่นไหม',
      a: { th: 'ส่วนใหญ่อ่านได้ดีถ้าถ่ายเห็นทั้งใบและมีแสงพอ แต่ AI อ่านผิดได้ แอปให้ตรวจและแก้ทุกช่องก่อนบันทึกเสมอ',
           en: 'It reads most receipts well if the whole receipt is in the photo and well lit, but AI can misread, so the app always lets you check and edit every field before saving.',
           ja: 'レシート全体が明るく写っていればほとんど正しく読み取れますが、AIは読み間違えることもあります。保存前に必ず全項目を確認・修正できます。' } },
    { q: 'ใช้ภาษา / สกุลเงินของฉันได้ไหม',
      a: { th: 'ได้ 18 ภาษา และจดเป็นสกุลเงินไหนก็ได้ รวมคริปโต แอปแปลงเป็นสกุลหลักให้ ภาษาและสกุลเงินตั้งตามประเทศอัตโนมัติ เปลี่ยนได้ในเมนู',
           en: 'Yes: 18 languages and any currency, crypto included, converted to your main currency. Language and currency are set from your country and can be changed in the menu.',
           ja: '18言語・すべての通貨（暗号資産も）に対応し、メイン通貨に換算します。言語と通貨は国に合わせて自動設定され、メニューで変更できます。' } },
  ],

  seo: [
    { lang: 'th', kw: 'แอปจดรายรับรายจ่าย · แอปจดเงิน · วิธีจดรายรับรายจ่าย · จดรายจ่ายยังไงให้รอด', title: 'วิธีจดรายรับรายจ่ายให้ได้ทุกวัน (ใช้เวลาวันละ 1 นาที)' },
    { lang: 'en', kw: 'expense tracker app · budget app without ads · receipt scanner app · how to track spending', title: 'How to track spending when you hate spreadsheets' },
    { lang: 'ja', kw: '家計簿アプリ · 家計簿 続かない · 家計簿 レシート 読み取り · 家計簿 つけ方', title: '家計簿が続かない人のための、1日1分の記録術' },
    { lang: 'ko', kw: '가계부 앱 · 가계부 쓰는 법 · 영수증 가계부 · 가계부 앱 추천', title: '가계부 작심삼일 끝내는 법: 하루 1분 기록' },
    { lang: 'zh-CN', kw: '记账app · 记账软件推荐 · 留学生记账 · 怎么记账', title: '留学生怎么记账：多币种一起记' },
    { lang: 'zh-TW', kw: '記帳app · 記帳 推薦 · 怎麼記帳 · 收據 記帳', title: '記帳撐不過一週？每天 1 分鐘的記帳法' },
    { lang: 'vi', kw: 'app quản lý chi tiêu · ghi chép chi tiêu · sổ thu chi', title: 'Cách ghi chép chi tiêu mỗi ngày chỉ trong 1 phút' },
    { lang: 'id', kw: 'aplikasi catatan keuangan · aplikasi pencatat pengeluaran · cara mencatat keuangan', title: 'Cara mencatat keuangan harian dalam 1 menit' },
    { lang: 'ms', kw: 'aplikasi rekod perbelanjaan · bajet bulanan · cara simpan duit', title: 'Cara rekod perbelanjaan harian dalam 1 minit' },
    { lang: 'es', kw: 'app para controlar gastos · app de finanzas personales · cómo ahorrar dinero', title: 'Cómo controlar tus gastos en 1 minuto al día' },
    { lang: 'pt', kw: 'app de controle financeiro · como controlar gastos · planilha de gastos', title: 'Como controlar seus gastos em 1 minuto por dia' },
    { lang: 'fr', kw: 'application budget · suivi des dépenses · gérer son budget', title: 'Suivre ses dépenses en 1 minute par jour' },
    { lang: 'de', kw: 'Haushaltsbuch App · Ausgaben tracken · Budget App ohne Werbung', title: 'Ausgaben tracken in einer Minute am Tag' },
    { lang: 'it', kw: 'app per gestire le spese · app budget · spese mensili', title: 'Tenere traccia delle spese in 1 minuto al giorno' },
    { lang: 'nl', kw: 'huishoudboekje app · uitgaven bijhouden · budget app', title: 'Je uitgaven bijhouden in 1 minuut per dag' },
    { lang: 'pl', kw: 'aplikacja do budżetu domowego · kontrola wydatków', title: 'Jak kontrolować wydatki w minutę dziennie' },
    { lang: 'tr', kw: 'bütçe uygulaması · harcama takip uygulaması · gelir gider takibi', title: 'Günde 1 dakikada harcama takibi' },
    { lang: 'ru', kw: 'приложение для учета расходов · учет личных финансов · домашняя бухгалтерия', title: 'Как вести учёт расходов за 1 минуту в день' },
  ],

  calendar: [
    { week: 'สัปดาห์ 1 · 23–29 พ.ย.', items: [
      'เปิดบัญชี Tier 1 ทั้งหมด: ใส่รูปโปรไฟล์ ปก ไบโอ ลิงก์ (หัวข้อ "แพลตฟอร์ม")',
      'TikTok / IG / FB / YouTube / LINE VOOM (ไทย): P3 เที่ยวที่ไหนจดเป็นเงินที่นั่น (everywhere มีแล้ว)',
      'YouTube Shorts + X + Threads (อังกฤษ): P2 click-30 และ P1 payday · 27 พ.ย. Black Friday',
      'IG + Lemon8: carousel-th ชุดแรก · X ญี่ปุ่นเริ่มโพสต์ทุกวันทำงาน',
      'สั่งทำ reel ไทย + ญี่ปุ่นของ P1 payday ด้วย daily-reel (films/PROMPT.md)',
    ] },
    { week: 'สัปดาห์ 2 · 30 พ.ย.–6 ธ.ค.', items: [
      '30 พ.ย. เงินเดือนออก (ไทย): P1 payday ไทย + โพสต์ตั้งงบ',
      'LINE OA: ข้อความทักทาย + rich menu พร้อม · Lemon8 ญี่ปุ่นโพสต์แรก',
      'Pantip กระทู้แนะนำตัว · Threads ถามคนอ่าน (ไทย / อังกฤษ / จีนตัวเต็ม)',
    ] },
    { week: 'สัปดาห์ 3 · 7–13 ธ.ค.', items: [
      '8 ธ.ค. P7 ตั้งงบก่อน 12.12 (ไทย / อินโดนีเซีย / เวียดนาม / อังกฤษ)',
      '10 ธ.ค. 冬のボーナス (ญี่ปุ่น)',
      'Naver Blog (เกาหลี) · Xiaohongshu (จีน) · กลุ่ม Facebook SEA โพสต์แรก',
    ] },
    { week: 'สัปดาห์ 4 · 14–20 ธ.ค.', items: [
      'P4 ถ่ายบิล + P5 พิมพ์ประโยคเดียว (reel ใหม่ หรือ carousel)',
      'note (ญี่ปุ่น) บทความ "作った話" · Reddit r/SideProject',
      '19 ธ.ค. (เสาร์) r/webdev Showoff Saturday',
    ] },
    { week: 'สัปดาห์ 5–6 · 21 ธ.ค.–3 ม.ค.', items: [
      '22 ธ.ค. สรุปทั้งปี (ไทย / อังกฤษ / ญี่ปุ่น)',
      '1 ม.ค. ปีใหม่ ทุกช่อง + LINE บรอดแคสต์ครั้งแรก (ไทย / ญี่ปุ่น)',
      'P8 ย้ายจาก Excel (คนเริ่มจดปีใหม่)',
    ] },
    { week: 'มกราคม · เปิดตัวสากล', items: [
      'ลง directories ให้ครบ (AlternativeTo, SaaSHub, BetaList, Uneed, store.app)',
      'อังคาร 19 ม.ค. Product Hunt · พฤหัส 21 ม.ค. Show HN · โพสต์ Indie Hackers วันเดียวกับ PH',
      'เปิดบัญชีภาษาสเปน / โปรตุเกส เมื่อ reel ภาษานั้นพร้อม',
    ] },
  ],

  measure: [
    'แอปไม่มีตัวติดตาม จึงวัดจากหลังบ้านของแต่ละแพลตฟอร์ม (ยอดดู ผู้ติดตาม คลิกลิงก์) + จำนวนสมัครใหม่ต่อสัปดาห์จาก /admin (นับอย่างเดียว)',
    'จดทุกวันจันทร์: ผู้ติดตามแต่ละช่อง · คลิปที่ยอดดูสูงสุด · สมัครใหม่ของสัปดาห์',
    'เลิกทำช่องที่ 6 สัปดาห์แล้วไม่ขยับ แล้วเอาเวลาไปเพิ่มในช่องที่ได้ผล',
    'ไอเดียฝั่งแอป (ต้องผ่าน Planner): ถามตอนสมัครว่า "รู้จัก Daily จากที่ไหน" (ไม่บังคับ) และเปิดระบบชวนเพื่อน T-30 ที่ลิงก์ /@username มีอยู่แล้ว',
  ],

  next: [
    'reel ภาษาไทยและญี่ปุ่นของ P1 payday และ P2 click-30 (daily-reel, ทำ storyboard ให้ดูก่อน)',
    'reel ใหม่: P4 ถ่ายบิล · P5 พิมพ์ประโยคเดียว · P8 นำเข้า Excel · P9 ล็อกแอป',
    'บทความ SEO หลายภาษาบนเว็บ Daily (งานฝั่งแอป Lane B ต้องเปิดงานใน TASKS.md ผ่าน Planner)',
    'meta tag ยืนยันเว็บของ Pinterest / ปุ่ม QR เพิ่มเพื่อน LINE ในหน้าเกี่ยวกับ (งานฝั่งแอป)',
  ],
};
