import { EventEmitter } from './event-emitter';
import { callbackType } from './types';
export declare class Socket {
    name: string;
    private eventEmitter;
    private _state;
    constructor(name: string, eventEmitter: EventEmitter, _state: Object);
    /**
     * add an event listener
     * @param {string} eventName
     * @param {Function} callback
     */
    on(eventName: string, callback: callbackType): void;
    /**
     * remove an event listener
     * @param {string} eventName
     * @param {Function} callback
     */
    off(eventName: string, callback: callbackType): void;
    /**
     * emit an event
     * @param {string} eventName
     * @param {...rest} args
     */
    emit(eventName: string, ...args: any[]): void;
    /**
     * init a state
     * @param {string} key state's name
     * @param {any} value state's value
     * @param {any} isPrivate is state can only be modified by the socket which initialized it
     */
    initState(key: string, value: any, isPrivate?: boolean): void;
    /**
     * get a state
     * @param {string} stateName
     */
    getState(stateName: string): any;
    /**
     * set the value of the state
     * @param {string} stateName
     * @param {any} newValue
     */
    setState(stateName: string, newValue: any): void;
    /**
     * watch the change of state
     * @param {string} stateName
     * @param {Function} callback
     */
    watchState(stateName: string, callback: (newValue: any, oldValue?: any) => void): void;
    /**
     * remove the listener of watching the state
     * @param {string} stateName
     * @param {Function} callback
     */
    unwatchState(stateName: string, callback: (newValue: any, oldValue: any) => void): void;
}
