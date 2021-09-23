import { State } from './state'
import { Configurator } from './configurator'
import { CallbackType, MiddlewareFnType, ConfType } from '@obvious-js/core/dist/lib/types'
import { constant, warnings } from './utils'
import { Connector } from './connector'

export class Contactor<
  PublicState extends object,
  PrivateState extends object,
  BroadcastEvents extends Record<string, CallbackType>,
  UnicastEvents extends Record<string, CallbackType>
> {
  constructor (
    configurator: Configurator<PublicState, PrivateState>,
    runInHostMode: (callback: (use: (middleware: MiddlewareFnType) => void, config: (conf: ConfType) => void) => void) => void,
    runInRemoteMode: (callback: () => any) => void
  ) {
    this.configurator = configurator
    this.broadcaster = this.configurator.privateSocket.createBroadcaster()
    this.unicaster = this.configurator.privateSocket.createUnicaster()
    this.publicState = new State<PublicState>(this.configurator.privateSocket, this.configurator.name, constant.publicStateNamespace)
    this.privateState = new State<PublicState>(this.configurator.privateSocket, this.configurator.name, constant.privateStateNamespace)
    this.runInHostMode = (callback) => {
      runInHostMode(callback)
      return this
    }
    this.runInRemoteMode = (callback) => {
      runInRemoteMode(callback)
      return this
    }
  }

  private configurator: Configurator<PublicState, PrivateState>

  public broadcaster: BroadcastEvents
  public unicaster: UnicastEvents
  public publicState: State<PublicState>
  public privateState: State<PublicState>

  public onBroadcast (broadcastEvents: Partial<BroadcastEvents>) {
    return this.configurator.privateSocket.onBroadcast(broadcastEvents)
  }

  public onUnicast (unicastEvents: Partial<UnicastEvents>) {
    return this.configurator.privateSocket.onUnicast(unicastEvents)
  }

  public connect<
    ExternalPublicState extends object,
    ExternalPrivateState extends object,
    ExternalBroadcastEvents extends Record<string, CallbackType>,
    ExternalUnicastEvents extends Record<string, CallbackType>
  > (appName: string) {
    if (!this.configurator.relatedApps.includes(appName)) {
      console.warn(warnings.connectUnrelatedApp(this.configurator.name, appName))
    }
    return new Connector<ExternalPublicState, ExternalPrivateState, ExternalBroadcastEvents, ExternalUnicastEvents>(appName)
  }

  public runInHostMode: (callback: (use: (middleware: MiddlewareFnType) => void, config: (conf: ConfType) => void) => void) => this
  public runInRemoteMode: (callback: () => any) => this
}
