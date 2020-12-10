"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.broadcastEvents = {};
        this.uniCastEvents = {};
    }
    EventEmitter.prototype.getBroadcastEvents = function () {
        return this.broadcastEvents;
    };
    EventEmitter.prototype.addBroadcastEventListener = function (event, callback) {
        this.broadcastEvents[event] = this.broadcastEvents[event] || [];
        this.broadcastEvents[event].push(callback);
    };
    EventEmitter.prototype.addUnicastEventListener = function (event, callback) {
        if (this.uniCastEvents[event]) {
            throw new Error(utils_1.Errors.registedExistedUnicast(event));
        }
        this.uniCastEvents[event] = callback;
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
                var msg = utils_1.Errors.wrongBroadcastCallback(event);
                throw new Error(msg);
            }
        }
        else {
            var msg = utils_1.Errors.removeNonExistedBroadcast(event);
            throw new Error(msg);
        }
    };
    EventEmitter.prototype.removeUnicastEventListener = function (event, callback) {
        if (!this.uniCastEvents[event]) {
            var msg = utils_1.Errors.removeNonExistedUnicast(event);
            throw new Error(msg);
        }
        if (this.uniCastEvents[event] !== callback) {
            var msg = utils_1.Errors.wrongUnicastCallback(event);
            throw new Error(msg);
        }
        delete this.uniCastEvents[event];
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
                    console.error(utils_1.Errors.broadcastCallbackError);
                    console.error(error);
                }
            });
        }
        else if (!isInternalStateEvent) {
            console.warn(utils_1.Warnings.emptyBroadcastEvents(event));
        }
    };
    EventEmitter.prototype.emitUnicast = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callback = this.uniCastEvents[event];
        return callback.apply(void 0, args);
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
