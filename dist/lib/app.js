"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, dependence, _b, _c, dependenceName, config;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(!this.dependenciesReady && this.dependencies.length !== 0)) return [3 /*break*/, 9];
                        _i = 0, _a = this.dependencies;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        dependence = _a[_i];
                        if (!(typeof dependence === 'string')) return [3 /*break*/, 3];
                        return [4 /*yield*/, activateApp(dependence)];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(typeof dependence === 'object')) return [3 /*break*/, 7];
                        _b = 0, _c = Object.keys(dependence);
                        _d.label = 4;
                    case 4:
                        if (!(_b < _c.length)) return [3 /*break*/, 7];
                        dependenceName = _c[_b];
                        config = dependence[dependenceName];
                        return [4 /*yield*/, activateApp(dependenceName, config)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _b++;
                        return [3 /*break*/, 4];
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8:
                        this.dependenciesReady = true;
                        _d.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
