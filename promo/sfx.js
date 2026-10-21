// Synthesizes a 15s music bed + timed SFX matching promo.html, writes 44.1k stereo WAV.
const SR=44100,D=15,N=SR*D,L=new Float32Array(N),R=new Float32Array(N);
const add=(t0,dur,f,g=1,pan=0)=>{const s=Math.floor(t0*SR);for(let i=0;i<dur*SR&&s+i<N;i++){const v=f(i/SR)*g;L[s+i]+=v*(1-pan);R[s+i]+=v*(1+pan);}};
const env=(t,a,d)=>Math.min(1,t/a)*Math.exp(-t/d);
let seed=1;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647*2-1;
const kick=t0=>add(t0,.35,t=>Math.sin(2*Math.PI*(50*t+90*(1-Math.exp(-t*30))/30*1))*Math.exp(-t*9),.55);
const hat=t0=>add(t0,.05,t=>rnd()*Math.exp(-t*90),.08);
const tick=(t0,f=2400)=>add(t0,.03,t=>Math.sin(2*Math.PI*f*t)*Math.exp(-t*160),.18);
const click=t0=>add(t0,.025,t=>rnd()*Math.exp(-t*250),.22);
const pop=(t0,f=700)=>add(t0,.15,t=>Math.sin(2*Math.PI*f*(1+2*Math.exp(-t*40))*t)*env(t,.002,.05),.35);
const whoosh=t0=>add(t0,.45,t=>rnd()*Math.sin(Math.PI*t/.45)**2,.18);
const ding=(t0,f=1320)=>{for(const [m,g] of [[1,.3],[2.01,.12],[3,.06]])add(t0,1.2,t=>Math.sin(2*Math.PI*f*m*t)*env(t,.003,.35),g)};
const thud=t0=>add(t0,.7,t=>(Math.sin(2*Math.PI*55*t)+.4*Math.sign(Math.sin(2*Math.PI*58*t)))*Math.exp(-t*5),.45);
const sweep=(t0,d,f0,f1,g=.08)=>{let ph=0;add(t0,d,t=>{ph+=2*Math.PI*(f0+(f1-f0)*t/d)/SR;return Math.sin(ph)*Math.sin(Math.PI*t/d)},g)};
// music: 120bpm, starts at 3s (hook is SFX-driven), bass on Am-F-C-G
const B=.5,ch=[55,43.65,65.41,49];
for(let b=6;b<30;b++){const t=b*B;kick(t);hat(t+B/2);
  const f=ch[Math.floor((b-6)/4)%4];add(t,B*.9,x=>Math.sin(2*Math.PI*f*x)*Math.exp(-x*3),.22);
  if(b%2) add(t+B/2,.2,x=>rnd()*Math.exp(-x*30),.05);}
// hook 0-3s
for(let i=0;i<22;i++)tick(.3+1.6*(1-Math.pow(1-i/22,.5)),1800+i*30);
sweep(.2,1.7,900,200,.06); thud(1.9); pop(1.6,300);
// scene 2
whoosh(2.85); for(let i=0;i<24;i++)click(3.3+i*1.1/24); [4.6,4.85,5.1].forEach((t,i)=>pop(t,600+i*150));
// scene 3
whoosh(5.85); sweep(6.4,1.2,500,1500,.05); ding(7.7);
// scene 4
whoosh(8.85); sweep(9.2,1.3,300,900,.05); [10,10.2,10.4,10.6].forEach((t,i)=>pop(t,800+i*120));
// CTA
whoosh(11.85); thud(12.1); ding(12.15,880); ding(12.4,1320); ding(13,1760);
// fade out last 0.8s, normalize, write wav
let m=0;for(let i=0;i<N;i++){const fo=Math.min(1,(N-i)/(.8*SR));L[i]*=fo;R[i]*=fo;m=Math.max(m,Math.abs(L[i]),Math.abs(R[i]));}
const buf=Buffer.alloc(44+N*4);buf.write('RIFF',0);buf.writeUInt32LE(36+N*4,4);buf.write('WAVEfmt ',8);
buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(2,22);buf.writeUInt32LE(SR,24);buf.writeUInt32LE(SR*4,28);buf.writeUInt16LE(4,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(N*4,40);
for(let i=0;i<N;i++){buf.writeInt16LE(Math.round(L[i]/m*.9*32767),44+i*4);buf.writeInt16LE(Math.round(R[i]/m*.9*32767),46+i*4);}
require('fs').writeFileSync('audio.wav',buf);
