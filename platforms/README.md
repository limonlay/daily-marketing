# platforms/ — marketing kit for every platform

One kit for all channels: plan, profile texts, ready-to-post captions (18 languages), images in each platform's sizes, and video cut-downs.
The owner uses it from the published page (Thai UI, copy buttons); everything is also in `KIT.md`.

| file | what |
|---|---|
| `kit.mjs` | **source of truth**: rules, handles, 6-week calendar, 23 platforms (setup, bios with limits, specs, rhythm, posts), content pieces P1–P10, seasonal posts, 18-language intros, FAQ, SEO keywords |
| `KIT.md` | generated from `kit.mjs` (read this one) |
| `art/` | HTML art for every image (`art.js` = layouts + copy + job list); fonts are the app's self-hosted OFL files, CJK from Google Fonts |
| `render.cjs` | renders `art/` → `out/img/*.png` (`node platforms/render.cjs [filter]`) |
| `cutdowns.sh` | approved 9:16 reels → 16:9 and 1:1 (`out/video/`) |
| `build.mjs` | checks text limits, writes `KIT.md` + `page/index.html` + `page/img/*.webp` |
| `page/` | the owner's page (published as an artifact) |

Rebuild all: `node platforms/render.cjs && platforms/cutdowns.sh && node platforms/build.mjs`.

Rules (also at the top of `kit.mjs`): flat brand art per `brand/DESIGN.md`; real app screens only (`brand/screens`); demo numbers tagged "example" in the
viewer's currency; never the word "free" in posts; claims must match the live app (pricing / docs pages in `limonlay/daily`); always disclose
that the poster makes Daily (no fake reviews); no exchange-rate provider names.
