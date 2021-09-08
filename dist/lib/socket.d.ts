import { EventEmitter } from './event-emitter';
import { CallbackType, StoresType } from './types';
import { Watcher } from './watcher';
export declare class Socket {
    private eventEmitter;
    private stores;
    constructor(eventEmitter: EventEmitter, stores: StoresType);
    /**
     * add a broadcast event listener
     * @param eventName
     * @param callback
     */
    onBroadcast(eventName: string, callback: CallbackType): void;
    /**
     * remove a broadcast event listener
     * @param eventName
     * @param callback
     */
    offBroadcast(eventName: string, callback: CallbackType): void;
    /**
     * emit a broadcast event
     * @param eventName
     * @param args
     */
    broadcast(eventName: string, ...args: any[]): void;
    /**
     * add a unicast event listener
     * @param {string} eventName
     * @param {Function} callback
     */
    onUnicast(eventName: string, callback: CallbackType): void;
    /**
     * remove a unicast event listener
     * @param eventName
     * @param callback
     */
    offUnicast(eventName: string, callback: CallbackType): void;
    /**
     * emit a unicast event
     * @param eventName
     * @param args
     */
    unicast(eventName: string, ...args: any[]): any;
    /**
     * judge if state has been initialized
     * @param namespace
     */
    existState(namespace: string): boolean;
    /**
     * init a state
     * @param namespace
     * @param value
     * @param isPrivate is state can only be modified by the socket which initialized it
     */
    initState<T extends object>(namespace: string, initialState: T, isPrivate?: boolean): void;
    /**
     * get a state
     * @param {string} namespace
     */
    getState<T = any, P = T>(namespace: string, getter?: (state: T) => P): any;
    /**
     * set the value of the state
     * @param namespace
     * @param arg
     */
    setState<T>(namespace: string, setter: (state: T) => void): void;
    /**
     * watch the change of state
     * @param namespace
     * @param getter
     */
    watchState<T>(namespace: string, getter?: (state: T) => any): Watcher;
    /**
     * waiting for some states to be initialized
     * @param namespaces the namespaces to be waited for
     * @param timeout the time to wait
     */
    waitState(namespaces: string[], timeout?: number): Promise<void>;
}
