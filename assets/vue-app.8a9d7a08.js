import{A as _,r as d}from"./index.es.bd64380b.js";import{_ as r}from"./preload-helper.8a9483d9.js";const t=new _("vue-app",{state:{count:0}});d(t).relyOn(["lib:vue","host-app"]).onBootstrap(async o=>{console.log("vue-app bootstrapped"),(await r(()=>import("./lifecycles.7efc3839.js"),["assets/lifecycles.7efc3839.js","assets/lifecycles.695a1159.css","assets/index.es.bd64380b.js","assets/preload-helper.8a9483d9.js"])).onBootstrap(o)}).onDestroy(async()=>{(await r(()=>import("./lifecycles.7efc3839.js"),["assets/lifecycles.7efc3839.js","assets/lifecycles.695a1159.css","assets/index.es.bd64380b.js","assets/preload-helper.8a9483d9.js"])).onDestroy()});t.run(async({bus:o,isEntryApp:p,setBusAccessible:a})=>{p&&(a==null||a(!0),o==null||o.use(async(n,e)=>{n.name==="starter"?await r(()=>import("./index.3d5c52b4.js"),["assets/index.3d5c52b4.js","assets/index.es.bd64380b.js"]):await e()}),await t.load("starter"),a==null||a(!1),t.activate(t.name,document.getElementById("vue-app")))});export{t as v};