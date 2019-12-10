"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var Socket = /** @class */ (function () {
    function Socket(name, eventEmitter, _state) {
        this.eventEmitter = eventEmitter;
        this.name = name;
        this._state = _state;
    }
    Socket.prototype.on = function (eventName, callback) {
        this.eventEmitter.addEventListener(eventName, callback);
    };
    Socket.prototype.off = function (eventName, callback) {
        this.eventEmitter.removeEventListener(eventName, callback);
    };
    Socket.prototype.emit = function (eventName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.eventEmitter).emit.apply(_a, tslib_1.__spreadArrays([eventName], args));
    };
    Socket.prototype.initState = function (key, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        if (this._state[key] !== undefined) {
            var msg = "[obvious] state " + key + " has been initialized, please use [setState] instead";
            throw (new Error(msg));
        }
        else if (value === undefined) {
            var msg = "[obvious] state " + key + " can't be initialized to undefined, please initial it to null instead";
            throw (new Error(msg));
        }
        else {
            this._state[key] = {
                value: value,
                owner: isPrivate ? this : null
            };
            this.on("$state-" + key + "-change", function () {
                // an empty callback to avoid warning of no listener
            });
            this.emit('$state-initial', key);
        }
    };
    Socket.prototype.getState = function (stateName) {
        var mappedState = utils_1.getmappedState(this._state);
        var copiedState = mappedState;
        return copiedState[stateName];
    };
    Socket.prototype.setState = function (stateName, newValue) {
        if (this._state[stateName] === undefined) {
            var msg = "[obvious] you are trying to set state " + stateName + " before it is initialized, init it first";
            throw new Error(msg);
        }
        var stateOwner = this._state[stateName].owner;
        if (stateOwner !== this && stateOwner !== null) {
            var msg = "[obvious] state " + stateName + " is private, you are not allowed to modify it";
            throw new Error(msg);
        }
        var oldValue = this._state[stateName].value;
        this._state[stateName].value = newValue;
        this.emit("$state-" + stateName + "-change", newValue, oldValue);
    };
    Socket.prototype.watchState = function (stateName, callback) {
        if (this._state[stateName] === undefined) {
            var msg = "[obvious] you are trying to watch state " + stateName + " before it is initialized, init it first";
            throw new Error(msg);
        }
        this.eventEmitter.addEventListener("$state-" + stateName + "-change", callback);
    };
    Socket.prototype.unwatchState = function (stateName, callback) {
        if (this._state[stateName] === undefined) {
            var msg = "[obvious] you are trying to unwatch state " + stateName + " before it is initialized, init it first";
            throw new Error(msg);
        }
        this.eventEmitter.removeEventListener("$state-" + stateName + "-change", callback);
    };
    return Socket;
}());
exports.Socket = Socket;
