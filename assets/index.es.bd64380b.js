const Ct=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};Ct();/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var y=function(){return y=Object.assign||function(e){for(var n,i=1,s=arguments.length;i<s;i++){n=arguments[i];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},y.apply(this,arguments)};function b(t,e,n,i){function s(r){return r instanceof n?r:new n(function(o){o(r)})}return new(n||(n=Promise))(function(r,o){function a(l){try{c(i.next(l))}catch(h){o(h)}}function u(l){try{c(i.throw(l))}catch(h){o(h)}}function c(l){l.done?r(l.value):s(l.value).then(a,u)}c((i=i.apply(t,e||[])).next())})}function m(t,e){var n={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},i,s,r,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(c){return function(l){return u([c,l])}}function u(c){if(i)throw new TypeError("Generator is already executing.");for(;n;)try{if(i=1,s&&(r=c[0]&2?s.return:c[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,c[1])).done)return r;switch(s=0,r&&(c=[c[0]&2,r.value]),c[0]){case 0:case 1:r=c;break;case 4:return n.label++,{value:c[1],done:!1};case 5:n.label++,s=c[1],c=[0];continue;case 7:c=n.ops.pop(),n.trys.pop();continue;default:if(r=n.trys,!(r=r.length>0&&r[r.length-1])&&(c[0]===6||c[0]===2)){n=0;continue}if(c[0]===3&&(!r||c[1]>r[0]&&c[1]<r[3])){n.label=c[1];break}if(c[0]===6&&n.label<r[1]){n.label=r[1],r=c;break}if(r&&n.label<r[2]){n.label=r[2],n.ops.push(c);break}r[2]&&n.ops.pop(),n.trys.pop();continue}c=e.call(t,n)}catch(l){c=[6,l],s=0}finally{i=r=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function C(t,e,n){if(n||arguments.length===2)for(var i=0,s=e.length,r;i<s;i++)(r||!(i in e))&&(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))}var d={removeNonExistedBroadcast:function(t){return"[@rallie/core] you are trying to remove a listener of the broadcast event ".concat(t,", but ").concat(t," hasn't been registed as a broadcast event")},wrongBroadcastCallback:function(t){return"[@rallie/core] you are trying to remove a listener of the broadcast event ".concat(t,", but the listener hasn't been registed")},broadcastCallbackError:function(t){return"[@rallie/core] one of the callbacks of the broadcast event ".concat(t," throws an uncaught error")},removeNonExistedUnicast:function(t){return"[@rallie/core] you are trying to remove a listener of the unicast event ".concat(t,", but ").concat(t," hasn't been registed as a unicast event")},registedExistedUnicast:function(t){return"[@rallie/core] you are trying to register a unicast event ".concat(t,", but it has been registered before")},emittedNonExistedUnicast:function(t){return"[@rallie/core] you have emitted ".concat(t," unicast, but there is no listener of this event")},createExistingApp:function(t){return"[@rallie/core] ".concat(t," is existing, you are not allowed to create it again")},resourceNotDeclared:function(t,e){return"[@rallie/core] can not find any assets of the app ".concat(t," on the bus ").concat(e)},appNotCreated:function(t){return"[@rallie/core] you are trying to activate app ".concat(t,", but it was not created")},modifyPrivateState:function(t){return"[@rallie/core] state ".concat(t," is private, you are not allowed to set it")},actionIsNotDefined:function(t){return"[@rallie/core] please describe your action when you modify the state ".concat(t)},accessUninitializedState:function(t){return"[@rallie/core] it's not allowed to set or watch state ".concat(t," before it is initialized")},waitStateTimeout:function(t){return"[@rallie/core] wait for states ".concat(JSON.stringify(t)," timeout")},duplicatedInitial:function(t){return"[@rallie/core] duplicated initialized state ".concat(t)},initializePrimitiveState:function(t){return"[@rallie/core] it's not allowed to initialized state ".concat(t," to a primitive value")},duplicatedBus:function(t){return"[@rallie/core] the bus named ".concat(t," has been defined before, please rename your bus")},bootstrapTimeout:function(t,e){return"[@rallie/core] failed to bootstrap the app ".concat(t," in ").concat(e," milliseconds. ")+"If you see another same error at the same time, there might be circular dependencies"},multipleCalledNextFn:function(){return"[@rallie/core] next() called multiple times in the middleware"},wrongMiddlewareType:function(){return"[@rallie/core] the middleware must be a function"}},Ut={handlerIsNotInTheEventsPool:function(t,e){return"[@rallie/core] the event ".concat(t," is not in the events pool that you specified when calling on").concat(e?"Unicast":"Broadcast")}};function ut(t){return["string","number","boolean","undefined"].includes(typeof t)}function lt(t){var e={},n=[];return t.forEach(function(i){var s=typeof i=="string"?i:i.name;e[s]||(n.push(i),e[s]=!0)}),n}var ft=function(t){return function(e,n){var i=-1,s=function(r){if(r<=i)return Promise.reject(new Error(d.multipleCalledNextFn()));i=r;var o=t[r];if(r===t.length&&(o=n),!o)return Promise.resolve();try{return Promise.resolve(o(e,s.bind(null,r+1)))}catch(a){return Promise.reject(a)}};return s(0)}},kt=function(){function t(){this.broadcastEvents={},this.unicastEvents={}}return t.prototype.addBroadcastEventListener=function(e,n){var i=this;this.broadcastEvents[e]=this.broadcastEvents[e]||{listeners:[],emitedArgs:[]};var s=this.broadcastEvents[e],r=s.listeners,o=s.emitedArgs;r.push(n),o.length>0&&(o.forEach(function(a){i.emitBroadcast.apply(i,C([e],a,!1))}),this.broadcastEvents[e].emitedArgs=[])},t.prototype.addUnicastEventListener=function(e,n){if(this.unicastEvents[e])throw new Error(d.registedExistedUnicast(e));this.unicastEvents[e]=n},t.prototype.removeBroadcastEventListener=function(e,n){var i,s=(i=this.broadcastEvents[e])===null||i===void 0?void 0:i.listeners;if(s){for(var r=-1,o=0;o<s.length;o++)if(s[o]===n){r=o;break}if(r!==-1)s.splice(r,1);else{var a=d.wrongBroadcastCallback(e);throw new Error(a)}}else{var a=d.removeNonExistedBroadcast(e);throw new Error(a)}},t.prototype.removeUnicastEventListener=function(e){if(!this.unicastEvents[e]){var n=d.removeNonExistedUnicast(e);throw new Error(n)}delete this.unicastEvents[e]},t.prototype.emitBroadcast=function(e){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];this.broadcastEvents[e]=this.broadcastEvents[e]||{listeners:[],emitedArgs:[]};var s=this.broadcastEvents[e],r=s.listeners,o=s.emitedArgs;r.length>0?r.forEach(function(a){try{a.apply(void 0,n)}catch(u){console.error(d.broadcastCallbackError(e)),console.error(u)}}):o.push(n)},t.prototype.emitUnicast=function(e){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];var s=this.unicastEvents[e];if(s)return s.apply(void 0,n);throw new Error(d.emittedNonExistedUnicast(e))},t}();function zt(t,e){const n=Object.create(null),i=t.split(",");for(let s=0;s<i.length;s++)n[i[s]]=!0;return e?s=>!!n[s.toLowerCase()]:s=>!!n[s]}const jt=Object.assign,Kt=Object.prototype.hasOwnProperty,U=(t,e)=>Kt.call(t,e),E=Array.isArray,k=t=>ht(t)==="[object Map]",Wt=t=>typeof t=="string",Y=t=>typeof t=="symbol",z=t=>t!==null&&typeof t=="object",Dt=Object.prototype.toString,ht=t=>Dt.call(t),Ft=t=>ht(t).slice(8,-1),q=t=>Wt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,dt=(t,e)=>!Object.is(t,e);let Gt;function pt(t,e){e=e||Gt,e&&e.active&&e.effects.push(t)}const vt=t=>{const e=new Set(t);return e.w=0,e.n=0,e},wt=t=>(t.w&S)>0,bt=t=>(t.n&S)>0,Ht=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=S},$t=t=>{const{deps:e}=t;if(e.length){let n=0;for(let i=0;i<e.length;i++){const s=e[i];wt(s)&&!bt(s)?s.delete(t):e[n++]=s,s.w&=~S,s.n&=~S}e.length=n}},Z=new WeakMap;let L=0,S=1;const Q=30,N=[];let B;const T=Symbol(""),X=Symbol("");class Vt{constructor(e,n=null,i){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],pt(this,i)}run(){if(!this.active)return this.fn();if(!N.includes(this))try{return N.push(B=this),qt(),S=1<<++L,L<=Q?Ht(this):mt(this),this.fn()}finally{L<=Q&&$t(this),S=1<<--L,gt(),N.pop();const e=N.length;B=e>0?N[e-1]:void 0}}stop(){this.active&&(mt(this),this.onStop&&this.onStop(),this.active=!1)}}function mt(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}function Jt(t,e){t.effect&&(t=t.effect.fn);const n=new Vt(t);e&&(jt(n,e),e.scope&&pt(n,e.scope)),(!e||!e.lazy)&&n.run();const i=n.run.bind(n);return i.effect=n,i}let R=!0;const tt=[];function Yt(){tt.push(R),R=!1}function qt(){tt.push(R),R=!0}function gt(){const t=tt.pop();R=t===void 0?!0:t}function w(t,e,n){if(!Zt())return;let i=Z.get(t);i||Z.set(t,i=new Map);let s=i.get(n);s||i.set(n,s=vt()),Qt(s)}function Zt(){return R&&B!==void 0}function Qt(t,e){let n=!1;L<=Q?bt(t)||(t.n|=S,n=!wt(t)):n=!t.has(B),n&&(t.add(B),B.deps.push(t))}function _(t,e,n,i,s,r){const o=Z.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&E(t))o.forEach((u,c)=>{(c==="length"||c>=i)&&a.push(u)});else switch(n!==void 0&&a.push(o.get(n)),e){case"add":E(t)?q(n)&&a.push(o.get("length")):(a.push(o.get(T)),k(t)&&a.push(o.get(X)));break;case"delete":E(t)||(a.push(o.get(T)),k(t)&&a.push(o.get(X)));break;case"set":k(t)&&a.push(o.get(T));break}if(a.length===1)a[0]&&yt(a[0]);else{const u=[];for(const c of a)c&&u.push(...c);yt(vt(u))}}function yt(t,e){for(const n of E(t)?t:[...t])(n!==B||n.allowRecurse)&&(n.scheduler?n.scheduler():n.run())}const Xt=zt("__proto__,__v_isRef,__isVue"),Et=new Set(Object.getOwnPropertyNames(Symbol).map(t=>Symbol[t]).filter(Y)),te=_t(),ee=_t(!0),St=ne();function ne(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const i=f(this);for(let r=0,o=this.length;r<o;r++)w(i,"get",r+"");const s=i[e](...n);return s===-1||s===!1?i[e](...n.map(f)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Yt();const i=f(this)[e].apply(this,n);return gt(),i}}),t}function _t(t=!1,e=!1){return function(i,s,r){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_raw"&&r===(t?e?me:Lt:e?be:It).get(i))return i;const o=E(i);if(!t&&o&&U(St,s))return Reflect.get(St,s,r);const a=Reflect.get(i,s,r);return(Y(s)?Et.has(s):Xt(s))||(t||w(i,"get",s),e)?a:it(a)?!o||!q(s)?a.value:a:z(a)?t?H(a):nt(a):a}}const re=se();function se(t=!1){return function(n,i,s,r){let o=n[i];if(!t&&!Ee(s)&&(s=f(s),o=f(o),!E(n)&&it(o)&&!it(s)))return o.value=s,!0;const a=E(n)&&q(i)?Number(i)<n.length:U(n,i),u=Reflect.set(n,i,s,r);return n===f(r)&&(a?dt(s,o)&&_(n,"set",i,s):_(n,"add",i,s)),u}}function ie(t,e){const n=U(t,e);t[e];const i=Reflect.deleteProperty(t,e);return i&&n&&_(t,"delete",e,void 0),i}function oe(t,e){const n=Reflect.has(t,e);return(!Y(e)||!Et.has(e))&&w(t,"has",e),n}function ae(t){return w(t,"iterate",E(t)?"length":T),Reflect.ownKeys(t)}const ce={get:te,set:re,deleteProperty:ie,has:oe,ownKeys:ae},ue={get:ee,set(t,e){return!0},deleteProperty(t,e){return!0}},et=t=>t,j=t=>Reflect.getPrototypeOf(t);function K(t,e,n=!1,i=!1){t=t.__v_raw;const s=f(t),r=f(e);e!==r&&!n&&w(s,"get",e),!n&&w(s,"get",r);const{has:o}=j(s),a=i?et:n?st:rt;if(o.call(s,e))return a(t.get(e));if(o.call(s,r))return a(t.get(r));t!==s&&t.get(e)}function W(t,e=!1){const n=this.__v_raw,i=f(n),s=f(t);return t!==s&&!e&&w(i,"has",t),!e&&w(i,"has",s),t===s?n.has(t):n.has(t)||n.has(s)}function D(t,e=!1){return t=t.__v_raw,!e&&w(f(t),"iterate",T),Reflect.get(t,"size",t)}function At(t){t=f(t);const e=f(this);return j(e).has.call(e,t)||(e.add(t),_(e,"add",t,t)),this}function xt(t,e){e=f(e);const n=f(this),{has:i,get:s}=j(n);let r=i.call(n,t);r||(t=f(t),r=i.call(n,t));const o=s.call(n,t);return n.set(t,e),r?dt(e,o)&&_(n,"set",t,e):_(n,"add",t,e),this}function Bt(t){const e=f(this),{has:n,get:i}=j(e);let s=n.call(e,t);s||(t=f(t),s=n.call(e,t)),i&&i.call(e,t);const r=e.delete(t);return s&&_(e,"delete",t,void 0),r}function Tt(){const t=f(this),e=t.size!==0,n=t.clear();return e&&_(t,"clear",void 0,void 0),n}function F(t,e){return function(i,s){const r=this,o=r.__v_raw,a=f(o),u=e?et:t?st:rt;return!t&&w(a,"iterate",T),o.forEach((c,l)=>i.call(s,u(c),u(l),r))}}function G(t,e,n){return function(...i){const s=this.__v_raw,r=f(s),o=k(r),a=t==="entries"||t===Symbol.iterator&&o,u=t==="keys"&&o,c=s[t](...i),l=n?et:e?st:rt;return!e&&w(r,"iterate",u?X:T),{next(){const{value:h,done:v}=c.next();return v?{value:h,done:v}:{value:a?[l(h[0]),l(h[1])]:l(h),done:v}},[Symbol.iterator](){return this}}}}function A(t){return function(...e){return t==="delete"?!1:this}}function le(){const t={get(r){return K(this,r)},get size(){return D(this)},has:W,add:At,set:xt,delete:Bt,clear:Tt,forEach:F(!1,!1)},e={get(r){return K(this,r,!1,!0)},get size(){return D(this)},has:W,add:At,set:xt,delete:Bt,clear:Tt,forEach:F(!1,!0)},n={get(r){return K(this,r,!0)},get size(){return D(this,!0)},has(r){return W.call(this,r,!0)},add:A("add"),set:A("set"),delete:A("delete"),clear:A("clear"),forEach:F(!0,!1)},i={get(r){return K(this,r,!0,!0)},get size(){return D(this,!0)},has(r){return W.call(this,r,!0)},add:A("add"),set:A("set"),delete:A("delete"),clear:A("clear"),forEach:F(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=G(r,!1,!1),n[r]=G(r,!0,!1),e[r]=G(r,!1,!0),i[r]=G(r,!0,!0)}),[t,n,e,i]}const[fe,he,de,pe]=le();function Rt(t,e){const n=e?t?pe:de:t?he:fe;return(i,s,r)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?i:Reflect.get(U(n,s)&&s in i?n:i,s,r)}const ve={get:Rt(!1,!1)},we={get:Rt(!0,!1)},It=new WeakMap,be=new WeakMap,Lt=new WeakMap,me=new WeakMap;function ge(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ye(t){return t.__v_skip||!Object.isExtensible(t)?0:ge(Ft(t))}function nt(t){return t&&t.__v_isReadonly?t:Nt(t,!1,ce,ve,It)}function H(t){return Nt(t,!0,ue,we,Lt)}function Nt(t,e,n,i,s){if(!z(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=s.get(t);if(r)return r;const o=ye(t);if(o===0)return t;const a=new Proxy(t,o===2?i:n);return s.set(t,a),a}function Ee(t){return!!(t&&t.__v_isReadonly)}function f(t){const e=t&&t.__v_raw;return e?f(e):t}const rt=t=>z(t)?nt(t):t,st=t=>z(t)?H(t):t;function it(t){return Boolean(t&&t.__v_isRef===!0)}Promise.resolve();var Se=function(){function t(e,n){this.namespace=e,this.stores=n,this.stores[e].watchers.push(this)}return t.prototype.do=function(e){var n=this;return this.handler=e,function(){return n.unwatch()}},t.prototype.unwatch=function(){this===null||this===void 0||this.stopEffect(),this.handler=null;var e=this.stores[this.namespace].watchers.indexOf(this);e!==-1&&this.stores[this.namespace].watchers.splice(e,1)},t}(),ot="$state-initialized",_e=function(){function t(e,n){this.eventEmitter=e,this.stores=n,this.eventEmitter=e,this.stores=n}return t.prototype.offEvents=function(e,n,i){var s=n?this.eventEmitter.removeUnicastEventListener:this.eventEmitter.removeBroadcastEventListener;s=s.bind(this.eventEmitter),i?e[i]?(s(i,e[i]),delete e[i]):console.warn(Ut.handlerIsNotInTheEventsPool(i,n)):Object.entries(e).forEach(function(r){var o=r[0],a=r[1];s(o,a)})},t.prototype.onBroadcast=function(e){var n=this;return Object.entries(e).forEach(function(i){var s=i[0],r=i[1];n.eventEmitter.addBroadcastEventListener(s,r)}),function(i){n.offEvents(e,!1,i)}},t.prototype.onUnicast=function(e){var n=this;return Object.entries(e).forEach(function(i){var s=i[0],r=i[1];try{n.eventEmitter.addUnicastEventListener(s,r)}catch(o){console.error(o)}}),function(i){n.offEvents(e,!0,i)}},t.prototype.createBroadcaster=function(e){var n=this;return new Proxy({},{get:function(i,s){return function(){for(var r,o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];return e==null||e(s),(r=n.eventEmitter).emitBroadcast.apply(r,C([s],o,!1))}},set:function(){return!1}})},t.prototype.createUnicaster=function(e){var n=this;return new Proxy({},{get:function(i,s){return function(){for(var r,o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];return e==null||e(s),(r=n.eventEmitter).emitUnicast.apply(r,C([s],o,!1))}},set:function(){return!1}})},t.prototype.existState=function(e){return!!this.stores[e]},t.prototype.initState=function(e,n,i){if(i===void 0&&(i=!1),this.existState(e))throw new Error(d.duplicatedInitial(e));if(ut(n))throw new Error(d.initializePrimitiveState(e));return this.stores[e]={state:nt(n),owner:i?this:null,watchers:[]},this.eventEmitter.emitBroadcast(ot,e),this.getState(e)},t.prototype.getState=function(e,n){if(this.existState(e)){var i=H(this.stores[e].state);return n?n(i):i}else return null},t.prototype.getStateToSet=function(e){if(!this.existState(e)){var n=d.accessUninitializedState(e);throw new Error(n)}var i=this.stores[e].owner;if(i!==this&&i!==null){var n=d.modifyPrivateState(e);throw new Error(n)}return this.stores[e].state},t.prototype.setState=function(e,n,i){return b(this,void 0,void 0,function(){var s;return m(this,function(r){switch(r.label){case 0:return s=this.getStateToSet(e),n?[4,Promise.resolve(i(s))]:[3,2];case 1:return r.sent(),[3,3];case 2:throw new Error(d.actionIsNotDefined(e));case 3:return[2]}})})},t.prototype.watchState=function(e,n){if(!this.existState(e)){var i=d.accessUninitializedState(e);throw new Error(i)}var s=H(this.stores[e].state),r=new Se(e,this.stores),o=function(u){return ut(u)?u:JSON.parse(JSON.stringify(u))},a=Jt(function(){return n(s)},{lazy:!0,scheduler:function(){var u,c=n(s);(u=r.handler)===null||u===void 0||u.call(r,c,r.oldWatchingStates),r.oldWatchingStates=o(c)}});return r.oldWatchingStates=o(a()),r.stopEffect=function(){return a.effect.stop()},r},t.prototype.waitState=function(e,n){var i=this;n===void 0&&(n=10*1e3);var s=C([],e,!0),r=e.filter(function(a){return!i.existState(a)});if(r.length===0){var o=s.map(function(a){return i.getState(a)});return Promise.resolve(o)}else return new Promise(function(a,u){var c=setTimeout(function(){clearTimeout(c);var h=d.waitStateTimeout(r);u(new Error(h))},n),l=function(h){var v=r.indexOf(h);if(v!==-1&&r.splice(v,1),r.length===0){clearTimeout(c),i.eventEmitter.removeBroadcastEventListener(ot,l);var g=s.map(function(P){return i.getState(P)});a(g)}};i.eventEmitter.addBroadcastEventListener(ot,l)})},t}(),Ae=function(){function t(e){this.name=e,this.dependenciesReady=!1,this.bootstrapping=null,this.dependencies=[],this.relatedApps=[],this.name=e,this.isRallieCoreApp=!0}return t.prototype.relateTo=function(e){var n=this,i=function(o){return typeof o=="string"?o:o.name},s=lt(e),r=this.relatedApps.map(function(o){return o.name});return s.forEach(function(o){r.includes(i(o))||n.relatedApps.push({name:i(o),ctx:typeof o!="string"?o.ctx:void 0})}),this},t.prototype.relyOn=function(e){var n=this,i=function(a){return typeof a=="string"?a:a.name},s=lt(e),r=this.dependencies.map(function(a){return a.name}),o=this.relatedApps.map(function(a){return a.name});return s.forEach(function(a){var u=i(a);r.includes(u)||n.dependencies.push({name:u,ctx:typeof a!="string"?a.ctx:void 0,data:typeof a!="string"?a.data:void 0}),o.includes(u)||n.relatedApps.push({name:u,ctx:typeof a!="string"?a.ctx:void 0})}),this},t.prototype.onBootstrap=function(e){return this.doBootstrap=e,this},t.prototype.onActivate=function(e){return this.doActivate=e,this},t.prototype.onDestroy=function(e){return this.doDestroy=e,this},t}(),xe=function(t){return b(void 0,void 0,void 0,function(){var e;return m(this,function(n){return e=new Promise(function(i){var s=null;if(t instanceof HTMLScriptElement)s=t;else{s=document.createElement("script");var r=typeof t!="string"?t:{type:"text/javascript",src:t};Object.entries(r).forEach(function(o){var a=o[0],u=o[1];s[a]=u})}s.src&&(s.onload=s.onerror=function(){i()}),document.body.appendChild(s),s.src||i()}),[2,e]})})},Be=function(t){var e=null;if(t instanceof HTMLLinkElement)e=t;else{var n=typeof t!="string"?t:{rel:"stylesheet",type:"text/css",href:t};e=document.createElement("link"),Object.entries(n).forEach(function(i){var s=i[0],r=i[1];e[s]=r})}document.head.appendChild(e)},Te=function(t){return function(e){return b(void 0,void 0,void 0,function(){var n,i,s;return m(this,function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),n=null,typeof e=="string"?n=e:e instanceof HTMLScriptElement?n=e.getAttribute("src"):n=e.src,[4,t(n)];case 1:return i=r.sent(),[4,i.text()];case 2:return s=r.sent(),[2,s];case 3:return r.sent(),[2,""];case 4:return[2]}})})}},Re=function(t){var e=new Function(t);e()},x={loadScript:xe,loadLink:Be,fetchScript:Te,excuteCode:Re},Ie=function(){function t(e){this.eventEmitter=new kt,this.stores={},this.apps={},this.loadingApps={},this.conf={maxBootstrapTime:10*1e3,fetch:null,assets:{}},this.middlewares=[],this.name=e,this.composedMiddlewareFn=ft(this.middlewares)}return t.prototype.isRallieCoreApp=function(e){return this.apps[e]&&typeof this.apps[e]!="boolean"},t.prototype.config=function(e){return this.conf=y(y(y({},this.conf),e),{assets:y(y({},this.conf.assets),(e==null?void 0:e.assets)||{})}),this},t.prototype.use=function(e){if(typeof e!="function")throw new Error(d.wrongMiddlewareType());return this.middlewares.push(e),this.composedMiddlewareFn=ft(this.middlewares),this},t.prototype.createContext=function(e,n){n===void 0&&(n={});var i=y({name:e,loadScript:x.loadScript,loadLink:x.loadLink,fetchScript:x.fetchScript(this.conf.fetch),excuteCode:x.excuteCode,conf:this.conf},n);return i},t.prototype.loadResourcesFromAssetsConfig=function(e){return b(this,void 0,void 0,function(){var n,i,s,r,o,a,u,c,l,h,v,g,P,M,$,V,J;return m(this,function(I){switch(I.label){case 0:if(n=e.name,i=e.loadScript,s=i===void 0?x.loadScript:i,r=e.loadLink,o=r===void 0?x.loadLink:r,a=e.fetchScript,u=a===void 0?x.fetchScript(this.conf.fetch):a,c=e.excuteCode,l=c===void 0?x.excuteCode:c,h=e.conf,v=h===void 0?this.conf:h,g=v.assets,P=v.fetch,!g[n])return[3,7];if(g[n].css&&g[n].css.forEach(function(Mt){o(Mt)}),!g[n].js)return[3,6];M=0,$=g[n].js,I.label=1;case 1:return M<$.length?(V=$[M],P?[3,3]:[4,s(V)]):[3,6];case 2:return I.sent(),[3,5];case 3:return[4,u(V)];case 4:J=I.sent(),J&&l(J),I.label=5;case 5:return M++,[3,1];case 6:return[3,8];case 7:throw new Error(d.resourceNotDeclared(n,this.name));case 8:return[2]}})})},t.prototype.createSocket=function(){return new _e(this.eventEmitter,this.stores)},t.prototype.existApp=function(e){return!!this.apps[e]},t.prototype.createApp=function(e){if(this.existApp(e))throw new Error(d.createExistingApp(e));var n=new Ae(e);return this.apps[e]=n,n},t.prototype.loadApp=function(e,n){return n===void 0&&(n={}),b(this,void 0,void 0,function(){var i=this;return m(this,function(s){switch(s.label){case 0:return this.apps[e]?[3,2]:(this.loadingApps[e]||(this.loadingApps[e]=new Promise(function(r,o){var a=i.createContext(e,n);i.composedMiddlewareFn(a,i.loadResourcesFromAssetsConfig.bind(i)).then(function(){var u=e.startsWith("lib:");u&&!i.apps[e]&&(i.apps[e]=!0),i.apps[e]||o(new Error(d.appNotCreated(e))),r()}).catch(function(u){o(u)})})),[4,this.loadingApps[e]]);case 1:s.sent(),s.label=2;case 2:return[2]}})})},t.prototype.activateDependencies=function(e){return b(this,void 0,void 0,function(){var n,i,s,r,o,a;return m(this,function(u){switch(u.label){case 0:if(!(!e.dependenciesReady&&e.dependencies.length!==0))return[3,5];n=0,i=e.dependencies,u.label=1;case 1:return n<i.length?(s=i[n],r=s.name,o=s.data,a=s.ctx,[4,this.activateApp(r,o,a)]):[3,4];case 2:u.sent(),u.label=3;case 3:return n++,[3,1];case 4:e.dependenciesReady=!0,u.label=5;case 5:return[2]}})})},t.prototype.loadRelatedApps=function(e){return b(this,void 0,void 0,function(){var n,i,s,r,o;return m(this,function(a){switch(a.label){case 0:n=0,i=e.relatedApps,a.label=1;case 1:return n<i.length?(s=i[n],r=s.name,o=s.ctx,[4,this.loadApp(r,o)]):[3,4];case 2:a.sent(),a.label=3;case 3:return n++,[3,1];case 4:return[2]}})})},t.prototype.activateApp=function(e,n,i){return i===void 0&&(i={}),b(this,void 0,void 0,function(){var s,r,o,a,u=this;return m(this,function(c){switch(c.label){case 0:return[4,this.loadApp(e,i)];case 1:return c.sent(),this.isRallieCoreApp(e)?(s=this.apps[e],[4,this.loadRelatedApps(s)]):[3,8];case 2:return c.sent(),s.bootstrapping?[3,4]:(r=function(){return b(u,void 0,void 0,function(){return m(this,function(l){switch(l.label){case 0:return[4,this.activateDependencies(s)];case 1:return l.sent(),s.doBootstrap?[4,Promise.resolve(s.doBootstrap(n))]:[3,3];case 2:return l.sent(),[3,5];case 3:return s.doActivate?[4,Promise.resolve(s.doActivate(n))]:[3,5];case 4:l.sent(),l.label=5;case 5:return[2]}})})},o=function(l){return new Promise(function(h,v){setTimeout(function(){v(new Error(d.bootstrapTimeout(e,l)))},l)})},s.bootstrapping=Promise.race([r(),o(this.conf.maxBootstrapTime)]),[4,s.bootstrapping]);case 3:return c.sent(),[3,8];case 4:return[4,s.bootstrapping];case 5:return c.sent(),a=s.doActivate,a?[4,Promise.resolve(s.doActivate(n))]:[3,7];case 6:a=c.sent(),c.label=7;case 7:c.label=8;case 8:return[2]}})})},t.prototype.destroyApp=function(e,n){return b(this,void 0,void 0,function(){var i,s;return m(this,function(r){switch(r.label){case 0:return this.isRallieCoreApp(e)?(i=this.apps[e],s=i.doDestroy,s?[4,Promise.resolve(i.doDestroy(n))]:[3,2]):[3,3];case 1:s=r.sent(),r.label=2;case 2:i.bootstrapping=null,i.dependenciesReady=!1,r.label=3;case 3:return[2]}})})},t}(),Le={},at="DEFAULT_BUS",Ne=function(t){if(t===void 0&&(t=at),window.RALLIE_BUS_STORE===void 0&&Reflect.defineProperty(window,"RALLIE_BUS_STORE",{value:Le,writable:!1}),window.RALLIE_BUS_STORE[t])throw new Error(d.duplicatedBus(t));var e=new Ie(t);return Reflect.defineProperty(window.RALLIE_BUS_STORE,t,{value:e,writable:!1}),e},Ot=function(t){return t===void 0&&(t=at),window.RALLIE_BUS_STORE&&window.RALLIE_BUS_STORE[t]},ct=function(t){t===void 0&&(t=at);var e=null,n=!1,i=Ot(t);return i?(e=i,n=!1):(e=Ne(t),n=!0),[e,n]};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function Oe(t,e,n,i){function s(r){return r instanceof n?r:new n(function(o){o(r)})}return new(n||(n=Promise))(function(r,o){function a(l){try{c(i.next(l))}catch(h){o(h)}}function u(l){try{c(i.throw(l))}catch(h){o(h)}}function c(l){l.done?r(l.value):s(l.value).then(a,u)}c((i=i.apply(t,e||[])).next())})}function Pe(t,e){var n={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},i,s,r,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(c){return function(l){return u([c,l])}}function u(c){if(i)throw new TypeError("Generator is already executing.");for(;n;)try{if(i=1,s&&(r=c[0]&2?s.return:c[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,c[1])).done)return r;switch(s=0,r&&(c=[c[0]&2,r.value]),c[0]){case 0:case 1:r=c;break;case 4:return n.label++,{value:c[1],done:!1};case 5:n.label++,s=c[1],c=[0];continue;case 7:c=n.ops.pop(),n.trys.pop();continue;default:if(r=n.trys,!(r=r.length>0&&r[r.length-1])&&(c[0]===6||c[0]===2)){n=0;continue}if(c[0]===3&&(!r||c[1]>r[0]&&c[1]<r[3])){n.label=c[1];break}if(c[0]===6&&n.label<r[1]){n.label=r[1],r=c;break}if(r&&n.label<r[2]){n.label=r[2],n.ops.push(c);break}r[2]&&n.ops.pop(),n.trys.pop();continue}c=e.call(t,n)}catch(l){c=[6,l],s=0}finally{i=r=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}var p={privateBus:function(t){return"".concat(t,".bus")},stateNamespace:function(t){return"".concat(t,".state")},isGlobalBusAccessible:"isGlobalBusAccessible"},Pt=function(t){return"[rallie] ".concat(t)},O={stateNotInitialized:function(t){return Pt(" app ".concat(t,`'s state is not initialized, please check:
`)+"1. whether app ".concat(t,` is loaded.
`)+"2. whether app ".concat(t," initializes the state"))},duplicatedAppName:function(t){return Pt("the app ".concat(t," is already registered, please rename your app"))}},Me=function(){function t(e){var n=this;this.name=e,this.isRallieApp=!1;var i=ct(p.privateBus(e))[0];this.socket=i.createSocket(),this.events=this.socket.createBroadcaster(),this.methods=this.socket.createUnicaster(),Reflect.defineProperty(this,"state",{get:function(){return n.socket.getState(p.stateNamespace(n.name))},set:function(){return!1}})}return t.prototype.setState=function(e,n){if(this.socket.existState(p.stateNamespace(this.name)))return this.socket.setState(p.stateNamespace(this.name),e,n);throw new Error(O.stateNotInitialized(this.name))},t.prototype.watchState=function(e){if(this.socket.existState(p.stateNamespace(this.name)))return this.socket.watchState(p.stateNamespace(this.name),e);throw new Error(O.stateNotInitialized(this.name))},t.prototype.listenEvents=function(e){return this.socket.onBroadcast(e)},t}(),Ce=function(){function t(e,n){var i=this,s;this.name=e,this.isRallieApp=!0;var r=ct(),o=r[0],a=r[1];if(o.existApp(e))throw new Error(O.duplicatedAppName(e));this.globalBus=o,this.globalSocket=o.createSocket(),this.isEntryApp=a,a&&this.globalSocket.initState(p.isGlobalBusAccessible,{value:!0},!0);var u=ct(p.privateBus(e))[0];this.socket=u.createSocket(),this.events=this.socket.createBroadcaster(),this.methods=this.socket.createUnicaster(),(n==null?void 0:n.state)&&this.socket.initState(p.stateNamespace(e),n.state,(s=n==null?void 0:n.isPrivate)!==null&&s!==void 0?s:!1),Reflect.defineProperty(this,"state",{get:function(){return i.socket.getState(p.stateNamespace(i.name))},set:function(){return!1}})}return t.prototype.setState=function(e,n){if(this.socket.existState(p.stateNamespace(this.name)))return this.socket.setState(p.stateNamespace(this.name),e,n);throw new Error(O.stateNotInitialized(this.name))},t.prototype.watchState=function(e){if(this.socket.existState(p.stateNamespace(this.name)))return this.socket.watchState(p.stateNamespace(this.name),e);throw new Error(O.stateNotInitialized(this.name))},t.prototype.listenEvents=function(e){return this.socket.onBroadcast(e)},t.prototype.addMethods=function(e){return this.socket.onUnicast(e)},t.prototype.connect=function(e){return new Me(e)},t.prototype.load=function(e,n){return n===void 0&&(n={}),this.globalBus.loadApp(e,n)},t.prototype.activate=function(e,n,i){return i===void 0&&(i={}),this.globalBus.activateApp(e,n,i)},t.prototype.destroy=function(e,n){return this.globalBus.destroyApp(e,n)},t.prototype.run=function(e){var n;return Oe(this,void 0,void 0,function(){var i,s,r=this;return Pe(this,function(o){switch(o.label){case 0:return i=this.isEntryApp||((n=this.globalSocket.getState(p.isGlobalBusAccessible))===null||n===void 0?void 0:n.value),s=function(a){r.globalSocket.setState(p.isGlobalBusAccessible,"".concat(a?"enable":"disable"," remote app to access the bus"),function(u){u.value=a})},[4,Promise.resolve(e({isEntryApp:this.isEntryApp,bus:i?this.globalBus:void 0,setBusAccessible:this.isEntryApp?s:void 0}))];case 1:return o.sent(),[2]}})})},t}();function Ue(t){var e=Ot();return e.createApp(t.name)}export{Ce as A,Ue as r};