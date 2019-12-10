"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getmappedState = function (state) {
    var mappedState = {};
    Object.keys(state).forEach(function (key) {
        mappedState[key] = state[key].value;
    });
    return JSON.parse(JSON.stringify(mappedState));
};
