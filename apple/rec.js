const {chromium}=require('playwright');const fs=require('fs');
const N=+process.argv[2]||450, only=process.argv[3];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1920}});
if(process.env.BEATS)await p.addInitScript(b=>{window.BEATS=b},JSON.parse(fs.readFileSync(process.env.BEATS,'utf8')));await p.goto('file://'+__dirname+'/'+(process.env.PAGE||'film.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
fs.mkdirSync(process.env.OUT,{recursive:true});
const list=only?only.split(',').map(Number):[...Array(N).keys()];
for(const i of list){await p.evaluate(t=>render(t),i/30);await p.screenshot({path:`${process.env.OUT}/${String(i).padStart(4,'0')}.png`});}
await b.close();})();
