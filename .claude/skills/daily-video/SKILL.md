---
name: daily-video
description: Make short promo videos for Daily (the income/expense PWA at daily.limonlay.com) in pure code, free: TikTok/Reels/Shorts 9:16 clips, 1:1/4:5/16:9 cut-downs, logo stings, app demos, beat-cut or paper-collage or kinetic-type films, Lottie splashes. Use when the owner asks for a Daily clip, reel, promo, ad, intro, or to change one's music, timing, copy or language. Follows brand/DESIGN.md (flat colour, Prussian + Lemon, leaf corners, real app UI) and ships through scripted gates.
---

# daily-video

One HTML page whose picture is a pure function of time (`window.render(t)`), rendered frame by frame with Playwright, encoded with ffmpeg, cut to a 128 BPM grid or a real song's beats, checked by script. Everything is free: no paid AI, no editor, no licence.
Built from what worked in Oct 2026 tests (motionmaxxing, RuiC motion reel, beat-synced-edit, kinetic-typography, text-to-lottie, howseen motion-design, a code remake of the gbro paper-collage look). `SKILL` = this folder; work in a new folder per film at the repo root (e.g. `films/<name>/`).

## Non-negotiables (from the owner and brand/DESIGN.md)
1. **Flat colour only.** No gradients, borders/outlines/dividers, outline text, soft or blurred shadows. One allowed shadow: hard offset, no blur (`.hard`). Separate things with colour blocks and space. The lemon drawing is the only shaded thing.
2. **Palette:** Prussian `#14213d`, Lemon `#ffd23f` (accent, one meaning: "Daily did it / done"), Lemon ink `#876800` (lemon text on light), night `#0a0d14`, cream `#f2f0ea`, paper `#FAF9F6`, over-budget `#d9480f` only for over budget. Never the old orange `#fca311`.
3. **Type:** Google Sans (Latin; `Google Sans Flex` for weight morphs), Anuphan (Thai), Big Shoulders Display 900 only for poster numerals/DAILY. Google Fonts only. Thai is split by word or line, never by character (marks must stay on their base letter); masks need padding `.06em 0 .16em`.
4. **Shapes:** leaf corners `0 R 0 R`; solid circles, squares, the drop `50% 50% 0 50%`. The mascot is the **whole** lemon (`brand/lemon.svg`), never a half. The name is "Daily" (no ฿ after it).
5. **Real product only.** App screens are real Daily UI: `brand/screens/shot-<lang>-<dark|light>.webp` (demo data), magnified to >= 0.55 of the frame width so text reads on a phone. Never invent a feature, a screen or a stat. Illustrative props (a café receipt) are fine; say so in NOTE.md.
6. **Global.** Copy and money follow the viewer's language and currency; no "baht" outside Thai; amounts right-aligned with the unit as in the app.
7. **Voice:** friendly, short, practical; no finance jargon; never shame spending; no slogan triplets ("Free. Fast. Simple."), no "Unlock / Meet X / the future of".
8. **No page chrome:** no corner labels, counters ("01 / 03"), progress bars, timecodes, header/footer bars, kicker-above-headline, left headline + right device deck layouts.
9. **Honest claims.** "Free" only while it is true (a Pro plan is being drafted; AI has daily caps). Check `BRIEF.md`.

