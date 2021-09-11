import { StoresType } from './types';
export declare class Watcher {
    private namespace;
    private stores;
    oldWatchingStates: any;
    handler: (watchingStates: any, oldWatchingStates: any) => any;
    stopEffect: () => void;
    constructor(namespace: string, stores: StoresType);
    do<T = any>(handler: (watchingStates: T, oldWatchingStates?: T) => any): () => void;
    unwatch(): void;
}
