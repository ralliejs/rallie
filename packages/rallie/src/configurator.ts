import { Bus, Socket, App, touchBus } from '@rallie/core'
import { DependenciesType, LifecyleCallbackType, MiddlewareFnType, ConfType } from '@rallie/core/dist/lib/types'
import { constant } from './utils'

export class Configurator <PublicState extends object, PrivateState extends object> {
  public readonly globalBus: Bus
  public readonly privateBus: Bus
  public readonly globalSocket: Socket
  public readonly privateSocket: Socket
  public readonly app: App
  public readonly name: string
  public readonly relatedApps: string[]

  private readonly isHost: boolean

  constructor (name: string, globalBus: Bus, isHost: boolean) {
    this.globalBus = globalBus
    this.privateBus = touchBus(constant.privateBus(name))[0]
    this.globalSocket = this.globalBus.createSocket()
    this.privateSocket = this.privateBus.createSocket()
    this.app = this.globalBus.createApp(name)
    this.name = name
    this.relatedApps = []
    this.isHost = isHost
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
    return this
  }

  public initPrivateState (state: PrivateState) {
    this.privateSocket.initState<PrivateState>(constant.privateStateNamespace, state, true)
    return this
  }

  public runInHostMode (callback: (use?: (middleware: MiddlewareFnType) => void, config?: (conf: ConfType) => void) => void) {
    if (this.isHost) {
      const use = (middleware: MiddlewareFnType) => {
        this.globalBus.use(middleware)
      }
      const config = (conf: ConfType) => {
        this.globalBus.config(conf)
      }
      callback(use, config)
    }
    return this
  }

  public runInRemoteMode (callback: () => any) {
    if (this.isHost) {
      callback()
    }
    return this
  }
}
