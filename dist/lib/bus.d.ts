import { Socket } from './socket';
import { App } from './app';
import { MiddlewareFnType, ConfType, CustomCtxType } from './types';
export declare class Bus {
    private name;
    private eventEmitter;
    private _state;
    private apps;
    private dependencyDepth;
    private conf;
    private middlewares;
    private composedMiddlewareFn;
    state: Record<string, any>;
    constructor(name: string);
    /**
     * config the bus
     * @param conf the new configuration object
     */
    config(conf: Partial<ConfType>): this;
    /**
     * register the middleware
     * @param middleware
     */
    use(middleware: MiddlewareFnType): this;
    /**
     * create the context to pass to the middleware
     * @param ctx
     * @returns
     */
    private createContext;
    /**
     * the core middleware
     * @param ctx the context
     */
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
     * @param ctx
     */
    loadApp(ctx: CustomCtxType): Promise<void>;
    /**
     * activate an app
     * @param name
     * @param config
     */
    activateApp(ctx: CustomCtxType, config?: any): Promise<void>;
    /**
     * destroy an app
     * @param name
     * @param config
     */
    destroyApp(name: string, config?: any): Promise<void>;
}
