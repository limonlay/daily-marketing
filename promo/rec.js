const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/promo.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
for(let i=0;i<450;i++){await p.evaluate(t=>render(t),i/30);await p.screenshot({path:`f/${String(i).padStart(4,'0')}.png`});}
await b.close();})();
