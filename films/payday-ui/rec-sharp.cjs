// Sharp + motion-blurred master: renders at 2x (2160x3840), SUB sub-frames per frame over a 180° shutter
// (never across a cut), pipes PNGs straight into ffmpeg: tmix → lanczos downscale → high-quality H.264. No temp files.
// node rec-sharp.cjs out.mp4 [SUB=6]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {spawn}=require('child_process');
const outFile=process.argv[2], SUB=+(process.argv[3]||6), FPS=30, SHUT=.5/FPS;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--force-color-profile=srgb']});
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/film.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
const CUTS=await p.evaluate(()=>window.CUTS);
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',String(FPS*SUB),'-i','-',
  '-vf',`tmix=frames=${SUB},select='not(mod(n+1\\,${SUB}))',setpts=N/${FPS}/TB,scale=1080:1920:flags=lanczos,format=yuv420p`,
  '-r',String(FPS),'-c:v','libx264','-preset','slow','-crf','12','-tune','animation','-profile:v','high','-movflags','+faststart',outFile],{stdio:['pipe','inherit','inherit']});
for(let f=0;f<450;f++){const t=f/FPS,next=CUTS.find(c=>c>t);
  for(let s=0;s<SUB;s++){let ts=t+SHUT*s/SUB;if(next!==undefined&&ts>=next)ts=next-1e-4;
    await p.evaluate(t=>render(t),ts);const buf=await p.screenshot({type:'png'});
    if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('wrote',outFile)})();
