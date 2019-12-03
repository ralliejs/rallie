"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageModule = /** @class */ (function () {
    function PageModule(name) {
        console.log(name);
    }
    PageModule.prototype.on = function (eventName, callback) {
        console.log(eventName);
        console.log(callback);
    };
    PageModule.prototype.off = function (event) {
        console.log(event);
    };
    PageModule.prototype.get = function () {
    };
    PageModule.prototype.set = function () {
    };
    return PageModule;
}());
exports.default = PageModule;
