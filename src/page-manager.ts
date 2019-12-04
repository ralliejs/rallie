import { EventEmitter } from './event-emitter';
import { PageModule } from './page-module';

/*type managerConfig = {
    assets: {
        [moduleName: string]: string[] // configure the assets of the page module to load
    }
}*/

class PageManager {

    private eventEmitter: EventEmitter;
    private state: Object;
    private config: Object;
    private modules: PageModule[];

    constructor(/*config: managerConfig*/) {
        this.eventEmitter = new EventEmitter();
        this.state = {};
        this.config = {};
        this.modules = [];
    }

    private isModuleExisted(name: string) {
        this.modules.forEach((pageModule) => {
            if( pageModule.name === name ) {
                return true;
            }
        });
        return false;
    }

    /**
     * 
     * @param name module name
     * @param dependencies the states which should be initialized before the module created 
     * @param callback callback function after the module created
     */
    public createModule(name: string, dependencies: string[], callback:(pageModule: PageModule, config: Object | null ) => void) {
        if( this.isModuleExisted(name) ) {
            throw new Error(`[obvious] ${name} module already exists, you are not allowed to create it again`);
        }

        if(dependencies.length === 0) {
            const pageModule = new PageModule(name, this.eventEmitter, this.state);
            this.modules.push(pageModule);
            callback(pageModule, this.config[name]);
        } else {
            const timeId = setTimeout(() => {
                clearTimeout(timeId);
                const msg = `[obvious] failed to create module ${name} because the following state ${JSON.stringify(dependencies)} are not ready`;
                throw new Error(msg);
            }, 10*1000);
            const stateInitialCallback = (stateName: string) => {
                const index = dependencies.indexOf(stateName);
                if( index !== -1) {
                    dependencies.splice(index, 1);
                }
                if(dependencies.length === 0) {
                    clearTimeout(timeId);
                    this.eventEmitter.removeEventListener('$state-initial', stateInitialCallback);
                    const pageModule = new PageModule(name, this.eventEmitter, this.state);
                    this.modules.push(pageModule);
                    callback(pageModule, this.config[name]);
                }
            };
            this.eventEmitter.addEventListener('$state-initial', stateInitialCallback);
        }
    }

    public loadModule() {
        
    }
}

export default PageManager;
