import { touchBus } from '@rallie/core'
import type { CallbackType, Socket } from '@rallie/core'
import { constant, errors } from './utils'

export type BlockService = {
  state?: Record<string, any>
  events?: Record<string, CallbackType>
  methods?: Record<string, CallbackType>
  exports?: Record<string, any>
}

export class Block<T extends BlockService> {
  protected socket: Socket
  public name: string
  public state: T['state']
  public events: T['events']
  public methods: T['methods']
  public isCreatedBlock: boolean

  constructor(name: string) {
    this.name = name
    const [bus] = touchBus(constant.privateBus(name))
    this.socket = bus.createSocket()
    this.events = this.socket.createBroadcaster()
    this.methods = this.socket.createUnicaster()
    Reflect.defineProperty(this, 'state', {
      get: () => this.socket.getState<T['state'], T['state']>(constant.stateNamespace(this.name)),
      set: () => {
        throw new Error(errors.stateIsReadonly(this.name))
      },
    })
  }

  public setState(action: string, setter: (state: T['state']) => void | Promise<void>) {
    if (this.socket.existState(constant.stateNamespace(this.name))) {
      return this.socket.setState(constant.stateNamespace(this.name), action, setter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public watchState<P = any>(getter: (state: T['state']) => undefined | P) {
    if (this.socket.existState(constant.stateNamespace(this.name))) {
      return this.socket.watchState<T['state'], P>(constant.stateNamespace(this.name), getter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public listenEvents(events: Partial<T['events']>) {
    return this.socket.onBroadcast<Partial<T['events']>>(events)
  }
}
