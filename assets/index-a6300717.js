import{T as r,_ as e}from"./preload-helper-9e2bb4e6.js";const t=r("host-app").relyOn(["lib:vue"]).onActivate(async()=>{console.log("host app is bootstrapped"),await e(()=>import("./app-bf975e46.js"),["assets/app-bf975e46.js","assets/preload-helper-9e2bb4e6.js"])});t.run(async a=>{a.isEntry&&(a.use(async(o,i)=>{o.name==="starter"?await e(()=>import("./index-3960ddaf.js"),["assets/index-3960ddaf.js","assets/preload-helper-9e2bb4e6.js"]):await i()}),await t.load("starter"),t.activate(t.name))});const _=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{t as h,_ as i};
