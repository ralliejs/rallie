"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bus_1 = require("./bus"); // eslint-disable-line
/**
 * create a bus and record it on window.Bus
 * @param {string} name the name of bus
 * @param {assetsConfigType} assets the assets config
 * @param {middlewareType} middleware the middleware to load resources
 */
var busProxy = {};
exports.createBus = function (name, assets, middleware) {
    if (window.Bus === undefined) {
        Object.defineProperty(window, 'Bus', {
            value: busProxy,
            writable: false
        });
    }
    if (window.Bus[name]) {
        throw new Error("[obvious] the bus named " + name + " has been defined before, please rename your bus");
    }
    else {
        Object.defineProperty(window.Bus, name, {
            value: new bus_1.Bus(assets, middleware),
            writable: false
        });
    }
};
exports.getBus = function (name) {
    return window.Bus[name];
};
