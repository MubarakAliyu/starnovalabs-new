import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
const CHROME=['C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
const PORT=9230; const sleep=m=>new Promise(r=>setTimeout(r,m));
const base=process.argv[2], paths=process.argv[3].split(','), width=Number(process.argv[4]);
async function wait(n=60){for(let i=0;i<n;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json/version`);if(r.ok)return (await r.json()).webSocketDebuggerUrl;}catch{} await sleep(250);}throw new Error('no port');}
function conn(u){const s=new WebSocket(u);let id=1;const p=new Map();s.addEventListener('message',e=>{const m=JSON.parse(e.data);const x=p.get(m.id);if(!x)return;p.delete(m.id);m.error?x.reject(new Error(m.error.message)):x.resolve(m.result);});return{ready:new Promise((res,rej)=>{s.addEventListener('open',res,{once:true});s.addEventListener('error',rej,{once:true});}),send:(me,pa={},si)=>{const i=id++;return new Promise((res,rej)=>{p.set(i,{resolve:res,reject:rej});s.send(JSON.stringify({id:i,method:me,params:pa,sessionId:si}));});},close:()=>s.close()};}
const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--hide-scrollbars',`--remote-debugging-port=${PORT}`,`--window-size=${width},900`,'--user-data-dir='+path.join(process.cwd(),'.chrome-ovf'),'about:blank'],{stdio:'ignore'});
try{
  const b=conn(await wait()); await b.ready;
  for(const route of paths){
    const {targetId}=await b.send('Target.createTarget',{url:'about:blank'});
    const {sessionId}=await b.send('Target.attachToTarget',{targetId,flatten:true});
    const page=(m,p={})=>b.send(m,p,sessionId);
    await page('Page.enable'); await page('Runtime.enable');
    await page('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
    await page('Page.navigate',{url:`${base}${route}?intro=0`});
    await sleep(4500);
    const {result}=await page('Runtime.evaluate',{expression:`JSON.stringify({w:document.documentElement.scrollWidth,vw:window.innerWidth,over:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.right>window.innerWidth+1&&getComputedStyle(e).position!=='fixed';}).slice(0,3).map(e=>e.tagName+'.'+String(e.className).slice(0,40))})`,returnByValue:true});
    const s=JSON.parse(result.value);
    console.log(`${route.padEnd(28)} doc=${s.w} vw=${s.vw} ${s.w>s.vw?'OVERFLOW':'ok'} ${s.over.length?JSON.stringify(s.over):''}`);
    await b.send('Target.closeTarget',{targetId});
  }
  b.close();
} finally { chrome.kill(); }
