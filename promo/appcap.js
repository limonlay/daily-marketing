// Captures real Daily add-entry states (stubbed Supabase) for the promo.
const { chromium } = require('playwright');
const fs=require('fs');const src=fs.readFileSync(__dirname+'/../full.js','utf8');
let stub=eval(src.slice(src.indexOf('const stub = `')+13, src.indexOf('`;\nconst checks'))+'`');stub=stub.replace("return res({data:[],error:null}); }","if(st.op==='insert'){const r={id:99,type:'expense',amount:65,currency:'THB',date:localISO(new Date()),category:'อาหาร',note:'กาแฟ',recurring_id:null,base_amount:65,base_currency:'THB'};return res({data:r,error:null});} return res({data:[],error:null}); }");
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>console.log('C',m.text()));
await p.route(/jsdelivr/,r=>r.fulfill({contentType:'text/javascript',body:stub}));
await p.route(/frankfurter/,r=>r.fulfill({contentType:'application/json',body:'{"rates":{"USD":0.0308,"THB":32.5}}'}));
await p.addInitScript(()=>{localStorage.setItem('daily-theme','light');localStorage.setItem('daily-pk-asked','1');localStorage.setItem('daily-lang','th')});
await p.goto('http://localhost:8765/index.html',{waitUntil:'networkidle'}).catch(()=>{});
await p.waitForTimeout(1800);fs.mkdirSync(__dirname+'/app',{recursive:true});
let i=0;const s=async(ms=0)=>{if(ms)await p.waitForTimeout(ms);await p.screenshot({path:`${__dirname}/app/${String(i++).padStart(2,'0')}.png`})};
await s();                                   // 00 home
await p.click('#fab');for(let k=0;k<4;k++)await s(70); // 01-04 sheet opening
await s(250);                                // 05 open
await p.type('#amount','6');await s(60);     // 06
await p.type('#amount','5');await s(60);     // 07
await p.click('#sheet [data-c="อาหาร"]');await s(150); // 08 category
for(const ch of ['ก','กา','กาแ','กาแฟ']){await p.fill('#note',ch);await s(30);} // 09-12
await p.locator('#saveBtn').hover();await s(); // 13
await p.click('#saveBtn');for(let k=0;k<4;k++)await s(90); // 14-17 closing/saved
await s(500);                                // 18
await p.click('.tab[data-tab="sum"]');await s(400); // 19 summary
for(let k=0;k<4;k++){await p.evaluate(y=>scrollTo({top:y}),(k+1)*120);await s(60);} // 20-23 scroll
await b.close();})();
