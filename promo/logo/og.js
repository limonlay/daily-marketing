const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1200,height:630}});
const d=n=>'data:image/png;base64,'+fs.readFileSync(__dirname+'/'+n).toString('base64');
await p.setContent(`<body style="margin:0;position:relative;width:1200px;height:630px;background:url(${d('og-old.png')})">
<div style="position:absolute;left:860px;top:0;width:340px;height:251px;background:#fff"></div>
<div style="position:absolute;left:1104px;top:249px;width:96px;height:100px;background:#fff"></div>
<div style="position:absolute;left:1064px;top:249px;width:42px;height:42px;background:#fff;overflow:hidden"><div style="position:absolute;left:-30px;top:1px;width:71px;height:80px;background:#e4e4e4;border-top-right-radius:28px"></div></div>
<div style="position:absolute;left:0;top:0;width:110px;height:64px;background:#fff"></div>
<div style="position:absolute;left:0;top:64px;width:64px;height:40px;background:#fff"></div>
<div style="position:absolute;left:64px;top:64px;width:40px;height:30px;background:#14213d"></div>
<div style="position:absolute;left:110px;top:112px;width:200px;height:70px;background:#14213d;display:flex;align-items:center;gap:8px;padding-left:10px;font:700 44px Arial,Helvetica,sans-serif;color:#fff;letter-spacing:-.5px">Daily<img src="data:image/svg+xml;base64,${fs.readFileSync('/home/user/daily/icons/lemon.svg').toString('base64')}" style="width:46px"></div>
<img src="data:image/svg+xml;base64,${fs.readFileSync('/home/user/daily/icons/lemon.svg').toString('base64')}" style="position:absolute;left:830px;top:8px;width:330px"></body>`);
await p.waitForTimeout(200);await p.screenshot({path:'/home/user/daily/icons/og.png'});await b.close();})();
