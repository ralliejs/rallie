import { CustomCtxType, LifecyleCallbackType, DependencyType } from '../types'; // eslint-disable-line
import { getDeduplicatedDependencies, getDeduplicatedRelatedApps, getNameFromCtx, getNameFromDependency, isObject } from './utils'

export class App {
  public dependenciesReady: boolean = false
  public bootstrapped: boolean = false
  public dependencies: DependencyType[] = []
  public relatedApps: CustomCtxType[] = []
  public doBootstrap?: LifecyleCallbackType
  public doActivate?: LifecyleCallbackType
  public doDestroy?: LifecyleCallbackType
  public isRallieCoreApp: boolean

  constructor (public name: string) {
    this.name = name
    this.isRallieCoreApp = true
  }

  /**
   * indicate the apps to be loaded once your app is loaded
   * @param relatedApps
   * @returns
   */
  public relateTo (relatedApps: CustomCtxType[]) {
    const deduplicatedRelatedApps: CustomCtxType[] = getDeduplicatedRelatedApps(relatedApps)
    const currentRelatedApps: string[] = this.relatedApps.map((item) => getNameFromCtx(item))
    deduplicatedRelatedApps.forEach((ctx) => {
      if (!currentRelatedApps.includes(getNameFromCtx(ctx))) {
        this.relatedApps.push(ctx)
      }
    })
    return this
  }

  /**
   * indicate the apps to be started before your app is bootstrapped
   * @param dependencies
   */
  public relyOn (dependencies: DependencyType[]) {
    const deduplicatedDependencies: DependencyType[] = getDeduplicatedDependencies(dependencies)
    const currentDependencies = this.dependencies.map((item) => getNameFromDependency(item))
    const currentRelatedApps = this.relatedApps.map((item) => getNameFromCtx(item))
    deduplicatedDependencies.forEach((dependency) => {
      const name = getNameFromDependency(dependency)
      if (!currentDependencies.includes(name)) {
        this.dependencies.push(dependency)
      }
      if (!currentRelatedApps.includes(name)) {
        const ctx = typeof dependency === 'string' ? dependency : dependency.ctx
        this.relatedApps.push(ctx)
      }
    })
    return this
  }

  /**
   * indicate the callback your app will run when it's activated the first time
   * @param {function} callback
   */
  public onBootstrap (callback: LifecyleCallbackType) {
    this.doBootstrap = callback
    return this
  }

  /**
   * indicate the callback your app will run when it's activated after the first time
   * @param callback
   */
  public onActivate (callback: LifecyleCallbackType) {
    this.doActivate = callback
    return this
  }

  /**
   * indicate the callback when your app is destroyed
   * @param callback
   */
  public onDestroy (callback: LifecyleCallbackType) {
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

  public async loadRelatedApps (
    loadApp: (ctx: CustomCtxType) => Promise<void>
  ) {
    await Promise.all(this.relatedApps.map((ctx) => loadApp(ctx)))
  }
}
