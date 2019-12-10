import { EventEmitter } from './event-emitter';
import { callbackType } from './types';
export declare class Socket {
    name: string;
    private eventEmitter;
    private _state;
    constructor(name: string, eventEmitter: EventEmitter, _state: Object);
    on(eventName: string, callback: callbackType): void;
    off(eventName: string, callback: callbackType): void;
    emit(eventName: string, ...args: any[]): void;
    initState(key: string, value: any, isPrivate?: boolean): void;
    getState(stateName: string): any;
    setState(stateName: string, newValue: any): void;
    watchState(stateName: string, callback: (newValue: any, oldValue?: any) => void): void;
    unwatchState(stateName: string, callback: (oldValue: any, newValue: any) => void): void;
}
