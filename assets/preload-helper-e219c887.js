function st(e,t,n,r){return new(n||(n=Promise))(function(s,i){function a(l){try{h(r.next(l))}catch(f){i(f)}}function o(l){try{h(r.throw(l))}catch(f){i(f)}}function h(l){var f;l.done?s(l.value):(f=l.value,f instanceof n?f:new n(function(p){p(f)})).then(a,o)}h((r=r.apply(e,t||[])).next())})}function u(e,t,n,r){if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(e):r?r.value:t.get(e)}function M(e,t,n,r,s){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?e!==t||!s:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?s.call(e,n):s?s.value=n:t.set(e,n),n}function S(e,t,n,r){return new(n||(n=Promise))(function(s,i){function a(l){try{h(r.next(l))}catch(f){i(f)}}function o(l){try{h(r.throw(l))}catch(f){i(f)}}function h(l){var f;l.done?s(l.value):(f=l.value,f instanceof n?f:new n(function(p){p(f)})).then(a,o)}h((r=r.apply(e,t||[])).next())})}function c(e,t,n,r){if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(e):r?r.value:t.get(e)}function x(e,t,n,r,s){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?e!==t||!s:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?s.call(e,n):s?s.value=n:t.set(e,n),n}const it=Object.assign,ot=Object.prototype.hasOwnProperty,re=(e,t)=>ot.call(e,t),P=Array.isArray,ee=e=>Ce(e)==="[object Map]",ge=e=>typeof e=="symbol",ie=e=>e!==null&&typeof e=="object",at=Object.prototype.toString,Ce=e=>at.call(e),ct=e=>Ce(e).slice(8,-1),be=e=>typeof e=="string"&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Ge=(e,t)=>!Object.is(e,t),lt=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ht;function Fe(e,t=ht){t&&t.active&&t.effects.push(e)}const He=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Je=e=>(e.w&O)>0,Ke=e=>(e.n&O)>0,he=new WeakMap;let N=0,O=1;const fe=30;let _;const L=Symbol(""),ue=Symbol("");class ft{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Fe(this,r)}run(){if(!this.active)return this.fn();let t=_,n=B;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=_,_=this,B=!0,O=1<<++N,N<=fe?(({deps:r})=>{if(r.length)for(let s=0;s<r.length;s++)r[s].w|=O})(this):Re(this),this.fn()}finally{N<=fe&&(r=>{const{deps:s}=r;if(s.length){let i=0;for(let a=0;a<s.length;a++){const o=s[a];Je(o)&&!Ke(o)?o.delete(r):s[i++]=o,o.w&=~O,o.n&=~O}s.length=i}})(this),O=1<<--N,_=this.parent,B=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){_===this?this.deferStop=!0:this.active&&(Re(this),this.onStop&&this.onStop(),this.active=!1)}}function Re(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let B=!0;const Ae=[];function g(e,t,n){if(B&&_){let r=he.get(e);r||he.set(e,r=new Map);let s=r.get(n);s||r.set(n,s=He()),function(i,a){let o=!1;N<=fe?Ke(i)||(i.n|=O,o=!Je(i)):o=!i.has(_),o&&(i.add(_),_.deps.push(i))}(s)}}function W(e,t,n,r,s,i){const a=he.get(e);if(!a)return;let o=[];if(t==="clear")o=[...a.values()];else if(n==="length"&&P(e)){const h=lt(r);a.forEach((l,f)=>{(f==="length"||f>=h)&&o.push(l)})}else switch(n!==void 0&&o.push(a.get(n)),t){case"add":P(e)?be(n)&&o.push(a.get("length")):(o.push(a.get(L)),ee(e)&&o.push(a.get(ue)));break;case"delete":P(e)||(o.push(a.get(L)),ee(e)&&o.push(a.get(ue)));break;case"set":ee(e)&&o.push(a.get(L))}if(o.length===1)o[0]&&Oe(o[0]);else{const h=[];for(const l of o)l&&h.push(...l);Oe(He(h))}}function Oe(e,t){const n=P(e)?e:[...e];for(const r of n)r.computed&&Pe(r);for(const r of n)r.computed||Pe(r)}function Pe(e,t){(e!==_||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const ut=function(e,t){const n=Object.create(null),r=e.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return t?s=>!!n[s.toLowerCase()]:s=>!!n[s]}("__proto__,__v_isRef,__isVue"),qe=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ge)),dt=De(),pt=De(!0),We=function(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=d(this);for(let i=0,a=this.length;i<a;i++)g(r,0,i+"");const s=r[t](...n);return s===-1||s===!1?r[t](...n.map(d)):s}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Ae.push(B),B=!1;const r=d(this)[t].apply(this,n);return function(){const s=Ae.pop();B=s===void 0||s}(),r}}),e}();function De(e=!1,t=!1){return function(n,r,s){if(r==="__v_isReactive")return!e;if(r==="__v_isReadonly")return e;if(r==="__v_isShallow")return t;if(r==="__v_raw"&&s===(e?t?kt:Xe:t?St:Qe).get(n))return n;const i=P(n);if(!e&&i&&re(We,r))return Reflect.get(We,r,s);const a=Reflect.get(n,r,s);return(ge(r)?qe.has(r):ut(r))?a:(e||g(n,0,r),t?a:z(a)?i&&be(r)?a:a.value:ie(a)?e?q(a):Ee(a):a)}}const wt={get:dt,set:function(e=!1){return function(t,n,r,s){let i=t[n];if(de(i)&&z(i)&&!z(r))return!1;if(!e&&(function(h){return!(!h||!h.__v_isShallow)}(r)||de(r)||(i=d(i),r=d(r)),!P(t)&&z(i)&&!z(r)))return i.value=r,!0;const a=P(t)&&be(n)?Number(n)<t.length:re(t,n),o=Reflect.set(t,n,r,s);return t===d(s)&&(a?Ge(r,i)&&W(t,"set",n,r):W(t,"add",n,r)),o}}(),deleteProperty:function(e,t){const n=re(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&W(e,"delete",t,void 0),r},has:function(e,t){const n=Reflect.has(e,t);return ge(t)&&qe.has(t)||g(e,0,t),n},ownKeys:function(e){return g(e,0,P(e)?"length":L),Reflect.ownKeys(e)}},vt={get:pt,set:(e,t)=>!0,deleteProperty:(e,t)=>!0},_e=e=>e,oe=e=>Reflect.getPrototypeOf(e);function D(e,t,n=!1,r=!1){const s=d(e=e.__v_raw),i=d(t);n||(t!==i&&g(s,0,t),g(s,0,i));const{has:a}=oe(s),o=r?_e:n?ke:Se;return a.call(s,t)?o(e.get(t)):a.call(s,i)?o(e.get(i)):void(e!==s&&e.get(t))}function V(e,t=!1){const n=this.__v_raw,r=d(n),s=d(e);return t||(e!==s&&g(r,0,e),g(r,0,s)),e===s?n.has(e):n.has(e)||n.has(s)}function Q(e,t=!1){return e=e.__v_raw,!t&&g(d(e),0,L),Reflect.get(e,"size",e)}function $e(e){e=d(e);const t=d(this);return oe(t).has.call(t,e)||(t.add(e),W(t,"add",e,e)),this}function xe(e,t){t=d(t);const n=d(this),{has:r,get:s}=oe(n);let i=r.call(n,e);i||(e=d(e),i=r.call(n,e));const a=s.call(n,e);return n.set(e,t),i?Ge(t,a)&&W(n,"set",e,t):W(n,"add",e,t),this}function Le(e){const t=d(this),{has:n,get:r}=oe(t);let s=n.call(t,e);s||(e=d(e),s=n.call(t,e)),r&&r.call(t,e);const i=t.delete(e);return s&&W(t,"delete",e,void 0),i}function Be(){const e=d(this),t=e.size!==0,n=e.clear();return t&&W(e,"clear",void 0,void 0),n}function X(e,t){return function(n,r){const s=this,i=s.__v_raw,a=d(i),o=t?_e:e?ke:Se;return!e&&g(a,0,L),i.forEach((h,l)=>n.call(r,o(h),o(l),s))}}function Y(e,t,n){return function(...r){const s=this.__v_raw,i=d(s),a=ee(i),o=e==="entries"||e===Symbol.iterator&&a,h=e==="keys"&&a,l=s[e](...r),f=n?_e:t?ke:Se;return!t&&g(i,0,h?ue:L),{next(){const{value:p,done:ae}=l.next();return ae?{value:p,done:ae}:{value:o?[f(p[0]),f(p[1])]:f(p),done:ae}},[Symbol.iterator](){return this}}}}function R(e){return function(...t){return e!=="delete"&&this}}const[mt,yt,gt,bt]=function(){const e={get(s){return D(this,s)},get size(){return Q(this)},has:V,add:$e,set:xe,delete:Le,clear:Be,forEach:X(!1,!1)},t={get(s){return D(this,s,!1,!0)},get size(){return Q(this)},has:V,add:$e,set:xe,delete:Le,clear:Be,forEach:X(!1,!0)},n={get(s){return D(this,s,!0)},get size(){return Q(this,!0)},has(s){return V.call(this,s,!0)},add:R("add"),set:R("set"),delete:R("delete"),clear:R("clear"),forEach:X(!0,!1)},r={get(s){return D(this,s,!0,!0)},get size(){return Q(this,!0)},has(s){return V.call(this,s,!0)},add:R("add"),set:R("set"),delete:R("delete"),clear:R("clear"),forEach:X(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Y(s,!1,!1),n[s]=Y(s,!0,!1),t[s]=Y(s,!1,!0),r[s]=Y(s,!0,!0)}),[e,n,t,r]}();function Ve(e,t){const n=t?e?bt:gt:e?yt:mt;return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(re(n,s)&&s in r?n:r,s,i)}const _t={get:Ve(!1,!1)},Et={get:Ve(!0,!1)},Qe=new WeakMap,St=new WeakMap,Xe=new WeakMap,kt=new WeakMap;function Ee(e){return de(e)?e:Ye(e,!1,wt,_t,Qe)}function q(e){return Ye(e,!0,vt,Et,Xe)}function Ye(e,t,n,r,s){if(!ie(e)||e.__v_raw&&(!t||!e.__v_isReactive))return e;const i=s.get(e);if(i)return i;const a=(o=e).__v_skip||!Object.isExtensible(o)?0:function(l){switch(l){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(ct(o));var o;if(a===0)return e;const h=new Proxy(e,a===2?r:n);return s.set(e,h),h}function de(e){return!(!e||!e.__v_isReadonly)}function d(e){const t=e&&e.__v_raw;return t?d(t):e}const Se=e=>ie(e)?Ee(e):e,ke=e=>ie(e)?q(e):e;function z(e){return!(!e||e.__v_isRef!==!0)}const Rt=e=>`[@rallie/core] you are trying to remove a listener of the broadcast event ${e}, but ${e} hasn't been registed as a broadcast event`,At=e=>`[@rallie/core] you are trying to remove a listener of the broadcast event ${e}, but the listener hasn't been registed`,Ot=e=>`[@rallie/core] one of the callbacks of the broadcast event ${e} throws an uncaught error`,Pt=e=>`[@rallie/core] you are trying to remove a listener of the unicast event ${e}, but ${e} hasn't been registed as a unicast event`,Wt=e=>`[@rallie/core] you are trying to register a unicast event ${e}, but it has been registered before`,$t=e=>`[@rallie/core] you have emitted ${e} unicast, but there is no listener of this event`,xt=e=>`[@rallie/core] ${e} is existing, you are not allowed to create it again`,Lt=(e,t)=>`[@rallie/core] can not find any assets of the app ${e} on the bus ${t}`,Bt=e=>`[@rallie/core] you are trying to activate app ${e}, but it was not created`,Mt=e=>`[@rallie/core] state ${e} is private, you are not allowed to set it`,jt=e=>`[@rallie/core] please describe your action when you modify the state ${e}`,Ze=e=>`[@rallie/core] it's not allowed to set or watch state ${e} before it is initialized`,Tt=e=>`[@rallie/core] duplicated initialized state ${e}`,Nt=e=>`[@rallie/core] it's not allowed to initialized state ${e} to a primitive value`,zt=e=>`[@rallie/core] the bus named ${e} has been defined before, please rename your bus`,Ut=(e,t)=>`[@rallie/core] There is a circular dependency when activating the app ${e}, and the circular path is ${t.join("->")}`,It=()=>"[@rallie/core] next() called multiple times in the middleware",Ct=()=>"[@rallie/core] the middleware must be a function",Gt=(e,t)=>`[@rallie/core] the event ${e} is not in the events pool that you specified when calling on${t?"Unicast":"Broadcast"}`,Me=e=>(t,n)=>{let r=-1;const s=i=>{if(i<=r)return Promise.reject(new Error(It()));r=i;let a=e[i];if(i===e.length&&(a=n),!a)return Promise.resolve();try{return Promise.resolve(a(t,s.bind(null,i+1)))}catch(o){return Promise.reject(o)}};return s(0)};var E,$,te,U,I,v,b,pe,et;class Ft{constructor(){E.set(this,{}),$.set(this,{})}addBroadcastEventListener(t,n){c(this,E,"f")[t]=c(this,E,"f")[t]||new Set,c(this,E,"f")[t].add(n)}addUnicastEventListener(t,n){if(c(this,$,"f")[t])throw new Error(Wt(t));c(this,$,"f")[t]=n}removeBroadcastEventListener(t,n){const r=c(this,E,"f")[t];if(!r){const s=Rt(t);throw new Error(s)}if(!r.has(n)){const s=At(t);throw new Error(s)}r.delete(n)}removeUnicastEventListener(t){if(!c(this,$,"f")[t]){const n=Pt(t);throw new Error(n)}delete c(this,$,"f")[t]}emitBroadcast(t,...n){c(this,E,"f")[t]=c(this,E,"f")[t]||new Set,c(this,E,"f")[t].forEach(r=>{try{r(...n)}catch(s){console.error(Ot(t)),console.error(s)}})}emitUnicast(t,...n){const r=c(this,$,"f")[t];if(r)return r(...n);throw new Error($t(t))}}E=new WeakMap,$=new WeakMap;class Ht{constructor(t,n){te.set(this,void 0),U.set(this,void 0),x(this,te,t,"f"),x(this,U,n,"f"),c(this,U,"f")[t].watchers.add(this)}do(t){return this.handler=t,()=>this.unwatch()}unwatch(){this==null||this.stopEffect(),this.handler=null;const t=c(this,U,"f")[c(this,te,"f")].watchers;t.has(this)&&t.delete(this)}}te=new WeakMap,U=new WeakMap;class Jt{constructor(t,n){I.add(this),v.set(this,void 0),b.set(this,void 0),x(this,v,t,"f"),x(this,b,n,"f")}onBroadcast(t){return Object.entries(t).forEach(([n,r])=>{c(this,v,"f").addBroadcastEventListener(n,r)}),n=>{c(this,I,"m",pe).call(this,t,!1,n)}}onUnicast(t){return Object.entries(t).forEach(([n,r])=>{try{c(this,v,"f").addUnicastEventListener(n,r)}catch(s){console.error(s)}}),n=>{c(this,I,"m",pe).call(this,t,!0,n)}}createBroadcaster(t){return new Proxy({},{get:(n,r)=>(...s)=>(t==null||t(r),c(this,v,"f").emitBroadcast(r,...s)),set:()=>!1})}createUnicaster(t){return new Proxy({},{get:(n,r)=>(...s)=>(t==null||t(r),c(this,v,"f").emitUnicast(r,...s)),set:()=>!1})}existState(t){return!!c(this,b,"f")[t]}initState(t,n,r=!1){if(this.existState(t))throw new Error(Tt(t));if(["string","number","boolean","undefined"].includes(typeof n))throw new Error(Nt(t));return c(this,b,"f")[t]={state:Ee(n),owner:r?this:null,watchers:new Set},c(this,v,"f").emitBroadcast("$state-initialized",t),this.getState(t)}getState(t,n){if(this.existState(t)){const r=q(c(this,b,"f")[t].state);return n?n(r):r}return null}setState(t,n,r){return S(this,void 0,void 0,function*(){const s=c(this,I,"m",et).call(this,t);if(!n)throw new Error(jt(t));{const i=r(s);yield Promise.resolve(i)}})}watchState(t,n){if(!this.existState(t)){const o=Ze(t);throw new Error(o)}let r=!1;const s=q(c(this,b,"f")[t].state),i=new Ht(t,c(this,b,"f")),a=function(o,h){o.effect&&(o=o.effect.fn);const l=new ft(o);h&&(it(l,h),h.scope&&Fe(l,h.scope)),h&&h.lazy||l.run();const f=l.run.bind(l);return f.effect=l,f}(()=>n(s),{lazy:!0,scheduler:()=>{r||(r=!0,Promise.resolve().then(()=>{var o;const h=d(n(s));(o=i.handler)===null||o===void 0||o.call(i,h,i.oldWatchingStates),i.oldWatchingStates=d(h),r=!1}))}});return i.oldWatchingStates=a(),i.stopEffect=()=>a.effect.stop(),i}}v=new WeakMap,b=new WeakMap,I=new WeakSet,pe=function(e,t,n){let r=t?c(this,v,"f").removeUnicastEventListener:c(this,v,"f").removeBroadcastEventListener;r=r.bind(c(this,v,"f")),n?e[n]?(r(n,e[n]),delete e[n]):console.warn(Gt(n,t)):Object.entries(e).forEach(([s,i])=>{r(s,i)})},et=function(e){if(!this.existState(e)){const n=Ze(e);throw new Error(n)}const t=c(this,b,"f")[e].owner;if(t!==this&&t!==null){const n=Mt(e);throw new Error(n)}return c(this,b,"f")[e].state};class Kt{constructor(t){this.name=t,this.activated=null,this.dependencies=[],this.relatedApps=[],this.name=t,this.isRallieCoreApp=!0}relateTo(t){return this.relatedApps=Array.from(new Set([...this.relatedApps,...t])),this}relyOn(t){return this.relateTo(t),this.dependencies=Array.from(new Set([...this.dependencies,...t])),this}onActivate(t){return this.doActivate=t,this}}var k,se,we,ve,m,C,G,F,je,tt,nt,me,Te,Ne,Z={loadScript:e=>S(void 0,void 0,void 0,function*(){return new Promise(t=>{let n=null;e instanceof HTMLScriptElement?n=e:(n=document.createElement("script"),Object.entries(typeof e!="string"?e:{type:"text/javascript",src:e}).forEach(([s,i])=>{n.setAttribute(s,i)})),n.src&&(n.onload=n.onerror=()=>{t()}),document.body.appendChild(n),n.src||t()})}),loadLink:e=>{let t=null;if(e instanceof HTMLLinkElement)t=e;else{const n=typeof e!="string"?e:{rel:"stylesheet",type:"text/css",href:e};t=document.createElement("link"),Object.entries(n).forEach(([r,s])=>{t.setAttribute(r,s)})}document.head.appendChild(t)}};class qt{constructor(t){k.add(this),se.set(this,void 0),we.set(this,new Ft),ve.set(this,{}),m.set(this,{}),C.set(this,{}),this.conf=q({assets:{}}),G.set(this,[]),F.set(this,void 0),x(this,se,t,"f"),x(this,F,Me(c(this,G,"f")),"f")}createSocket(){return new Jt(c(this,we,"f"),c(this,ve,"f"))}existApp(t){return!!c(this,m,"f")[t]}createApp(t){if(this.existApp(t))throw new Error(xt(t));const n=new Kt(t);return c(this,m,"f")[t]=n,n}loadApp(t){return S(this,void 0,void 0,function*(){c(this,m,"f")[t]||(c(this,C,"f")[t]||(c(this,C,"f")[t]=new Promise((n,r)=>{const s=c(this,k,"m",tt).call(this,t);c(this,F,"f").call(this,s,c(this,k,"m",nt).bind(this)).then(()=>{t.startsWith("lib:")&&!c(this,m,"f")[t]&&(c(this,m,"f")[t]=!0),c(this,m,"f")[t]||r(new Error(Bt(t))),n()}).catch(i=>{r(i)})})),yield c(this,C,"f")[t])})}activateApp(t){return S(this,void 0,void 0,function*(){yield c(this,k,"m",me).call(this,t,[])})}config(t){return this.conf=Object.assign(Object.assign(Object.assign({},this.conf),t),{assets:Object.assign(Object.assign({},this.conf.assets),(t==null?void 0:t.assets)||{})}),this}use(t){if(typeof t!="function")throw new Error(Ct());return c(this,G,"f").push(t),x(this,F,Me(c(this,G,"f")),"f"),this}}se=new WeakMap,we=new WeakMap,ve=new WeakMap,m=new WeakMap,C=new WeakMap,G=new WeakMap,F=new WeakMap,k=new WeakSet,je=function(e){return c(this,m,"f")[e]&&typeof c(this,m,"f")[e]!="boolean"},tt=function(e){return{name:e,loadScript:Z.loadScript,loadLink:Z.loadLink}},nt=function(e){return S(this,void 0,void 0,function*(){const{name:t,loadScript:n=Z.loadScript,loadLink:r=Z.loadLink}=e,{assets:s}=this.conf;if(!s[t])throw new Error(Lt(t,c(this,se,"f")));if(s[t].css&&s[t].css.forEach(i=>{r(i)}),s[t].js)for(const i of s[t].js)yield n(i)})},me=function(e,t){return S(this,void 0,void 0,function*(){if(yield this.loadApp(e),c(this,k,"m",je).call(this,e)){const n=c(this,m,"f")[e];if(yield c(this,k,"m",Ne).call(this,n),t.includes(e)){const r=t.indexOf(e),s=[...t.slice(r),e];throw new Error(Ut(e,s))}if(t.push(e),!n.activated){const r=()=>S(this,void 0,void 0,function*(){yield c(this,k,"m",Te).call(this,n,t),n.doActivate&&(yield Promise.resolve(n.doActivate()))});n.activated=r()}yield n.activated,t.pop()}})},Te=function(e,t){return S(this,void 0,void 0,function*(){if(e.dependencies.length!==0)for(const n of e.dependencies)yield c(this,k,"m",me).call(this,n,t)})},Ne=function(e){return S(this,void 0,void 0,function*(){yield Promise.all(e.relatedApps.map(t=>this.loadApp(t)))})};const Dt={},ce="DEFAULT_BUS",ye=(e=ce)=>{let t=null,n=!1;const r=((s=ce)=>window.RALLIE_BUS_STORE&&window.RALLIE_BUS_STORE[s])(e);return r?(t=r,n=!1):(t=((s=ce)=>{if(window.RALLIE_BUS_STORE===void 0&&Reflect.defineProperty(window,"RALLIE_BUS_STORE",{value:Dt,writable:!1}),window.RALLIE_BUS_STORE[s])throw new Error(zt(s));{const i=new qt(s);return Reflect.defineProperty(window.RALLIE_BUS_STORE,s,{value:i,writable:!1}),i}})(e),n=!0),[t,n]},y={privateBus:e=>`${e}.bus`,stateNamespace:e=>`${e}.state`,isGlobalBusAccessible:"isGlobalBusAccessible",exportMethodName:"__RallieInnerExport__"},le=e=>`[rallie] ${e}`,ne={stateNotInitialized:e=>le(` the block ${e}'s state is not initialized, please check:
1. whether the block ${e} is loaded.
2. whether the block ${e} has initialized the state`),duplicatedBlockName:e=>le(`the block ${e} is already registered before, please rename your block`),stateIsReadonly:e=>le(`the state of ${e} is readonly`)},ze=(e,t)=>new Proxy(e,{get:(n,r)=>(...s)=>(0,n[r])(s,t),set:()=>!1}),rt=e=>{const t={};return Object.entries(e).forEach(([n,r])=>{t[n]=(s,i)=>r.call({trigger:i},...s)}),t};var w,A,H,j,J,T,K;class Ue{constructor(t,n,r){w.set(this,void 0),this.name=t,M(this,w,r,"f");const s=u(this,w,"f").createBroadcaster(),i=u(this,w,"f").createUnicaster();this.events=ze(s,n),this.methods=ze(i,n),Reflect.defineProperty(this,"state",{get:()=>u(this,w,"f").getState(y.stateNamespace(this.name)),set:()=>{throw new Error(ne.stateIsReadonly(this.name))}})}setState(t,n){if(u(this,w,"f").existState(y.stateNamespace(this.name)))return u(this,w,"f").setState(y.stateNamespace(this.name),t,n);throw new Error(ne.stateNotInitialized(this.name))}watchState(t){if(u(this,w,"f").existState(y.stateNamespace(this.name)))return u(this,w,"f").watchState(y.stateNamespace(this.name),t);throw new Error(ne.stateNotInitialized(this.name))}listenEvents(t){return u(this,w,"f").onBroadcast(rt(t))}}w=new WeakMap;class Vt extends Ue{constructor(t,n,r,s){const[i]=ye(y.privateBus(t)),a=i.createSocket();super(t,t,a),A.set(this,void 0),H.set(this,void 0),j.set(this,void 0),J.set(this,void 0),T.set(this,void 0),K.set(this,{}),M(this,J,a,"f"),M(this,A,n,"f"),M(this,H,r,"f"),M(this,T,n.createApp(t),"f"),M(this,j,s,"f")}initState(t,n){return u(this,J,"f").initState(y.stateNamespace(this.name),t,n),this}addMethods(t){return u(this,J,"f").onUnicast(rt(t))}relyOn(t){return u(this,T,"f").relyOn(t),this}relateTo(t){return u(this,T,"f").relateTo(t),this}onActivate(t){return u(this,T,"f").onActivate(t),this}connect(t){if(!u(this,K,"f")[t]){const[n]=ye(y.privateBus(t)),r=n.createSocket();u(this,K,"f")[t]=new Ue(t,this.name,r)}return u(this,K,"f")[t]}load(t){return u(this,A,"f").loadApp(t)}activate(t){return u(this,A,"f").activateApp(t)}run(t){var n;return st(this,void 0,void 0,function*(){const r=u(this,j,"f")||((n=u(this,H,"f").getState(y.isGlobalBusAccessible))===null||n===void 0?void 0:n.value),s=o=>{u(this,j,"f")&&u(this,H,"f").setState(y.isGlobalBusAccessible,o?"unfreeze the enviroment":"freeze the enviroment",h=>{h.value=o})},i={isEntry:u(this,j,"f"),use:o=>{r&&u(this,A,"f").use(o)},config:o=>{r&&u(this,A,"f").config(o)},freeze:()=>{s(!1)},unfreeze:()=>{s(!0)}},a=t(new Proxy(i,{get:(o,h,l)=>h==="conf"?JSON.parse(JSON.stringify(u(this,A,"f").conf)):Reflect.get(o,h,l),set:()=>!1}));yield Promise.resolve(a)})}}function Yt(e){const[t,n]=ye();if(t.existApp(e))throw new Error(ne.duplicatedBlockName(e));const r=t.createSocket();return n&&r.initState(y.isGlobalBusAccessible,{value:!0},!0),new Vt(e,t,r,n)}A=new WeakMap,H=new WeakMap,j=new WeakMap,J=new WeakMap,T=new WeakMap,K=new WeakMap;const Qt="modulepreload",Xt=function(e){return"/rallie/"+e},Ie={},Zt=function(t,n,r){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=Xt(i),i in Ie)return;Ie[i]=!0;const a=i.endsWith(".css"),o=a?'[rel="stylesheet"]':"";if(!!r)for(let f=s.length-1;f>=0;f--){const p=s[f];if(p.href===i&&(!a||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${o}`))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":Qt,a||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),a)return new Promise((f,p)=>{l.addEventListener("load",f),l.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())};export{Yt as T,Zt as _};
