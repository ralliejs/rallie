import { EventEmitter } from './event-emitter';
import { PageSocket } from './page-socket';
import { getmappedState } from './utils';

type assetsConfigType = {
    [moduleName: string]: string[] // configure the assets of the page module to load
}

type middlewareType = (name: string, insertScript?: Function, insertLink?: Function) => Promise<void> | undefined

export class PageManager {

    private eventEmitter: EventEmitter = new EventEmitter();
    private _state: Object = {};
    public state: Object;
    private config: Object = {};
    private sockets: PageSocket[] = [];
    private assets: assetsConfigType;
    private middleware: middlewareType;

    constructor(assets: assetsConfigType = {}, middleware?: middlewareType) {
        this.assets = assets;
        this.middleware = middleware;
        Object.defineProperty(this, 'state', {
            configurable: false,
            get: () => {
                return getmappedState(this._state);
            }
        });
    }

    private isSocketExisted(name: string) {
        for( let socket of this.sockets) {
            if(socket.name === name) {
                return true;
            }
        }
        return false;
    }

    private insertScript(src: string) {
        const script = document.createElement('script');
        script.defer = true;
        script.type = 'text/javascript';
        script.src = src;
        document.head.appendChild(script);
    }

    private insertLink(href: string) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    }

    private loadModuleFromAssetsConfig(name: string) {
        const assets = this.assets;
        if (assets[name]) {
            assets[name].forEach((asset: string) => {
                if((/^.+\.css$/).test(asset)) {
                    this.insertLink(asset);
                } else if( /^.+\.js$/.test(asset)) {
                    this.insertScript(asset);
                } else {
                    console.error(`[obvious] ${asset} is not valid asset`);
                }
            });
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(`[obvious] can not find module ${name}, create it first`));
        }
    }

    /**
     * @param name socket name
     * @param dependencies the states which should be initialized before the module created 
     * @param callback callback function after the module created
     */
    public createPageSocket(name: string, dependencies: string[], callback:(pageSocket: PageSocket, config?: Object | null ) => void, timeout?: number) {        
        if( this.isSocketExisted(name) ) {
            throw new Error(`[obvious] ${name} socket already exists, you are not allowed to create it again`);
        }

        // remove all ready states first
        dependencies = dependencies.filter((stateName: string) => {
            return this._state[stateName] === undefined;
        });

        if(dependencies.length === 0) {
            const pageSocket = new PageSocket(name, this.eventEmitter, this._state);
            this.sockets.push(pageSocket);
            callback(pageSocket, this.config[name]);
        } else {
            const timeId = setTimeout(() => {
                clearTimeout(timeId);
                const msg = `[obvious] failed to create socket ${name} because the following state ${JSON.stringify(dependencies)} are not ready`;
                // error in maro task can not be caught, therefor, use console.error instead of throwing error
                console.error(msg);
            }, timeout || 10*1000);
            const stateInitialCallback = (stateName: string) => {
                const index = dependencies.indexOf(stateName);
                if( index !== -1) {
                    dependencies.splice(index, 1);
                }
                if(dependencies.length === 0) {
                    clearTimeout(timeId);
                    this.eventEmitter.removeEventListener('$state-initial', stateInitialCallback);
                    const pageSocket = new PageSocket(name, this.eventEmitter, this._state);
                    this.sockets.push(pageSocket);
                    callback(pageSocket, this.config[name]);
                }
            };
            this.eventEmitter.addEventListener('$state-initial', stateInitialCallback);
        }
    }

    public loadModule(name: string, config = null) {
        if(this.isSocketExisted(name)) {
            config && console.warn(`[obvious] socket ${name} already exists, your config is invalid`);
            return Promise.resolve();
        } else {
            const applyMiddleware = function(name: string) {
                return this.middleware(name, this.insertScript, this.insertLink);
            }; 
            let applyLoad =  this.middleware? applyMiddleware : this.loadModuleFromAssetsConfig;
            applyLoad = applyLoad.bind(this); 
            return new Promise((resolve, reject) => {
                applyLoad(name).then(() => {
                    this.config[name] = config;
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
}
