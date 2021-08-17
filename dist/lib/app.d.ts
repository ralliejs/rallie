import { CustomCtxType } from './types';
declare type CallbackType = (config?: any) => Promise<void>;
declare type DependenciesType = Array<{
    ctx: CustomCtxType;
    config: any;
} | string>;
export declare class App {
    name: string;
    dependenciesReady: boolean;
    bootstrapped: boolean;
    dependencies: DependenciesType;
    doBootstrap?: CallbackType;
    doActivate?: CallbackType;
    doDestroy?: CallbackType;
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
    bootstrap(callback: CallbackType): this;
    /**
     * indicate the callback your app will run when it's activated after the first time
     * @param callback
     */
    activate(callback: CallbackType): this;
    /**
     * indicate the callback when your app is destroyed
     * @param callback
     */
    destroy(callback: CallbackType): this;
    activateDependenciesApp(activateApp: (ctx: CustomCtxType, config?: any) => Promise<void>): Promise<void>;
}
export {};
