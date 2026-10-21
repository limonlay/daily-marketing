# Six looks for Daily films

All six obey SKILL.md's non-negotiables. Pick one per film; mixing two is fine only if one clearly leads.

## 1. apple — calm product poster (`apple/film.html`)
When: launch, "premium" brand piece, App-Store-like feel. Dark `#0a0d14` + cream type; one object at a time; slow push-in on the whole stage (`scale(1 + t*.004)`); the real screen rises like a product shot; three short statements one by one; lemon end card.
Timing: long eases (1-1.4 s `out`), fades only on single objects, never between scenes. Music: soft, or the 128 track at -18 LUFS under picture.
Watch: too still (G2). Keep a drift on every scene.

## 2. beat — hard cuts on every beat (`apple/beat.html`)
When: TikTok hook, "everything Daily does in 15 s". Each scene 1-4 beats; flat colour blocks change per scene (lemon / prussian / cream / night); one word or one shape per beat; a beat punch (`punch(t,.07)`); one 4-beat scene for the real screen.
Watch: the one-word-per-beat list can read as a slogan triplet; keep copy concrete (scan, ask AI, see the chart). House-style traps: a giant cropped DAILY and colour floods between every beat; use each at most once.

## 3. collage — halftone paper collage, stop-motion (`apple/collage.html`)
When: "art" pieces, seasonal posts, Lemon8/Instagram. Flat colour field; paper pieces (receipt, coins, bars, chat bubbles, the real screen as a cut-out) slide in and land ON beats; halftone = SVG `<pattern>` of flat dots (no gradients); film grain = `feTurbulence` overlay at ~.18 multiply; the whole film steps at 12 fps (`t = floor(T*12)/12`) with a seeded 1-3 px jitter per step for a hand-placed feel; hard offset shadow under paper.
Do not add cream keylines (borders are banned) or soft paper shadows (the original gbro look has both).

## 4. kinetic — type only (`kinetic/type.html`)
When: lyric-style posts, a single idea ("salary in… where did it go?"), languages where the screen is not translated yet. Techniques: mask-up by line (`rise`), word stagger 0.5 beat, variable weight morph (`font-variation-settings "wght"` 100→700 on Anuphan / Google Sans Flex), blur-in once, text on an SVG path for a repeated word, clip-path wipe for the URL.
Thai: by word or line only. Easing: easeOutExpo for enters; stagger lines 60-100 ms, words 40-70 ms off the beat grid.
Watch: type alone was called "too sparse" by the user of motionmaxxing; add one real screen or the lemon if it feels empty.

## 5. story — one task, start to finish (`motionmaxxing/index.html`)
When: explain a feature (scan a receipt, ask AI, set a budget). One specific case with real content: hook (the habit) → the real screen doing it (camera dives into the list / the card) → the result → lemon CTA. Every beat buys one belief; objects carry across cuts (the receipt drops into the list; the card's lemon becomes the logo).
Gates from motionmaxxing that apply: proof UI >= 0.55 W, one hero per frame, CTA <= 25 %, end hold 0.6-1.4 s or ending in motion, no header-like bar near the top edge.

## 6. splash — Lottie logo sting (`lottie/daily-splash.json`)
When: app splash, 2-3 s intro/outro for other films. Lemon (PNG asset: SVG images do not render in Skottie) drops with one squash, wordmark rises, lemon bar slides under. Author the JSON in code (Python dict → json), preview with the diffusionstudio/lottie player (`npm install`, `npx vite`, `?frame=N`), record the canvas for an mp4. In the app it needs a Lottie player and a PR in `limonlay/daily`.

## Sound for any look
128 BPM code track by default; Mixkit SFX (free) for UI moments: click 1125, soft tick 1117, check 1113, toggle 1120 (`https://assets.mixkit.co/active_storage/sfx/<id>/<id>-preview.mp3`), placed at their measured peak, gain .04-.3, one to three hero hits with silence before them. Master at -14 LUFS.
