import { callbackType } from './types';
export declare class EventEmitter {
    private events;
    addEventListener(event: string, callback: callbackType): void;
    removeEventListener(event: string, callback: callbackType): void;
    emit(event: string, ...args: any[]): void;
}
