import{c as r,r as i,_ as o}from"./preload-helper-c1e9a835.js";const t=r("vue-app");i(t).initState({count:0}).relyOn(["lib:vue","host-app"]).onActivate(()=>{t.addMethods({mount:async a=>{(await o(()=>import("./app-1fd11719.js"),["assets/app-1fd11719.js","assets/preload-helper-c1e9a835.js","assets/app-1ecc2e09.css"])).mount(a)}})});t.run(async a=>{a.isEntry&&(a.use(async(e,n)=>{e.name==="starter"?await o(()=>import("./index-01af07cc.js"),["assets/index-01af07cc.js","assets/preload-helper-c1e9a835.js"]):await n()}),await t.load("starter"),a.freeze(),t.activate(t.name).then(()=>{let e=document.getElementById("react-app");e||(e=document.createElement("div"),document.body.appendChild(e)),t.methods.mount(e)}))});const p=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{p as i,t as v};
