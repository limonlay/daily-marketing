# Daily — marketing

Promotion for **Daily** (income/expense PWA, https://daily.limonlay.com). The app code lives in `limonlay/daily`; nothing here is deployed.
The owner talks in Thai; reply in Thai.

## Read first
- `BRIEF.md` — product, audience, channels, content ideas.
- `brand/DESIGN.md` — copy of the app's design rules (source of truth stays in `limonlay/daily/DESIGN.md`; re-copy when it changes).
  Key rules: flat colours only (no gradients, borders, soft shadows; hard offset shadow allowed), Prussian `#14213d` + Lemon `#ffd23f`,
  dark `#0a0d14`, cream `#f2f0ea`, leaf corners `0 R 0 R`, Google Sans (Latin) + Anuphan (Thai), the lemon is the mascot.
- Screens shown in videos must be the real Daily UI (`brand/screens/shot-<lang>-<theme>.webp`, copied from `limonlay/daily/icons/`).

## Layout
| folder | what |
|---|---|
| `brand/` | DESIGN.md copy, lemon logo, app icon, app screenshots per language |
| `apple/` | Apple-style film, beat-cut film, paper-collage film; `rec.js` renders any page (`PAGE=… OUT=… [BEATS=…] node rec.js 450`); `daily-track-128bpm.wav` (code-made, free) |
| `kinetic/` | kinetic-typography film (Thai) |
| `lottie/` | Lottie splash (`daily-splash.json` + `lemon.png`) and preview |
| `motionmaxxing/` | motionmaxxing comparison film + STORYBOARD/NOTE |
| `landing/` | landing-page mockups and their screenshots |
| `promo/` | older promo (orange era, outdated colours); `appcap.js` needs the app repo (`../full.js`) |

## How videos are made (all free)
HTML page with a pure `render(t)` → Playwright screenshots per frame (Chromium at `/opt/pw-browsers/chromium` in cloud sessions) → ffmpeg.
9:16 1080×1920, 30 fps, 15 s, 128 BPM (scene changes on beats). Music: code-made (RuiC) or Mixkit (free commercial). No paid AI services
(Higgsfield, Novoads, Gemini, ElevenLabs were checked and rejected: not free).

## Making a video
**Reels (TikTok/Reels/Shorts): use `daily-reel`** (`.claude/skills/daily-reel/`, from the approved film `films/payday-ui`). The older `daily-video` skill (`.claude/skills/daily-video/`): (brief → beat map → stills → render → gates) is kept for reference. New films go in `films/<name>/`.

## Skills tried (user-level, `~/.claude/skills`; reinstall in a new session)
motionmaxxing (storyboard + gates), ruic-motion-reel (code music), beat-synced-edit (beat detection, Python/librosa),
kinetic-typography, text-to-lottie (diffusionstudio/lottie), motion-design (howseen-ai). logo-intro was dropped (WebGL too slow, gradients).
Their strengths are combined in `daily-video`; reinstalling them is optional.

## Git
Small, low-risk changes may go straight to `main`; ask the owner before rewriting history. Keep large renders out of git unless they are deliverables.
