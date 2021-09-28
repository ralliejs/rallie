import { CustomCtxType, LifecyleCallbackType, DependenciesType } from './types'; // eslint-disable-line
import { isObject } from './utils'

export class App {
  public dependenciesReady: boolean = false;
  public bootstrapped: boolean = false;
  public dependencies: DependenciesType = [];
  public doBootstrap?: LifecyleCallbackType;
  public doActivate?: LifecyleCallbackType;
  public doDestroy?: LifecyleCallbackType;

  constructor (public name: string) {
    this.name = name
  }

  /**
   * indicate the apps to be started before your app is bootstrapped
   * @param dependencies
   */
  public relyOn (dependencies: DependenciesType) {
    this.dependencies = dependencies
    return this
  }

  /**
   * indicate the callback your app will run when it's activated the first time
   * @param {function} callback
   */
  public bootstrap (callback: LifecyleCallbackType) {
    this.doBootstrap = callback
    return this
  }

  /**
   * indicate the callback your app will run when it's activated after the first time
   * @param callback
   */
  public activate (callback: LifecyleCallbackType) {
    this.doActivate = callback
    return this
  }

  /**
   * indicate the callback when your app is destroyed
   * @param callback
   */
  public destroy (callback: LifecyleCallbackType) {
    this.doDestroy = callback
    return this
  }

  public async activateDependenciesApp (
    activateApp: (ctx: CustomCtxType, data?: any) => Promise<void>
  ) {
    if (!this.dependenciesReady && this.dependencies.length !== 0) {
      for (const dependence of this.dependencies) {
        if (typeof dependence === 'string') {
          await activateApp(dependence)
        } else if (isObject(dependence)) {
          const { ctx, data } = dependence
          await activateApp(ctx, data)
        }
      }
      this.dependenciesReady = true
    }
  }
}
