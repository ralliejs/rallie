import { EventEmitter } from './event-emitter';
import { Socket } from './socket';
import { App } from './app';
import { getMappedState, Errors } from './utils';

export type AssetsConfigType = Record<string, {
    js?: string[];
    css?: string[];
    isLib?: boolean;
}> // configure the assets of the app

export type MiddlewareType = {
    handleLoad?: (
        name: string,
        loadJs?: (src: string) => Promise<void>,
        loadCss?: (src: string) => void
    ) => Promise<void>;
    handleExecute?: (code: any, src: string) => Promise<void>;
};

export class Bus {
    private eventEmitter: EventEmitter = new EventEmitter();
    private _state: object = {};
    private apps: Record<string, App | boolean> = {};
    private dependencyDepth = 0;

    public state: Record<string, any>;
    public allowCrossOriginScript: boolean = true;
    public maxDependencyDepth = 100;

    constructor(
        private name: string = '',
        private assets: AssetsConfigType = {},
        private middleware: MiddlewareType = {}
    ) {
        this.assets = assets;
        this.name = name;
        this.middleware = middleware;
        Object.defineProperty(this, 'state', {
            get: () => getMappedState(this._state),
            set: () => {
                throw new Error(Errors.stateIsReadOnly());
            }
        });
    }

    /**
     * define fetchJs、loadJs and loadCss as arrow function because
     * they will be the arguments of the handleLoad middleware
     * */
    private fetchJs = async (src: string) => {
        const res = await fetch(src);
        const code = await res.text();
        this.middleware?.handleExecute
            ? this.middleware.handleExecute(code, src)
            : eval(code);
    };

    private loadJs = async (src: string) => {
        const promise: Promise<void> = new Promise(resolve => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onload = () => {
                resolve();
            };
            document.body.appendChild(script);
        });
        return promise;
    };

    private loadCss = async (href: string) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    };

    private async loadResourcesFromAssetsConfig(name: string) {
        const assets = this.assets;
        // insert link tag first
        assets[name].css &&
            assets[name].css.forEach((asset: string) => {
                if (/^.+\.css$/.test(asset)) {
                    this.loadCss(asset);
                } else {
                    console.error(Errors.invalidResource(asset));
                }
            });
        // load and execute js
        if (assets[name].js) {
            for (let asset of assets[name].js) {
                if (/^.+\.js$/.test(asset)) {
                    if (this.allowCrossOriginScript) {
                        await this.loadJs(asset);
                    } else {
                        await this.fetchJs(asset);
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
     * @param name
     */
    public async loadApp(name: string) {
        // load the resources
        if (this.assets && this.assets[name]) {
            await this.loadResourcesFromAssetsConfig(name);
        } else if (this.middleware?.handleLoad) {
            await this.middleware?.handleLoad(
                name,
                this.allowCrossOriginScript ? this.loadJs : this.fetchJs,
                this.loadCss
            );
        } else {
            throw new Error(Errors.resourceNotDeclared(name, this.name));
        }
    }

    /**
     * activate an app
     * @todo: how to handle circular dependency dead lock
     * @param name
     * @param config
     */
    public async activateApp(name: string, config?: any) {
        if (!this.apps[name]) {
            await this.loadApp(name);
        }
        if (!this.apps[name]) {
            throw new Error(Errors.appNotCreated(name));
        }
        const isApp = typeof this.apps[name] !== 'boolean';
        if (isApp) {
            const app = this.apps[name] as App;
            if (!app.bootstrapped) {
                if (this.dependencyDepth > this.maxDependencyDepth) {
                    this.dependencyDepth = 0;
                    throw new Error(Errors.bootstrapNumberOverflow());
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
