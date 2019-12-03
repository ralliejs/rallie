declare type tCallBack = (...args: any[]) => void;
export declare class EventEmitter {
    private events;
    constructor();
    addEventListener(event: string, callBack: tCallBack): void;
    removeEventListener(event: string, callBack: tCallBack): void;
    emit(event: string, ...args: any[]): void;
}
export {};
