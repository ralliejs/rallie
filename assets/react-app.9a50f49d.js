import{A as s,r as i}from"./index.es.552a85be.js";import{_ as t}from"./preload-helper.8a9483d9.js";const a=new s("react-app");i(a).relyOn(["lib:react","lib:react-dom","host-app"]).relateTo(["vue-app"]).onBootstrap(async e=>{console.log("react-app bootstrapped"),(await t(()=>import("./lifecycles.53d0d9be.js"),["assets/lifecycles.53d0d9be.js","assets/lifecycles.eebe2c89.css","assets/index.es.552a85be.js","assets/preload-helper.8a9483d9.js"])).onBootstrap(e)}).onDestroy(async()=>{(await t(()=>import("./lifecycles.53d0d9be.js"),["assets/lifecycles.53d0d9be.js","assets/lifecycles.eebe2c89.css","assets/index.es.552a85be.js","assets/preload-helper.8a9483d9.js"])).onDestroy()});a.run(async({bus:e,isEntryApp:r})=>{r&&(e==null||e.use(async(o,p)=>{o.name==="starter"?await t(()=>import("./index.d821ec13.js"),["assets/index.d821ec13.js","assets/index.es.552a85be.js"]):await p()}),await a.load("starter"),a.activate(a.name))});export{a as r};
