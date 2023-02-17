export class App {
  public activated: Promise<void> = null
  public dependencies: Array<string> = []
  public relatedApps: Array<string> = []
  public doActivate?: () => void | Promise<void>
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
  public relateTo(relatedApps: string[]) {
    this.relatedApps = Array.from(new Set([...this.relatedApps, ...relatedApps]))
    return this
  }

  /**
   * indicate the apps to be activate before your app is activated
   * @param dependencies
   */
  public relyOn(dependencies: string[]) {
    this.relateTo(dependencies)
    this.dependencies = Array.from(new Set([...this.dependencies, ...dependencies]))
    return this
  }

  /**
   * indicate the callback your app will run when it's activated
   * @param callback
   */
  public onActivate(callback: () => void | Promise<void>) {
    this.doActivate = callback
    return this
  }
}
