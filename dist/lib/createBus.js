"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bus_1 = require("./bus"); // eslint-disable-line
/**
 * create a bus and record it on window.__Bus__
 * @param name the name of bus
 * @param assets the assets config
 * @param middleware the middleware to load resources
 */
var busProxy = {};
exports.createBus = function (name, assets, middleware) {
    if (self.__Bus__ === undefined) {
        Object.defineProperty(self, '__Bus__', {
            value: busProxy,
            writable: false
        });
    }
    if (self.__Bus__[name]) {
        throw new Error("[obvious] the bus named " + name + " has been defined before, please rename your bus");
    }
    else {
        var bus = new bus_1.Bus(name, assets, middleware);
        Object.defineProperty(self.__Bus__, name, {
            value: bus,
            writable: false
        });
        return bus;
    }
};
exports.getBus = function (name) {
    return self.__Bus__ && self.__Bus__[name];
};
