import { StoresType } from './types';
export declare class Watcher {
    private namespace;
    private stores;
    handler: (state: any) => void;
    stopEffect: () => void;
    constructor(namespace: string, stores: StoresType);
    do<T>(handler: (state: T) => void): () => void;
    unwatch(): void;
}
