import { EventEmitter } from './event-emitter';
import { Socket } from './socket';
import { App } from './app';
import { getMappedState, Errors, compose } from './utils';
import * as loader from './loader';
import { MiddlewareFnType, ContextType, NextFnType, ConfType, CustomCtxType } from './types'; // eslint-disable-line

export class Bus {
    private name: string;
    private eventEmitter: EventEmitter = new EventEmitter();
    private _state: object = {};
    private apps: Record<string, App | boolean> = {};
    private dependencyDepth = 0;

    private conf: ConfType = {
        maxDependencyDepth: 100,
        loadScriptByFetch: false,
        assets: {} 
    };
    private middlewares: MiddlewareFnType[] = [];
    private composedMiddlewareFn: (ctx: ContextType, next: NextFnType) => Promise<any>

    public state: Record<string, any>;

    constructor(name: string) {
        this.name = name;
        this.composedMiddlewareFn = compose(this.middlewares);
        Object.defineProperty(this, 'state', {
            get: () => getMappedState(this._state),
            set: () => {
                throw new Error(Errors.stateIsReadOnly());
            }
        });
    }

    /**
     * config the bus
     * @param conf the new configuration object
     */
    public config(conf: Partial<ConfType>) {
        this.conf = {
            ...this.conf,
            ...conf,
            assets: {
                ...this.conf.assets,
                ...(conf.assets || {})
            }
        };
        return this;
    }

    /**
     * register the middleware
     * @param middleware 
     */
    public use(middleware: MiddlewareFnType) {
        if (typeof middleware !== 'function') {
            throw new Error(Errors.wrongMiddlewareType());
        }
        this.middlewares.push(middleware);
        this.composedMiddlewareFn = compose(this.middlewares);
        return this;
    }

    /**
     * create the context to pass to the middleware
     * @param ctx 
     * @returns 
     */
    private createContext(ctx: CustomCtxType) {
        let context: ContextType = {
            name: '',
            loadJs: loader.loadJs,
            loadCss: loader.loadCss,
            fetchJs: loader.fetchJs,
            excuteCode: loader.excuteCode,
            conf: this.conf
        };
        if (typeof ctx === 'string') {
            context.name = ctx;
        } else if (ctx.name) {
            context = {
                ...context,
                ...ctx,
            };
        } else {
            throw new Error(Errors.wrongContextType());
        }
        return context;
    }

    
    /**
     * the core middleware
     * @param ctx the context
     */
    private async loadResourcesFromAssetsConfig(ctx: ContextType) {
        const { 
            name, 
            loadJs = loader.loadJs,
            loadCss = loader.loadCss, 
            fetchJs = loader.fetchJs, 
            excuteCode = loader.excuteCode,
            conf = this.conf 
        } = ctx;
        const { assets, loadScriptByFetch } = conf;
        if (assets[name]) {
            // insert link tag first
            assets[name].css &&
                assets[name].css.forEach((asset: string) => {
                    if (/^.+\.css$/.test(asset)) {
                        loadCss(asset);
                    } else {
                        console.error(Errors.invalidResource(asset));
                    }
                });
            // load and execute js
            if (assets[name].js) {
                for (let asset of assets[name].js) {
                    if (/^.+\.js$/.test(asset)) {
                        if (!loadScriptByFetch) {
                            await loadJs(asset);
                        } else {
                            const code = await fetchJs(asset);
                            code && excuteCode(code);
                        }
                    } else {
                        console.error(Errors.invalidResource(asset));
                    }
                }
            }
            // create app for raw resource
            if (assets[name].isLib) {
                this.apps[name] = true;
            }
        } else {
            throw new Error(Errors.resourceNotDeclared(name, this.name));
        }
    }

    /**
     * create a socket
     * @return the socket instance
     */
    public createSocket() {
        return new Socket(this.eventEmitter, this._state);
    }

    /**
     * create an app
     * @param name the name of the app
     * @return the app instance
     */
    public createApp(name: string) {
        if (this.apps[name]) {
            throw new Error(Errors.createExistingApp(name));
        }
        const app = new App(name);
        this.apps[name] = app;
        return app;
    }

    /**
     * load the resources of an app
     * @param ctx
     */
    public async loadApp(ctx: CustomCtxType) {
        const context = this.createContext(ctx);
        // apply the middlewares
        await this.composedMiddlewareFn(context, this.loadResourcesFromAssetsConfig);
    }

    /**
     * activate an app
     * @param name
     * @param config
     */
    public async activateApp(ctx: CustomCtxType, config?: any) {
        const context = this.createContext(ctx);
        const { name } = context;
        if (!this.apps[name]) {
            await this.loadApp(context);
        }
        if (!this.apps[name]) {
            throw new Error(Errors.appNotCreated(name));
        }
        const isApp = typeof this.apps[name] !== 'boolean';
        if (isApp) {
            const app = this.apps[name] as App;
            if (!app.bootstrapped) {
                if (this.dependencyDepth > this.conf.maxDependencyDepth) {
                    this.dependencyDepth = 0;
                    throw new Error(Errors.bootstrapNumberOverflow(this.conf.maxDependencyDepth));
                }
                this.dependencyDepth++;
                await app.activateDependenciesApp(this.activateApp.bind(this));
                if (app.doBootstrap) {
                    await app.doBootstrap(config);
                } else if (app.doActivate) {
                    await app.doActivate(config);
                }
                app.bootstrapped = true;
                this.dependencyDepth--;
            } else {
                app.doActivate && (await app.doActivate(config));
            }
        }
    }

    /**
     * destroy an app
     * @param name
     * @param config
     */
    public async destroyApp(name: string, config?: any) {
        const app = this.apps[name];
        if (app && typeof app !== 'boolean') {
            app.doDestroy && (await app.doDestroy(config));
            app.bootstrapped = false;
            app.dependenciesReady = false;
        }
    }
}
