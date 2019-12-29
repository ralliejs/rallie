import { Socket } from './socket';
declare type assetsConfigType = {
    [moduleName: string]: {
        js?: string[];
        css?: string[];
    };
};
declare type middlewareType = (name: string, loadJs?: Function, loadCss?: Function) => Promise<void> | undefined;
export declare class Bus {
    private eventEmitter;
    private _state;
    state: Object;
    private config;
    private sockets;
    private assets;
    private middleware;
    constructor(assets?: assetsConfigType, middleware?: middlewareType);
    private isSocketExisted;
    private loadJs;
    private loadCss;
    private loadSocketFromAssetsConfig;
    getSocket(name: string): Socket;
    /**
     * @param name socket name
     * @param dependencies the states which should be initialized before the socket created
     */
    createSocket(name: string, dependencies: string[], callback: (socket: Socket, config?: Object | null) => void, timeout?: number): void;
    startApp(socketName: string, config?: any): Promise<void>;
}
export {};
