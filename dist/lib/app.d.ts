import { CustomCtxType, LifecyleCallbackType, DependenciesType } from './types';
export declare class App {
    name: string;
    dependenciesReady: boolean;
    bootstrapped: boolean;
    dependencies: DependenciesType;
    doBootstrap?: LifecyleCallbackType;
    doActivate?: LifecyleCallbackType;
    doDestroy?: LifecyleCallbackType;
    constructor(name: string);
    /**
     * indicate the apps to be started before your app is bootstrapped
     * @param dependencies
     */
    relyOn(dependencies: DependenciesType): this;
    /**
     * indicate the callback your app will run when it's activated the first time
     * @param {function} callback
     */
    bootstrap(callback: LifecyleCallbackType): this;
    /**
     * indicate the callback your app will run when it's activated after the first time
     * @param callback
     */
    activate(callback: LifecyleCallbackType): this;
    /**
     * indicate the callback when your app is destroyed
     * @param callback
     */
    destroy(callback: LifecyleCallbackType): this;
    activateDependenciesApp(activateApp: (ctx: CustomCtxType, config?: any) => Promise<void>): Promise<void>;
}
