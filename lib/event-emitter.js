"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.addEventListener = function (event, callBack) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callBack);
    };
    EventEmitter.prototype.removeEventListener = function (event, callBack) {
        var registedCallBacks = this.events[event];
        if (registedCallBacks) {
            var targetIndex = -1;
            for (var i = 0; i < registedCallBacks.length; i++) {
                if (registedCallBacks[i] === callBack) {
                    targetIndex = i;
                    break;
                }
            }
            if (targetIndex !== -1) {
                registedCallBacks.splice(targetIndex, 1);
            }
            else {
                var msg = "[obvious] you are trying to remove a listener of [" + event + "] event, but the listener hasn't been registed";
                throw new Error(msg);
            }
        }
        else {
            var msg = "[obvious] you are trying to remove a listener of [" + event + "] event, but [" + event + "] hasn't been registed as a event";
            throw new Error(msg);
        }
    };
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var registedCallBacks = this.events[event];
        if (registedCallBacks && registedCallBacks.length !== 0) {
            registedCallBacks.forEach(function (cb) {
                cb.apply(void 0, args);
            });
        }
        else {
            console.warn("[obvious] you have emitted [" + event + "] event, but there is no listener of this event");
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
