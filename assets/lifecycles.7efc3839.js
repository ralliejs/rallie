import{v as a}from"./vue-app.8a9d7a08.js";import"./index.es.bd64380b.js";import"./preload-helper.8a9483d9.js";const l=a.connect("host-app");var w="/rallie/assets/vue-logo.03d6d6da.png";const h=window.Vue.ref,m=window.Vue.onBeforeUnmount;window.Vue.onBeforeMount;function v(e){return function(c){var s=h(c(e.state)),t=e.watchState(c).do(function(n){s.value=n});return m(function(){t()}),s}}var r=(e,c)=>{const s=e.__vccOpts||e;for(const[t,n]of c)s[t]=n;return s};const V=window.Vue.defineComponent,u=window.Vue.toDisplayString,o=window.Vue.createElementVNode,d=window.Vue.createTextVNode,f=window.Vue.unref,g=window.Vue.resolveComponent,k=window.Vue.withCtx,I=window.Vue.createVNode,S=window.Vue.Fragment,x=window.Vue.openBlock,B=window.Vue.createElementBlock,y=window.Vue.pushScopeId,N=window.Vue.popScopeId,i=e=>(y("data-v-66f18d6d"),e=e(),N(),e),$=d(" This app is running in "),C=d(" mode, click "),E=["href"],b=i(()=>o("p",null,"the count can be get, set and watched by the react app",-1)),M=i(()=>o("p",null,"the host app provide a method service to use naive-ui's button component",-1)),A=i(()=>o("p",null,[d(" Edit "),o("code",null,"components/HelloWorld.vue"),d(" to test hot module replacement. ")],-1)),j=i(()=>o("p",null,[o("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"}," Vite Docs "),d(" | "),o("a",{href:"https://v3.vuejs.org/",target:"_blank"},"Vue 3 Docs")],-1)),D=V({props:{msg:String},setup(e){const c=v(a)(n=>n.count),s=()=>{a.setState("vue-app add the count",n=>{n.count++})},t={currentMode:"entry",navigationMode:"remote",navigationLink:"/rallie/index.html"};return a.run(({isEntryApp:n})=>{n||(t.currentMode="remote",t.navigationMode="entry",t.navigationLink="/rallie/apps/vue-app/index.html")}),(n,Q)=>{const _=g("n-button");return x(),B(S,null,[o("h1",null,u(e.msg),1),o("p",null,[$,o("strong",null,u(t.currentMode),1),C,o("a",{href:t.navigationLink},"here",8,E),d(" to see how it works in "+u(t.navigationMode)+" mode ",1)]),b,I(_,{onClick:s},{default:k(()=>[d("count is: "+u(f(c)),1)]),_:1}),M,A,j],64)}}});var H=r(D,[["__scopeId","data-v-66f18d6d"]]);const U=window.Vue.defineComponent,L=window.Vue.createElementVNode,T=window.Vue.createVNode,W=window.Vue.openBlock,F=window.Vue.createElementBlock,R=window.Vue.pushScopeId,O=window.Vue.popScopeId,q=e=>(R("data-v-2ad8e692"),e=e(),O(),e),z={id:"vue-app"},G=q(()=>L("img",{alt:"Vue logo",src:w},null,-1)),J=U({setup(e){return(c,s)=>(W(),F("div",z,[G,T(H,{msg:"Hello Vite + Vue 3 + Rallie"})]))}});var K=r(J,[["__scopeId","data-v-2ad8e692"]]);const P=window.Vue.createApp;let p;const ee=e=>{p=P(K);const c=l.methods.useNaiveUI();p.use(c),p.mount(e!=null?e:document.getElementById("vue-app"))},oe=()=>{p.unmount()};export{ee as onBootstrap,oe as onDestroy};