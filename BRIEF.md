# Daily — marketing brief

For a separate marketing / video session. The app lives in `limonlay/daily`; this repo is promotion only. The owner talks in Thai.

## Product
- **Daily** — free income/expense tracker, no ads. Web app (PWA) at https://daily.limonlay.com — works on phone, iPad and computer, installs to the home screen, no app store.
- Features: quick add, monthly/yearly summary + charts, budgets per category, recurring items, many currencies incl. crypto,
  receipt scan with AI, chat with AI about your own money ("how much did I spend on food this month?"), CSV/XLSX import & export,
  category packs, app lock (PIN / Face ID), 2FA + passkeys, 14 languages (th, en, zh-CN, zh-TW, ja, ko, vi, id, ms, es, fr, de, pt, ru).
- Privacy: data visible only to its owner, no selling data, no ads, no tracking; error reports are anonymised.

## Audience (global)
- Young adults starting to manage money; students abroad, travellers and digital nomads (multi-currency); people who want AI help without spreadsheets.
- Priority markets: Thailand, Japan first (owner's markets), then English-speaking, Spanish/Portuguese (LatAm), Indonesia/Vietnam.

## Channels
- Core (all countries): TikTok + Instagram Reels + YouTube Shorts (one 9:16 clip, many languages), Product Hunt launch, Reddit (helpful, not salesy), multilingual SEO articles.
- Regional: Lemon8 + LINE VOOM (TH/JP), X (JP), Naver Blog (KR), Xiaohongshu (CN/TW), Facebook groups (ID/PH/VN), Telegram/VK (RU).
- No paid ads until payments (Pro plan) exist.

## Brand
- Colors: prussian `#14213d`, lemon yellow `#ffd23f`, black `#000000`, alabaster `#e5e5e5`, white. Asymmetric corners (top-right + bottom-left rounded).
- Mascot/logo: the lemon (`icons/lemon.svg`, PNGs `icons/lemon-mail*.png`, app icons `icons/icon-512.png`). Wordmark "Daily" + lemon.
- Voice: friendly, short, practical; no finance jargon; never shame spending.

## Content ideas (15–30 s, hook in the first 3 s)
1. "Scan a receipt → it's logged in 3 seconds" (receipt scan).
2. "Asked AI where my money went this month" (AI chat).
3. "30-day saving challenge" with the budget bars filling up.
4. "Before vs after tracking for one month: where the money leaked".
5. "Travelling? Log in yen, see it in baht" (multi-currency).
6. "Payday plan in 60 seconds" (budgets + recurring).
7. "Free, no ads, 14 languages" (language switch montage).
8. "Lock your money app with Face ID" (privacy).
9. Seasonal: 11.11 shopping, new-year money plan, payday.
10. "From messy spreadsheet to charts" (CSV/XLSX import).

## Video production (what Claude Code can do here)
- Real app demo clips recorded with Playwright using demo data (stub in `tools/stub.js`), 9:16, every language.
- Brand motion graphics with Remotion (npm) and editing/subtitles/covers with ffmpeg (installed).
- Not here: real people on camera, trending music (add in TikTok/IG/CapCut), realistic AI video; voice-over needs an external TTS service.
- Workflow: Claude Code makes scripts + clips per language → owner adds music/voice in CapCut → posts.
- Everything stays in this repo; nothing here is deployed.

## Backlog related to growth
See `CLAUDE.md` in `limonlay/daily` → Backlog (PostHog analytics, payments/Pro plan, LINE/Telegram bots, portfolio).
