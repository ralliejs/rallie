import { Socket } from './socket';
export declare type assetsConfigType = {
    [moduleName: string]: {
        js?: string[];
        css?: string[];
    };
};
export declare type middlewareType = (name: string, loadJs?: Function, loadCss?: Function) => Promise<void> | undefined;
export declare class Bus {
    private eventEmitter;
    private _state;
    state: Object;
    private config;
    private sockets;
    private assets;
    private middleware;
    allowCrossDomainJs: boolean;
    constructor(assets?: assetsConfigType, middleware?: middlewareType);
    private isSocketExisted;
    private fetchJs;
    private loadJs;
    private loadCss;
    private loadSocketFromAssetsConfig;
    /**
     * get the socket by name
     * @param {string} name the name of socket
     * @return {Socket} the socket instance
     */
    getSocket(name: string): Socket;
    /**
     * create a socket
     * @param {string} name socket name
     * @param {string[]} dependencies the states which should be initialized before the socket created
     * @param {Function} callback the callback after the dependencies are ready
     * @param {number} timeout the time of waiting for dependencies
     */
    createSocket(name: string, dependencies: string[], callback: (socket: Socket, config?: Object | null) => void, timeout?: number): void;
    /**
     * give a config and start a app
     * @param {string} socketName socket name
     * @param {object} config the initial config of app
     */
    startApp(socketName: string, config?: any): Promise<void>;
}
