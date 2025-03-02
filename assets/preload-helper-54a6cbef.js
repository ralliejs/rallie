(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function ot(e,t,n,r){return new(n||(n=Promise))(function(s,i){function o(l){try{h(r.next(l))}catch(f){i(f)}}function a(l){try{h(r.throw(l))}catch(f){i(f)}}function h(l){var f;l.done?s(l.value):(f=l.value,f instanceof n?f:new n(function(p){p(f)})).then(o,a)}h((r=r.apply(e,t||[])).next())})}function u(e,t,n,r){if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(e):r?r.value:t.get(e)}function j(e,t,n,r,s){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?e!==t||!s:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?s.call(e,n):s?s.value=n:t.set(e,n),n}function S(e,t,n,r){return new(n||(n=Promise))(function(s,i){function o(l){try{h(r.next(l))}catch(f){i(f)}}function a(l){try{h(r.throw(l))}catch(f){i(f)}}function h(l){var f;l.done?s(l.value):(f=l.value,f instanceof n?f:new n(function(p){p(f)})).then(o,a)}h((r=r.apply(e,t||[])).next())})}function c(e,t,n,r){if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(e):r?r.value:t.get(e)}function W(e,t,n,r,s){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?e!==t||!s:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?s.call(e,n):s?s.value=n:t.set(e,n),n}const at=Object.assign,ct=Object.prototype.hasOwnProperty,ne=(e,t)=>ct.call(e,t),R=Array.isArray,ee=e=>qe(e)==="[object Map]",me=e=>typeof e=="symbol",se=e=>e!==null&&typeof e=="object",lt=Object.prototype.toString,qe=e=>lt.call(e),ht=e=>qe(e).slice(8,-1),ge=e=>typeof e=="string"&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Fe=(e,t)=>!Object.is(e,t);function He(e,t=void 0){t&&t.active&&t.effects.push(e)}const Je=e=>{const t=new Set(e);return t.w=0,t.n=0,t},De=e=>(e.w&P)>0,Ge=e=>(e.n&P)>0,ce=new WeakMap;let U=0,P=1;const le=30;let b;const $=Symbol(""),he=Symbol("");class ft{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,He(this,r)}run(){if(!this.active)return this.fn();let t=b,n=M;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=b,b=this,M=!0,P=1<<++U,U<=le?(({deps:r})=>{if(r.length)for(let s=0;s<r.length;s++)r[s].w|=P})(this):Oe(this),this.fn()}finally{U<=le&&(r=>{const{deps:s}=r;if(s.length){let i=0;for(let o=0;o<s.length;o++){const a=s[o];De(a)&&!Ge(a)?a.delete(r):s[i++]=a,a.w&=~P,a.n&=~P}s.length=i}})(this),P=1<<--U,b=this.parent,M=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){b===this?this.deferStop=!0:this.active&&(Oe(this),this.onStop&&this.onStop(),this.active=!1)}}function Oe(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let M=!0;const Pe=[];function w(e,t,n){if(M&&b){let r=ce.get(e);r||ce.set(e,r=new Map);let s=r.get(n);s||r.set(n,s=Je()),function(i,o){let a=!1;U<=le?Ge(i)||(i.n|=P,a=!De(i)):a=!i.has(b),a&&(i.add(b),b.deps.push(i))}(s)}}function A(e,t,n,r,s,i){const o=ce.get(e);if(!o)return;let a=[];if(t==="clear")a=[...o.values()];else if(n==="length"&&R(e)){const h=Number(r);o.forEach((l,f)=>{(f==="length"||f>=h)&&a.push(l)})}else switch(n!==void 0&&a.push(o.get(n)),t){case"add":R(e)?ge(n)&&a.push(o.get("length")):(a.push(o.get($)),ee(e)&&a.push(o.get(he)));break;case"delete":R(e)||(a.push(o.get($)),ee(e)&&a.push(o.get(he)));break;case"set":ee(e)&&a.push(o.get($))}if(a.length===1)a[0]&&Re(a[0]);else{const h=[];for(const l of a)l&&h.push(...l);Re(Je(h))}}function Re(e,t){const n=R(e)?e:[...e];for(const r of n)r.computed&&Ae(r);for(const r of n)r.computed||Ae(r)}function Ae(e,t){(e!==b||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const ut=function(e,t){const n=Object.create(null),r=e.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return t?s=>!!n[s.toLowerCase()]:s=>!!n[s]}("__proto__,__v_isRef,__isVue"),Ve=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(me)),dt=Qe(),pt=Qe(!0),Le=function(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=d(this);for(let i=0,o=this.length;i<o;i++)w(r,0,i+"");const s=r[t](...n);return s===-1||s===!1?r[t](...n.map(d)):s}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Pe.push(M),M=!1;const r=d(this)[t].apply(this,n);return function(){const s=Pe.pop();M=s===void 0||s}(),r}}),e}();function wt(e){const t=d(this);return w(t,0,e),t.hasOwnProperty(e)}function Qe(e=!1,t=!1){return function(n,r,s){if(r==="__v_isReactive")return!e;if(r==="__v_isReadonly")return e;if(r==="__v_isShallow")return t;if(r==="__v_raw"&&s===(e?t?Ot:Ze:t?kt:Ye).get(n))return n;const i=R(n);if(!e){if(i&&ne(Le,r))return Reflect.get(Le,r,s);if(r==="hasOwnProperty")return wt}const o=Reflect.get(n,r,s);return(me(r)?Ve.has(r):ut(r))?o:(e||w(n,0,r),t?o:z(o)?i&&ge(r)?o:o.value:se(o)?e?D(o):Ee(o):o)}}const vt={get:dt,set:function(e=!1){return function(t,n,r,s){let i=t[n];if(fe(i)&&z(i)&&!z(r))return!1;if(!e&&(function(h){return!(!h||!h.__v_isShallow)}(r)||fe(r)||(i=d(i),r=d(r)),!R(t)&&z(i)&&!z(r)))return i.value=r,!0;const o=R(t)&&ge(n)?Number(n)<t.length:ne(t,n),a=Reflect.set(t,n,r,s);return t===d(s)&&(o?Fe(r,i)&&A(t,"set",n,r):A(t,"add",n,r)),a}}(),deleteProperty:function(e,t){const n=ne(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&A(e,"delete",t,void 0),r},has:function(e,t){const n=Reflect.has(e,t);return me(t)&&Ve.has(t)||w(e,0,t),n},ownKeys:function(e){return w(e,0,R(e)?"length":$),Reflect.ownKeys(e)}},yt={get:pt,set:(e,t)=>!0,deleteProperty:(e,t)=>!0},be=e=>e,ie=e=>Reflect.getPrototypeOf(e);function G(e,t,n=!1,r=!1){const s=d(e=e.__v_raw),i=d(t);n||(t!==i&&w(s,0,t),w(s,0,i));const{has:o}=ie(s),a=r?be:n?_e:Se;return o.call(s,t)?a(e.get(t)):o.call(s,i)?a(e.get(i)):void(e!==s&&e.get(t))}function V(e,t=!1){const n=this.__v_raw,r=d(n),s=d(e);return t||(e!==s&&w(r,0,e),w(r,0,s)),e===s?n.has(e):n.has(e)||n.has(s)}function Q(e,t=!1){return e=e.__v_raw,!t&&w(d(e),0,$),Reflect.get(e,"size",e)}function We(e){e=d(e);const t=d(this);return ie(t).has.call(t,e)||(t.add(e),A(t,"add",e,e)),this}function $e(e,t){t=d(t);const n=d(this),{has:r,get:s}=ie(n);let i=r.call(n,e);i||(e=d(e),i=r.call(n,e));const o=s.call(n,e);return n.set(e,t),i?Fe(t,o)&&A(n,"set",e,t):A(n,"add",e,t),this}function Me(e){const t=d(this),{has:n,get:r}=ie(t);let s=n.call(t,e);s||(e=d(e),s=n.call(t,e)),r&&r.call(t,e);const i=t.delete(e);return s&&A(t,"delete",e,void 0),i}function je(){const e=d(this),t=e.size!==0,n=e.clear();return t&&A(e,"clear",void 0,void 0),n}function X(e,t){return function(n,r){const s=this,i=s.__v_raw,o=d(i),a=t?be:e?_e:Se;return!e&&w(o,0,$),i.forEach((h,l)=>n.call(r,a(h),a(l),s))}}function Y(e,t,n){return function(...r){const s=this.__v_raw,i=d(s),o=ee(i),a=e==="entries"||e===Symbol.iterator&&o,h=e==="keys"&&o,l=s[e](...r),f=n?be:t?_e:Se;return!t&&w(i,0,h?he:$),{next(){const{value:p,done:oe}=l.next();return oe?{value:p,done:oe}:{value:a?[f(p[0]),f(p[1])]:f(p),done:oe}},[Symbol.iterator](){return this}}}}function k(e){return function(...t){return e!=="delete"&&this}}const[mt,gt,bt,Et]=function(){const e={get(s){return G(this,s)},get size(){return Q(this)},has:V,add:We,set:$e,delete:Me,clear:je,forEach:X(!1,!1)},t={get(s){return G(this,s,!1,!0)},get size(){return Q(this)},has:V,add:We,set:$e,delete:Me,clear:je,forEach:X(!1,!0)},n={get(s){return G(this,s,!0)},get size(){return Q(this,!0)},has(s){return V.call(this,s,!0)},add:k("add"),set:k("set"),delete:k("delete"),clear:k("clear"),forEach:X(!0,!1)},r={get(s){return G(this,s,!0,!0)},get size(){return Q(this,!0)},has(s){return V.call(this,s,!0)},add:k("add"),set:k("set"),delete:k("delete"),clear:k("clear"),forEach:X(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Y(s,!1,!1),n[s]=Y(s,!0,!1),t[s]=Y(s,!1,!0),r[s]=Y(s,!0,!0)}),[e,n,t,r]}();function Xe(e,t){const n=t?e?Et:bt:e?gt:mt;return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(ne(n,s)&&s in r?n:r,s,i)}const St={get:Xe(!1,!1)},_t={get:Xe(!0,!1)},Ye=new WeakMap,kt=new WeakMap,Ze=new WeakMap,Ot=new WeakMap;function Ee(e){return fe(e)?e:et(e,!1,vt,St,Ye)}function D(e){return et(e,!0,yt,_t,Ze)}function et(e,t,n,r,s){if(!se(e)||e.__v_raw&&(!t||!e.__v_isReactive))return e;const i=s.get(e);if(i)return i;const o=(a=e).__v_skip||!Object.isExtensible(a)?0:function(l){switch(l){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(ht(a));var a;if(o===0)return e;const h=new Proxy(e,o===2?r:n);return s.set(e,h),h}function fe(e){return!(!e||!e.__v_isReadonly)}function d(e){const t=e&&e.__v_raw;return t?d(t):e}const Se=e=>se(e)?Ee(e):e,_e=e=>se(e)?D(e):e;function z(e){return!(!e||e.__v_isRef!==!0)}const Pt=e=>`[@rallie/core] you are trying to remove a listener of the broadcast event ${e}, but ${e} hasn't been registed as a broadcast event`,Rt=e=>`[@rallie/core] you are trying to remove a listener of the broadcast event ${e}, but the listener hasn't been registed`,At=e=>`[@rallie/core] one of the callbacks of the broadcast event ${e} throws an uncaught error`,Lt=e=>`[@rallie/core] you are trying to remove a listener of the unicast event ${e}, but ${e} hasn't been registed as a unicast event`,Wt=e=>`[@rallie/core] you are trying to register a unicast event ${e}, but it has been registered before`,$t=e=>`[@rallie/core] you have emitted ${e} unicast, but there is no listener of this event`,Mt=e=>`[@rallie/core] ${e} is existing, you are not allowed to create it again`,jt=(e,t)=>`[@rallie/core] can not find any assets of the app ${e} on the bus ${t}`,xt=e=>`[@rallie/core] you are trying to activate app ${e}, but it was not created`,Tt=e=>`[@rallie/core] state ${e} is private, you are not allowed to set it`,Bt=e=>`[@rallie/core] please describe your action when you modify the state ${e}`,tt=e=>`[@rallie/core] it's not allowed to set or watch state ${e} before it is initialized`,Ut=e=>`[@rallie/core] duplicated initialized state ${e}`,zt=e=>`[@rallie/core] it's not allowed to initialized state ${e} to a primitive value`,Ct=e=>`[@rallie/core] the bus named ${e} has been defined before, please rename your bus`,Nt=(e,t)=>`[@rallie/core] There is a circular dependency when activating the app ${e}, and the circular path is ${t.join("->")}`,It=()=>"[@rallie/core] next() called multiple times in the middleware",Kt=()=>"[@rallie/core] the middleware must be a function",qt=(e,t)=>`[@rallie/core] the event ${e} is not in the events pool that you specified when calling on${t?"Unicast":"Broadcast"}`,xe=e=>(t,n)=>{let r=-1;const s=i=>{if(i<=r)return Promise.reject(new Error(It()));r=i;let o=e[i];if(i===e.length&&(o=n),!o)return Promise.resolve();try{return Promise.resolve(o(t,s.bind(null,i+1)))}catch(a){return Promise.reject(a)}};return s(0)};var E,L,te,C,N,y,g,ue,nt;class Ft{constructor(){E.set(this,{}),L.set(this,{})}addBroadcastEventListener(t,n){c(this,E,"f")[t]=c(this,E,"f")[t]||new Set,c(this,E,"f")[t].add(n)}addUnicastEventListener(t,n){if(c(this,L,"f")[t])throw new Error(Wt(t));c(this,L,"f")[t]=n}removeBroadcastEventListener(t,n){const r=c(this,E,"f")[t];if(!r){const s=Pt(t);throw new Error(s)}if(!r.has(n)){const s=Rt(t);throw new Error(s)}r.delete(n)}removeUnicastEventListener(t){if(!c(this,L,"f")[t]){const n=Lt(t);throw new Error(n)}delete c(this,L,"f")[t]}emitBroadcast(t,...n){c(this,E,"f")[t]=c(this,E,"f")[t]||new Set,c(this,E,"f")[t].forEach(r=>{try{r(...n)}catch(s){console.error(At(t)),console.error(s)}})}emitUnicast(t,...n){const r=c(this,L,"f")[t];if(r)return r(...n);throw new Error($t(t))}}E=new WeakMap,L=new WeakMap;class Ht{constructor(t,n){te.set(this,void 0),C.set(this,void 0),W(this,te,t,"f"),W(this,C,n,"f"),c(this,C,"f")[t].watchers.add(this)}do(t){return this.handler=t,()=>this.unwatch()}unwatch(){this==null||this.stopEffect(),this.handler=null;const t=c(this,C,"f")[c(this,te,"f")].watchers;t.has(this)&&t.delete(this)}}te=new WeakMap,C=new WeakMap;class Jt{constructor(t,n){N.add(this),y.set(this,void 0),g.set(this,void 0),W(this,y,t,"f"),W(this,g,n,"f")}onBroadcast(t){return Object.entries(t).forEach(([n,r])=>{c(this,y,"f").addBroadcastEventListener(n,r)}),n=>{c(this,N,"m",ue).call(this,t,!1,n)}}onUnicast(t){return Object.entries(t).forEach(([n,r])=>{try{c(this,y,"f").addUnicastEventListener(n,r)}catch(s){console.error(s)}}),n=>{c(this,N,"m",ue).call(this,t,!0,n)}}createBroadcaster(t){return new Proxy({},{get:(n,r)=>(...s)=>(t==null||t(r),c(this,y,"f").emitBroadcast(r,...s)),set:()=>!1})}createUnicaster(t){return new Proxy({},{get:(n,r)=>(...s)=>(t==null||t(r),c(this,y,"f").emitUnicast(r,...s)),set:()=>!1})}existState(t){return!!c(this,g,"f")[t]}initState(t,n,r=!1){if(this.existState(t))throw new Error(Ut(t));if(["string","number","boolean","undefined"].includes(typeof n))throw new Error(zt(t));return c(this,g,"f")[t]={state:Ee(n),owner:r?this:null,watchers:new Set},c(this,y,"f").emitBroadcast("$state-initialized",t),this.getState(t)}getState(t,n){if(this.existState(t)){const r=D(c(this,g,"f")[t].state);return n?n(r):r}return null}setState(t,n,r){return S(this,void 0,void 0,function*(){const s=c(this,N,"m",nt).call(this,t);if(!n)throw new Error(Bt(t));{const i=r(s);yield Promise.resolve(i)}})}watchState(t,n){if(!this.existState(t)){const a=tt(t);throw new Error(a)}let r=!1;const s=D(c(this,g,"f")[t].state),i=new Ht(t,c(this,g,"f")),o=function(a,h){a.effect&&(a=a.effect.fn);const l=new ft(a);h&&(at(l,h),h.scope&&He(l,h.scope)),h&&h.lazy||l.run();const f=l.run.bind(l);return f.effect=l,f}(()=>n(s),{lazy:!0,scheduler:()=>{r||(r=!0,Promise.resolve().then(()=>{var a;const h=d(n(s));(a=i.handler)===null||a===void 0||a.call(i,h,i.oldWatchingStates),i.oldWatchingStates=d(h),r=!1}))}});return i.oldWatchingStates=o(),i.stopEffect=()=>o.effect.stop(),i}}y=new WeakMap,g=new WeakMap,N=new WeakSet,ue=function(e,t,n){let r=t?c(this,y,"f").removeUnicastEventListener:c(this,y,"f").removeBroadcastEventListener;r=r.bind(c(this,y,"f")),n?e[n]?(r(n,e[n]),delete e[n]):console.warn(qt(n,t)):Object.entries(e).forEach(([s,i])=>{r(s,i)})},nt=function(e){if(!this.existState(e)){const n=tt(e);throw new Error(n)}const t=c(this,g,"f")[e].owner;if(t!==this&&t!==null){const n=Tt(e);throw new Error(n)}return c(this,g,"f")[e].state};class Dt{constructor(t){this.name=t,this.activated=null,this.dependencies=[],this.relatedApps=[],this.name=t,this.isRallieCoreApp=!0}relateTo(t){return this.relatedApps=Array.from(new Set([...this.relatedApps,...t])),this}relyOn(t){return this.relateTo(t),this.dependencies=Array.from(new Set([...this.dependencies,...t])),this}onActivate(t){return this.doActivate=t,this}}var _,re,de,pe,m,I,K,q,Te,rt,st,we,Be,Ue,Z={loadScript:e=>S(void 0,void 0,void 0,function*(){return new Promise(t=>{let n=null;e instanceof HTMLScriptElement?n=e:(n=document.createElement("script"),Object.entries(typeof e!="string"?e:{type:"text/javascript",src:e}).forEach(([s,i])=>{n.setAttribute(s,i)})),n.src&&(n.onload=n.onerror=()=>{t()}),document.body.appendChild(n),n.src||t()})}),loadLink:e=>{let t=null;if(e instanceof HTMLLinkElement)t=e;else{const n=typeof e!="string"?e:{rel:"stylesheet",type:"text/css",href:e};t=document.createElement("link"),Object.entries(n).forEach(([r,s])=>{t.setAttribute(r,s)})}document.head.appendChild(t)}};class Gt{constructor(t){_.add(this),re.set(this,void 0),de.set(this,new Ft),pe.set(this,{}),m.set(this,{}),I.set(this,{}),this.conf=D({assets:{}}),K.set(this,[]),q.set(this,void 0),W(this,re,t,"f"),W(this,q,xe(c(this,K,"f")),"f")}createSocket(){return new Jt(c(this,de,"f"),c(this,pe,"f"))}existApp(t){return!!c(this,m,"f")[t]}createApp(t){if(this.existApp(t))throw new Error(Mt(t));const n=new Dt(t);return c(this,m,"f")[t]=n,n}loadApp(t){return S(this,void 0,void 0,function*(){c(this,m,"f")[t]||(c(this,I,"f")[t]||(c(this,I,"f")[t]=new Promise((n,r)=>{const s=c(this,_,"m",rt).call(this,t);c(this,q,"f").call(this,s,c(this,_,"m",st).bind(this)).then(()=>{t.startsWith("lib:")&&!c(this,m,"f")[t]&&(c(this,m,"f")[t]=!0),c(this,m,"f")[t]||r(new Error(xt(t))),n()}).catch(i=>{r(i)})})),yield c(this,I,"f")[t])})}activateApp(t){return S(this,void 0,void 0,function*(){yield c(this,_,"m",we).call(this,t,[])})}config(t){return this.conf=Object.assign(Object.assign(Object.assign({},this.conf),t),{assets:Object.assign(Object.assign({},this.conf.assets),(t==null?void 0:t.assets)||{})}),this}use(t){if(typeof t!="function")throw new Error(Kt());return c(this,K,"f").push(t),W(this,q,xe(c(this,K,"f")),"f"),this}}re=new WeakMap,de=new WeakMap,pe=new WeakMap,m=new WeakMap,I=new WeakMap,K=new WeakMap,q=new WeakMap,_=new WeakSet,Te=function(e){return c(this,m,"f")[e]&&typeof c(this,m,"f")[e]!="boolean"},rt=function(e){return{name:e,loadScript:Z.loadScript,loadLink:Z.loadLink}},st=function(e){return S(this,void 0,void 0,function*(){const{name:t,loadScript:n=Z.loadScript,loadLink:r=Z.loadLink}=e,{assets:s}=this.conf;if(!s[t])throw new Error(jt(t,c(this,re,"f")));if(s[t].css&&s[t].css.forEach(i=>{r(i)}),s[t].js)for(const i of s[t].js)yield n(i)})},we=function(e,t){return S(this,void 0,void 0,function*(){if(yield this.loadApp(e),c(this,_,"m",Te).call(this,e)){const n=c(this,m,"f")[e];yield c(this,_,"m",Ue).call(this,n);const r=t.indexOf(e);if(r!==-1){const s=[...t.slice(r),e];throw new Error(Nt(e,s))}if(!n.activated){const s=()=>S(this,void 0,void 0,function*(){yield c(this,_,"m",Be).call(this,n,[...t,e]),n.doActivate&&(yield Promise.resolve(n.doActivate()))});n.activated=s()}yield n.activated}})},Be=function(e,t){return S(this,void 0,void 0,function*(){if(e.dependencies.length!==0)for(const n of e.dependencies)yield c(this,_,"m",we).call(this,n,t)})},Ue=function(e){return S(this,void 0,void 0,function*(){yield Promise.all(e.relatedApps.map(t=>this.loadApp(t)))})};const Vt={},ae="DEFAULT_BUS",ve=(e=ae)=>{let t=null,n=!1;const r=((s=ae)=>window.RALLIE_BUS_STORE&&window.RALLIE_BUS_STORE[s])(e);return r?(t=r,n=!1):(t=((s=ae)=>{if(window.RALLIE_BUS_STORE===void 0&&Reflect.defineProperty(window,"RALLIE_BUS_STORE",{value:Vt,writable:!1}),window.RALLIE_BUS_STORE[s])throw new Error(Ct(s));{const i=new Gt(s);return Reflect.defineProperty(window.RALLIE_BUS_STORE,s,{value:i,writable:!1,configurable:!1}),i}})(e),n=!0),[t,n]},ze=e=>`${e}.bus`,x=e=>`${e}.state`,ye="isGlobalBusAccessible",ke=e=>`[rallie] ${e}`,Ce=e=>ke(` the block ${e}'s state is not initialized, please check:
1. whether the block ${e} is loaded.
2. whether the block ${e} has initialized the state`),Qt=e=>ke(`the block ${e} is already registered before, please rename your block`),Xt=e=>ke(`the state of ${e} is readonly`),Ne=(e,t)=>new Proxy(e,{get:(n,r)=>(...s)=>(0,n[r])(s,t),set:()=>!1}),it=e=>{const t={};return Object.entries(e).forEach(([n,r])=>{t[n]=(s,i)=>r.call({trigger:i},...s)}),t};var v,O,F,T,H,B,J;class Ie{constructor(t,n,r){v.set(this,void 0),this.name=t,j(this,v,r,"f");const s=u(this,v,"f").createBroadcaster(),i=u(this,v,"f").createUnicaster();this.events=Ne(s,n),this.methods=Ne(i,n),Reflect.defineProperty(this,"state",{get:()=>u(this,v,"f").getState(x(this.name)),set:()=>{throw new Error(Xt(this.name))}})}setState(t,n){if(u(this,v,"f").existState(x(this.name)))return u(this,v,"f").setState(x(this.name),t,n);throw new Error(Ce(this.name))}watchState(t){if(u(this,v,"f").existState(x(this.name)))return u(this,v,"f").watchState(x(this.name),t);throw new Error(Ce(this.name))}listenEvents(t){return u(this,v,"f").onBroadcast(it(t))}}v=new WeakMap;class Yt extends Ie{constructor(t,n,r,s){const[i]=ve(ze(t)),o=i.createSocket();super(t,t,o),O.set(this,void 0),F.set(this,void 0),T.set(this,void 0),H.set(this,void 0),B.set(this,void 0),J.set(this,{}),j(this,H,o,"f"),j(this,O,n,"f"),j(this,F,r,"f"),j(this,B,n.createApp(t),"f"),j(this,T,s,"f")}initState(t,n){return u(this,H,"f").initState(x(this.name),t,n),this}addMethods(t){return u(this,H,"f").onUnicast(it(t))}relyOn(t){return u(this,B,"f").relyOn(t),this}relateTo(t){return u(this,B,"f").relateTo(t),this}onActivate(t){return u(this,B,"f").onActivate(t),this}connect(t){if(!u(this,J,"f")[t]){const[n]=ve(ze(t)),r=n.createSocket();u(this,J,"f")[t]=new Ie(t,this.name,r)}return u(this,J,"f")[t]}load(t){return u(this,O,"f").loadApp(t)}activate(t){return u(this,O,"f").activateApp(t)}run(t){var n;return ot(this,void 0,void 0,function*(){const r=u(this,T,"f")||((n=u(this,F,"f").getState(ye))===null||n===void 0?void 0:n.value),s=a=>{u(this,T,"f")&&u(this,F,"f").setState(ye,a?"unfreeze the enviroment":"freeze the enviroment",h=>{h.value=a})},i={isEntry:u(this,T,"f"),use:a=>{r&&u(this,O,"f").use(a)},config:a=>{r&&u(this,O,"f").config(a)},freeze:()=>{s(!1)},unfreeze:()=>{s(!0)}},o=t(new Proxy(i,{get:(a,h,l)=>h==="conf"?JSON.parse(JSON.stringify(u(this,O,"f").conf)):Reflect.get(a,h,l),set:()=>!1}));yield Promise.resolve(o)})}}function tn(e){const[t,n]=ve();if(t.existApp(e))throw new Error(Qt(e));const r=t.createSocket();return n&&r.initState(ye,{value:!0},!0),new Yt(e,t,r,n)}O=new WeakMap,F=new WeakMap,T=new WeakMap,H=new WeakMap,B=new WeakMap,J=new WeakMap;const Zt="modulepreload",en=function(e){return"/rallie/"+e},Ke={},nn=function(t,n,r){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=en(i),i in Ke)return;Ke[i]=!0;const o=i.endsWith(".css"),a=o?'[rel="stylesheet"]':"";if(!!r)for(let f=s.length-1;f>=0;f--){const p=s[f];if(p.href===i&&(!o||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${a}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":Zt,o||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),o)return new Promise((f,p)=>{l.addEventListener("load",f),l.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})};export{tn as C,nn as _};
