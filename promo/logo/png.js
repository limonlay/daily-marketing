const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
const d='/home/user/daily/icons/';const u=n=>'data:image/svg+xml;base64,'+fs.readFileSync(d+n).toString('base64');
for(const [src,out,size] of [['icon.svg','icon-512.png',512],['icon.svg','icon-192.png',192],['maskable.svg','maskable-512.png',512],['icon.svg','apple-touch-icon.png',180],['icon.svg','favicon-32.png',32]]){
 await p.setViewportSize({width:size,height:size});await p.setContent(`<body style="margin:0"><img src="${u(src)}" style="width:${size}px;height:${size}px;display:block"></body>`);
 await p.waitForTimeout(150);await p.screenshot({path:d+out});}
await b.close();})();
