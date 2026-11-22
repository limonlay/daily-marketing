// node platforms/build.mjs → platforms/KIT.md (everything, for the repo) + platforms/page/index.html + page/img/*.webp (the owner's page)
// Also checks every text that has a platform limit.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { kit } from './kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const IMG = path.join(HERE, 'out', 'img');
const PAGE = path.join(HERE, 'page');
const LANG = { th: 'ไทย', en: 'English', ja: '日本語', ko: '한국어', 'zh-CN': '简体中文', 'zh-TW': '繁體中文', vi: 'Tiếng Việt', id: 'Bahasa Indonesia', ms: 'Bahasa Melayu', es: 'Español', pt: 'Português', fr: 'Français', de: 'Deutsch', it: 'Italiano', nl: 'Nederlands', pl: 'Polski', tr: 'Türkçe', ru: 'Русский' };

// ---- limits (X counts CJK as 2; everything else counts code points) ----
const wide = (s) => Array.from(s).reduce((n, ch) => n + (/[ᄀ-ᅟ⺀-꓏가-힣豈-﫿＀-｠　-〿぀-ヿ]/.test(ch) ? 2 : 1), 0);
let bad = 0;
for (const p of kit.platforms) for (const b of p.bio || []) {
  const n = p.id === 'x' ? wide(b.text) : Array.from(b.text).length;
  b.count = n;
  if (n > b.limit) { bad++; console.warn(`OVER ${p.id} ${b.lang} ${b.label || 'bio'}: ${n}/${b.limit}`); }
}
console.log(bad ? `${bad} text(s) over the limit` : 'all limits ok');

// ---- images: list + webp thumbnails for the page ----
const images = fs.readdirSync(IMG).filter((f) => f.endsWith('.png')).sort();
fs.mkdirSync(path.join(PAGE, 'img'), { recursive: true });
execFileSync('python3', ['-I', '-c', `
import sys, os
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
for f in sorted(os.listdir(src)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(src, f)).convert('RGB')
    im.thumbnail((560, 560))
    im.save(os.path.join(dst, f[:-4] + '.webp'), 'WEBP', quality=82)
`, IMG, path.join(PAGE, 'img')]);
const dims = Object.fromEntries(images.map((f) => {
  const m = f.match(/(\d+)x(\d+)\.png$/) || f.match(/-(\d+)\.png$/);
  return [f, m ? (m[2] ? `${m[1]}×${m[2]}` : `${m[1]}×${m[1]}`) : ''];
}));
const videos = fs.readdirSync(path.join(HERE, 'out', 'video')).filter((f) => f.endsWith('.mp4')).sort();

