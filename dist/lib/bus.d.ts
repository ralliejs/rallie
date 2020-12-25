import { Socket } from './socket';
import { App } from './app';
export declare type AssetsConfigType = Record<string, {
    js?: string[];
    css?: string[];
    isLib?: boolean;
}>;
export declare type MiddlewareType = {
    handleLoad?: (name: string, loadJs?: (src: string) => Promise<void>, loadCss?: (src: string) => void) => Promise<void>;
    handleExecute?: (code: any, src: string) => Promise<void>;
};
export declare class Bus {
    private name;
    private assets;
    private middleware;
    private eventEmitter;
    private _state;
    private apps;
    private dependencyDepth;
    state: Record<string, any>;
    allowCrossOriginScript: boolean;
    maxDependencyDepth: number;
    constructor(name?: string, assets?: AssetsConfigType, middleware?: MiddlewareType);
    /**
     * define fetchJs、loadJs and loadCss as arrow function because
     * they will be the arguments of the handleLoad middleware
     * */
    private fetchJs;
    private loadJs;
    private loadCss;
    private loadResourcesFromAssetsConfig;
    /**
     * create a socket
     * @return the socket instance
     */
    createSocket(): Socket;
    /**
     * create an app
     * @param name the name of the app
     * @return the app instance
     */
    createApp(name: string): App;
    /**
     * load the resources of an app
     * @param name
     */
    loadApp(name: string): Promise<void>;
    /**
     * activate an app
     * @todo: how to handle circular dependency dead lock
     * @param name
     * @param config
     */
    activateApp(name: string, config?: any): Promise<void>;
    /**
     * destroy an app
     * @param name
     * @param config
     */
    destroyApp(name: string, config?: any): Promise<void>;
}
