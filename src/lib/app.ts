import { CustomCtxType } from './types'; // eslint-disable-line
import { isObject } from './utils';

type CallbackType = (config?: any) => Promise<void>;
type DependenciesType = Array<{ 
    ctx: CustomCtxType,
    config: any
} | string>;

export class App {
    public dependenciesReady: boolean = false;
    public bootstrapped: boolean = false;
    public dependencies: DependenciesType = [];
    public doBootstrap?: CallbackType;
    public doActivate?: CallbackType;
    public doDestroy?: CallbackType;

    constructor(public name: string) {
        this.name = name;
    }

    /**
     * indicate the apps to be started before your app is bootstrapped
     * @param dependencies
     */
    public relyOn(dependencies: DependenciesType) {
        this.dependencies = dependencies;
        return this;
    }

    /**
     * indicate the callback your app will run when it's activated the first time
     * @param {function} callback
     */
    public bootstrap(callback: CallbackType) {
        this.doBootstrap = callback;
        return this;
    }

    /**
     * indicate the callback your app will run when it's activated after the first time
     * @param callback
     */
    public activate(callback: CallbackType) {
        this.doActivate = callback;
        return this;
    }

    /**
     * indicate the callback when your app is destroyed
     * @param callback
     */
    public destroy(callback: CallbackType) {
        this.doDestroy = callback;
        return this;
    }

    public async activateDependenciesApp(
        activateApp: (ctx: CustomCtxType, config?: any) => Promise<void>
    ) {
        if (!this.dependenciesReady && this.dependencies.length !== 0) {
            for (const dependence of this.dependencies) {
                if (typeof dependence === 'string') {
                    await activateApp(dependence);
                } else if (isObject(dependence)) {
                    const { ctx, config } = dependence;
                    await activateApp(ctx, config);
                }
            }
            this.dependenciesReady = true;
        }
    }
}