// ---- KIT.md ----
const q = (t) => '```\n' + t + '\n```';
let md = `# Daily — marketing kit for every platform\n\nUpdated ${kit.updated}. Source: \`platforms/kit.mjs\` (edit there, then \`node platforms/build.mjs\`). Images: \`node platforms/render.cjs\` → \`platforms/out/img/\`. Videos: \`platforms/cutdowns.sh\` → \`platforms/out/video/\`.\nOwner notes are Thai; every post text is in the language it is posted in.\n\n`;
md += `## กติกาทุกแพลตฟอร์ม\n${kit.rules.map((r) => `- ${r}`).join('\n')}\n\n## ชื่อบัญชี (เช็กว่าว่างก่อน)\n${kit.handles.map((h) => `- ${h.where}: \`${h.handle}\``).join('\n')}\n\n`;
md += `## แผน 6 สัปดาห์\n${kit.calendar.map((w) => `### ${w.week}\n${w.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}\n\n`;
md += `## แพลตฟอร์ม\n`;
for (const p of kit.platforms) {
  md += `\n### ${p.name} · Tier ${p.tier}\n**ภาษา:** ${p.langs}  \n**ทำไม:** ${p.why}\n\n`;
  if (p.setup) md += `**ตั้งค่า**\n${p.setup.map((s) => `- ${s}`).join('\n')}\n\n`;
  for (const b of p.bio || []) md += `**${b.label || 'Bio'} (${LANG[b.lang] || b.lang}, ${b.count}/${b.limit})**\n${q(b.text)}\n\n`;
  if (p.specs) md += `**ขนาด / สเปก**\n${p.specs.map((s) => `- ${s}`).join('\n')}\n\n`;
  if (p.rhythm) md += `**ความถี่:** ${p.rhythm}\n\n`;
  if (p.tips) md += `**เคล็ดลับ**\n${p.tips.map((s) => `- ${s}`).join('\n')}\n\n`;
  if (typeof p.posts === 'string') md += `**โพสต์:** ${p.posts}\n\n`;
  else for (const x of p.posts || []) md += `**โพสต์: ${x.title} (${LANG[x.lang] || x.lang})**${x.img ? ` · รูป \`${x.img}\`` : ''}\n${q(x.text)}\n\n`;
  if (p.images) md += `**รูป:** ${p.images.map((i) => `\`${i}\``).join(' · ')}\n`;
}
md += `\n## คอนเทนต์ (โพสต์ซ้ำได้ทุกช่องวิดีโอแนวตั้ง)\n`;
for (const c of kit.pieces) {
  md += `\n### ${c.id} ${c.name}\nไฟล์: ${c.asset} · ช่วงที่ลง: ${c.when}\n\n`;
  for (const [l, t] of Object.entries(c.captions)) md += `**${LANG[l]}**\n${q(t)}\n\n`;
}
md += `\n## ตามเทศกาล\n`;
for (const s of kit.seasonal) md += `\n**${s.date} · ${s.name}** (${s.where})\n${q(s.text)}\n`;
md += `\n## แนะนำ 18 ภาษา (ชื่อ + คำอธิบาย YouTube, โพสต์กลุ่ม)\n`;
for (const [l, v] of Object.entries(kit.intro)) md += `\n**${LANG[l]}** · ชื่อคลิป: ${v.hook} · Daily\n${q(`${v.hook}\n${v.text}\n${v.cta}\n${v.tags}`)}\n`;
md += `\n## FAQ (คำตอบสำเร็จรูป)\n`;
for (const f of kit.faq) md += `\n### ${f.q}\n${Object.entries(f.a).map(([l, t]) => `**${LANG[l]}**\n${q(t)}`).join('\n\n')}\n`;
md += `\n## SEO (บทความบนเว็บ Daily: งานฝั่งแอป ผ่าน Planner)\n| ภาษา | คำค้น | หัวข้อบทความแรก |\n|---|---|---|\n${kit.seo.map((s) => `| ${LANG[s.lang]} | ${s.kw} | ${s.title} |`).join('\n')}\n`;
md += `\n## วิดีโอที่มีแล้ว\n${kit.films.map((f) => `- **${f.name}**: ${f.files.map((x) => `\`${x}\``).join(' · ')}`).join('\n')}\n`;
md += `\n## รูปทั้งหมด (${images.length})\n${images.map((f) => `- \`platforms/out/img/${f}\` ${dims[f]}`).join('\n')}\n`;
md += `\n## วัดผล\n${kit.measure.map((m) => `- ${m}`).join('\n')}\n\n## งานถัดไป\n${kit.next.map((m) => `- ${m}`).join('\n')}\n`;
fs.writeFileSync(path.join(HERE, 'KIT.md'), md);

// ---- page ----
const data = { ...kit, LANG, images: images.map((f) => ({ f, d: dims[f] })), videos };
const tpl = fs.readFileSync(path.join(PAGE, 'template.html'), 'utf8');
const json = JSON.stringify(data).replace(/</g, '\\u003c');
fs.writeFileSync(path.join(PAGE, 'index.html'), tpl.replace('/*KIT_JSON*/null', json));
console.log(`KIT.md + page/index.html · ${images.length} images · ${videos.length} videos`);
