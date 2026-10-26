// node rec.cjs <outDir> [t,t,...]   (no list = all 450 frames)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/film.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
const ts=process.argv[3]?process.argv[3].split(',').map(Number):[...Array(450).keys()].map(i=>i/30);
for(const [i,t] of ts.entries()){await p.evaluate(t=>render(t),t);await p.screenshot({path:`${out}/${String(process.argv[3]?i:Math.round(t*30)).padStart(4,'0')}.png`});}
await b.close()})();
