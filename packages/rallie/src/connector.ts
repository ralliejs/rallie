import { touchBus, CallbackType, Socket } from '@rallie/core'
import { ReadOnlyState, State } from './state'
import { constant } from './utils'

export class Connector<
  BroadcastEvents extends Record<string, CallbackType> = {},
  UnicastEvents extends Record<string, CallbackType> = {},
  PublicState extends object = {},
  PrivateState extends object = {}
> {
  constructor (connectedApp: string, connecter: string) {
    this.name = connectedApp
    const [bus] = touchBus(constant.privateBus(connectedApp))
    this.socket = bus.createSocket()
    this.privateState = new State<PrivateState>(this.socket, connectedApp, constant.privateStateNamespace)
    this.publicState = new State<PublicState>(this.socket, connectedApp, constant.publicStateNamespace)
    this.broadcaster = this.socket.createBroadcaster()
    this.unicaster = this.socket.createUnicaster()
  }

  private socket: Socket

  public name: string
  public privateState: ReadOnlyState<PrivateState>
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
