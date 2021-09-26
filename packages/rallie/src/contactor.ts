import { State } from './state'
import { Configurator } from './configurator'
import { CallbackType, MiddlewareFnType, ConfType } from '@rallie/core/dist/lib/types'
import { constant, warnings } from './utils'
import { Connector } from './connector'

export class Contactor<
  PublicState extends object,
  PrivateState extends object,
  BroadcastEvents extends Record<string, CallbackType>,
  UnicastEvents extends Record<string, CallbackType>
> {
  constructor (
    configurator: Configurator<PublicState, PrivateState>
  ) {
    this.configurator = configurator
    this.broadcaster = this.configurator.privateSocket.createBroadcaster()
    this.unicaster = this.configurator.privateSocket.createUnicaster()
    this.publicState = new State<PublicState>(this.configurator.privateSocket, this.configurator.name, constant.publicStateNamespace)
    this.privateState = new State<PrivateState>(this.configurator.privateSocket, this.configurator.name, constant.privateStateNamespace)
  }

  private configurator: Configurator<PublicState, PrivateState>

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
    if (!this.configurator.relatedApps.includes(appName)) {
      console.warn(warnings.connectUnrelatedApp(this.configurator.name, appName))
    }
    return new Connector<ExternalPublicState, ExternalPrivateState, ExternalBroadcastEvents, ExternalUnicastEvents>(appName)
  }

  public runInHostMode (callback: (use: (middleware: MiddlewareFnType) => void, config: (conf: ConfType) => void) => void) {
    this.configurator.runInHostMode(callback)
  }

  public runInRemoteMode (callback: () => any) {
    this.configurator.runInRemoteMode(callback)
  }
}
