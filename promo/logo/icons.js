const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
let p=await b.newPage({viewport:{width:1024,height:1024}});
await p.goto('file://'+__dirname+'/lemon-t.html');await p.waitForTimeout(400);
// tight crop of the lemon (incl. its soft shadow)
await p.screenshot({path:__dirname+'/lemon-t.png',omitBackground:true,clip:{x:100,y:290,width:800,height:560}});
const img='data:image/png;base64,'+fs.readFileSync(__dirname+'/lemon-t.png').toString('base64');
const out='/home/user/daily/icons/';
// scale = lemon width relative to the tile; maskable keeps it in the 80% safe circle
const tile=(size,scale,radius=0,bg='#14213d')=>`<body style="margin:0"><div style="width:${size}px;height:${size}px;background:${bg};border-radius:${radius}px;display:flex;align-items:center;justify-content:center;overflow:hidden">
<img src="${img}" style="width:${Math.round(size*scale)}px;transform:translateY(${Math.round(size*.03)}px) rotate(-14deg)"></div></body>`;
for(const [name,size,scale] of [['icon-512.png',512,.86],['icon-192.png',192,.86],['maskable-512.png',512,.66],['apple-touch-icon.png',180,.84],['favicon-32.png',32,1.02]]){
  await p.setViewportSize({width:size,height:size});await p.setContent(tile(size,scale));await p.waitForTimeout(100);
  await p.screenshot({path:out+name,clip:{x:0,y:0,width:size,height:size}});}
// SVG versions embed the bitmap (keeps the detailed look)
const svg=(scale)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#14213d"/><image href="${img}" x="${256-256*scale}" y="${256-256*scale*.7+15}" width="${512*scale}" height="${512*scale*.7}" transform="rotate(-14 256 256)"/></svg>`;
fs.writeFileSync(out+'icon.svg',svg(.86));fs.writeFileSync(out+'maskable.svg',svg(.66));
// preview sheet
await p.setViewportSize({width:900,height:300});
const f=n=>'data:image/png;base64,'+fs.readFileSync(out+n).toString('base64');
await p.setContent(`<body style="margin:20px;display:flex;gap:28px;align-items:end;background:#e9e9ee;font:14px sans-serif">
<div><img src="${f('icon-512.png')}" style="width:200px;border-radius:44px"><br>ไอคอนแอป</div>
<div><img src="${f('maskable-512.png')}" style="width:200px;border-radius:100px"><br>Android (วงกลม)</div>
<div><img src="${f('apple-touch-icon.png')}" style="width:120px;border-radius:27px"><br>iPhone</div>
<div><img src="${f('favicon-32.png')}" style="width:32px"> <img src="${f('favicon-32.png')}" style="width:64px;image-rendering:pixelated"><br>แท็บเบราว์เซอร์ (32px, ขยาย)</div></body>`);
await p.screenshot({path:__dirname+'/icon-preview.png'});await b.close();})();
