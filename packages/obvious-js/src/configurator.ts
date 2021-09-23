import { Bus, Socket, App, touchBus } from '@obvious-js/core'
import { DependenciesType, LifecyleCallbackType } from '@obvious-js/core/dist/lib/types'
import { constant } from './utils'

export class Configurator <PublicState extends object, PrivateState extends object> {
  public globalBus: Bus
  public privateBus: Bus
  public globalSocket: Socket
  public privateSocket: Socket
  public app: App
  public name: string
  public relatedApps: string[]

  constructor (name: string, globalBus: Bus) {
    this.globalBus = globalBus
    this.privateBus = touchBus(constant.privateBus(name))[0]
    this.globalSocket = this.globalBus.createSocket()
    this.privateSocket = this.privateBus.createSocket()
    this.app = this.globalBus.createApp(name)
    this.name = name
    this.relatedApps = []
  }

  public bootstrap (callback: LifecyleCallbackType) {
    const bootstrapCallback: LifecyleCallbackType = async (data) => {
      await this.globalSocket.waitState(this.relatedApps.map((appName) => constant.appCreatedFlag(appName)))
      await callback(data)
    }
    this.app.bootstrap(bootstrapCallback)
    return this
  }

  public activate (callback: LifecyleCallbackType) {
    const activateCallback: LifecyleCallbackType = async (data) => {
      await this.globalSocket.waitState(this.relatedApps.map((appName) => constant.appCreatedFlag(appName)))
      await callback(data)
    }
    this.app.activate(activateCallback)
    return this
  }

  public destroy (callback: LifecyleCallbackType) {
    this.app.destroy(callback)
    return this
  }

  public relyOn (dependencies: DependenciesType) {
    dependencies.forEach((item) => {
      let appName = ''
      if (typeof item === 'string') {
        appName = item
      } else {
        if (typeof item.ctx === 'string') {
          appName = item.ctx
        } else {
          appName = item.ctx.name
        }
      }
      if (!this.relatedApps.includes(appName)) {
        this.relatedApps.push(appName)
      }
    })
    this.app.relyOn(dependencies)
    return this
  }

  public relatedTo (appNames: string[]) {
    appNames.forEach((appName) => {
      if (!this.relatedApps.includes(appName)) {
        this.relatedApps.push(appName)
      }
      this.globalBus.loadApp(appName)
    })
    return this
  }

  public initPublicState (state: PublicState) {
    this.privateSocket.initState<PublicState>(constant.publicStateNamespace, state)
  }

  public initPrivateState (state: PrivateState) {
    this.privateSocket.initState<PrivateState>(constant.privateStateNamespace, state, true)
  }
}
