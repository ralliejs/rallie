import type { Socket } from '@rallie/core'
import { constant, errors, enhancedEventsTrigger, enhancedEventsListener } from './utils'

export type BlockType = {
  state?: Record<string, unknown>
  events?: Record<string, (this: { trigger: string }, ...args: any[]) => any>
  methods?: Record<string, (this: { trigger: string }, ...args: any[]) => any>
}

export class BaseBlock<T extends BlockType> {
  public name: string
  public state: T['state']
  public events: T['events']
  public methods: T['methods']

  #socket: Socket

  constructor(name: string, triggerName: string, socket: Socket) {
    this.name = name
    this.#socket = socket
    const broadcaster = this.#socket.createBroadcaster()
    const unicaster = this.#socket.createUnicaster()
    this.events = enhancedEventsTrigger(broadcaster, triggerName) as T['events']
    this.methods = enhancedEventsTrigger(unicaster, triggerName) as T['methods']
    Reflect.defineProperty(this, 'state', {
      get: () => this.#socket.getState<T['state'], T['state']>(constant.stateNamespace(this.name)),
      set: () => {
        throw new Error(errors.stateIsReadonly(this.name))
      },
    })
  }

  public setState(action: string, setter: (state: T['state']) => void | Promise<void>) {
    if (this.#socket.existState(constant.stateNamespace(this.name))) {
      return this.#socket.setState(constant.stateNamespace(this.name), action, setter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public watchState<P = any>(getter: (state: T['state']) => undefined | P) {
    if (this.#socket.existState(constant.stateNamespace(this.name))) {
      return this.#socket.watchState<T['state'], P>(constant.stateNamespace(this.name), getter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public listenEvents(events: Partial<T['events']>) {
    return this.#socket.onBroadcast(enhancedEventsListener(events))
  }
}
