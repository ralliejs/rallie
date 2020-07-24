import { EventEmitter } from './event-emitter';
import { Socket } from './socket';
import { App } from './app';
import { getMappedState, Errors } from './utils';


export type assetsConfigType = {
    [moduleName: string]: {
        js?: string[],
        css?: string[],
        isRawResource?: boolean
    } // configure the assets of the app
}

export type middlewareType = (name: string, loadJs?: Function, loadCss?: Function) => Promise<void> | undefined

export class Bus {

    private name: string;
    private eventEmitter: EventEmitter = new EventEmitter();
    private _state: Object = {};
    public state: {[name: string]: any};
    private assets: assetsConfigType;
    private apps: {[name: string]: App | boolean} = {};
    private middleware: middlewareType;
    public allowCrossDomainJs: boolean; 

    constructor(name: string = '', assets: assetsConfigType = {}, middleware?: middlewareType) {
        this.assets = assets;
        this.name = name;
        this.middleware = middleware;
        this.allowCrossDomainJs = true;
        Object.defineProperty(this, 'state', {
            get: () => getMappedState(this._state),
            set: () => {
                throw new Error('[obvious] bus.state is readonly');
            }
        });
    }

    private async fetchJs(src: string) {
        const res = await fetch(src);
        const code = await res.text();
        eval(code);
    }

    private loadJs(src: string) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.type= 'text/javascript';
            script.src = src;
            script.onload = () => {
                resolve();
            };
            document.body.appendChild(script);
        });
    }

    private loadCss(href: string) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    }

    private async loadResourcesFromAssetsConfig(name: string) {
        const assets = this.assets;
        // insert link tag first
        assets[name].css && assets[name].css.forEach((asset: string) => {
            if((/^.+\.css$/).test(asset)) {
                this.loadCss(asset);
            } else {
                console.error(`[obvious] ${asset} is not valid asset`);
            }
        });
        // load and excute js
        if (assets[name].js) {
            for( let asset of assets[name].js) {
                if((/^.+\.js$/).test(asset)) {
                    if(this.allowCrossDomainJs) {
                        await this.loadJs(asset);
                    } else {
                        await this.fetchJs(asset);
                    }
                } else {
                    console.error(`[obvious] ${asset} is not valid asset`);
                }
            }
        }
        // create app for raw resource
        if (assets[name].isRawResource) {
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
     * @param {string} name the name of the app
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
     * start up an app
     * @param {string} name 
     * @param {any} config 
     */
    public async activateApp(name: string, config?: any) {
        if (!this.apps[name]) {
            // load the resources
            if(this.assets && this.assets[name]) {
                await this.loadResourcesFromAssetsConfig(name);
            } else if (this.middleware) {
                await this.middleware(name, this.allowCrossDomainJs ? this.loadJs : this.fetchJs, this.loadCss);
            } else {
                throw (new Error(Errors.resourceNotFound(name, this.name)));
            }
        }
        if (!this.apps[name]) {
            throw new Error(Errors.appNotCreated(name));
        }
        const isApp = typeof this.apps[name] !== 'boolean';
        if (isApp) {
            const app = this.apps[name] as App;
            if (!app.bootstrapted) {
                await app.activateDependenciesApp(this.activateApp.bind(this));
                app.doBootstrap && app.doBootstrap(config);
            } else {
                app.doReactivate && app.doReactivate(config);
            }
        }
    }
}
