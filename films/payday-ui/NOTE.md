# payday-ui — "Payday → day 25", English, 15 s, animated UI (no screenshots)

The Daily home screen is rebuilt in HTML with the app's own dark-theme tokens, icon font (`material-symbols-rounded.woff2` from limonlay/daily) and the English demo data ($1,000 income, $301.75 expenses → $698.25; categories and rows as in `icons/shot-en-dark.webp`). Numbers count, categories pop on the beat, the new Coffee row appears with the app's lemon highlight (fades in 1.2 s), lemon + "Saved".

Timing: the song's REAL beats (librosa via beat-synced-edit: 95.7 BPM, `clip_beats.json`), not a fixed grid. Earlier 129.2 BPM guess was wrong. Song: "Golf Clap" (Frak / Nef the Pharaoh). Song section used for the preview: 84.36–99.36 s → the 2-beat dip lands on "…day 25.", the drop (93.18 s) lands on "Saved" (beat 19).
The song is NOT in this repo (copyright): `payday-ui.mp4` is silent. Add the sound in TikTok/IG from their library, starting at ~1:24.
Motion follows DESIGN.md tokens: ease-out cubic-bezier(.2,.8,.2,1), ~6% overshoot only on things that happen.

Motion blur: `node rec-blur.cjs <dir> 6` renders 6 sub-frames per frame over a 180° shutter (never across a cut); ffmpeg `tmix=frames=6` averages them. Counters step per frame so digits stay sharp.

Camera (v4): no beat punch (owner removed it); a small alternating tilt on every beat (stronger on hits 4, 7, 12, 19, 21); camera keys SNAP in 0.28 s (expo-out) and creep after; zoom-through on every cut; snap-zoom onto the balance on the first strong hit; dutch tilt on "where did it go?". Gates: 14/14 cuts on a beat, motion 4.6/255.

v5: no beat punch, no tilt kick, no zoom-through (owner: no jerky bounces). Camera moves glide with the app ease-out over 0.5 s.
