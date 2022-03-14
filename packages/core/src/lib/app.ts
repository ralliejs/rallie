import type { LifecyleCallbackType, DependencyType, RelateType } from '../types' // eslint-disable-line
import { deduplicate } from './utils'

export class App {
  public dependenciesReady: boolean = false
  public bootstrapping: Promise<void> = null
  public dependencies: Array<{ name: string; ctx?: Record<string, any>; data?: any }> = []
  public relatedApps: Array<{ name: string; ctx?: Record<string, any> }> = []
  public doBootstrap?: LifecyleCallbackType
  public doActivate?: LifecyleCallbackType
  public doDestroy?: LifecyleCallbackType
  public isRallieCoreApp: boolean

  constructor(public name: string) {
    this.name = name
    this.isRallieCoreApp = true
  }

  /**
   * indicate the apps to be loaded once your app is loaded
   * @param relatedApps
   * @returns
   */
  public relateTo(relatedApps: RelateType[]) {
    const getName = (relateApp: RelateType) =>
      typeof relateApp === 'string' ? relateApp : relateApp.name
    const deduplicatedRelatedApps: RelateType[] = deduplicate(relatedApps)
    const currentRelatedAppNames: string[] = this.relatedApps.map((item) => item.name)
    deduplicatedRelatedApps.forEach((relatedApp) => {
      if (!currentRelatedAppNames.includes(getName(relatedApp))) {
        this.relatedApps.push({
          name: getName(relatedApp),
          ctx: typeof relatedApp !== 'string' ? relatedApp.ctx : undefined,
        })
      }
    })
    return this
  }

  /**
   * indicate the apps to be activate before your app is bootstrapped
   * @param dependencies
   */
  public relyOn(dependencies: DependencyType[]) {
    const getName = (dependencyApp: DependencyType) =>
      typeof dependencyApp === 'string' ? dependencyApp : dependencyApp.name
    const deduplicatedDependencies: DependencyType[] = deduplicate(dependencies)
    const currentDependenciesNames = this.dependencies.map((item) => item.name)
    const currentRelatedAppsNames = this.relatedApps.map((item) => item.name)
    deduplicatedDependencies.forEach((dependency) => {
      const name = getName(dependency)
      if (!currentDependenciesNames.includes(name)) {
        this.dependencies.push({
          name,
          ctx: typeof dependency !== 'string' ? dependency.ctx : undefined,
          data: typeof dependency !== 'string' ? dependency.data : undefined,
        })
      }
      if (!currentRelatedAppsNames.includes(name)) {
        this.relatedApps.push({
          name,
          ctx: typeof dependency !== 'string' ? dependency.ctx : undefined,
        })
      }
    })
    return this
  }

  /**
   * indicate the callback your app will run when it's activated the first time
   * @param {function} callback
   */
  public onBootstrap(callback: LifecyleCallbackType) {
    this.doBootstrap = callback
    return this
  }

  /**
   * indicate the callback your app will run when it's activated after the first time
   * @param callback
   */
  public onActivate(callback: LifecyleCallbackType) {
    this.doActivate = callback
    return this
  }

  /**
   * indicate the callback when your app is destroyed
   * @param callback
   */
  public onDestroy(callback: LifecyleCallbackType) {
    this.doDestroy = callback
    return this
  }
}
