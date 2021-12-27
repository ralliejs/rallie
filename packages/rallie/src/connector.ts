import { touchBus } from '@rallie/core'
import type { CallbackType, Socket } from '@rallie/core'
import { constant, errors } from './utils'

export class Connector<
  State extends object = {},
  Events extends Record<string, CallbackType> = {},
  Methods extends Record<string, CallbackType> = {}
  > {
  constructor (connectedApp: string) {
    this.name = connectedApp
    this.isRallieApp = false
    const [bus] = touchBus(constant.privateBus(connectedApp))
    this.socket = bus.createSocket()
    this.events = this.socket.createBroadcaster()
    this.methods = this.socket.createUnicaster()
    Reflect.defineProperty(this, 'state', {
      get: () => this.socket.getState<State, State>(constant.stateNamespace(this.name)),
      set: () => false
    })
  }

  private socket: Socket

  public name: string
  public state: State
  public events: Events
  public methods: Methods
  public isRallieApp: boolean

  public setState (action: string, setter: (state: State) => void | Promise<void>) {
    if (this.socket.existState(constant.stateNamespace(this.name))) {
      return this.socket.setState(constant.stateNamespace(this.name), action, setter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public watchState<P = any> (getter: (state: State) => undefined | P) {
    if (this.socket.existState(constant.stateNamespace(this.name))) {
      return this.socket.watchState<State, P>(constant.stateNamespace(this.name), getter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public listenEvents (events: Partial<Events>) {
    return this.socket.onBroadcast<Partial<Events>>(events)
  }
}