## Flow (always this order)
1. **Brief (5 lines in `films/<name>/STORYBOARD.md`):** problem, audience, goal, emotion, the ONE true thing the film shows. Pick the style from `references/styles.md` (apple, beat, collage, kinetic, story, splash) and say why in one line. Ask the owner only if the language, length or format is unclear; default = Thai, 15 s, 9:16.
2. **Beat map:** 128 BPM = beat 0.46875 s = 14.0625 frames; 32 beats = 15.000 s. Every scene starts on a beat, the key visual (logo, the app doing the thing) on a downbeat. Table: beat range, role (hook / proof / cta), what the viewer now believes, copy, what moves. Hook <= 3 s; proof is the largest share; CTA <= 25 % of the film.
3. **Build** from `template/film.html` (copy it, plus `brand/lemon.svg` and the screenshot as `screen.webp`, into the film folder). Use the kit: `tb(beat)`, `beatAt(t)`, `enter`, `rise`, `punch`, `settle`, eases, `rng(seed)`. Rules: everything from `t` (no timers, CSS animations, `Math.random`, `Date`); entries start on a beat and decelerate (no bounce; at most one `settle` per film); something is always moving (push-in, drift, float); cut on motion; the last frame is still moving or a designed hold <= 1.4 s.
4. **Stills first:** `node SKILL/scripts/render.mjs film.html --stills 1,4,8,12,14.5 --out st` → Read `st/sheet.png`, describe each frame in one sentence, fix, repeat. Only then render the film.
5. **Music:** default `SKILL/assets/daily-track-128bpm.wav` (made in code with RuiC, no licence issues): `python3 SKILL/scripts/beats.py <track> --bpm 128 --offset 0`. Another song: Mixkit (free commercial, `https://assets.mixkit.co/music/<id>/<id>.mp3`) or YouTube Audio Library → `python3 SKILL/scripts/beats.py song.mp3` (finds tempo + drop, prints the offset, writes `beats.json` in film time); trim with `ffmpeg -ss <offset>`. Normalise to -14 LUFS (`-af loudnorm=I=-14:TP=-1.5`). Trending TikTok/IG music is added by the owner in CapCut: then also export a silent version.
6. **Render:** draft `node SKILL/scripts/render.mjs film.html --out draft.mp4 --audio track.wav --beats beats.json`; master adds `--sub 4` (motion blur). Other formats from the same page: `--w 1080 --h 1080`, `--w 1080 --h 1350`, `--w 1920 --h 1080` (lay out in % / rem, check stills per format, never crop).
7. **Gates:** `python3 SKILL/scripts/check.py final.mp4 --expect 15 --beats beats.json` → G0 render, G1 no flat run > 3 frames, G2 no frozen stretch > 1 s, G3 end hold <= 1.4 s, G4 -14 LUFS / TP <= -1, G5 cuts on beats. A FAIL is fixed, never argued. Then open `final_contact.png` and `final_phone.png` and score 1-10: hook in 2 s, readable at 360 px, motion, variety every 2-4 s, brand, sync. Fix anything <= 7.
8. **Deliver:** `final.mp4` (+ silent version if music goes in CapCut), the HTML, `NOTE.md` (idea, beats, what is real vs illustrative, gate numbers quoted, what you would still improve). Commit the film folder (not frames or drafts). Send the mp4 to the owner and say in Thai what to check.

## Cloud session notes
Chromium: `/opt/pw-browsers/chromium` (render.mjs finds it; `--no-sandbox` is set). Playwright: global `/opt/node22/lib/node_modules` (render.mjs falls back to it). Fonts load from Google Fonts. WebGL is CPU-only here (a WebGL logo intro did not finish in an hour): stay on DOM/SVG/canvas 2D. librosa is optional for `beats.py` (pip install takes minutes; the ffmpeg fallback is fine for steady pop/EDM tracks).

## Files
| file | use |
|---|---|
| `template/film.html` | start here: tokens, kit, a 3-act example (hook receipt → real app → lemon CTA) that passes all gates |
| `scripts/render.mjs` | stills sheet or MP4; `--audio`, `--beats`, `--sub`, `--w/--h`, `--from/--to` |
| `scripts/beats.py` | tempo, drop, offset, `beats.json` in film time |
| `scripts/check.py` | gates G0-G5 + contact and phone sheets |
| `references/styles.md` | the six looks with recipes and when to use each |
| `assets/daily-track-128bpm.wav` | 15 s code-made track, 128 BPM, exact grid from 0 s |
| `assets/lemon.svg` | the mascot (same as `brand/lemon.svg`) |
Past films to copy from: `apple/` (film, beat, collage), `kinetic/`, `motionmaxxing/`, `lottie/` at the repo root.
