"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObject = function (object) {
    return Object.prototype.toString.call(object) === '[object Object]';
};
exports.Errors = {
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
    bootstrapNumberOverflow: function () {
        return '[obvious] the number of apps bootstraped at a time is greater than the maximum value of 100, ' +
            'it means that there may be circular dependencies, please check the app dependencies declaration ' +
            'or reset the bus\'s maxBootstrapNumberOnce';
    },
    // ================= State ==================
    regardArrayAsObject: function (subStateName, subscript) {
        return "[obvious] state." + subStateName + " is an Array, but the subscript you set(\"" + subscript + "\") is not a number, therefore, the state will not be changed";
    },
    regardBasicTypeAsObject: function (subStateName, type) {
        return "[obvious] state." + subStateName + " is a " + type + ", buy you regard it as a object and try to traverse it while setting state, therefore, the state will not be changed";
    }
};
exports.Warnings = {
    emptyBroadcastEvents: function (eventName) {
        return "[obvious] you have emitted " + eventName + " event, but there is no listener of this event";
    }
};
exports.getMappedState = function (state) {
    var mappedState = {};
    Object.keys(state).forEach(function (key) {
        mappedState[key] = state[key].value;
    });
    return JSON.parse(JSON.stringify(mappedState));
};
exports.get = function (rootState, stateLink) {
    var current = rootState;
    for (var _i = 0, stateLink_1 = stateLink; _i < stateLink_1.length; _i++) {
        var key = stateLink_1[_i];
        if (Array.isArray(current)) {
            var index = Number(key);
            if (isNaN(index)) {
                return undefined;
            }
            current = current[index];
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
exports.set = function (rootStateName, rootState, stateLink, value) {
    var current = rootState;
    for (var i = 0; i < stateLink.length; i++) {
        var key = stateLink[i];
        var index = Number(key);
        if (i === stateLink.length - 1) {
            if (Array.isArray(current)) {
                if (isNaN(index)) {
                    var stateName = rootStateName + "." + stateLink.slice(0, i).join('.');
                    console.error(exports.Errors.regardArrayAsObject(stateName, key));
                    return false;
                }
                else {
                    current[index] = value;
                }
            }
            else {
                current[key] = value;
            }
        }
        else {
            var next = null;
            if (Array.isArray(current)) {
                if (!isNaN(index)) {
                    next = index;
                }
                else {
                    var stateName = rootStateName + "." + stateLink.slice(0, i).join('.');
                    console.error(exports.Errors.regardArrayAsObject(stateName, key));
                    return false;
                }
            }
            else {
                next = key;
            }
            if (current[next] === undefined || current[next] === null) {
                current[next] = {};
            }
            else if (!(Array.isArray(current[next]) || isObject(current[next]))) {
                var stateName = rootStateName + "." + stateLink.slice(0, i + 1).join('.');
                var type = typeof current[next];
                console.error(exports.Errors.regardBasicTypeAsObject(stateName, type));
                return false;
            }
            current = current[next];
        }
    }
    return true;
};
exports.getResolvedStates = function (stateName, events) {
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
