import { State } from './state'
import { Configurator } from './configurator'
import { CallbackType, MiddlewareFnType, ConfType } from '@rallie/core/dist/lib/types'
import { constant, errors, warnings } from './utils'
import { Connector } from './connector'

export class App<
  PublicState extends object,
  PrivateState extends object,
  BroadcastEvents extends Record<string, CallbackType>,
  UnicastEvents extends Record<string, CallbackType>
> {
  constructor (
    configurator: Configurator<PublicState, PrivateState>,
    isHost: boolean
  ) {
    this.configurator = configurator
    this.broadcaster = this.configurator.privateSocket.createBroadcaster()
    this.unicaster = this.configurator.privateSocket.createUnicaster()
    this.publicState = new State<PublicState>(this.configurator.privateSocket, this.configurator.name, constant.publicStateNamespace)
    this.privateState = new State<PrivateState>(this.configurator.privateSocket, this.configurator.name, constant.privateStateNamespace)
    this.isHost = isHost
  }

  private configurator: Configurator<PublicState, PrivateState>
  private isHost: boolean

  public broadcaster: BroadcastEvents
  public unicaster: UnicastEvents
  public publicState: State<PublicState>
  public privateState: State<PrivateState>

  public onBroadcast (broadcastEvents: Partial<BroadcastEvents>) {
    return this.configurator.privateSocket.onBroadcast<Partial<BroadcastEvents>>(broadcastEvents)
  }

  public onUnicast (unicastEvents: Partial<UnicastEvents>) {
    return this.configurator.privateSocket.onUnicast<Partial<UnicastEvents>>(unicastEvents)
  }

  public connect<
    ExternalPublicState extends object = any,
    ExternalPrivateState extends object = any,
    ExternalBroadcastEvents extends Record<string, CallbackType> = any,
    ExternalUnicastEvents extends Record<string, CallbackType> = any
  > (appName: string) {
    if (!this.configurator.globalBus.existApp(appName)) {
      throw new Error(errors.appIsNotCreated(appName))
    } else if (!this.configurator.relatedApps.includes(appName)) {
      console.warn(warnings.connectUnrelatedApp(this.configurator.name, appName))
    }
    return new Connector<ExternalPublicState, ExternalPrivateState, ExternalBroadcastEvents, ExternalUnicastEvents>(appName)
  }

  public async runInHostMode (callback: (use?: (middleware: MiddlewareFnType) => void, config?: (conf: ConfType) => void) => void | Promise<void>) {
    if (this.isHost) {
      const use = (middleware: MiddlewareFnType) => {
        this.configurator.globalBus.use(middleware)
      }
      const config = (conf: ConfType) => {
        this.configurator.globalBus.config(conf)
      }
      await Promise.resolve(callback(use, config))
    }
  }

  public async runInRemoteMode (callback: () => any) {
    if (!this.isHost) {
      await Promise.resolve(callback())
    }
  }
}
