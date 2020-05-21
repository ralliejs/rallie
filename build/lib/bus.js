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
        this.sockets = {};
        this.assets = assets;
        this.middleware = middleware;
        this.allowCrossDomainJs = true;
        Object.defineProperty(this, 'state', {
            get: function () { return utils_1.getMappedState(_this._state); },
            set: function () {
                throw new Error('[obvious] bus.state is readonly');
            }
        });
    }
    Bus.prototype.isSocketExisted = function (name) {
        return this.sockets[name] !== undefined;
    };
    Bus.prototype.fetchJs = function (src) {
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
    Bus.prototype.loadJs = function (src) {
        return new Promise(function (resolve) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onload = function () {
                resolve();
            };
            document.body.appendChild(script);
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
                        if (!assets[name]) return [3 /*break*/, 9];
                        // insert link tag first
                        assets[name].css && assets[name].css.forEach(function (asset) {
                            if ((/^.+\.css$/).test(asset)) {
                                _this.loadCss(asset);
                            }
                            else {
                                console.error("[obvious] " + asset + " is not valid asset");
                            }
                        });
                        if (!assets[name].js) return [3 /*break*/, 8];
                        _i = 0, _a = assets[name].js;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        asset = _a[_i];
                        if (!(/^.+\.js$/).test(asset)) return [3 /*break*/, 6];
                        if (!this.allowCrossDomainJs) return [3 /*break*/, 3];
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
                        console.error("[obvious] " + asset + " is not valid asset");
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [3 /*break*/, 10];
                    case 9: throw (new Error("[obvious] can not find module " + name + ", create it first"));
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get the socket by name
     * @param {string} name the name of socket
     * @return {Socket} the socket instance
     */
    Bus.prototype.getSocket = function (name) {
        if (this.isSocketExisted(name)) {
            return this.sockets[name];
        }
        return null;
    };
    /**
     * create a socket
     * @param {string} name socket name
     * @param {string[]} dependencies the states which should be initialized before the socket created
     * @param {Function} callback the callback after the dependencies are ready
     * @param {number} timeout the time of waiting for dependencies
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
            this.sockets[name] = socket;
            callback(socket, this.config[name]);
            socket.initState("$" + name, true, true);
        }
        else {
            var timeId_1 = setTimeout(function () {
                clearTimeout(timeId_1);
                var msg = "[obvious] failed to create socket " + name + " because the following state " + JSON.stringify(dependencies) + " are not ready";
                console.error(msg);
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
                    _this.sockets[name] = socket;
                    callback(socket, _this.config[name]);
                    socket.initState("$" + name, true, true);
                }
            };
            this.eventEmitter.addEventListener('$state-initial', stateInitialCallback_1);
        }
    };
    /**
     * give a config and start a app
     * @param {string} socketName socket name
     * @param {object} config the initial config of app
     */
    Bus.prototype.startApp = function (socketName, config) {
        if (config === void 0) { config = null; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isSocketExisted(socketName)) return [3 /*break*/, 1];
                        config && console.warn("[obvious] socket " + socketName + " already exists, your config is invalid");
                        return [3 /*break*/, 9];
                    case 1:
                        this.config[socketName] = config;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        if (!(this.assets && this.assets[socketName])) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadSocketFromAssetsConfig(socketName)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        if (!this.middleware) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.middleware(socketName, this.allowCrossDomainJs ? this.loadJs : this.fetchJs, this.loadCss)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6: throw (new Error("[obvious] can not find module " + socketName + ", create it first"));
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        this.config[socketName] = null;
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return Bus;
}());
exports.Bus = Bus;
