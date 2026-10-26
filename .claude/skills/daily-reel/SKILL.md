---
name: daily-reel
description: Make a short vertical promo reel for Daily (TikTok / Reels / Shorts, 9:16, ~15 s) the way the owner approved in Oct 2026 — the real Daily UI rebuilt in HTML and animated (numbers count, categories pop, rows appear), cut to the REAL beats of a song the owner picks, fast typed text, smooth camera, sharp + motion-blurred render, delivered silent. Use for any new Daily reel, a new language/version of one, or changes to films/payday-ui.
---

# daily-reel

Reference film: `films/payday-ui/` ("where did your $301.75 go??", v13). `template/film.html` is a copy of it: start every new reel from it.
Work in `films/<name>/`. Reply to the owner in Thai.

## What the owner wants (learned the hard way — follow all)
- **UI that really moves, not screenshots.** Rebuild the Daily screen in HTML with the app's own dark tokens, icon font (`material-symbols-rounded.woff2`) and the demo data of the matching screenshot in `brand/screens/` (never invent numbers or features). Numbers count, categories pop, the new row appears with the app's lemon highlight (fades in 1.2 s), lemon + "Saved".
- **A hook in the first second** that makes it personal and opens a question ("where did *your* $301.75 go??"), already visible on frame 0; the film answers it.
- **Story must be understandable** without sound: a date chip (OCT 1 → OCT 25), a one-line explanation under each beat ("$301.75 already gone.", "snap the receipt. / Daily logs it for you."), one idea per beat, readable takeovers (≥ 1 beat each).
- **Fast, heavy, but smooth.** Camera moves, 3D swing/orbit (perspective on a wrapper), full-screen category takeovers on the beats, receipt scan line. **Never**: whole-screen beat punch, tilt kicks, zoom-through jolts, shakes, particles/confetti.
- **Text is typed fast** (~40–55 chars/s) with a lemon caret; the untyped rest stays invisible so lines never shift. Every line must finish typing before the film ends (end card typed by ~14 s, then a short hold).
- **No white or cream full-screen grounds.** Use night `#0a0d14`, black, Prussian `#14213d`, Lemon `#ffd23f` grounds. Paper props (a receipt) may be white.
- **No "free"** in the copy (paid plans are coming). End card: lemon, "Daily", `daily.limonlay.com`, "no download needed".
- **Deliver silent.** The owner adds the song in TikTok/IG. Make a preview with the song only to check timing; never commit the song (copyright).
- **TikTok safe zone:** keep text between y ≈ 170 and 1500 and away from the right edge; use flat bands (night) behind text over the UI.
- **Sharp.** Lay the UI out at full size with CSS `zoom` (not `transform: scale` — that scales a bitmap and blurs); no `will-change`; render at 2x and downscale (render.cjs). Counters step per frame so digits stay sharp under motion blur.
- DESIGN.md still applies: flat colour, no gradients/borders/soft shadows (hard offset shadow OK), leaf corners, Google Sans, app motion tokens (ease-out `cubic-bezier(.2,.8,.2,1)`, ~6% overshoot only on things that "happen").

## Flow
1. **Storyboard first** (6 panels, rough): copy `films/payday-en/boards.html` style → send the sheet, wait for OK.
2. **Song:** owner sends an mp3. `python3 SKILL/scripts/beats.py song.mp3 --scan` to see tempo + energy; pick 15 s with a dip for the "turn" and a jump (drop) for the payoff; then `--start <s>` → `clip_beats.json` + strength per beat. Put the hook number, the payoff ("Saved") and the logo on strong hits.
3. **Build** from `template/film.html`: edit `BEATS` (paste `clip_beats.json`), `CUT` (scene → beat index), `CAM` keys, copy, demo data. Every scene starts on a beat. `window.CUTS` must list the cut times.
4. **Look:** `node SKILL/scripts/stills.cjs film.html 0,1.5,3.9,5.6,8.4,10.5,13.9 sheet.png` → Read it; check overlaps, safe zone, readability. Fix, repeat.
5. **Render:** `node SKILL/scripts/render.cjs film.html <name>.mp4` (background, ~10–15 min). Preview: `ffmpeg -i <name>.mp4 -ss <start> -t 15 -i song.mp3 -map 0:v -map 1:a -c:v copy -af "afade=t=out:st=14.2:d=0.8,loudnorm=I=-14:TP=-1.5" -c:a aac -shortest preview.mp4` (scratchpad, not the repo).
6. **Gates:** `python3 SKILL/scripts/check.py preview.mp4 --expect 15 --beats clip_beats.json` → no flat run, nothing frozen > 1 s, end hold ≤ 1.4 s, every cut on a beat. Look at the contact sheet it writes.
7. **Deliver:** send the preview (with song) + the silent mp4; tell the owner the song start time to set in TikTok. Commit the film folder (HTML, silent mp4, NOTE.md, clip_beats.json) to `main`.

## Files
| file | use |
|---|---|
| `template/film.html` | the approved reel: UI rebuild, typing, takeovers, camera, end card; tokens + kit at the top of the script |
| `template/material-symbols-rounded.woff2`, `lemon.svg` | icon font and mascot (copy next to the film) |
| `scripts/beats.py` | real beats + strength of a song section (librosa) |
| `scripts/stills.cjs` | 2x stills sheet of chosen moments |
| `scripts/render.cjs` | sharp + motion-blurred silent master |
| `scripts/check.py` | gates + contact/phone sheets |
