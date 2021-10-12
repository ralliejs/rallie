import { Bus, Socket, App, touchBus } from '@rallie/core'
import { DependenciesType, LifecyleCallbackType, CustomCtxType } from '@rallie/core/dist/lib/types'
import { constant, getAppNameFromCtx } from './utils'

export class Configurator <PublicState extends object, PrivateState extends object> {
  public readonly globalBus: Bus
  public readonly privateBus: Bus
  public readonly privateSocket: Socket
  public readonly app: App
  public readonly name: string
  public readonly relatedApps: CustomCtxType[] = []

  constructor (name: string, globalBus: Bus) {
    this.globalBus = globalBus
    this.privateBus = touchBus(constant.privateBus(name))[0]
    this.privateSocket = this.privateBus.createSocket()
    this.app = this.globalBus.createApp(name)
    this.name = name
  }

  public bootstrap (callback: LifecyleCallbackType) {
    this.app.bootstrap(callback)
    return this
  }

  public activate (callback: LifecyleCallbackType) {
    this.app.activate(callback)
    return this
  }

  public destroy (callback: LifecyleCallbackType) {
    this.app.destroy(callback)
    return this
  }

  public relyOn (dependencies: DependenciesType) {
    const relatedAppNames = this.relatedApps.map((appCtx) => getAppNameFromCtx(appCtx))
    dependencies.forEach((item) => {
      let appName = ''
      let ctx: CustomCtxType = null
      if (typeof item === 'string') {
        appName = item
        ctx = item
      } else {
        ctx = item.ctx
        if (typeof item.ctx === 'string') {
          appName = item.ctx
        } else {
          appName = item.ctx.name
        }
      }
      if (!relatedAppNames.includes(appName)) {
        this.relatedApps.push(ctx)
      }
    })
    this.app.relyOn(dependencies)
    this.app.preload(this.relatedApps)
    return this
  }

  public relatedTo (apps: CustomCtxType[]) {
    const relatedAppNames = this.relatedApps.map((appCtx) => getAppNameFromCtx(appCtx))
    apps.forEach((appCtx) => {
      if (!relatedAppNames.includes(getAppNameFromCtx(appCtx))) {
        this.relatedApps.push(appCtx)
      }
    })
    this.app.preload(this.relatedApps)
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
}
