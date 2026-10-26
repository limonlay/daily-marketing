// Motion blur: SUB sub-frames per frame over a 180° shutter, averaged in ffmpeg (tmix).
// Sub-frames never cross a hard cut (they are clamped to the frame's own side of the cut).
// node rec-blur.cjs <outDir> [SUB=6]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const out=process.argv[2], SUB=+(process.argv[3]||6), FPS=30, SHUT=.5/FPS, BEAT=60/129.2;
const CUTS=[4,8,16,19,22,27].map(b=>b*BEAT);
(async()=>{fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/film.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
let n=0;for(let f=0;f<450;f++){const t=f/FPS;
  const next=CUTS.find(c=>c>t); for(let s=0;s<SUB;s++){let ts=t+SHUT*s/SUB; if(next!==undefined&&ts>=next) ts=next-1e-4;
    await p.evaluate(t=>render(t),ts);await p.screenshot({path:`${out}/${String(n++).padStart(6,'0')}.png`});}}
await b.close()})();
