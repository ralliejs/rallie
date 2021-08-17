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
    modifyPrivateState: function (stateName) {
        return "[obvious] state " + stateName + " is private, you are not allowed to set it";
    },
    accessUninitializedState: function (stateName) {
        return "[obvious] it's not allowed to set, watch or unwatch state " + stateName + " before it is initialized";
    },
    waitStateTimeout: function (states) {
        return "[obvious] wait for states " + JSON.stringify(states) + " timeout";
    },
    duplicatedInitial: function (stateName) {
        return "[obvious] duplicated initialized state " + stateName;
    },
    initialStateAsUndefined: function (stateName) {
        return "[obvious] state " + stateName + " can't be initialized to undefined, please initial it to null instead";
    },
    // ================= Bus ==================
    stateIsReadOnly: function () {
        return '[obvious] bus.state is readonly';
    },
    invalidResource: function (asset) {
        return "[obvious] " + asset + " is not a valid asset";
    },
    bootstrapNumberOverflow: function (num) {
        if (num === void 0) { num = 100; }
        return "[obvious] the number of apps bootstraped at a time is greater than the maximum value of " + num + ", " +
            'it means that there may be circular dependencies, please check the app dependencies declaration ' +
            'or reset the bus\'s maxDependencyDepth';
    },
    multipleCalledNextFn: function () {
        return '[obvious] next() called multiple times in the middleware';
    },
    wrongMiddlewareType: function () {
        return '[obvious] the middleware must be a function';
    },
    wrongContextType: function () {
        return '[obvious] the app\'s name is not indicated when load or activate';
    },
    // ================= State ==================
    regardArrayAsObject: function (subStateName, subscript) {
        return "[obvious] state." + subStateName + " is an Array, but the subscript you set(\"" + subscript + "\") is not a number, therefore, the state will not be changed";
    },
    regardBasicTypeAsObject: function (subStateName, type) {
        return "[obvious] state." + subStateName + " is a " + type + ", buy you regard it as a object and try to traverse it while setting state";
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
var getMappedState = function (state) {
    var mappedState = {};
    Object.keys(state).forEach(function (key) {
        mappedState[key] = state[key].value;
    });
    return mappedState;
};
var getStateName = function (stateNameLink) {
    var result = '';
    stateNameLink.forEach(function (item, index) {
        var nextStateName = stateNameLink[index + 1];
        var isNextObject = (typeof nextStateName) === 'string';
        if (typeof item === 'number') {
            result += (isNextObject ? "[" + item + "]." : "[" + item + "]");
        }
        else {
            result += (isNextObject ? item + "." : item);
        }
    });
    return result;
};
var getStateNameLink = function (stateName) {
    var tempLink = stateName.split('.');
    var resultLink = [];
    tempLink.forEach(function (item) {
        var arrayPattern = /(.+)\[(\d+)\]$/;
        var matchedResult = arrayPattern.exec(item);
        if (matchedResult !== null) {
            var arrayName = matchedResult[1];
            var arrayIndex = matchedResult[2];
            getStateNameLink(arrayName).forEach(function (item) {
                resultLink.push(item);
            });
            resultLink.push(Number(arrayIndex));
        }
        else {
            resultLink.push(item);
        }
    });
    return resultLink;
};
var get = function (rootState, stateLink) {
    var current = rootState;
    for (var _i = 0, stateLink_1 = stateLink; _i < stateLink_1.length; _i++) {
        var key = stateLink_1[_i];
        if (Array.isArray(current)) {
            if (typeof key !== 'number') {
                return undefined;
            }
            current = current[key];
        }
        else if (isObject(current)) {
            current = current[key];
        }
        else {
            return undefined;
        }
    }
    return current;
};
var set = function (rootStateName, rootState, subStateLink, value) {
    var current = rootState;
    for (var i = 0; i < subStateLink.length; i++) {
        var key = subStateLink[i];
        if (i === subStateLink.length - 1) { // traverse to the last
            if (Array.isArray(current)) {
                if (typeof key !== 'number') {
                    var stateName = getStateName(__spreadArrays([rootStateName], subStateLink.slice(0, i)));
                    console.error(Errors.regardArrayAsObject(stateName, key));
                    return false;
                }
                else {
                    current[key] = value;
                }
            }
            else {
                current[key] = value;
            }
        }
        else {
            var next = null;
            if (Array.isArray(current)) {
                if (typeof key !== 'number') {
                    var stateName = getStateName(__spreadArrays([rootStateName], subStateLink.slice(0, i)));
                    console.error(Errors.regardArrayAsObject(stateName, key));
                    return false;
                }
                else {
                    next = key;
                }
            }
            else {
                next = key;
            }
            if (current[next] === undefined || current[next] === null) {
                var nextNext = subStateLink[i + 1];
                current[next] = (typeof nextNext === 'number') ? [] : {};
            }
            else if (!(Array.isArray(current[next]) || isObject(current[next]))) {
                var stateName = getStateName(__spreadArrays([rootStateName], subStateLink.slice(0, i + 1)));
                var type = typeof current[next];
                console.error(Errors.regardBasicTypeAsObject(stateName, type));
                return false;
            }
            current = current[next];
        }
    }
    return true;
};
var getResolvedStates = function (stateName, events) {
    var regex = /^\$state-(.+)-change$/;
    var result = [];
    events.forEach(function (eventName) {
        var regexMatchedResult = regex.exec(eventName);
        if (regexMatchedResult) {
            var matchedState = regexMatchedResult[1];
            if (matchedState.startsWith(stateName)) {
                result.push(matchedState);
            }
            if (stateName.startsWith(matchedState) && !result.includes(matchedState)) {
                result.push(matchedState);
            }
        }
    });
    return result;
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

var Socket = /** @class */ (function () {
    function Socket(eventEmitter, _state) {
        this.eventEmitter = eventEmitter;
        this._state = _state;
        this.eventEmitter = eventEmitter;
        this._state = _state;
    }
    /**
     * add a broadcast event listener
     * @param eventName
     * @param callback
     */
    Socket.prototype.onBroadcast = function (eventName, callback) {
        this.eventEmitter.addBroadcastEventListener(eventName, callback);
    };
    /**
     * remove a broadcast event listener
     * @param eventName
     * @param callback
     */
    Socket.prototype.offBroadcast = function (eventName, callback) {
        this.eventEmitter.removeBroadcastEventListener(eventName, callback);
    };
    /**
     * emit a broadcast event
     * @param eventName
     * @param args
     */
    Socket.prototype.broadcast = function (eventName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.eventEmitter).emitBroadcast.apply(_a, __spreadArrays([eventName], args));
    };
    /**
     * add a unicast event listener
     * @param {string} eventName
     * @param {Function} callback
     */
    Socket.prototype.onUnicast = function (eventName, callback) {
        this.eventEmitter.addUnicastEventListener(eventName, callback);
    };
    /**
     * remove a unicast event listener
     * @param eventName
     * @param callback
     */
    Socket.prototype.offUnicast = function (eventName, callback) {
        this.eventEmitter.removeUnicastEventListener(eventName, callback);
    };
    /**
     * emit a unicast event
     * @param eventName
     * @param args
     */
    Socket.prototype.unicast = function (eventName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.eventEmitter).emitUnicast.apply(_a, __spreadArrays([eventName], args));
    };
    /**
     * judge if state has been initialized
     * @param stateName
     */
    Socket.prototype.existState = function (stateName) {
        var stateNameLink = getStateNameLink(stateName);
        var rootStateName = stateNameLink[0];
        return this._state[rootStateName] !== undefined;
    };
    /**
     * init a state
     * @param stateName
     * @param value
     * @param isPrivate is state can only be modified by the socket which initialized it
     */
    Socket.prototype.initState = function (stateName, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        if (this._state[stateName] !== undefined) {
            throw (new Error(Errors.duplicatedInitial(stateName)));
        }
        else if (value === undefined) {
            throw (new Error(Errors.initialStateAsUndefined(stateName)));
        }
        else {
            this._state[stateName] = {
                value: value,
                owner: isPrivate ? this : null
            };
            this.broadcast('$state-initial', stateName);
        }
    };
    /**
     * get a state
     * @param {string} stateName
     */
    Socket.prototype.getState = function (stateName) {
        var mappedState = getMappedState(this._state);
        return get(mappedState, getStateNameLink(stateName));
    };
    /**
     * set the value of the state
     * @param stateName
     * @param arg
     */
    Socket.prototype.setState = function (stateName, arg) {
        var _this = this;
        var stateNameLink = getStateNameLink(stateName);
        var rootStateName = stateNameLink[0];
        if (this._state[rootStateName] === undefined) {
            var msg = Errors.accessUninitializedState(rootStateName);
            throw new Error(msg);
        }
        var stateOwner = this._state[rootStateName].owner;
        if (stateOwner !== this && stateOwner !== null) {
            var msg = Errors.modifyPrivateState(rootStateName);
            throw new Error(msg);
        }
        var events = Object.keys(this.eventEmitter.getBroadcastEvents());
        var resolvedStates = getResolvedStates(stateName, events);
        var resolvedStateNameLinks = resolvedStates.map(function (name) { return getStateNameLink(name); });
        // record all the old value of the resolved states
        var oldState = getMappedState(this._state);
        var resolvedStatesOldValues = {};
        resolvedStates.forEach(function (name, index) {
            var notifiedStateNameLink = resolvedStateNameLinks[index];
            resolvedStatesOldValues[name] = get(oldState, notifiedStateNameLink);
        });
        // change the value of the state
        var isFunctionArg = typeof arg === 'function';
        var oldValue = this.getState(stateName);
        var newValue = isFunctionArg ? arg(oldValue) : arg;
        if (stateNameLink.length === 1) {
            this._state[rootStateName].value = newValue;
        }
        else {
            var subStateNameLink = stateNameLink.slice(1);
            if (this._state[rootStateName].value === null || this._state[rootStateName].value === undefined) {
                switch (typeof subStateNameLink[0]) {
                    case 'number':
                        this._state[rootStateName].value = [];
                        break;
                    case 'string':
                        this._state[rootStateName].value = {};
                        break;
                    // do nothing
                }
            }
            var isSuccess = set(rootStateName, this._state[rootStateName].value, subStateNameLink, newValue);
            if (!isSuccess) {
                return;
            }
        }
        // record all the new value of the resolved states
        var newState = getMappedState(this._state);
        var resolvedStatesNewValues = {};
        resolvedStates.forEach(function (name, index) {
            var notifiedStateNameLink = resolvedStateNameLinks[index];
            resolvedStatesNewValues[name] = get(newState, notifiedStateNameLink);
        });
        resolvedStates.forEach(function (name) {
            _this.broadcast("$state-" + name + "-change", resolvedStatesNewValues[name], resolvedStatesOldValues[name]);
        });
    };
    /**
     * watch the change of state
     * @param stateName
     * @param callback
     */
    Socket.prototype.watchState = function (stateName, callback) {
        var stateNameLink = getStateNameLink(stateName);
        var rootStateName = stateNameLink[0];
        if (this._state[rootStateName] === undefined) {
            var msg = Errors.accessUninitializedState(rootStateName);
            throw new Error(msg);
        }
        this.eventEmitter.addBroadcastEventListener("$state-" + stateName + "-change", callback);
    };
    /**
     * remove the listener of state watcher
     * @param stateName
     * @param callback
     */
    Socket.prototype.unwatchState = function (stateName, callback) {
        if (!this.existState(stateName)) {
            throw new Error(Errors.accessUninitializedState(stateName));
        }
        this.eventEmitter.removeBroadcastEventListener("$state-" + stateName + "-change", callback);
    };
    /**
     * waiting for some states to be initialized
     * @param dependencies the states to be waited for
     * @param timeout the time to wait
     */
    Socket.prototype.waitState = function (dependencies, timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 10 * 1000; }
        dependencies = dependencies.map(function (stateName) {
            var stateNameLink = getStateNameLink(stateName);
            var rootStateName = stateNameLink[0];
            return rootStateName;
        }).filter(function (rootStateName) {
            return _this._state[rootStateName] === undefined;
        });
        if (dependencies.length === 0) {
            return Promise.resolve(getMappedState(this._state));
        }
        else {
            return new Promise(function (resolve, reject) {
                var timeId = setTimeout(function () {
                    clearTimeout(timeId);
                    var msg = Errors.waitStateTimeout(dependencies);
                    reject(new Error(msg));
                }, timeout);
                var stateInitialCallback = function (rootStateName) {
                    var index = dependencies.indexOf(rootStateName);
                    if (index !== -1) {
                        dependencies.splice(index, 1);
                    }
                    if (dependencies.length === 0) {
                        clearTimeout(timeId);
                        _this.offBroadcast('$state-initial', stateInitialCallback);
                        resolve(getMappedState(_this._state));
                    }
                };
                _this.onBroadcast('$state-initial', stateInitialCallback);
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

var loadJs = function (src) { return __awaiter(void 0, void 0, void 0, function () {
    var promise;
    return __generator(this, function (_a) {
        promise = new Promise(function (resolve) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onload = function () {
                resolve();
            };
            document.body.appendChild(script);
        });
        return [2 /*return*/, promise];
    });
}); };
var loadCss = function (href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
};
var fetchJs = function (src) { return __awaiter(void 0, void 0, void 0, function () {
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

var Bus = /** @class */ (function () {
    function Bus(name) {
        var _this = this;
        this.eventEmitter = new EventEmitter();
        this._state = {};
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
        Object.defineProperty(this, 'state', {
            get: function () { return getMappedState(_this._state); },
            set: function () {
                throw new Error(Errors.stateIsReadOnly());
            }
        });
    }
    /**
     * config the bus
     * @param conf the new configuration object
     */
    Bus.prototype.config = function (conf) {
        this.conf = __assign(__assign(__assign({}, this.conf), conf), { assets: __assign(__assign({}, this.conf.assets), (conf.assets || {})) });
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
            loadJs: loadJs,
            loadCss: loadCss,
            fetchJs: fetchJs,
            excuteCode: excuteCode,
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
            var name, _a, loadJs$1, _b, loadCss$1, _c, fetchJs$1, _d, excuteCode$1, _e, conf, assets, loadScriptByFetch, _i, _f, asset, code;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        name = ctx.name, _a = ctx.loadJs, loadJs$1 = _a === void 0 ? loadJs : _a, _b = ctx.loadCss, loadCss$1 = _b === void 0 ? loadCss : _b, _c = ctx.fetchJs, fetchJs$1 = _c === void 0 ? fetchJs : _c, _d = ctx.excuteCode, excuteCode$1 = _d === void 0 ? excuteCode : _d, _e = ctx.conf, conf = _e === void 0 ? this.conf : _e;
                        assets = conf.assets, loadScriptByFetch = conf.loadScriptByFetch;
                        if (!assets[name]) return [3 /*break*/, 9];
                        // insert link tag first
                        assets[name].css &&
                            assets[name].css.forEach(function (asset) {
                                if (/^.+\.css$/.test(asset)) {
                                    loadCss$1(asset);
                                }
                                else {
                                    console.error(Errors.invalidResource(asset));
                                }
                            });
                        if (!assets[name].js) return [3 /*break*/, 8];
                        _i = 0, _f = assets[name].js;
                        _g.label = 1;
                    case 1:
                        if (!(_i < _f.length)) return [3 /*break*/, 8];
                        asset = _f[_i];
                        if (!/^.+\.js$/.test(asset)) return [3 /*break*/, 6];
                        if (!!loadScriptByFetch) return [3 /*break*/, 3];
                        return [4 /*yield*/, loadJs$1(asset)];
                    case 2:
                        _g.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fetchJs$1(asset)];
                    case 4:
                        code = _g.sent();
                        code && excuteCode$1(code);
                        _g.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        console.error(Errors.invalidResource(asset));
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
        return new Socket(this.eventEmitter, this._state);
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

/**
 * create a bus and record it on window.__Bus__
 * @param name the name of bus
 * @param assets the assets config
 * @param middleware the middleware to load resources
 */
var busProxy = {};
var createBus = function (name) {
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
var getBus = function (name) {
    return self.__Bus__ && self.__Bus__[name];
};

var Obvious = {
    createBus: createBus,
    getBus: getBus
};

export default Obvious;
export { App, Bus, Socket, createBus, getBus };
