import {Bus, assetsConfigType, middlewareType} from './bus'; // eslint-disable-line

/**
 * create a bus and record it on window.Bus
 * @param {string} name the name of bus 
 * @param {assetsConfigType} assets the assets config
 * @param {middlewareType} middleware the middleware to load resources 
 */
const busProxy = {};
export const createBus = (name: string, assets?:assetsConfigType, middleware?: middlewareType) => {
    if(window.Bus === undefined) {
        Object.defineProperty(window, 'Bus', {
            value: busProxy,
            writable: false
        });
    }

    if (window.Bus[name]) {
        throw new Error(`[obvious] the bus named ${name} has been defined before, please rename your bus`);
    } else {
        Object.defineProperty(window.Bus, name, {
            value: new Bus(assets, middleware),
            writable: false
        });
    }
};

export const getBus = (name: string) => {
    return window.Bus[name];
};
