import{c as i,r as s,_ as a}from"./preload-helper-c1e9a835.js";const t=i("host-app");s(t).relyOn(["lib:vue"]).onActivate(async()=>{console.log("host app is bootstrapped"),await a(()=>import("./app-2551b07f.js"),["assets/app-2551b07f.js","assets/preload-helper-c1e9a835.js"])});t.run(async e=>{e.isEntry&&(e.use(async(o,r)=>{o.name==="starter"?await a(()=>import("./index-15221e34.js"),["assets/index-15221e34.js","assets/preload-helper-c1e9a835.js"]):await r()}),await t.load("starter"),t.activate(t.name))});const n=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{t as h,n as i};
