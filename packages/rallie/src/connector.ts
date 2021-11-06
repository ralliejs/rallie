import { touchBus, CallbackType, Socket } from '@rallie/core'
import { ReadOnlyState, State } from './state'
import { constant } from './utils'

export class Connector<
  PublicState extends object = {},
  PrivateState extends object = {},
  Events extends Record<string, CallbackType> = {},
  Methods extends Record<string, CallbackType> = {}
  > {
  constructor (connectedApp: string) {
    this.name = connectedApp
    this.isRallieApp = false
    const [bus] = touchBus(constant.privateBus(connectedApp))
    this.socket = bus.createSocket()
    this.privateState = new State<PrivateState>(this.socket, connectedApp, constant.privateStateNamespace(this.name))
    this.publicState = new State<PublicState>(this.socket, connectedApp, constant.publicStateNamespace(this.name))
    this.events = this.socket.createBroadcaster()
    this.methods = this.socket.createUnicaster()
  }

  private socket: Socket

  public name: string
  public privateState: ReadOnlyState<PrivateState>
  public publicState: State<PublicState>
  public events: Events
  public methods: Methods
  public isRallieApp: boolean

  public listenEvents (events: Partial<Events>) {
    return this.socket.onBroadcast<Partial<Events>>(events)
  }
}
