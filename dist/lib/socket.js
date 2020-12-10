"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
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
        (_a = this.eventEmitter).emitBroadcast.apply(_a, tslib_1.__spreadArrays([eventName], args));
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
        return (_a = this.eventEmitter).emitUnicast.apply(_a, tslib_1.__spreadArrays([eventName], args));
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
            throw (new Error(utils_1.Errors.duplicatedInitial(stateName)));
        }
        else if (value === undefined) {
            throw (new Error(utils_1.Errors.initialStateAsUndefined(stateName)));
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
        var mappedState = utils_1.getMappedState(this._state);
        return utils_1.get(mappedState, stateName.split('.'));
    };
    /**
     * set the value of the state
     * @param stateName
     * @param arg
     */
    Socket.prototype.setState = function (stateName, arg) {
        var _this = this;
        var stateLink = stateName.split('.');
        var rootStateName = stateLink[0];
        if (this._state[rootStateName] === undefined) {
            var msg = utils_1.Errors.accessUninitializedState(rootStateName);
            throw new Error(msg);
        }
        var stateOwner = this._state[rootStateName].owner;
        if (stateOwner !== this && stateOwner !== null) {
            var msg = utils_1.Errors.modifyPrivateState(rootStateName);
            throw new Error(msg);
        }
        var oldState = utils_1.getMappedState(this._state);
        var isFunctionArg = typeof arg === 'function';
        var oldValue = this.getState(stateName);
        var newValue = isFunctionArg ? arg(oldValue) : arg;
        if (stateLink.length === 1) {
            this._state[rootStateName].value = newValue;
        }
        else {
            var subStateLink = stateLink.slice(1);
            var isSuccess = utils_1.set(rootStateName, this._state[rootStateName].value, subStateLink, newValue);
            if (!isSuccess) {
                return;
            }
        }
        var newState = utils_1.getMappedState(this._state);
        var events = Object.keys(this.eventEmitter.getBroadcastEvents());
        var resolvedStates = utils_1.getResolvedStates(stateName, events);
        resolvedStates.forEach(function (name) {
            _this.broadcast("$state-" + name + "-change", utils_1.get(newState, name.split('.')), utils_1.get(oldState, name.split('.')));
        });
    };
    /**
     * watch the change of state
     * @param stateName
     * @param callback
     */
    Socket.prototype.watchState = function (stateName, callback) {
        var stateLink = stateName.split('.');
        var rootStateName = stateLink[0];
        if (this._state[rootStateName] === undefined) {
            var msg = utils_1.Errors.accessUninitializedState(rootStateName);
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
        var stateLink = stateName.split('.');
        var rootStateName = stateLink[0];
        if (this._state[rootStateName] === undefined) {
            throw new Error(utils_1.Errors.accessUninitializedState(stateName));
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
        // remove all ready states first
        dependencies = dependencies.filter(function (stateName) {
            return _this._state[stateName] === undefined;
        });
        if (dependencies.length === 0) {
            return Promise.resolve(utils_1.getMappedState(this._state));
        }
        else {
            return new Promise(function (resolve, reject) {
                var timeId = setTimeout(function () {
                    clearTimeout(timeId);
                    var msg = utils_1.Errors.waitStateTimeout(dependencies);
                    reject(new Error(msg));
                }, timeout);
                var stateInitialCallback = function (stateName) {
                    var index = dependencies.indexOf(stateName);
                    if (index !== -1) {
                        dependencies.splice(index, 1);
                    }
                    if (dependencies.length === 0) {
                        clearTimeout(timeId);
                        _this.offBroadcast('$state-initial', stateInitialCallback);
                        resolve(utils_1.getMappedState(_this._state));
                    }
                };
                _this.onBroadcast('$state-initial', stateInitialCallback);
            });
        }
    };
    return Socket;
}());
exports.Socket = Socket;
