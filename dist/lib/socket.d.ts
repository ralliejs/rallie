import { EventEmitter } from './event-emitter';
import { CallbackType, StoresType } from './types';
import { Watcher } from './watcher';
export declare class Socket {
    private eventEmitter;
    private stores;
    constructor(eventEmitter: EventEmitter, stores: StoresType);
    /**
     * add broadcast event listeners
     * @param events
     */
    onBroadcast<T extends Record<string, CallbackType>>(events: T): () => void;
    /**
     * add unicast event listeners
     * @param events
     */
    onUnicast<T extends Record<string, CallbackType>>(events: T): () => void;
    /**
     * create a proxy to emit a broadcast event
     * @param logger
     */
    createBroadcaster<T extends Record<string, CallbackType>>(logger?: (eventName: string) => void): T;
    /**
     * create a proxy to emit unicast event
     * @param logger
     */
    createUnicaster<T extends Record<string, CallbackType>>(logger?: (eventName: string) => void): T;
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
    initState<T extends object>(namespace: string, initialState: T, isPrivate?: boolean): any;
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
    setState<T = any>(namespace: string, setter: (state: T) => void): void;
    /**
     * watch the change of state
     * @param namespace
     * @param getter
     */
    watchState<T>(namespace: string, getter: (state: T) => any): Watcher;
    /**
     * waiting for some states to be initialized
     * @param dependencies the dependencies to be waited for
     * @param timeout the time to wait
     */
    waitState(dependencies: string[], timeout?: number): Promise<any[]>;
}
