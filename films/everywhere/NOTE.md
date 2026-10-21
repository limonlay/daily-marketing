# NOTE — "การ์ดเดิม เงินของคุณ" (motionmaxxing)

**Idea:** the camera holds Daily's real balance card while hard cuts on the beat swap the language underneath: Thai ฿25,125 → Japanese ¥104,825 → English $698.25 → Korean ₩1,084,250, then pulls back to the whole Korean screen. The lemon rolls in at the start and returns as the logo. Only Daily has the lemon on its card; the claim (your language, your money) is performed by real screens, not stated by numbers.

**Beats:** hook 0–3.75 s "เที่ยวที่ไหน / จดเป็นเงินที่นั่น" · proof 3.75–9.4 s four languages, a snap on each cut · proof 9.4–11.25 s pull-back + "ภาษาของคุณ เงินของคุณ" · CTA 11.25–15 s lemon from 3.5x, Daily, url, drifting.

**Real vs illustrative:** all four screens are the real localized app screenshots with demo data (`brand/screens/shot-{th,ja,en,ko}-dark.webp`). No invented numbers or features. Music: the code-made 128 BPM track at −14 LUFS. No voice (no ElevenLabs key).

**Gates (motionmaxxing look.py / lint.mjs):** G0 PASS (15.00 s, audio) · G2 PASS · G3 PASS (end hold 0.47 s, final shot 25 %) · G5 PASS. Cut sync 5/5 within ±80 ms. G1 by eye: card at ~2x, balance digits ≈ 0.04 H. G4 by eye: one screen per frame.
**daily-video check.py:** G0–G4 PASS, frozen max 0.50 s.

**Still to improve:** motion 2.3/255 is below the human band (4.4–9.8); the lemon's hand-off into the card is approximate (it shrinks toward the card's lemon spot, not onto it); the 3.75 s hook could be a beat shorter.
