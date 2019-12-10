"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var event_emitter_1 = require("./event-emitter");
var socket_1 = require("./socket");
var utils_1 = require("./utils");
var Bus = /** @class */ (function () {
    function Bus(assets, middleware) {
        var _this = this;
        if (assets === void 0) { assets = {}; }
        this.eventEmitter = new event_emitter_1.EventEmitter();
        this._state = {};
        this.config = {};
        this.sockets = [];
        this.assets = assets;
        this.middleware = middleware;
        Object.defineProperty(this, 'state', {
            configurable: false,
            get: function () {
                return utils_1.getmappedState(_this._state);
            }
        });
    }
    Bus.prototype.isSocketExisted = function (name) {
        for (var _i = 0, _a = this.sockets; _i < _a.length; _i++) {
            var socket = _a[_i];
            if (socket.name === name) {
                return true;
            }
        }
        return false;
    };
    Bus.prototype.loadJs = function (src) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, code;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(src)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 2:
                        code = _a.sent();
                        eval(code);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bus.prototype.loadCss = function (href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    };
    Bus.prototype.loadSocketFromAssetsConfig = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assets, _i, _a, asset;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assets = this.assets;
                        if (!assets[name]) return [3 /*break*/, 6];
                        // insert link tag first
                        assets[name].css && assets[name].css.forEach(function (asset) {
                            if ((/^.+\.css$/).test(asset)) {
                                _this.loadCss(asset);
                            }
                            else {
                                console.error("[obvious] " + asset + " is not valid asset");
                            }
                        });
                        if (!assets[name].js) return [3 /*break*/, 5];
                        _i = 0, _a = assets[name].js;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        asset = _a[_i];
                        if (!(/^.+\.js$/).test(asset)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadJs(asset)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error("[obvious] " + asset + " is not valid asset");
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 7];
                    case 6: throw (new Error("[obvious] can not find module " + name + ", create it first"));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param name socket name
     * @param dependencies the states which should be initialized before the socket created
     */
    Bus.prototype.createSocket = function (name, dependencies, callback, timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 10 * 1000; }
        if (this.isSocketExisted(name)) {
            throw (new Error("[obvious] " + name + " socket already exists, you are not allowed to create it again"));
        }
        // remove all ready states first
        dependencies = dependencies.filter(function (stateName) {
            return _this._state[stateName] === undefined;
        });
        if (dependencies.length === 0) {
            var socket = new socket_1.Socket(name, this.eventEmitter, this._state);
            this.sockets.push(socket);
            callback(socket, this.config[name]);
        }
        else {
            var timeId_1 = setTimeout(function () {
                clearTimeout(timeId_1);
                var msg = "[obvious] failed to create socket " + name + " because the following state " + JSON.stringify(dependencies) + " are not ready";
                throw (new Error(msg));
            }, timeout);
            var stateInitialCallback_1 = function (stateName) {
                var index = dependencies.indexOf(stateName);
                if (index !== -1) {
                    dependencies.splice(index, 1);
                }
                if (dependencies.length === 0) {
                    clearTimeout(timeId_1);
                    _this.eventEmitter.removeEventListener('$state-initial', stateInitialCallback_1);
                    var socket = new socket_1.Socket(name, _this.eventEmitter, _this._state);
                    _this.sockets.push(socket);
                    callback(socket, _this.config[name]);
                }
            };
            this.eventEmitter.addEventListener('$state-initial', stateInitialCallback_1);
        }
    };
    Bus.prototype.startApp = function (socketName, config) {
        if (config === void 0) { config = null; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isSocketExisted(socketName)) return [3 /*break*/, 1];
                        config && console.warn("[obvious] socket " + socketName + " already exists, your config is invalid");
                        return [3 /*break*/, 8];
                    case 1:
                        this.config[socketName] = config;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        if (!this.middleware) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.middleware(socketName, this.loadJs, this.loadCss)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.loadSocketFromAssetsConfig(socketName)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        this.config[socketName] = null;
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Bus;
}());
exports.Bus = Bus;
