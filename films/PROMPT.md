# Prompt: Daily promo reels (TikTok / Reels / Shorts)

Paste this into a new Claude Code session that has the `limonlay/daily-marketing` repo (and `limonlay/daily` to read `DESIGN.md`).
It sums up everything the owner approved and rejected while making `films/payday-ui` (15 s) and `films/click-30` (30 s), Oct–Nov 2026.

---

## The prompt

You are making short vertical promo reels for **Daily**, an income/expense PWA (https://daily.limonlay.com).
Reply to me in Thai. Use the `daily-reel` skill in `.claude/skills/daily-reel/` (read its SKILL.md first) and start from `template/film.html`.
Reference films: `films/payday-ui/film.html` (15 s, approved) and `films/click-30/film.html` (30 s, v12, approved).

### Format
- 9:16, 1080×1920, 30 fps. Length 15 s or 30 s.
- **Deliver silent.** I add the song in TikTok/IG myself (Golf Clap, start at 1:24.4, 95.7 BPM). Do not make previews with the song; never commit a song.
- Scene changes on the real beats of the song (`scripts/beats.py`, librosa); a moment may leave the beat only if I ask.
- Keep text inside the TikTok safe zone: y ≈ 170–1500, away from the right edge.

### Look (brand: `brand/DESIGN.md`)
- Flat colour only: no gradients, no borders/outlines, no soft shadows (a hard offset shadow is allowed).
- Colours: Prussian `#14213d`, Lemon `#ffd23f`, night `#0a0d14`, cream `#f2f0ea` (cream/white only for paper props like receipts, never as a full-screen ground).
- Google Sans; Material Symbols Rounded (the app's subset font: `insights` for Summary, not `bar_chart`); leaf corners `0 R 0 R`; the lemon is the mascot.
- **Real Daily UI, rebuilt in HTML and really moving** (not screenshots), with the demo data of `brand/screens/shot-en-dark.webp`:
  balance $698.25, income $1,000.00, expenses $301.75; Housing $200, Shopping $57.50, Bills & utilities $25, Entertainment $9.75, Food $8.25.
- Illustrative numbers carry a small "example" tag. Never the word "free" (paid plans are coming).

### Story and copy
**15 s "payday" (films/payday-ui):** hook "where did your $301.75 go??" → "payday." (balance counts up, OCT 1) → "…day 25." / "$301.75 already gone." (counts down, OCT 25)
→ "where did it go?" (categories take over the screen back to back) → "snap the receipt. / Daily logs it for you." (scan line) → "logged." (lemon + "Saved")
→ "now you know. / where every coin goes." → end card: lemon, "Daily", `daily.limonlay.com`, "no download needed".

**30 s "click → it bursts out", sells results (films/click-30):**
1. Hook on frame 0: "where did your **$301.75** go??"
2. Tap **Summary** → categories burst out and replace each other back to back (no app in between): Housing one beat, then the rest every half beat — "there it is."
3. Tap **+** → several receipts in one photo (Coffee House $4.50, Fresh Market $23.80, City Taxi $12.00) land, one scan line sweeps them — "snap them all."
   → back in the app the 3 rows appear with the lemon highlight, lemon + "Saved", "3 receipts. logged."
4. Tap **Budgets ›** → rows slide in, icons pop, all 5 bars fill fast while the amounts count up, a lemon check pops on every row — "set it once." / "under budget. every one."
5. Tap **AI** → a real chat: the question is typed in the input bar ("how much did I spend on food this month?"), sent (bubble flies up), typing dots,
   the answer types out ("$31.40 on food this month. That's 18% less than October." + example tag), "18% less" is wiped in lemon and holds ~1 s — "just ask."
6. "NOV 25 / …day 25 again." balance counts to $843.10, "last month: $698.25", a "+$144.85" chip pops (example) — "same salary. / more left."
7. End card on Prussian (stays Prussian, no colour change): lemon bursts in, "Daily" types, the link pill pops, "no download needed" pops, the link is pressed near the end.

### Motion
- **Hook in the first second**, already visible on frame 0. The story must be clear with the sound off: one idea per beat, a one-line caption under it.
- **Text is typed fast** with a lemon caret; the untyped rest stays invisible so the line never shifts; typing walks through tags (highlight, example chip);
  letters change only between frames (no ghost letter under motion blur). Every line finishes typing before the film ends.
- "Camera inside the app" like the 15 s film: UI zoomed, the camera glides to the target on the beat (snap ~0.45 s, ease-out), a subtle 3D orbit on a wrapper.
- Fast, punchy, dynamic: counters step per frame, categories pop, rows slide, bars fill, receipts land; nothing on screen sits still for more than ~1 s
  (gate G2), end hold ≤ 1.4 s.
- **Taps:** keep them simple — the button presses in on the beat and the next scene bursts out of it (circle from the button). No cursor.
- App motion tokens: ease-out `cubic-bezier(.2,.8,.2,1)`, ~6 % overshoot only on things that "happen".

### Never (all tried and rejected)
- Whole-screen beat punch / zoom-in-and-relax on every beat; jerky bounces, tilt kicks, zoom-through jolts, shakes.
- Particles/confetti; elements slowly floating up and down; a camera that keeps slowly zooming/panning (the "ไหลๆ" drift).
- Zoom framings that jump tight/wide every 2 beats (read as an odd zoom).
- White or cream full-screen grounds; colour changes on the end card; the word "free".
- Ways to show a tap: mouse cursor, finger dot, "tap" label, spotlight, ripple rings, button lifting/turning lemon, corner ticks (read as an ✕),
  button popping out and morphing into the scene, slow motion on the tap, cutting to a big button on a plain ground.
- See-through dark layers over the app, half-faded lemon over another colour (both look muddy).
- Fast flying or expanding shapes (motion blur leaves stepped ghost copies); two scenes on screen at once.

### Sharp render (the skill's scripts)
- Lay the UI out at full size with CSS `zoom` (not `transform: scale`); 3D on a wrapper; no `will-change`.
- `scripts/render.cjs film.html out.mp4 6 30`: 2× supersample → lanczos to 1080×1920, 6 sub-frames over a 180° shutter (never across `window.CUTS`), crf 12.
- `scripts/stills.cjs film.html t,t,t sheet.png` to look before rendering; `scripts/check.py out.mp4 --expect 30 --silent --beats clip_beats.json [--half]`
  must pass G0–G3 (+ G5 when cuts sit on beats).

### Sound (optional, instead of a song)
- Calm and refined, "like an Apple product", made from scratch in code (`scripts/sound.py`, cue sheet `sound.json` + `scripts/cues.cjs`):
  glass touches, FM glass bells, soft breath, felt low hit, a room reverb, all in D major pentatonic. -14 LUFS. No samples, so it may be committed.
  Single sounds: `brand/sound/`. Never a cash register, shutter, scan buzz or heavy booms.

### Process
1. Rough storyboard first (stills sheet), wait for my OK.
2. Build from the template, look at stills, fix overlaps / safe zone / readability.
3. Draft render (SUB=1) + gates, then the master render in the background (~25–30 min for 30 s).
4. Send me the silent mp4; commit the film folder (HTML, mp4, NOTE.md, clip_beats.json) to `main` of daily-marketing. Keep a copy of the previous
   version as `film-vN.html` before a big change, and say what changed in Thai, honestly (gate results included).
