import{c as p,r as s,_ as e}from"./preload-helper.293adccc.js";const t=p("host-app");s(t).relyOn(["lib:vue"]).onBootstrap(async()=>{console.log("host app is bootstrapped"),(await e(()=>import("./lifecycles.b7642f65.js"),["assets/lifecycles.b7642f65.js","assets/preload-helper.293adccc.js"])).onBootstrap()});t.run(async a=>{a.isEntry&&(a.use(async(o,r)=>{o.name==="starter"?await e(()=>import("./index.001ada9f.js"),["assets/index.001ada9f.js","assets/preload-helper.293adccc.js"]):await r()}),await t.load("starter"),t.activate("react-app",document.getElementById("react-app")),t.activate("vue-app",document.getElementById("vue-app")))});var n=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module"});export{t as h,n as i};
