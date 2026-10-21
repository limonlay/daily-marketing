// Synthesizes a 15s music bed + timed SFX matching promo.html, writes 44.1k stereo WAV.
const SR=44100,D=10,N=SR*D,L=new Float32Array(N),R=new Float32Array(N);
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

const B=60/120,ch=[55,43.65,65.41,49];
for(let b=0;b*B<9.9;b++){const t=b*B;if(t>=2.6){kick(t);hat(t+B/2);const f=ch[Math.floor(b/4)%4];add(t,B*.9,x=>Math.sin(2*Math.PI*f*x)*Math.exp(-x*3),.2);}}
for(let i=0;i<6;i++)thud(i*.35+.05);pop(.1,600);for(let i=0;i<20;i++)tick(.5+1.3*(1-Math.pow(1-i/20,.5)),1800+i*30);thud(1.8);pop(1.8,320);sweep(1.8,.4,200,90,.15);
whoosh(2.5);pop(2.65,650);for(const c of [3.55,3.75,4.0,4.25,4.35,4.45,4.55])click(c);click(4.65);ding(4.8,1046);ding(4.95,1318);ding(5.1,1568);
whoosh(5.5);pop(5.75,700);sweep(6.6,.6,400,900,.05);
whoosh(8.1);thud(8.2);ding(8.25,880);ding(8.5,1320);ding(8.9,1760);
// fade out last 0.8s, normalize, write wav
let m=0;for(let i=0;i<N;i++){const fo=Math.min(1,(N-i)/(.8*SR));L[i]*=fo;R[i]*=fo;m=Math.max(m,Math.abs(L[i]),Math.abs(R[i]));}
const buf=Buffer.alloc(44+N*4);buf.write('RIFF',0);buf.writeUInt32LE(36+N*4,4);buf.write('WAVEfmt ',8);
buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(2,22);buf.writeUInt32LE(SR,24);buf.writeUInt32LE(SR*4,28);buf.writeUInt16LE(4,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(N*4,40);
for(let i=0;i<N;i++){buf.writeInt16LE(Math.round(L[i]/m*.9*32767),44+i*4);buf.writeInt16LE(Math.round(R[i]/m*.9*32767),46+i*4);}
require('fs').writeFileSync('audio3.wav',buf);
