"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var event_emitter_1 = require("./event-emitter");
var socket_1 = require("./socket");
var app_1 = require("./app");
var utils_1 = require("./utils");
var Bus = /** @class */ (function () {
    function Bus(name, assets, middleware) {
        var _this = this;
        if (name === void 0) { name = ''; }
        if (assets === void 0) { assets = {}; }
        if (middleware === void 0) { middleware = {}; }
        this.name = name;
        this.assets = assets;
        this.middleware = middleware;
        this.eventEmitter = new event_emitter_1.EventEmitter();
        this._state = {};
        this.apps = {};
        this.bootstrapNumberOnce = 0;
        this.allowCrossOriginScript = true;
        this.maxBootstrapNumberOnce = 100;
        /**
         * define fetchJs、loadJs and loadCss as arrow function because
         * they will be the arguments of the handleLoad middleware
         * */
        this.fetchJs = function (src) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var res, code;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch(src)];
                    case 1:
                        res = _b.sent();
                        return [4 /*yield*/, res.text()];
                    case 2:
                        code = _b.sent();
                        ((_a = this.middleware) === null || _a === void 0 ? void 0 : _a.handleExecute) ? this.middleware.handleExecute(code, src)
                            : eval(code);
                        return [2 /*return*/];
                }
            });
        }); };
        this.loadJs = function (src) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var promise;
            return tslib_1.__generator(this, function (_a) {
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
        this.loadCss = function (href) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var link;
            return tslib_1.__generator(this, function (_a) {
                link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = href;
                document.head.appendChild(link);
                return [2 /*return*/];
            });
        }); };
        this.assets = assets;
        this.name = name;
        this.middleware = middleware;
        Object.defineProperty(this, 'state', {
            get: function () { return utils_1.getMappedState(_this._state); },
            set: function () {
                throw new Error(utils_1.Errors.stateIsReadOnly());
            }
        });
    }
    Bus.prototype.loadResourcesFromAssetsConfig = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assets, _i, _a, asset;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assets = this.assets;
                        // insert link tag first
                        assets[name].css &&
                            assets[name].css.forEach(function (asset) {
                                if (/^.+\.css$/.test(asset)) {
                                    _this.loadCss(asset);
                                }
                                else {
                                    console.error(utils_1.Errors.invalidResource(asset));
                                }
                            });
                        if (!assets[name].js) return [3 /*break*/, 8];
                        _i = 0, _a = assets[name].js;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        asset = _a[_i];
                        if (!/^.+\.js$/.test(asset)) return [3 /*break*/, 6];
                        if (!this.allowCrossOriginScript) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadJs(asset)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.fetchJs(asset)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        console.error(utils_1.Errors.invalidResource(asset));
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8:
                        // create app for raw resource
                        if (assets[name].isLib) {
                            this.apps[name] = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * create a socket
     * @return the socket instance
     */
    Bus.prototype.createSocket = function () {
        return new socket_1.Socket(this.eventEmitter, this._state);
    };
    /**
     * create an app
     * @param name the name of the app
     * @return the app instance
     */
    Bus.prototype.createApp = function (name) {
        if (this.apps[name]) {
            throw new Error(utils_1.Errors.createExistingApp(name));
        }
        var app = new app_1.App(name);
        this.apps[name] = app;
        return app;
    };
    /**
     * load the resources of an app
     * @param name
     */
    Bus.prototype.loadApp = function (name) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.assets && this.assets[name])) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadResourcesFromAssetsConfig(name)];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!((_a = this.middleware) === null || _a === void 0 ? void 0 : _a.handleLoad)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ((_b = this.middleware) === null || _b === void 0 ? void 0 : _b.handleLoad(name, this.allowCrossOriginScript ? this.loadJs : this.fetchJs, this.loadCss))];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error(utils_1.Errors.resourceNotDeclared(name, this.name));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * activate an app
     * @todo: how to handle circular dependency dead lock
     * @param name
     * @param config
     */
    Bus.prototype.activateApp = function (name, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isApp, app, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.apps[name]) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadApp(name)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!this.apps[name]) {
                            throw new Error(utils_1.Errors.appNotCreated(name));
                        }
                        isApp = typeof this.apps[name] !== 'boolean';
                        if (!isApp) return [3 /*break*/, 11];
                        app = this.apps[name];
                        if (!!app.bootstrapped) return [3 /*break*/, 8];
                        if (this.bootstrapNumberOnce > this.maxBootstrapNumberOnce) {
                            this.bootstrapNumberOnce = 0;
                            throw new Error(utils_1.Errors.bootstrapNumberOverflow());
                        }
                        this.bootstrapNumberOnce++;
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
                        this.bootstrapNumberOnce--;
                        return [3 /*break*/, 11];
                    case 8:
                        _a = app.doActivate;
                        if (!_a) return [3 /*break*/, 10];
                        return [4 /*yield*/, app.doActivate(config)];
                    case 9:
                        _a = (_b.sent());
                        _b.label = 10;
                    case 10:
                        _a;
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app, _a;
            return tslib_1.__generator(this, function (_b) {
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
                        _a;
                        delete this.apps[name];
                        delete this._state["app-" + name + "-created"];
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Bus;
}());
exports.Bus = Bus;
