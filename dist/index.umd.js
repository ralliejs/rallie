(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Obvious = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
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
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var Errors = {
        // ================= EventEmitter.broadcast  =================
        removeNonExistedBroadcast: function (eventName) {
            return "[obvious] you are trying to remove a listener of the broadcast event " + eventName + ", but " + eventName + " hasn't been registed as a broadcast event";
        },
        wrongBroadcastCallback: function (eventName) {
            return "[obvious] you are trying to remove a listener of the broadcast event " + eventName + ", but the listener hasn't been registed";
        },
        broadcastCallbackError: function (eventName) {
            return "[obvious] one of the callbacks of the broadcast event " + eventName + " throws an uncaught error";
        },
        // ================= EventEmitter.unicast ====================
        removeNonExistedUnicast: function (eventName) {
            return "[obvious] you are trying to remove a listener of the unicast event " + eventName + ", but " + eventName + " hasn't been registed as a unicast event";
        },
        wrongUnicastCallback: function (eventName) {
            return "[obvious] you are trying to remove a listener of the unicast event " + eventName + ", but the listener hasn't been registed";
        },
        registedExistedUnicast: function (eventName) {
            return "[obvious] you are trying to regist a unicast event " + eventName + ", but it has been registed before";
        },
        // ================= App ===================
        createExistingApp: function (appName) {
            return "[obvious] " + appName + " is existing, you are not allowed to create it again";
        },
        resourceNotDeclared: function (appName, busName) {
            return "[obvious] can not find any assets of the app " + appName + " on the bus " + busName;
        },
        appNotCreated: function (appName) {
            return "[obvious] you are trying to activate app " + appName + ", but it was not created";
        },
        // ================= Socket ===============
        modifyPrivateState: function (namespace) {
            return "[obvious] state " + namespace + " is private, you are not allowed to set it";
        },
        accessUninitializedState: function (namespace) {
            return "[obvious] it's not allowed to set or watch state " + namespace + " before it is initialized";
        },
        waitStateTimeout: function (namespaces) {
            return "[obvious] wait for states " + JSON.stringify(namespaces) + " timeout";
        },
        duplicatedInitial: function (namespace) {
            return "[obvious] duplicated initialized state " + namespace;
        },
        initializePrimitiveState: function (namespace) {
            return "[obvious] it's not allowed to initialized state " + namespace + " to a primitive value";
        },
        // ================= Bus ==================
        invalidResource: function (asset) {
            return "[obvious] " + asset + " is not a valid asset";
        },
        bootstrapNumberOverflow: function (num) {
            if (num === void 0) { num = 100; }
            return "[obvious] the number of apps bootstraped at a time is greater than the maximum value of " + num + "," +
                ' it means that there may be circular dependencies, please check the app dependencies declaration' +
                ' or reset the bus\'s maxDependencyDepth';
        },
        multipleCalledNextFn: function () {
            return '[obvious] next() called multiple times in the middleware';
        },
        wrongMiddlewareType: function () {
            return '[obvious] the middleware must be a function';
        },
        wrongContextType: function () {
            return '[obvious] the app\'s name is not specified when load or activate';
        }
    };
    var Warnings = {
        emptyBroadcastEvents: function (eventName) {
            return "[obvious] you have emitted " + eventName + " event, but there is no listener of this event";
        }
    };
    var isObject = function (object) {
        return Object.prototype.toString.call(object) === '[object Object]';
    };
    var isPrimitive = function (object) {
        return ['string', 'number', 'boolean', 'undefined'].includes(typeof object);
    };
    /**
     * the compose function from koa-compose
     * @param middlewares
     * @returns
     */
    var compose = function (middlewares) { return function (context, next) {
        // last called middleware #
        var index = -1;
        var dispatch = function (i) {
            if (i <= index) {
                return Promise.reject(new Error(Errors.multipleCalledNextFn()));
            }
            index = i;
            var fn = middlewares[i];
            if (i === middlewares.length) {
                fn = next;
            }
            if (!fn) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        };
        return dispatch(0);
    }; };

    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
            this.broadcastEvents = {};
            this.unicastEvents = {};
        }
        EventEmitter.prototype.getBroadcastEvents = function () {
            return this.broadcastEvents;
        };
        EventEmitter.prototype.addBroadcastEventListener = function (event, callback) {
            this.broadcastEvents[event] = this.broadcastEvents[event] || [];
            this.broadcastEvents[event].push(callback);
        };
        EventEmitter.prototype.addUnicastEventListener = function (event, callback) {
            if (this.unicastEvents[event]) {
                throw new Error(Errors.registedExistedUnicast(event));
            }
            this.unicastEvents[event] = callback;
        };
        EventEmitter.prototype.removeBroadcastEventListener = function (event, callback) {
            var registedcallbacks = this.broadcastEvents[event];
            if (registedcallbacks) {
                var targetIndex = -1;
                for (var i = 0; i < registedcallbacks.length; i++) {
                    if (registedcallbacks[i] === callback) {
                        targetIndex = i;
                        break;
                    }
                }
                if (targetIndex !== -1) {
                    registedcallbacks.splice(targetIndex, 1);
                }
                else {
                    var msg = Errors.wrongBroadcastCallback(event);
                    throw new Error(msg);
                }
            }
            else {
                var msg = Errors.removeNonExistedBroadcast(event);
                throw new Error(msg);
            }
        };
        EventEmitter.prototype.removeUnicastEventListener = function (event, callback) {
            if (!this.unicastEvents[event]) {
                var msg = Errors.removeNonExistedUnicast(event);
                throw new Error(msg);
            }
            if (this.unicastEvents[event] !== callback) {
                var msg = Errors.wrongUnicastCallback(event);
                throw new Error(msg);
            }
            delete this.unicastEvents[event];
        };
        EventEmitter.prototype.emitBroadcast = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var registedcallbacks = this.broadcastEvents[event];
            var isInternalStateEvent = event.startsWith('$state');
            if (registedcallbacks && registedcallbacks.length !== 0) {
                registedcallbacks.forEach(function (callback) {
                    try {
                        callback.apply(void 0, args);
                    }
                    catch (error) {
                        console.error(Errors.broadcastCallbackError);
                        console.error(error);
                    }
                });
            }
            else if (!isInternalStateEvent) {
                console.warn(Warnings.emptyBroadcastEvents(event));
            }
        };
        EventEmitter.prototype.emitUnicast = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var callback = this.unicastEvents[event];
            return callback.apply(void 0, args);
        };
        return EventEmitter;
    }());

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     * IMPORTANT: all calls of this function must be prefixed with
     * \/\*#\_\_PURE\_\_\*\/
     * So that rollup can tree-shake them if necessary.
     */
    function makeMap(str, expectsLowerCase) {
        const map = Object.create(null);
        const list = str.split(',');
        for (let i = 0; i < list.length; i++) {
            map[list[i]] = true;
        }
        return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
    }
    const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
        ? Object.freeze({})
        : {};
    const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
    const extend = Object.assign;
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key) => hasOwnProperty.call(val, key);
    const isArray = Array.isArray;
    const isMap = (val) => toTypeString(val) === '[object Map]';
    const isString = (val) => typeof val === 'string';
    const isSymbol = (val) => typeof val === 'symbol';
    const isObject$1 = (val) => val !== null && typeof val === 'object';
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const toRawType = (value) => {
        // extract "RawType" from strings like "[object RawType]"
        return toTypeString(value).slice(8, -1);
    };
    const isIntegerKey = (key) => isString(key) &&
        key !== 'NaN' &&
        key[0] !== '-' &&
        '' + parseInt(key, 10) === key;
    const cacheStringFunction = (fn) => {
        const cache = Object.create(null);
        return ((str) => {
            const hit = cache[str];
            return hit || (cache[str] = fn(str));
        });
    };
    /**
     * @private
     */
    const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    // compare whether a value has changed, accounting for NaN.
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);

    let activeEffectScope;
    function recordEffectScope(effect, scope) {
        scope = scope || activeEffectScope;
        if (scope && scope.active) {
            scope.effects.push(effect);
        }
    }

    const createDep = (effects) => {
        const dep = new Set(effects);
        dep.w = 0;
        dep.n = 0;
        return dep;
    };
    const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    const newTracked = (dep) => (dep.n & trackOpBit) > 0;
    const initDepMarkers = ({ deps }) => {
        if (deps.length) {
            for (let i = 0; i < deps.length; i++) {
                deps[i].w |= trackOpBit; // set was tracked
            }
        }
    };
    const finalizeDepMarkers = (effect) => {
        const { deps } = effect;
        if (deps.length) {
            let ptr = 0;
            for (let i = 0; i < deps.length; i++) {
                const dep = deps[i];
                if (wasTracked(dep) && !newTracked(dep)) {
                    dep.delete(effect);
                }
                else {
                    deps[ptr++] = dep;
                }
                // clear bits
                dep.w &= ~trackOpBit;
                dep.n &= ~trackOpBit;
            }
            deps.length = ptr;
        }
    };

    const targetMap = new WeakMap();
    // The number of effects currently being tracked recursively.
    let effectTrackDepth = 0;
    let trackOpBit = 1;
    /**
     * The bitwise track markers support at most 30 levels op recursion.
     * This value is chosen to enable modern JS engines to use a SMI on all platforms.
     * When recursion depth is greater, fall back to using a full cleanup.
     */
    const maxMarkerBits = 30;
    const effectStack = [];
    let activeEffect;
    const ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'iterate' : '');
    const MAP_KEY_ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'Map key iterate' : '');
    class ReactiveEffect {
        constructor(fn, scheduler = null, scope) {
            this.fn = fn;
            this.scheduler = scheduler;
            this.active = true;
            this.deps = [];
            recordEffectScope(this, scope);
        }
        run() {
            if (!this.active) {
                return this.fn();
            }
            if (!effectStack.includes(this)) {
                try {
                    effectStack.push((activeEffect = this));
                    enableTracking();
                    trackOpBit = 1 << ++effectTrackDepth;
                    if (effectTrackDepth <= maxMarkerBits) {
                        initDepMarkers(this);
                    }
                    else {
                        cleanupEffect(this);
                    }
                    return this.fn();
                }
                finally {
                    if (effectTrackDepth <= maxMarkerBits) {
                        finalizeDepMarkers(this);
                    }
                    trackOpBit = 1 << --effectTrackDepth;
                    resetTracking();
                    effectStack.pop();
                    const n = effectStack.length;
                    activeEffect = n > 0 ? effectStack[n - 1] : undefined;
                }
            }
        }
        stop() {
            if (this.active) {
                cleanupEffect(this);
                if (this.onStop) {
                    this.onStop();
                }
                this.active = false;
            }
        }
    }
    function cleanupEffect(effect) {
        const { deps } = effect;
        if (deps.length) {
            for (let i = 0; i < deps.length; i++) {
                deps[i].delete(effect);
            }
            deps.length = 0;
        }
    }
    function effect(fn, options) {
        if (fn.effect) {
            fn = fn.effect.fn;
        }
        const _effect = new ReactiveEffect(fn);
        if (options) {
            extend(_effect, options);
            if (options.scope)
                recordEffectScope(_effect, options.scope);
        }
        if (!options || !options.lazy) {
            _effect.run();
        }
        const runner = _effect.run.bind(_effect);
        runner.effect = _effect;
        return runner;
    }
    let shouldTrack = true;
    const trackStack = [];
    function pauseTracking() {
        trackStack.push(shouldTrack);
        shouldTrack = false;
    }
    function enableTracking() {
        trackStack.push(shouldTrack);
        shouldTrack = true;
    }
    function resetTracking() {
        const last = trackStack.pop();
        shouldTrack = last === undefined ? true : last;
    }
    function track(target, type, key) {
        if (!isTracking()) {
            return;
        }
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = createDep()));
        }
        const eventInfo = (process.env.NODE_ENV !== 'production')
            ? { effect: activeEffect, target, type, key }
            : undefined;
        trackEffects(dep, eventInfo);
    }
    function isTracking() {
        return shouldTrack && activeEffect !== undefined;
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
        let shouldTrack = false;
        if (effectTrackDepth <= maxMarkerBits) {
            if (!newTracked(dep)) {
                dep.n |= trackOpBit; // set newly tracked
                shouldTrack = !wasTracked(dep);
            }
        }
        else {
            // Full cleanup mode.
            shouldTrack = !dep.has(activeEffect);
        }
        if (shouldTrack) {
            dep.add(activeEffect);
            activeEffect.deps.push(dep);
            if ((process.env.NODE_ENV !== 'production') && activeEffect.onTrack) {
                activeEffect.onTrack(Object.assign({
                    effect: activeEffect
                }, debuggerEventExtraInfo));
            }
        }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
        const depsMap = targetMap.get(target);
        if (!depsMap) {
            // never been tracked
            return;
        }
        let deps = [];
        if (type === "clear" /* CLEAR */) {
            // collection being cleared
            // trigger all effects for target
            deps = [...depsMap.values()];
        }
        else if (key === 'length' && isArray(target)) {
            depsMap.forEach((dep, key) => {
                if (key === 'length' || key >= newValue) {
                    deps.push(dep);
                }
            });
        }
        else {
            // schedule runs for SET | ADD | DELETE
            if (key !== void 0) {
                deps.push(depsMap.get(key));
            }
            // also run for iteration key on ADD | DELETE | Map.SET
            switch (type) {
                case "add" /* ADD */:
                    if (!isArray(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    else if (isIntegerKey(key)) {
                        // new index added to array -> length changes
                        deps.push(depsMap.get('length'));
                    }
                    break;
                case "delete" /* DELETE */:
                    if (!isArray(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    break;
                case "set" /* SET */:
                    if (isMap(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                    }
                    break;
            }
        }
        const eventInfo = (process.env.NODE_ENV !== 'production')
            ? { target, type, key, newValue, oldValue, oldTarget }
            : undefined;
        if (deps.length === 1) {
            if (deps[0]) {
                if ((process.env.NODE_ENV !== 'production')) {
                    triggerEffects(deps[0], eventInfo);
                }
                else {
                    triggerEffects(deps[0]);
                }
            }
        }
        else {
            const effects = [];
            for (const dep of deps) {
                if (dep) {
                    effects.push(...dep);
                }
            }
            if ((process.env.NODE_ENV !== 'production')) {
                triggerEffects(createDep(effects), eventInfo);
            }
            else {
                triggerEffects(createDep(effects));
            }
        }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
        // spread into array for stabilization
        for (const effect of isArray(dep) ? dep : [...dep]) {
            if (effect !== activeEffect || effect.allowRecurse) {
                if ((process.env.NODE_ENV !== 'production') && effect.onTrigger) {
                    effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
                }
                if (effect.scheduler) {
                    effect.scheduler();
                }
                else {
                    effect.run();
                }
            }
        }
    }

    const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
        .map(key => Symbol[key])
        .filter(isSymbol));
    const get = /*#__PURE__*/ createGetter();
    const readonlyGet = /*#__PURE__*/ createGetter(true);
    const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations();
    function createArrayInstrumentations() {
        const instrumentations = {};
        ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
            instrumentations[key] = function (...args) {
                const arr = toRaw(this);
                for (let i = 0, l = this.length; i < l; i++) {
                    track(arr, "get" /* GET */, i + '');
                }
                // we run the method using the original args first (which may be reactive)
                const res = arr[key](...args);
                if (res === -1 || res === false) {
                    // if that didn't work, run it again using raw values.
                    return arr[key](...args.map(toRaw));
                }
                else {
                    return res;
                }
            };
        });
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
            instrumentations[key] = function (...args) {
                pauseTracking();
                const res = toRaw(this)[key].apply(this, args);
                resetTracking();
                return res;
            };
        });
        return instrumentations;
    }
    function createGetter(isReadonly = false, shallow = false) {
        return function get(target, key, receiver) {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_raw" /* RAW */ &&
                receiver ===
                    (isReadonly
                        ? shallow
                            ? shallowReadonlyMap
                            : readonlyMap
                        : shallow
                            ? shallowReactiveMap
                            : reactiveMap).get(target)) {
                return target;
            }
            const targetIsArray = isArray(target);
            if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
                return Reflect.get(arrayInstrumentations, key, receiver);
            }
            const res = Reflect.get(target, key, receiver);
            if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
                return res;
            }
            if (!isReadonly) {
                track(target, "get" /* GET */, key);
            }
            if (shallow) {
                return res;
            }
            if (isRef(res)) {
                // ref unwrapping - does not apply for Array + integer key.
                const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
                return shouldUnwrap ? res.value : res;
            }
            if (isObject$1(res)) {
                // Convert returned value into a proxy as well. we do the isObject check
                // here to avoid invalid value warning. Also need to lazy access readonly
                // and reactive here to avoid circular dependency.
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
    }
    const set = /*#__PURE__*/ createSetter();
    function createSetter(shallow = false) {
        return function set(target, key, value, receiver) {
            let oldValue = target[key];
            if (!shallow) {
                value = toRaw(value);
                oldValue = toRaw(oldValue);
                if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                    oldValue.value = value;
                    return true;
                }
            }
            const hadKey = isArray(target) && isIntegerKey(key)
                ? Number(key) < target.length
                : hasOwn(target, key);
            const result = Reflect.set(target, key, value, receiver);
            // don't trigger if target is something up in the prototype chain of original
            if (target === toRaw(receiver)) {
                if (!hadKey) {
                    trigger(target, "add" /* ADD */, key, value);
                }
                else if (hasChanged(value, oldValue)) {
                    trigger(target, "set" /* SET */, key, value, oldValue);
                }
            }
            return result;
        };
    }
    function deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        const oldValue = target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
        }
        return result;
    }
    function has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
            track(target, "has" /* HAS */, key);
        }
        return result;
    }
    function ownKeys(target) {
        track(target, "iterate" /* ITERATE */, isArray(target) ? 'length' : ITERATE_KEY);
        return Reflect.ownKeys(target);
    }
    const mutableHandlers = {
        get,
        set,
        deleteProperty,
        has,
        ownKeys
    };
    const readonlyHandlers = {
        get: readonlyGet,
        set(target, key) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
            }
            return true;
        },
        deleteProperty(target, key) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
            }
            return true;
        }
    };

    const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
    const toShallow = (value) => value;
    const getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly = false, isShallow = false) {
        // #1772: readonly(reactive(Map)) should return readonly + reactive version
        // of the value
        target = target["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (key !== rawKey) {
            !isReadonly && track(rawTarget, "get" /* GET */, key);
        }
        !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
        const { has } = getProto(rawTarget);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
            return wrap(target.get(key));
        }
        else if (has.call(rawTarget, rawKey)) {
            return wrap(target.get(rawKey));
        }
        else if (target !== rawTarget) {
            // #3602 readonly(reactive(Map))
            // ensure that the nested reactive `Map` can do tracking for itself
            target.get(key);
        }
    }
    function has$1(key, isReadonly = false) {
        const target = this["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (key !== rawKey) {
            !isReadonly && track(rawTarget, "has" /* HAS */, key);
        }
        !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
        return key === rawKey
            ? target.has(key)
            : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly = false) {
        target = target["__v_raw" /* RAW */];
        !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
        return Reflect.get(target, 'size', target);
    }
    function add(value) {
        value = toRaw(value);
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
            target.add(value);
            trigger(target, "add" /* ADD */, value, value);
        }
        return this;
    }
    function set$1(key, value) {
        value = toRaw(value);
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
            trigger(target, "add" /* ADD */, key, value);
        }
        else if (hasChanged(value, oldValue)) {
            trigger(target, "set" /* SET */, key, value, oldValue);
        }
        return this;
    }
    function deleteEntry(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : undefined;
        // forward the operation before queueing reactions
        const result = target.delete(key);
        if (hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
        }
        return result;
    }
    function clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = (process.env.NODE_ENV !== 'production')
            ? isMap(target)
                ? new Map(target)
                : new Set(target)
            : undefined;
        // forward the operation before queueing reactions
        const result = target.clear();
        if (hadItems) {
            trigger(target, "clear" /* CLEAR */, undefined, undefined, oldTarget);
        }
        return result;
    }
    function createForEach(isReadonly, isShallow) {
        return function forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
            return target.forEach((value, key) => {
                // important: make sure the callback is
                // 1. invoked with the reactive map as `this` and 3rd arg
                // 2. the value received should be a corresponding reactive/readonly.
                return callback.call(thisArg, wrap(value), wrap(key), observed);
            });
        };
    }
    function createIterableMethod(method, isReadonly, isShallow) {
        return function (...args) {
            const target = this["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const targetIsMap = isMap(rawTarget);
            const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
            const isKeyOnly = method === 'keys' && targetIsMap;
            const innerIterator = target[method](...args);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly &&
                track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
            // return a wrapped iterator which returns observed versions of the
            // values emitted from the real iterator
            return {
                // iterator protocol
                next() {
                    const { value, done } = innerIterator.next();
                    return done
                        ? { value, done }
                        : {
                            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                            done
                        };
                },
                // iterable protocol
                [Symbol.iterator]() {
                    return this;
                }
            };
        };
    }
    function createReadonlyMethod(type) {
        return function (...args) {
            if ((process.env.NODE_ENV !== 'production')) {
                const key = args[0] ? `on key "${args[0]}" ` : ``;
                console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
            }
            return type === "delete" /* DELETE */ ? false : this;
        };
    }
    function createInstrumentations() {
        const mutableInstrumentations = {
            get(key) {
                return get$1(this, key);
            },
            get size() {
                return size(this);
            },
            has: has$1,
            add,
            set: set$1,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, false)
        };
        const shallowInstrumentations = {
            get(key) {
                return get$1(this, key, false, true);
            },
            get size() {
                return size(this);
            },
            has: has$1,
            add,
            set: set$1,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, true)
        };
        const readonlyInstrumentations = {
            get(key) {
                return get$1(this, key, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has$1.call(this, key, true);
            },
            add: createReadonlyMethod("add" /* ADD */),
            set: createReadonlyMethod("set" /* SET */),
            delete: createReadonlyMethod("delete" /* DELETE */),
            clear: createReadonlyMethod("clear" /* CLEAR */),
            forEach: createForEach(true, false)
        };
        const shallowReadonlyInstrumentations = {
            get(key) {
                return get$1(this, key, true, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has$1.call(this, key, true);
            },
            add: createReadonlyMethod("add" /* ADD */),
            set: createReadonlyMethod("set" /* SET */),
            delete: createReadonlyMethod("delete" /* DELETE */),
            clear: createReadonlyMethod("clear" /* CLEAR */),
            forEach: createForEach(true, true)
        };
        const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
        iteratorMethods.forEach(method => {
            mutableInstrumentations[method] = createIterableMethod(method, false, false);
            readonlyInstrumentations[method] = createIterableMethod(method, true, false);
            shallowInstrumentations[method] = createIterableMethod(method, false, true);
            shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
        });
        return [
            mutableInstrumentations,
            readonlyInstrumentations,
            shallowInstrumentations,
            shallowReadonlyInstrumentations
        ];
    }
    const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* #__PURE__*/ createInstrumentations();
    function createInstrumentationGetter(isReadonly, shallow) {
        const instrumentations = shallow
            ? isReadonly
                ? shallowReadonlyInstrumentations
                : shallowInstrumentations
            : isReadonly
                ? readonlyInstrumentations
                : mutableInstrumentations;
        return (target, key, receiver) => {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_raw" /* RAW */) {
                return target;
            }
            return Reflect.get(hasOwn(instrumentations, key) && key in target
                ? instrumentations
                : target, key, receiver);
        };
    }
    const mutableCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(false, false)
    };
    const readonlyCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(true, false)
    };
    function checkIdentityKeys(target, has, key) {
        const rawKey = toRaw(key);
        if (rawKey !== key && has.call(target, rawKey)) {
            const type = toRawType(target);
            console.warn(`Reactive ${type} contains both the raw and reactive ` +
                `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
                `which can lead to inconsistencies. ` +
                `Avoid differentiating between the raw and reactive versions ` +
                `of an object and only use the reactive version if possible.`);
        }
    }

    const reactiveMap = new WeakMap();
    const shallowReactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    const shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
        switch (rawType) {
            case 'Object':
            case 'Array':
                return 1 /* COMMON */;
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
                return 2 /* COLLECTION */;
            default:
                return 0 /* INVALID */;
        }
    }
    function getTargetType(value) {
        return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
            ? 0 /* INVALID */
            : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
        // if trying to observe a readonly proxy, return the readonly version.
        if (target && target["__v_isReadonly" /* IS_READONLY */]) {
            return target;
        }
        return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    /**
     * Creates a readonly copy of the original object. Note the returned copy is not
     * made reactive, but `readonly` can be called on an already reactive object.
     */
    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
        if (!isObject$1(target)) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.warn(`value cannot be made reactive: ${String(target)}`);
            }
            return target;
        }
        // target is already a Proxy, return it.
        // exception: calling readonly() on a reactive object
        if (target["__v_raw" /* RAW */] &&
            !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
            return target;
        }
        // target already has corresponding Proxy
        const existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        // only a whitelist of value types can be observed.
        const targetType = getTargetType(target);
        if (targetType === 0 /* INVALID */) {
            return target;
        }
        const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }
    function toRaw(observed) {
        const raw = observed && observed["__v_raw" /* RAW */];
        return raw ? toRaw(raw) : observed;
    }
    function isRef(r) {
        return Boolean(r && r.__v_isRef === true);
    }

    var Watcher = /** @class */ (function () {
        function Watcher(namespace, stores) {
            this.namespace = namespace;
            this.stores = stores;
            this.stores[namespace].watchers.push(this);
        }
        Watcher.prototype.do = function (handler) {
            var _this = this;
            this.handler = handler;
            return function () { return _this.unwatch(); };
        };
        Watcher.prototype.unwatch = function () {
            this === null || this === void 0 ? void 0 : this.stopEffect();
            this.handler = null;
            var index = this.stores[this.namespace].watchers.indexOf(this);
            if (index !== -1) {
                this.stores[this.namespace].watchers.splice(index, 1);
            }
        };
        return Watcher;
    }());

    var STATE_INITIALIZED = '$state-initialized';
    var Socket = /** @class */ (function () {
        function Socket(eventEmitter, stores) {
            this.eventEmitter = eventEmitter;
            this.stores = stores;
            this.eventEmitter = eventEmitter;
            this.stores = stores;
        }
        /**
         * add broadcast event listeners
         * @param events
         */
        Socket.prototype.onBroadcast = function (events) {
            var _this = this;
            Object.entries(events).forEach(function (_a) {
                var eventName = _a[0], handler = _a[1];
                _this.eventEmitter.addBroadcastEventListener(eventName, handler);
            });
            return function () {
                Object.entries(events).forEach(function (_a) {
                    var eventName = _a[0], handler = _a[1];
                    _this.eventEmitter.removeBroadcastEventListener(eventName, handler);
                });
            };
        };
        /**
         * add unicast event listeners
         * @param events
         */
        Socket.prototype.onUnicast = function (events) {
            var _this = this;
            Object.entries(events).forEach(function (_a) {
                var eventName = _a[0], handler = _a[1];
                try {
                    _this.eventEmitter.addUnicastEventListener(eventName, handler);
                }
                catch (err) {
                    console.error(err);
                }
            });
            return function () {
                Object.entries(events).forEach(function (_a) {
                    var eventName = _a[0], handler = _a[1];
                    _this.eventEmitter.removeUnicastEventListener(eventName, handler);
                });
            };
        };
        /**
         * create a proxy to emit a broadcast event
         * @param logger
         */
        Socket.prototype.createBroadcaster = function (logger) {
            var _this = this;
            return new Proxy({}, {
                get: function (target, eventName) {
                    logger === null || logger === void 0 ? void 0 : logger(eventName);
                    return function () {
                        var _a;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return (_a = _this.eventEmitter).emitBroadcast.apply(_a, __spreadArrays([eventName], args));
                    };
                },
                set: function () {
                    return false;
                }
            });
        };
        /**
         * create a proxy to emit unicast event
         * @param logger
         */
        Socket.prototype.createUnicaster = function (logger) {
            var _this = this;
            return new Proxy({}, {
                get: function (target, eventName) {
                    logger === null || logger === void 0 ? void 0 : logger(eventName);
                    return function () {
                        var _a;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return (_a = _this.eventEmitter).emitUnicast.apply(_a, __spreadArrays([eventName], args));
                    };
                },
                set: function () {
                    return false;
                }
            });
        };
        /**
         * judge if state has been initialized
         * @param namespace
         */
        Socket.prototype.existState = function (namespace) {
            return !!this.stores[namespace];
        };
        /**
         * init a state
         * @param namespace
         * @param value
         * @param isPrivate is state can only be modified by the socket which initialized it
         */
        Socket.prototype.initState = function (namespace, initialState, isPrivate) {
            if (isPrivate === void 0) { isPrivate = false; }
            if (this.existState(namespace)) {
                throw (new Error(Errors.duplicatedInitial(namespace)));
            }
            else {
                if (isPrimitive(initialState)) {
                    throw new Error(Errors.initializePrimitiveState(namespace));
                }
                this.stores[namespace] = {
                    state: reactive(initialState),
                    owner: isPrivate ? this : null,
                    watchers: []
                };
                this.eventEmitter.emitBroadcast(STATE_INITIALIZED, namespace);
            }
            return this.getState(namespace);
        };
        /**
         * get a state
         * @param {string} namespace
         */
        Socket.prototype.getState = function (namespace, getter) {
            if (this.existState(namespace)) {
                var state = readonly(this.stores[namespace].state);
                return getter ? getter(state) : state;
            }
            else {
                return null;
            }
        };
        /**
         * set the value of the state
         * @param namespace
         * @param arg
         */
        Socket.prototype.setState = function (namespace, setter) {
            if (!this.existState(namespace)) {
                var msg = Errors.accessUninitializedState(namespace);
                throw new Error(msg);
            }
            var stateOwner = this.stores[namespace].owner;
            if (stateOwner !== this && stateOwner !== null) {
                var msg = Errors.modifyPrivateState(namespace);
                throw new Error(msg);
            }
            var state = this.stores[namespace].state;
            setter(state);
        };
        /**
         * watch the change of state
         * @param namespace
         * @param getter
         */
        Socket.prototype.watchState = function (namespace, getter) {
            if (this.existState(namespace)) {
                var msg = Errors.accessUninitializedState(namespace);
                throw new Error(msg);
            }
            var state = readonly(this.stores[namespace].state);
            var watcher = new Watcher(namespace, this.stores);
            var runner = effect(function () {
                var _a;
                getter(state);
                (_a = watcher.handler) === null || _a === void 0 ? void 0 : _a.call(watcher, state);
            });
            watcher.stopEffect = function () { return runner.effect.stop(); };
            return watcher;
        };
        /**
         * waiting for some states to be initialized
         * @param dependencies the dependencies to be waited for
         * @param timeout the time to wait
         */
        Socket.prototype.waitState = function (dependencies, timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = 10 * 1000; }
            dependencies = dependencies.filter(function (namespace) {
                return !_this.existState(namespace);
            });
            if (dependencies.length === 0) {
                var states = dependencies.map(function (namespace) { return _this.getState(namespace); });
                return Promise.resolve(states);
            }
            else {
                return new Promise(function (resolve, reject) {
                    var timeId = setTimeout(function () {
                        clearTimeout(timeId);
                        var msg = Errors.waitStateTimeout(dependencies);
                        reject(new Error(msg));
                    }, timeout);
                    var stateInitialCallback = function (namespace) {
                        var index = dependencies.indexOf(namespace);
                        if (index !== -1) {
                            dependencies.splice(index, 1);
                        }
                        if (dependencies.length === 0) {
                            clearTimeout(timeId);
                            _this.eventEmitter.removeBroadcastEventListener(STATE_INITIALIZED, stateInitialCallback);
                            var states = dependencies.map(function (namespace) { return _this.getState(namespace); });
                            resolve(states);
                        }
                    };
                    _this.eventEmitter.addBroadcastEventListener(STATE_INITIALIZED, stateInitialCallback);
                });
            }
        };
        return Socket;
    }());

    var App = /** @class */ (function () {
        function App(name) {
            this.name = name;
            this.dependenciesReady = false;
            this.bootstrapped = false;
            this.dependencies = [];
            this.name = name;
        }
        /**
         * indicate the apps to be started before your app is bootstrapped
         * @param dependencies
         */
        App.prototype.relyOn = function (dependencies) {
            this.dependencies = dependencies;
            return this;
        };
        /**
         * indicate the callback your app will run when it's activated the first time
         * @param {function} callback
         */
        App.prototype.bootstrap = function (callback) {
            this.doBootstrap = callback;
            return this;
        };
        /**
         * indicate the callback your app will run when it's activated after the first time
         * @param callback
         */
        App.prototype.activate = function (callback) {
            this.doActivate = callback;
            return this;
        };
        /**
         * indicate the callback when your app is destroyed
         * @param callback
         */
        App.prototype.destroy = function (callback) {
            this.doDestroy = callback;
            return this;
        };
        App.prototype.activateDependenciesApp = function (activateApp) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, dependence, ctx, config;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(!this.dependenciesReady && this.dependencies.length !== 0)) return [3 /*break*/, 7];
                            _i = 0, _a = this.dependencies;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            dependence = _a[_i];
                            if (!(typeof dependence === 'string')) return [3 /*break*/, 3];
                            return [4 /*yield*/, activateApp(dependence)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            if (!isObject(dependence)) return [3 /*break*/, 5];
                            ctx = dependence.ctx, config = dependence.config;
                            return [4 /*yield*/, activateApp(ctx, config)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6:
                            this.dependenciesReady = true;
                            _b.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return App;
    }());

    var loadScript = function (scriptDeclare) { return __awaiter(void 0, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            promise = new Promise(function (resolve) {
                var scriptAttrs = typeof scriptDeclare !== 'string' ? scriptDeclare : {
                    type: 'text/javascript',
                    src: scriptDeclare
                };
                var script = document.createElement('script');
                Object.entries(scriptAttrs).forEach(function (_a) {
                    var attr = _a[0], value = _a[1];
                    script[attr] = value;
                });
                if (script.src) {
                    script.onload = script.onerror = function () {
                        resolve();
                    };
                }
                document.body.appendChild(script);
                if (!script.src) {
                    resolve();
                }
            });
            return [2 /*return*/, promise];
        });
    }); };
    var loadLink = function (linkDeclare) {
        var linkAttrs = typeof linkDeclare !== 'string' ? linkDeclare : {
            rel: 'stylesheet',
            type: 'text/css',
            href: linkDeclare
        };
        var link = document.createElement('link');
        Object.entries(linkAttrs).forEach(function (_a) {
            var attr = _a[0], value = _a[1];
            link[attr] = value;
        });
        document.head.appendChild(link);
    };
    var fetchScript = function (src) { return __awaiter(void 0, void 0, void 0, function () {
        var res, code, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(src)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.text()];
                case 2:
                    code = _a.sent();
                    return [2 /*return*/, code];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var excuteCode = function (code) {
        var fn = new Function(code);
        fn();
    };
    var loader = {
        loadScript: loadScript,
        loadLink: loadLink,
        fetchScript: fetchScript,
        excuteCode: excuteCode
    };

    var Bus = /** @class */ (function () {
        function Bus(name) {
            this.eventEmitter = new EventEmitter();
            this.stores = {};
            this.apps = {};
            this.dependencyDepth = 0;
            this.conf = {
                maxDependencyDepth: 100,
                loadScriptByFetch: false,
                assets: {}
            };
            this.middlewares = [];
            this.name = name;
            this.composedMiddlewareFn = compose(this.middlewares);
        }
        /**
         * config the bus
         * @param conf the new configuration object
         */
        Bus.prototype.config = function (conf) {
            this.conf = __assign(__assign(__assign({}, this.conf), conf), { assets: __assign(__assign({}, this.conf.assets), ((conf === null || conf === void 0 ? void 0 : conf.assets) || {})) });
            return this;
        };
        /**
         * register the middleware
         * @param middleware
         */
        Bus.prototype.use = function (middleware) {
            if (typeof middleware !== 'function') {
                throw new Error(Errors.wrongMiddlewareType());
            }
            this.middlewares.push(middleware);
            this.composedMiddlewareFn = compose(this.middlewares);
            return this;
        };
        /**
         * create the context to pass to the middleware
         * @param ctx
         * @returns
         */
        Bus.prototype.createContext = function (ctx) {
            var context = {
                name: '',
                loadScript: loader.loadScript,
                loadLink: loader.loadLink,
                fetchScript: loader.fetchScript,
                excuteCode: loader.excuteCode,
                conf: this.conf
            };
            if (typeof ctx === 'string') {
                context.name = ctx;
            }
            else if (ctx.name) {
                context = __assign(__assign({}, context), ctx);
            }
            else {
                throw new Error(Errors.wrongContextType());
            }
            return context;
        };
        /**
         * the core middleware
         * @param ctx the context
         */
        Bus.prototype.loadResourcesFromAssetsConfig = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var name, _a, loadScript, _b, loadLink, _c, fetchScript, _d, excuteCode, _e, conf, assets, loadScriptByFetch, _i, _f, asset, src, code;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            name = ctx.name, _a = ctx.loadScript, loadScript = _a === void 0 ? loader.loadScript : _a, _b = ctx.loadLink, loadLink = _b === void 0 ? loader.loadLink : _b, _c = ctx.fetchScript, fetchScript = _c === void 0 ? loader.fetchScript : _c, _d = ctx.excuteCode, excuteCode = _d === void 0 ? loader.excuteCode : _d, _e = ctx.conf, conf = _e === void 0 ? this.conf : _e;
                            assets = conf.assets, loadScriptByFetch = conf.loadScriptByFetch;
                            if (!assets[name]) return [3 /*break*/, 9];
                            // insert link tag first
                            assets[name].css &&
                                assets[name].css.forEach(function (asset) {
                                    var href = typeof asset === 'string' ? asset : asset.href;
                                    if (/^.+\.css$/.test(href)) {
                                        loadLink(asset);
                                    }
                                    else {
                                        console.error(Errors.invalidResource(href));
                                    }
                                });
                            if (!assets[name].js) return [3 /*break*/, 8];
                            _i = 0, _f = assets[name].js;
                            _g.label = 1;
                        case 1:
                            if (!(_i < _f.length)) return [3 /*break*/, 8];
                            asset = _f[_i];
                            src = typeof asset === 'string' ? asset : asset.src;
                            if (!/^.+\.js$/.test(src)) return [3 /*break*/, 6];
                            if (!!loadScriptByFetch) return [3 /*break*/, 3];
                            return [4 /*yield*/, loadScript(asset)];
                        case 2:
                            _g.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, fetchScript(src)];
                        case 4:
                            code = _g.sent();
                            code && excuteCode(code);
                            _g.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            console.error(Errors.invalidResource(src));
                            _g.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 1];
                        case 8:
                            // create app for raw resource
                            if (assets[name].isLib) {
                                this.apps[name] = true;
                            }
                            return [3 /*break*/, 10];
                        case 9: throw new Error(Errors.resourceNotDeclared(name, this.name));
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * create a socket
         * @return the socket instance
         */
        Bus.prototype.createSocket = function () {
            return new Socket(this.eventEmitter, this.stores);
        };
        /**
         * create an app
         * @param name the name of the app
         * @return the app instance
         */
        Bus.prototype.createApp = function (name) {
            if (this.apps[name]) {
                throw new Error(Errors.createExistingApp(name));
            }
            var app = new App(name);
            this.apps[name] = app;
            return app;
        };
        /**
         * load the resources of an app
         * @param ctx
         */
        Bus.prototype.loadApp = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var context;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = this.createContext(ctx);
                            // apply the middlewares
                            return [4 /*yield*/, this.composedMiddlewareFn(context, this.loadResourcesFromAssetsConfig.bind(this))];
                        case 1:
                            // apply the middlewares
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * activate an app
         * @param name
         * @param config
         */
        Bus.prototype.activateApp = function (ctx, config) {
            return __awaiter(this, void 0, void 0, function () {
                var context, name, isApp, app, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            context = this.createContext(ctx);
                            name = context.name;
                            if (!!this.apps[name]) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadApp(context)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            if (!this.apps[name]) {
                                throw new Error(Errors.appNotCreated(name));
                            }
                            isApp = typeof this.apps[name] !== 'boolean';
                            if (!isApp) return [3 /*break*/, 11];
                            app = this.apps[name];
                            if (!!app.bootstrapped) return [3 /*break*/, 8];
                            if (this.dependencyDepth > this.conf.maxDependencyDepth) {
                                this.dependencyDepth = 0;
                                throw new Error(Errors.bootstrapNumberOverflow(this.conf.maxDependencyDepth));
                            }
                            this.dependencyDepth++;
                            return [4 /*yield*/, app.activateDependenciesApp(this.activateApp.bind(this))];
                        case 3:
                            _b.sent();
                            if (!app.doBootstrap) return [3 /*break*/, 5];
                            return [4 /*yield*/, app.doBootstrap(config)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 7];
                        case 5:
                            if (!app.doActivate) return [3 /*break*/, 7];
                            return [4 /*yield*/, app.doActivate(config)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            app.bootstrapped = true;
                            this.dependencyDepth--;
                            return [3 /*break*/, 11];
                        case 8:
                            _a = app.doActivate;
                            if (!_a) return [3 /*break*/, 10];
                            return [4 /*yield*/, app.doActivate(config)];
                        case 9:
                            _a = (_b.sent());
                            _b.label = 10;
                        case 10:
                            _b.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * destroy an app
         * @param name
         * @param config
         */
        Bus.prototype.destroyApp = function (name, config) {
            return __awaiter(this, void 0, void 0, function () {
                var app, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            app = this.apps[name];
                            if (!(app && typeof app !== 'boolean')) return [3 /*break*/, 3];
                            _a = app.doDestroy;
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, app.doDestroy(config)];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            app.bootstrapped = false;
                            app.dependenciesReady = false;
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return Bus;
    }());
    var busProxy = {};
    var DEFAULT_BUS_NAME = '__DEFAULT_BUS__';
    /**
     * create a bus and record it on window.__Bus__
     * @param name the name of the bus
     */
    var createBus = function (name) {
        if (name === void 0) { name = DEFAULT_BUS_NAME; }
        if (self.__Bus__ === undefined) {
            Object.defineProperty(self, '__Bus__', {
                value: busProxy,
                writable: false
            });
        }
        if (self.__Bus__[name]) {
            throw new Error("[obvious] the bus named " + name + " has been defined before, please rename your bus");
        }
        else {
            var bus = new Bus(name);
            Object.defineProperty(self.__Bus__, name, {
                value: bus,
                writable: false
            });
            return bus;
        }
    };
    /**
     * get the bus from window.__Bus__
     * @param name the name of the bus
     * @returns
     */
    var getBus = function (name) {
        if (name === void 0) { name = DEFAULT_BUS_NAME; }
        return self.__Bus__ && self.__Bus__[name];
    };
    /**
     * get the bus from window.__Bus__, if the bus is not created, then create it
     * @param name the name of the bus
     * @returns
     */
    var touchBus = function (name) {
        if (name === void 0) { name = DEFAULT_BUS_NAME; }
        var bus = null;
        var isHost = false;
        var existedBus = getBus(name);
        if (existedBus) {
            bus = existedBus;
            isHost = false;
        }
        else {
            bus = createBus(name);
            isHost = true;
        }
        return [bus, isHost];
    };

    var Obvious = {
        createBus: createBus,
        getBus: getBus,
        touchBus: touchBus
    };

    exports.App = App;
    exports.Bus = Bus;
    exports.Socket = Socket;
    exports.createBus = createBus;
    exports.default = Obvious;
    exports.getBus = getBus;
    exports.touchBus = touchBus;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
