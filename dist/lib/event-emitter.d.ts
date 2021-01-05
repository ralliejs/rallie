import { CallbackType } from './types';
export declare class EventEmitter {
    private broadcastEvents;
    private unicastEvents;
    getBroadcastEvents(): Record<string, CallbackType[]>;
    addBroadcastEventListener(event: string, callback: CallbackType): void;
    addUnicastEventListener(event: string, callback: CallbackType): void;
    removeBroadcastEventListener(event: string, callback: CallbackType): void;
    removeUnicastEventListener(event: string, callback: CallbackType): void;
    emitBroadcast(event: string, ...args: any[]): void;
    emitUnicast(event: string, ...args: any[]): void;
}
