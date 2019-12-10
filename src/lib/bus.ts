import { EventEmitter } from './event-emitter';
import { Socket } from './socket';
import { getmappedState } from './utils';

type assetsConfigType = {
    [moduleName: string]: {
        js: string[],
        css: string[], 
    } // configure the assets of the page module to load
}

type middlewareType = (name: string, loadJs?: Function, loadCss?: Function) => Promise<void> | undefined

export class Bus {

    private eventEmitter: EventEmitter = new EventEmitter();
    private _state: Object = {};
    public state: Object;
    private config: Object = {};
    private sockets: Socket[] = [];
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

    private async loadJs(src: string) {
        const res = await fetch(src);
        const code = await res.text();
        eval(code);
    }

    private loadCss(href: string) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    }

    private async loadSocketFromAssetsConfig(name: string) {
        const assets = this.assets;
        if (assets[name]) {
            // insert link tag first
            assets[name].css && assets[name].css.forEach((asset: string) => {
                if((/^.+\.css$/).test(asset)) {
                    this.loadCss(asset);
                } else {
                    console.error(`[obvious] ${asset} is not valid asset`);
                }
            });
            // load and excute js
            if(assets[name].js) {
                for( let asset of assets[name].js) {
                    if((/^.+\.js$/).test(asset)) {
                        await this.loadJs(asset);
                    } else {
                        console.error(`[obvious] ${asset} is not valid asset`);
                    }
                }
            }
        } else {
            throw (new Error(`[obvious] can not find module ${name}, create it first`));
        }
    }

    /**
     * @param name socket name
     * @param dependencies the states which should be initialized before the socket created 
     */
    public createSocket(name: string, dependencies: string[], callback:(socket: Socket, config?: Object | null ) => void, timeout = 10*1000) {
        if( this.isSocketExisted(name) ) {
            throw(new Error(`[obvious] ${name} socket already exists, you are not allowed to create it again`));
        }

        // remove all ready states first
        dependencies = dependencies.filter((stateName: string) => {
            return this._state[stateName] === undefined;
        });

        if(dependencies.length === 0) {
            const socket = new Socket(name, this.eventEmitter, this._state);
            this.sockets.push(socket);
            callback(socket, this.config[name]);
        } else {
            const timeId = setTimeout(() => {
                clearTimeout(timeId);
                const msg = `[obvious] failed to create socket ${name} because the following state ${JSON.stringify(dependencies)} are not ready`;
                throw(new Error(msg));
            }, timeout);
            const stateInitialCallback = (stateName: string) => {
                const index = dependencies.indexOf(stateName);
                if( index !== -1) {
                    dependencies.splice(index, 1);
                }
                if(dependencies.length === 0) {
                    clearTimeout(timeId);
                    this.eventEmitter.removeEventListener('$state-initial', stateInitialCallback);
                    const socket = new Socket(name, this.eventEmitter, this._state);
                    this.sockets.push(socket);
                    callback(socket, this.config[name]);
                }
            };
            this.eventEmitter.addEventListener('$state-initial', stateInitialCallback);
        }
    }

    public async startApp(socketName: string, config = null) {
        if(this.isSocketExisted(socketName)) {
            config && console.warn(`[obvious] socket ${socketName} already exists, your config is invalid`);
        } else {
            this.config[socketName] = config;
            try {
                if(this.middleware) {
                    await this.middleware(socketName, this.loadJs, this.loadCss);
                } else {
                    await this.loadSocketFromAssetsConfig(socketName);
                }
            } catch(error) {
                this.config[socketName] = null;
                throw error;
            }
        }
    }
}
