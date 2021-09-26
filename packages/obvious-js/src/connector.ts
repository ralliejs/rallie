import { Socket, touchBus } from '@obvious-js/core'
import { CallbackType } from '@obvious-js/core/dist/lib/types'
import { State } from './state'
import { constant } from './utils'

export class Connector<
  PublicState extends object,
  PrivateState extends object,
  BroadcastEvents extends Record<string, CallbackType>,
  UnicastEvents extends Record<string, CallbackType>
> {
  constructor (appName: string) {
    const bus = touchBus(constant.privateBus(appName))[0]
    this.socket = bus.createSocket()
    this.privateState = new State<PrivateState>(this.socket, appName, constant.privateStateNamespace)
    this.publicState = new State<PublicState>(this.socket, appName, constant.publicStateNamespace)
    this.broadcaster = this.socket.createBroadcaster()
    this.unicaster = this.socket.createUnicaster()
  }

  private socket: Socket

  public privateState: State<PrivateState>
  public publicState: State<PublicState>
  public broadcaster: BroadcastEvents
  public unicaster: UnicastEvents

  public onBroadcast (broadcastEvents: Partial<BroadcastEvents>) {
    return this.socket.onBroadcast<Partial<BroadcastEvents>>(broadcastEvents)
  }

  public onUnicast (unicastEvents: Partial<UnicastEvents>) {
    return this.socket.onUnicast<Partial<UnicastEvents>>(unicastEvents)
  }
}
