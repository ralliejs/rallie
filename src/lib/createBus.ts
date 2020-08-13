import {Bus, AssetsConfigType, MiddlewareType} from './bus'; // eslint-disable-line

/**
 * create a bus and record it on window.__Bus__
 * @param name the name of bus
 * @param assets the assets config
 * @param middleware the middleware to load resources
 */
const busProxy = {};
export const createBus = (name: string, assets?:AssetsConfigType, middleware?: MiddlewareType) => {
    if(self.__Bus__ === undefined) {
        Object.defineProperty(self, '__Bus__', {
            value: busProxy,
            writable: false
        });
    }

    if (self.__Bus__[name]) {
        throw new Error(`[obvious] the bus named ${name} has been defined before, please rename your bus`);
    } else {
        const bus = new Bus(name, assets, middleware);
        Object.defineProperty(self.__Bus__, name, {
            value: bus,
            writable: false
        });
        return bus;
    }
};

export const getBus = (name: string) => {
    return self.__Bus__ && self.__Bus__[name];
};
