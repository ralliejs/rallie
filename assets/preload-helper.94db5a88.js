const kt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}};kt();var $=function(t,e){return $=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])},$(t,e)};function dt(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");$(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}function Mt(t,e,n,r){function i(s){return s instanceof n?s:new n(function(o){o(s)})}return new(n||(n=Promise))(function(s,o){function a(l){try{c(r.next(l))}catch(f){o(f)}}function u(l){try{c(r.throw(l))}catch(f){o(f)}}function c(l){l.done?s(l.value):i(l.value).then(a,u)}c((r=r.apply(t,e||[])).next())})}function Nt(t,e){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(c){return function(l){return u([c,l])}}function u(c){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,i&&(s=c[0]&2?i.return:c[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,c[1])).done)return s;switch(i=0,s&&(c=[c[0]&2,s.value]),c[0]){case 0:case 1:s=c;break;case 4:return n.label++,{value:c[1],done:!1};case 5:n.label++,i=c[1],c=[0];continue;case 7:c=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(c[0]===6||c[0]===2)){n=0;continue}if(c[0]===3&&(!s||c[1]>s[0]&&c[1]<s[3])){n.label=c[1];break}if(c[0]===6&&n.label<s[1]){n.label=s[1],s=c;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(c);break}s[2]&&n.ops.pop(),n.trys.pop();continue}c=e.call(t,n)}catch(l){c=[6,l],i=0}finally{r=s=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}var m=function(){return m=Object.assign||function(e){for(var n,r=1,i=arguments.length;r<i;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},m.apply(this,arguments)};function y(t,e,n,r){function i(s){return s instanceof n?s:new n(function(o){o(s)})}return new(n||(n=Promise))(function(s,o){function a(l){try{c(r.next(l))}catch(f){o(f)}}function u(l){try{c(r.throw(l))}catch(f){o(f)}}function c(l){l.done?s(l.value):i(l.value).then(a,u)}c((r=r.apply(t,e||[])).next())})}function b(t,e){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(c){return function(l){return u([c,l])}}function u(c){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,i&&(s=c[0]&2?i.return:c[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,c[1])).done)return s;switch(i=0,s&&(c=[c[0]&2,s.value]),c[0]){case 0:case 1:s=c;break;case 4:return n.label++,{value:c[1],done:!1};case 5:n.label++,i=c[1],c=[0];continue;case 7:c=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(c[0]===6||c[0]===2)){n=0;continue}if(c[0]===3&&(!s||c[1]>s[0]&&c[1]<s[3])){n.label=c[1];break}if(c[0]===6&&n.label<s[1]){n.label=s[1],s=c;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(c);break}s[2]&&n.ops.pop(),n.trys.pop();continue}c=e.call(t,n)}catch(l){c=[6,l],i=0}finally{r=s=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function R(t,e,n){if(n||arguments.length===2)for(var r=0,i=e.length,s;r<i;r++)(s||!(r in e))&&(s||(s=Array.prototype.slice.call(e,0,r)),s[r]=e[r]);return t.concat(s||Array.prototype.slice.call(e))}var d={removeNonExistedBroadcast:function(t){return"[@rallie/core] you are trying to remove a listener of the broadcast event ".concat(t,", but ").concat(t," hasn't been registed as a broadcast event")},wrongBroadcastCallback:function(t){return"[@rallie/core] you are trying to remove a listener of the broadcast event ".concat(t,", but the listener hasn't been registed")},broadcastCallbackError:function(t){return"[@rallie/core] one of the callbacks of the broadcast event ".concat(t," throws an uncaught error")},removeNonExistedUnicast:function(t){return"[@rallie/core] you are trying to remove a listener of the unicast event ".concat(t,", but ").concat(t," hasn't been registed as a unicast event")},registedExistedUnicast:function(t){return"[@rallie/core] you are trying to register a unicast event ".concat(t,", but it has been registered before")},emittedNonExistedUnicast:function(t){return"[@rallie/core] you have emitted ".concat(t," unicast, but there is no listener of this event")},createExistingApp:function(t){return"[@rallie/core] ".concat(t," is existing, you are not allowed to create it again")},resourceNotDeclared:function(t,e){return"[@rallie/core] can not find any assets of the app ".concat(t," on the bus ").concat(e)},appNotCreated:function(t){return"[@rallie/core] you are trying to activate app ".concat(t,", but it was not created")},modifyPrivateState:function(t){return"[@rallie/core] state ".concat(t," is private, you are not allowed to set it")},actionIsNotDefined:function(t){return"[@rallie/core] please describe your action when you modify the state ".concat(t)},accessUninitializedState:function(t){return"[@rallie/core] it's not allowed to set or watch state ".concat(t," before it is initialized")},waitStateTimeout:function(t){return"[@rallie/core] wait for states ".concat(JSON.stringify(t)," timeout")},duplicatedInitial:function(t){return"[@rallie/core] duplicated initialized state ".concat(t)},initializePrimitiveState:function(t){return"[@rallie/core] it's not allowed to initialized state ".concat(t," to a primitive value")},duplicatedBus:function(t){return"[@rallie/core] the bus named ".concat(t," has been defined before, please rename your bus")},circularDependencies:function(t,e){return"[@rallie/core] There is a circular dependency when activating the app ".concat(t,", and the circular path is ").concat(e.join("->"))},multipleCalledNextFn:function(){return"[@rallie/core] next() called multiple times in the middleware"},wrongMiddlewareType:function(){return"[@rallie/core] the middleware must be a function"}},Ct={handlerIsNotInTheEventsPool:function(t,e){return"[@rallie/core] the event ".concat(t," is not in the events pool that you specified when calling on").concat(e?"Unicast":"Broadcast")}};function Pt(t){return["string","number","boolean","undefined"].includes(typeof t)}function nt(t){var e={},n=[];return t.forEach(function(r){var i=typeof r=="string"?r:r.name;e[i]||(n.push(r),e[i]=!0)}),n}var rt=function(t){return function(e,n){var r=-1,i=function(s){if(s<=r)return Promise.reject(new Error(d.multipleCalledNextFn()));r=s;var o=t[s];if(s===t.length&&(o=n),!o)return Promise.resolve();try{return Promise.resolve(o(e,i.bind(null,s+1)))}catch(a){return Promise.reject(a)}};return i(0)}},Ut=function(){function t(){this.broadcastEvents={},this.unicastEvents={}}return t.prototype.addBroadcastEventListener=function(e,n){var r=this;this.broadcastEvents[e]=this.broadcastEvents[e]||{listeners:[],emitedArgs:[]};var i=this.broadcastEvents[e],s=i.listeners,o=i.emitedArgs;s.push(n),o.length>0&&(o.forEach(function(a){r.emitBroadcast.apply(r,R([e],a,!1))}),this.broadcastEvents[e].emitedArgs=[])},t.prototype.addUnicastEventListener=function(e,n){if(this.unicastEvents[e])throw new Error(d.registedExistedUnicast(e));this.unicastEvents[e]=n},t.prototype.removeBroadcastEventListener=function(e,n){var r,i=(r=this.broadcastEvents[e])===null||r===void 0?void 0:r.listeners;if(i){for(var s=-1,o=0;o<i.length;o++)if(i[o]===n){s=o;break}if(s!==-1)i.splice(s,1);else{var a=d.wrongBroadcastCallback(e);throw new Error(a)}}else{var a=d.removeNonExistedBroadcast(e);throw new Error(a)}},t.prototype.removeUnicastEventListener=function(e){if(!this.unicastEvents[e]){var n=d.removeNonExistedUnicast(e);throw new Error(n)}delete this.unicastEvents[e]},t.prototype.emitBroadcast=function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];this.broadcastEvents[e]=this.broadcastEvents[e]||{listeners:[],emitedArgs:[]};var i=this.broadcastEvents[e],s=i.listeners,o=i.emitedArgs;s.length>0?s.forEach(function(a){try{a.apply(void 0,n)}catch(u){console.error(d.broadcastCallbackError(e)),console.error(u)}}):o.push(n)},t.prototype.emitUnicast=function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i=this.unicastEvents[e];if(i)return i.apply(void 0,n);throw new Error(d.emittedNonExistedUnicast(e))},t}();function zt(t,e){const n=Object.create(null),r=t.split(",");for(let i=0;i<r.length;i++)n[r[i]]=!0;return e?i=>!!n[i.toLowerCase()]:i=>!!n[i]}const jt=Object.assign,Kt=Object.prototype.hasOwnProperty,K=(t,e)=>Kt.call(t,e),S=Array.isArray,z=t=>pt(t)==="[object Map]",Dt=t=>typeof t=="string",Y=t=>typeof t=="symbol",D=t=>t!==null&&typeof t=="object",Wt=Object.prototype.toString,pt=t=>Wt.call(t),Ft=t=>pt(t).slice(8,-1),q=t=>Dt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,vt=(t,e)=>!Object.is(t,e);let $t;function wt(t,e=$t){e&&e.active&&e.effects.push(t)}const gt=t=>{const e=new Set(t);return e.w=0,e.n=0,e},yt=t=>(t.w&_)>0,bt=t=>(t.n&_)>0,Gt=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=_},Ht=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const i=e[r];yt(i)&&!bt(i)?i.delete(t):e[n++]=i,i.w&=~_,i.n&=~_}e.length=n}},G=new WeakMap;let T=0,_=1;const H=30;let g;const x=Symbol(""),V=Symbol("");class Vt{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,wt(this,r)}run(){if(!this.active)return this.fn();let e=g,n=A;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=g,g=this,A=!0,_=1<<++T,T<=H?Gt(this):it(this),this.fn()}finally{T<=H&&Ht(this),_=1<<--T,g=this.parent,A=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){g===this?this.deferStop=!0:this.active&&(it(this),this.onStop&&this.onStop(),this.active=!1)}}function it(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}function Jt(t,e){t.effect&&(t=t.effect.fn);const n=new Vt(t);e&&(jt(n,e),e.scope&&wt(n,e.scope)),(!e||!e.lazy)&&n.run();const r=n.run.bind(n);return r.effect=n,r}let A=!0;const Et=[];function Yt(){Et.push(A),A=!1}function qt(){const t=Et.pop();A=t===void 0?!0:t}function w(t,e,n){if(A&&g){let r=G.get(t);r||G.set(t,r=new Map);let i=r.get(n);i||r.set(n,i=gt()),Zt(i)}}function Zt(t,e){let n=!1;T<=H?bt(t)||(t.n|=_,n=!yt(t)):n=!t.has(g),n&&(t.add(g),g.deps.push(t))}function B(t,e,n,r,i,s){const o=G.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&S(t))o.forEach((u,c)=>{(c==="length"||c>=r)&&a.push(u)});else switch(n!==void 0&&a.push(o.get(n)),e){case"add":S(t)?q(n)&&a.push(o.get("length")):(a.push(o.get(x)),z(t)&&a.push(o.get(V)));break;case"delete":S(t)||(a.push(o.get(x)),z(t)&&a.push(o.get(V)));break;case"set":z(t)&&a.push(o.get(x));break}if(a.length===1)a[0]&&st(a[0]);else{const u=[];for(const c of a)c&&u.push(...c);st(gt(u))}}function st(t,e){const n=S(t)?t:[...t];for(const r of n)r.computed&&ot(r);for(const r of n)r.computed||ot(r)}function ot(t,e){(t!==g||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const Qt=zt("__proto__,__v_isRef,__isVue"),mt=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Y)),Xt=St(),te=St(!0),at=ee();function ee(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=h(this);for(let s=0,o=this.length;s<o;s++)w(r,"get",s+"");const i=r[e](...n);return i===-1||i===!1?r[e](...n.map(h)):i}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Yt();const r=h(this)[e].apply(this,n);return qt(),r}}),t}function St(t=!1,e=!1){return function(r,i,s){if(i==="__v_isReactive")return!t;if(i==="__v_isReadonly")return t;if(i==="__v_isShallow")return e;if(i==="__v_raw"&&s===(t?e?ge:xt:e?we:Bt).get(r))return r;const o=S(r);if(!t&&o&&K(at,i))return Reflect.get(at,i,s);const a=Reflect.get(r,i,s);return(Y(i)?mt.has(i):Qt(i))||(t||w(r,"get",i),e)?a:I(a)?o&&q(i)?a:a.value:D(a)?t?j(a):Q(a):a}}const ne=re();function re(t=!1){return function(n,r,i,s){let o=n[r];if(J(o)&&I(o)&&!I(i))return!1;if(!t&&(!Ee(i)&&!J(i)&&(o=h(o),i=h(i)),!S(n)&&I(o)&&!I(i)))return o.value=i,!0;const a=S(n)&&q(r)?Number(r)<n.length:K(n,r),u=Reflect.set(n,r,i,s);return n===h(s)&&(a?vt(i,o)&&B(n,"set",r,i):B(n,"add",r,i)),u}}function ie(t,e){const n=K(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&B(t,"delete",e,void 0),r}function se(t,e){const n=Reflect.has(t,e);return(!Y(e)||!mt.has(e))&&w(t,"has",e),n}function oe(t){return w(t,"iterate",S(t)?"length":x),Reflect.ownKeys(t)}const ae={get:Xt,set:ne,deleteProperty:ie,has:se,ownKeys:oe},ce={get:te,set(t,e){return!0},deleteProperty(t,e){return!0}},Z=t=>t,W=t=>Reflect.getPrototypeOf(t);function k(t,e,n=!1,r=!1){t=t.__v_raw;const i=h(t),s=h(e);n||(e!==s&&w(i,"get",e),w(i,"get",s));const{has:o}=W(i),a=r?Z:n?tt:X;if(o.call(i,e))return a(t.get(e));if(o.call(i,s))return a(t.get(s));t!==i&&t.get(e)}function M(t,e=!1){const n=this.__v_raw,r=h(n),i=h(t);return e||(t!==i&&w(r,"has",t),w(r,"has",i)),t===i?n.has(t):n.has(t)||n.has(i)}function N(t,e=!1){return t=t.__v_raw,!e&&w(h(t),"iterate",x),Reflect.get(t,"size",t)}function ct(t){t=h(t);const e=h(this);return W(e).has.call(e,t)||(e.add(t),B(e,"add",t,t)),this}function ut(t,e){e=h(e);const n=h(this),{has:r,get:i}=W(n);let s=r.call(n,t);s||(t=h(t),s=r.call(n,t));const o=i.call(n,t);return n.set(t,e),s?vt(e,o)&&B(n,"set",t,e):B(n,"add",t,e),this}function lt(t){const e=h(this),{has:n,get:r}=W(e);let i=n.call(e,t);i||(t=h(t),i=n.call(e,t)),r&&r.call(e,t);const s=e.delete(t);return i&&B(e,"delete",t,void 0),s}function ft(){const t=h(this),e=t.size!==0,n=t.clear();return e&&B(t,"clear",void 0,void 0),n}function C(t,e){return function(r,i){const s=this,o=s.__v_raw,a=h(o),u=e?Z:t?tt:X;return!t&&w(a,"iterate",x),o.forEach((c,l)=>r.call(i,u(c),u(l),s))}}function P(t,e,n){return function(...r){const i=this.__v_raw,s=h(i),o=z(s),a=t==="entries"||t===Symbol.iterator&&o,u=t==="keys"&&o,c=i[t](...r),l=n?Z:e?tt:X;return!e&&w(s,"iterate",u?V:x),{next(){const{value:f,done:p}=c.next();return p?{value:f,done:p}:{value:a?[l(f[0]),l(f[1])]:l(f),done:p}},[Symbol.iterator](){return this}}}}function E(t){return function(...e){return t==="delete"?!1:this}}function ue(){const t={get(s){return k(this,s)},get size(){return N(this)},has:M,add:ct,set:ut,delete:lt,clear:ft,forEach:C(!1,!1)},e={get(s){return k(this,s,!1,!0)},get size(){return N(this)},has:M,add:ct,set:ut,delete:lt,clear:ft,forEach:C(!1,!0)},n={get(s){return k(this,s,!0)},get size(){return N(this,!0)},has(s){return M.call(this,s,!0)},add:E("add"),set:E("set"),delete:E("delete"),clear:E("clear"),forEach:C(!0,!1)},r={get(s){return k(this,s,!0,!0)},get size(){return N(this,!0)},has(s){return M.call(this,s,!0)},add:E("add"),set:E("set"),delete:E("delete"),clear:E("clear"),forEach:C(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=P(s,!1,!1),n[s]=P(s,!0,!1),e[s]=P(s,!1,!0),r[s]=P(s,!0,!0)}),[t,n,e,r]}const[le,fe,he,de]=ue();function _t(t,e){const n=e?t?de:he:t?fe:le;return(r,i,s)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?r:Reflect.get(K(n,i)&&i in r?n:r,i,s)}const pe={get:_t(!1,!1)},ve={get:_t(!0,!1)},Bt=new WeakMap,we=new WeakMap,xt=new WeakMap,ge=new WeakMap;function ye(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function be(t){return t.__v_skip||!Object.isExtensible(t)?0:ye(Ft(t))}function Q(t){return J(t)?t:At(t,!1,ae,pe,Bt)}function j(t){return At(t,!0,ce,ve,xt)}function At(t,e,n,r,i){if(!D(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=i.get(t);if(s)return s;const o=be(t);if(o===0)return t;const a=new Proxy(t,o===2?r:n);return i.set(t,a),a}function J(t){return!!(t&&t.__v_isReadonly)}function Ee(t){return!!(t&&t.__v_isShallow)}function h(t){const e=t&&t.__v_raw;return e?h(e):t}const X=t=>D(t)?Q(t):t,tt=t=>D(t)?j(t):t;function I(t){return!!(t&&t.__v_isRef===!0)}var me=function(){function t(e,n){this.namespace=e,this.stores=n,this.stores[e].watchers.push(this)}return t.prototype.do=function(e){var n=this;return this.handler=e,function(){return n.unwatch()}},t.prototype.unwatch=function(){this===null||this===void 0||this.stopEffect(),this.handler=null;var e=this.stores[this.namespace].watchers.indexOf(this);e!==-1&&this.stores[this.namespace].watchers.splice(e,1)},t}(),F="$state-initialized",Se=function(){function t(e,n){this.eventEmitter=e,this.stores=n,this.eventEmitter=e,this.stores=n}return t.prototype.offEvents=function(e,n,r){var i=n?this.eventEmitter.removeUnicastEventListener:this.eventEmitter.removeBroadcastEventListener;i=i.bind(this.eventEmitter),r?e[r]?(i(r,e[r]),delete e[r]):console.warn(Ct.handlerIsNotInTheEventsPool(r,n)):Object.entries(e).forEach(function(s){var o=s[0],a=s[1];i(o,a)})},t.prototype.onBroadcast=function(e){var n=this;return Object.entries(e).forEach(function(r){var i=r[0],s=r[1];n.eventEmitter.addBroadcastEventListener(i,s)}),function(r){n.offEvents(e,!1,r)}},t.prototype.onUnicast=function(e){var n=this;return Object.entries(e).forEach(function(r){var i=r[0],s=r[1];try{n.eventEmitter.addUnicastEventListener(i,s)}catch(o){console.error(o)}}),function(r){n.offEvents(e,!0,r)}},t.prototype.createBroadcaster=function(e){var n=this;return new Proxy({},{get:function(r,i){return function(){for(var s,o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];return e==null||e(i),(s=n.eventEmitter).emitBroadcast.apply(s,R([i],o,!1))}},set:function(){return!1}})},t.prototype.createUnicaster=function(e){var n=this;return new Proxy({},{get:function(r,i){return function(){for(var s,o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];return e==null||e(i),(s=n.eventEmitter).emitUnicast.apply(s,R([i],o,!1))}},set:function(){return!1}})},t.prototype.existState=function(e){return!!this.stores[e]},t.prototype.initState=function(e,n,r){if(r===void 0&&(r=!1),this.existState(e))throw new Error(d.duplicatedInitial(e));if(Pt(n))throw new Error(d.initializePrimitiveState(e));return this.stores[e]={state:Q(n),owner:r?this:null,watchers:[]},this.eventEmitter.emitBroadcast(F,e),this.getState(e)},t.prototype.getState=function(e,n){if(this.existState(e)){var r=j(this.stores[e].state);return n?n(r):r}else return null},t.prototype.getStateToSet=function(e){if(!this.existState(e)){var n=d.accessUninitializedState(e);throw new Error(n)}var r=this.stores[e].owner;if(r!==this&&r!==null){var n=d.modifyPrivateState(e);throw new Error(n)}return this.stores[e].state},t.prototype.setState=function(e,n,r){return y(this,void 0,void 0,function(){var i;return b(this,function(s){switch(s.label){case 0:return i=this.getStateToSet(e),n?[4,Promise.resolve(r(i))]:[3,2];case 1:return s.sent(),[3,3];case 2:throw new Error(d.actionIsNotDefined(e));case 3:return[2]}})})},t.prototype.watchState=function(e,n){if(!this.existState(e)){var r=d.accessUninitializedState(e);throw new Error(r)}var i=!1,s=j(this.stores[e].state),o=new me(e,this.stores),a=Jt(function(){return n(s)},{lazy:!0,scheduler:function(){i||(i=!0,Promise.resolve().then(function(){var u,c=n(s);(u=o.handler)===null||u===void 0||u.call(o,c,o.oldWatchingStates),o.oldWatchingStates=c,i=!1}))}});return o.oldWatchingStates=a(),o.stopEffect=function(){return a.effect.stop()},o},t.prototype.waitState=function(e,n){var r=this;n===void 0&&(n=10*1e3);var i=R([],e,!0),s=e.filter(function(a){return!r.existState(a)});if(s.length===0){var o=i.map(function(a){return r.getState(a)});return Promise.resolve(o)}else return new Promise(function(a,u){var c=setTimeout(function(){clearTimeout(c);var f=d.waitStateTimeout(s);u(new Error(f))},n),l=function(f){var p=s.indexOf(f);if(p!==-1&&s.splice(p,1),s.length===0){clearTimeout(c),r.eventEmitter.removeBroadcastEventListener(F,l);var Ot=i.map(function(Lt){return r.getState(Lt)});a(Ot)}};r.eventEmitter.addBroadcastEventListener(F,l)})},t}(),_e=function(){function t(e){this.name=e,this.dependenciesReady=!1,this.bootstrapping=null,this.dependencies=[],this.relatedApps=[],this.name=e,this.isRallieCoreApp=!0}return t.prototype.relateTo=function(e){var n=this,r=function(o){return typeof o=="string"?o:o.name},i=nt(e),s=this.relatedApps.map(function(o){return o.name});return i.forEach(function(o){s.includes(r(o))||n.relatedApps.push({name:r(o),ctx:typeof o!="string"?o.ctx:void 0})}),this},t.prototype.relyOn=function(e){var n=this,r=function(a){return typeof a=="string"?a:a.name},i=nt(e),s=this.dependencies.map(function(a){return a.name}),o=this.relatedApps.map(function(a){return a.name});return i.forEach(function(a){var u=r(a);s.includes(u)||n.dependencies.push({name:u,ctx:typeof a!="string"?a.ctx:void 0,data:typeof a!="string"?a.data:void 0}),o.includes(u)||n.relatedApps.push({name:u,ctx:typeof a!="string"?a.ctx:void 0})}),this},t.prototype.onBootstrap=function(e){return this.doBootstrap=e,this},t.prototype.onActivate=function(e){return this.doActivate=e,this},t.prototype.onDestroy=function(e){return this.doDestroy=e,this},t}(),Be=function(t){return y(void 0,void 0,void 0,function(){var e;return b(this,function(n){return e=new Promise(function(r){var i=null;if(t instanceof HTMLScriptElement)i=t;else{i=document.createElement("script");var s=typeof t!="string"?t:{type:"text/javascript",src:t};Object.entries(s).forEach(function(o){var a=o[0],u=o[1];i[a]=u})}i.src&&(i.onload=i.onerror=function(){r()}),document.body.appendChild(i),i.src||r()}),[2,e]})})},xe=function(t){var e=null;if(t instanceof HTMLLinkElement)e=t;else{var n=typeof t!="string"?t:{rel:"stylesheet",type:"text/css",href:t};e=document.createElement("link"),Object.entries(n).forEach(function(r){var i=r[0],s=r[1];e[i]=s})}document.head.appendChild(e)},U={loadScript:Be,loadLink:xe},Ae=function(){function t(e){this.eventEmitter=new Ut,this.stores={},this.apps={},this.loadingApps={},this.conf={assets:{}},this.middlewares=[],this.name=e,this.composedMiddlewareFn=rt(this.middlewares)}return t.prototype.isRallieCoreApp=function(e){return this.apps[e]&&typeof this.apps[e]!="boolean"},t.prototype.config=function(e){return this.conf=m(m(m({},this.conf),e),{assets:m(m({},this.conf.assets),(e==null?void 0:e.assets)||{})}),this},t.prototype.use=function(e){if(typeof e!="function")throw new Error(d.wrongMiddlewareType());return this.middlewares.push(e),this.composedMiddlewareFn=rt(this.middlewares),this},t.prototype.createContext=function(e,n){n===void 0&&(n={});var r=m({name:e,loadScript:U.loadScript,loadLink:U.loadLink},n);return r},t.prototype.loadResourcesFromAssetsConfig=function(e){return y(this,void 0,void 0,function(){var n,r,i,s,o,a,u,c,l;return b(this,function(f){switch(f.label){case 0:if(n=e.name,r=e.loadScript,i=r===void 0?U.loadScript:r,s=e.loadLink,o=s===void 0?U.loadLink:s,a=this.conf.assets,!a[n])return[3,5];if(a[n].css&&a[n].css.forEach(function(p){o(p)}),!a[n].js)return[3,4];u=0,c=a[n].js,f.label=1;case 1:return u<c.length?(l=c[u],[4,i(l)]):[3,4];case 2:f.sent(),f.label=3;case 3:return u++,[3,1];case 4:return[3,6];case 5:throw new Error(d.resourceNotDeclared(n,this.name));case 6:return[2]}})})},t.prototype.createSocket=function(){return new Se(this.eventEmitter,this.stores)},t.prototype.existApp=function(e){return!!this.apps[e]},t.prototype.createApp=function(e){if(this.existApp(e))throw new Error(d.createExistingApp(e));var n=new _e(e);return this.apps[e]=n,n},t.prototype.loadApp=function(e,n){return n===void 0&&(n={}),y(this,void 0,void 0,function(){var r=this;return b(this,function(i){switch(i.label){case 0:return this.apps[e]?[3,2]:(this.loadingApps[e]||(this.loadingApps[e]=new Promise(function(s,o){var a=r.createContext(e,n);r.composedMiddlewareFn(a,r.loadResourcesFromAssetsConfig.bind(r)).then(function(){var u=e.startsWith("lib:");u&&!r.apps[e]&&(r.apps[e]=!0),r.apps[e]||o(new Error(d.appNotCreated(e))),s()}).catch(function(u){o(u)})})),[4,this.loadingApps[e]]);case 1:i.sent(),i.label=2;case 2:return[2]}})})},t.prototype.activateDependencies=function(e,n){return y(this,void 0,void 0,function(){var r,i,s,o,a,u;return b(this,function(c){switch(c.label){case 0:if(!(!e.dependenciesReady&&e.dependencies.length!==0))return[3,5];r=0,i=e.dependencies,c.label=1;case 1:return r<i.length?(s=i[r],o=s.name,a=s.data,u=s.ctx,[4,this.activateApp(o,a,u,n)]):[3,4];case 2:c.sent(),c.label=3;case 3:return r++,[3,1];case 4:e.dependenciesReady=!0,c.label=5;case 5:return[2]}})})},t.prototype.loadRelatedApps=function(e){return y(this,void 0,void 0,function(){var n,r,i,s,o;return b(this,function(a){switch(a.label){case 0:n=0,r=e.relatedApps,a.label=1;case 1:return n<r.length?(i=r[n],s=i.name,o=i.ctx,[4,this.loadApp(s,o)]):[3,4];case 2:a.sent(),a.label=3;case 3:return n++,[3,1];case 4:return[2]}})})},t.prototype.activateApp=function(e,n,r,i){return r===void 0&&(r={}),i===void 0&&(i=[]),y(this,void 0,void 0,function(){var s,o,a,u,c,l=this;return b(this,function(f){switch(f.label){case 0:return[4,this.loadApp(e,r)];case 1:return f.sent(),this.isRallieCoreApp(e)?(s=this.apps[e],[4,this.loadRelatedApps(s)]):[3,9];case 2:if(f.sent(),i.includes(e))throw o=i.indexOf(e),a=R(R([],i.slice(o),!0),[e],!1),new Error(d.circularDependencies(e,a));return i.push(e),s.bootstrapping?[3,4]:(u=function(){return y(l,void 0,void 0,function(){return b(this,function(p){switch(p.label){case 0:return[4,this.activateDependencies(s,i)];case 1:return p.sent(),s.doBootstrap?[4,Promise.resolve(s.doBootstrap(n))]:[3,3];case 2:return p.sent(),[3,5];case 3:return s.doActivate?[4,Promise.resolve(s.doActivate(n))]:[3,5];case 4:p.sent(),p.label=5;case 5:return[2]}})})},s.bootstrapping=u(),[4,s.bootstrapping]);case 3:return f.sent(),[3,8];case 4:return[4,s.bootstrapping];case 5:return f.sent(),c=s.doActivate,c?[4,Promise.resolve(s.doActivate(n))]:[3,7];case 6:c=f.sent(),f.label=7;case 7:f.label=8;case 8:i.pop(),f.label=9;case 9:return[2]}})})},t.prototype.destroyApp=function(e,n){return y(this,void 0,void 0,function(){var r,i;return b(this,function(s){switch(s.label){case 0:return this.isRallieCoreApp(e)?(r=this.apps[e],i=r.doDestroy,i?[4,Promise.resolve(r.doDestroy(n))]:[3,2]):[3,3];case 1:i=s.sent(),s.label=2;case 2:r.bootstrapping=null,r.dependenciesReady=!1,s.label=3;case 3:return[2]}})})},t}(),Re={},et="DEFAULT_BUS",Te=function(t){if(t===void 0&&(t=et),window.RALLIE_BUS_STORE===void 0&&Reflect.defineProperty(window,"RALLIE_BUS_STORE",{value:Re,writable:!1}),window.RALLIE_BUS_STORE[t])throw new Error(d.duplicatedBus(t));var e=new Ae(t);return Reflect.defineProperty(window.RALLIE_BUS_STORE,t,{value:e,writable:!1}),e},Rt=function(t){return t===void 0&&(t=et),window.RALLIE_BUS_STORE&&window.RALLIE_BUS_STORE[t]},Tt=function(t){t===void 0&&(t=et);var e=null,n=!1,r=Rt(t);return r?(e=r,n=!1):(e=Te(t),n=!0),[e,n]},v={privateBus:function(t){return"".concat(t,".bus")},stateNamespace:function(t){return"".concat(t,".state")},isGlobalBusAccessible:"isGlobalBusAccessible",exportMethodName:"__RallieInnerExport__"},O=function(t){return"[rallie] ".concat(t)},L={stateNotInitialized:function(t){return O(" the block ".concat(t,`'s state is not initialized, please check:
`)+"1. whether the block ".concat(t,` is loaded.
`)+"2. whether the block ".concat(t," has initialized the state"))},duplicatedBlockName:function(t){return O("the block ".concat(t," is already registered, please rename your block"))},invalidBlock:function(t){return O("failed to register the block ".concat(t," because it is not a valid created block"))},stateIsReadonly:function(t){return O("the state of ".concat(t," is readonly"))}},Ie={suggestToInitStateBeforeRegister:function(t){return O("it's recomanded to initialize the state before you register the block ".concat(t))}},It=function(){function t(e){var n=this;this.name=e;var r=Tt(v.privateBus(e))[0];this.socket=r.createSocket(),this.events=this.socket.createBroadcaster(),this.methods=this.socket.createUnicaster(),Reflect.defineProperty(this,"state",{get:function(){return n.socket.getState(v.stateNamespace(n.name))},set:function(){throw new Error(L.stateIsReadonly(n.name))}})}return t.prototype.setState=function(e,n){if(this.socket.existState(v.stateNamespace(this.name)))return this.socket.setState(v.stateNamespace(this.name),e,n);throw new Error(L.stateNotInitialized(this.name))},t.prototype.watchState=function(e){if(this.socket.existState(v.stateNamespace(this.name)))return this.socket.watchState(v.stateNamespace(this.name),e);throw new Error(L.stateNotInitialized(this.name))},t.prototype.listenEvents=function(e){return this.socket.onBroadcast(e)},t}(),Oe=function(t){dt(e,t);function e(n){var r=t.call(this,n)||this;return r.isCreatedBlock=!1,r.innerMethods=r.socket.createUnicaster(),r}return e.prototype.import=function(){return this.innerMethods[v.exportMethodName]()},e}(It),Le=function(t){dt(e,t);function e(n,r,i,s){var o,a=t.call(this,n)||this;return a.connectedBlocks={},a.isCreatedBlock=!0,a.globalBus=r,a.globalSocket=i,a.isEntry=s,a.exported=!1,a.exports={},a.socket.onUnicast((o={},o[v.exportMethodName]=function(){return a.exports},o)),a}return e.prototype.initState=function(n,r){r===void 0&&(r=!1),this.socket.initState(v.stateNamespace(this.name),n,r),this.globalBus.existApp(this.name)&&console.warn(Ie.suggestToInitStateBeforeRegister(this.name))},e.prototype.addMethods=function(n){return this.socket.onUnicast(n)},e.prototype.export=function(n){this.exported||(this.exported=!0,this.exports=n)},e.prototype.connect=function(n){return this.connectedBlocks[n]||(this.connectedBlocks[n]=new Oe(n)),this.connectedBlocks[n]},e.prototype.load=function(n,r){return r===void 0&&(r={}),this.globalBus.loadApp(n,r)},e.prototype.activate=function(n,r,i){return i===void 0&&(i={}),this.globalBus.activateApp(n,r,i)},e.prototype.destroy=function(n,r){return this.globalBus.destroyApp(n,r)},e.prototype.run=function(n){var r;return Mt(this,void 0,void 0,function(){var i,s,o,a=this;return Nt(this,function(u){switch(u.label){case 0:return i=this.isEntry||((r=this.globalSocket.getState(v.isGlobalBusAccessible))===null||r===void 0?void 0:r.value),s=function(c){a.isEntry&&a.globalSocket.setState(v.isGlobalBusAccessible,c?"unfreeze the enviroment":"freeze the enviroment",function(l){l.value=c})},o={isEntry:this.isEntry,conf:JSON.parse(JSON.stringify(this.globalBus.conf)),use:function(c){i&&a.globalBus.use(c)},config:function(c){i&&a.globalBus.config(c)},freeze:function(){s(!1)},unfreeze:function(){s(!0)}},[4,Promise.resolve(n(o))];case 1:return u.sent(),[2]}})})},e}(It);function Ne(t){var e=Tt(),n=e[0],r=e[1];if(n.existApp(t))throw new Error(L.duplicatedBlockName(t));var i=n.createSocket();return r&&i.initState(v.isGlobalBusAccessible,{value:!0},!0),new Le(t,n,i,r)}function Ce(t){if(t.isCreatedBlock){var e=Rt();return e.createApp(t.name)}else throw new Error(L.invalidBlock(t.name))}const ke="modulepreload",ht={},Me="/rallie/",Pe=function(e,n){return!n||n.length===0?e():Promise.all(n.map(r=>{if(r=`${Me}${r}`,r in ht)return;ht[r]=!0;const i=r.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${s}`))return;const o=document.createElement("link");if(o.rel=i?"stylesheet":ke,i||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),i)return new Promise((a,u)=>{o.addEventListener("load",a),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};export{Pe as _,Ne as c,Ce as r};
