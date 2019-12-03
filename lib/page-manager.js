"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageManager = /** @class */ (function () {
    function PageManager() {
    }
    PageManager.createModule = function (name) {
        console.log(name);
    };
    PageManager.loadModule = function () {
    };
    PageManager.modules = [];
    return PageManager;
}());
exports.default = PageManager;
