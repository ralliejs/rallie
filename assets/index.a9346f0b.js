import{c as i,r as s,_ as a}from"./preload-helper.38ea5775.js";const t=i("vue-app");t.initState({count:0});s(t).relyOn(["lib:vue","host-app"]).onBootstrap(async e=>{console.log("vue-app bootstrapped"),(await a(()=>import("./lifecycles.7db2c471.js"),["assets/lifecycles.7db2c471.js","assets/lifecycles.e282692f.css","assets/preload-helper.38ea5775.js"])).onBootstrap(e)}).onDestroy(async()=>{(await a(()=>import("./lifecycles.7db2c471.js"),["assets/lifecycles.7db2c471.js","assets/lifecycles.e282692f.css","assets/preload-helper.38ea5775.js"])).onDestroy()});t.run(async e=>{e.isEntry&&(e.use(async(o,r)=>{o.name==="starter"?await a(()=>import("./index.d9c70b85.js"),["assets/index.d9c70b85.js","assets/preload-helper.38ea5775.js"]):await r()}),await t.load("starter"),e.freeze(),t.activate(t.name,document.getElementById("vue-app")))});var n=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{n as i,t as v};
