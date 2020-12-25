import { EventEmitter } from './event-emitter';
import { CallbackType } from './types';
export declare class Socket {
    private eventEmitter;
    private _state;
    constructor(eventEmitter: EventEmitter, _state: Object);
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
    unicast(eventName: string, ...args: any[]): void;
    /**
     * judge if state has been initialized
     * @param stateName
     */
    existState(stateName: string): boolean;
    /**
     * init a state
     * @param stateName
     * @param value
     * @param isPrivate is state can only be modified by the socket which initialized it
     */
    initState(stateName: string, value: any, isPrivate?: boolean): void;
    /**
     * get a state
     * @param {string} stateName
     */
    getState(stateName: string): object;
    /**
     * set the value of the state
     * @param stateName
     * @param arg
     */
    setState(stateName: string, arg: any): void;
    /**
     * watch the change of state
     * @param stateName
     * @param callback
     */
    watchState(stateName: string, callback: (newValue: any, oldValue?: any) => void): void;
    /**
     * remove the listener of state watcher
     * @param stateName
     * @param callback
     */
    unwatchState(stateName: string, callback: (newValue: any, oldValue: any) => void): void;
    /**
     * waiting for some states to be initialized
     * @param dependencies the states to be waited for
     * @param timeout the time to wait
     */
    waitState(dependencies: string[], timeout?: number): Promise<any>;
}
