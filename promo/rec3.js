const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/promo3.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
for(let i=0;i<300;i++){await p.evaluate(t=>render(t),i/30);await p.evaluate(()=>Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>i.onload=r))));await p.screenshot({path:`f3/${String(i).padStart(4,'0')}.png`});}
await b.close();})();
