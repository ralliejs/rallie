import { Errors } from './utils'

type BroadcastEventsType = Record<string, Set<Function>>

type unicastEventsType = Record<string, Function>

export class EventEmitter {
  #broadcastEvents: BroadcastEventsType = {}

  #unicastEvents: unicastEventsType = {}

  public addBroadcastEventListener(event: string, callback: Function) {
    this.#broadcastEvents[event] = this.#broadcastEvents[event] || new Set()
    const listeners = this.#broadcastEvents[event]
    listeners.add(callback)
  }

  public addUnicastEventListener(event: string, callback: Function) {
    if (this.#unicastEvents[event]) {
      throw new Error(Errors.registedExistedUnicast(event))
    }
    this.#unicastEvents[event] = callback
  }

  public removeBroadcastEventListener(event: string, callback: Function) {
    const registedcallbacks = this.#broadcastEvents[event]
    if (registedcallbacks) {
      if (registedcallbacks.has(callback)) {
        registedcallbacks.delete(callback)
      } else {
        const msg = Errors.wrongBroadcastCallback(event)
        throw new Error(msg)
      }
    } else {
      const msg = Errors.removeNonExistedBroadcast(event)
      throw new Error(msg)
    }
  }

  public removeUnicastEventListener(event: string) {
    if (!this.#unicastEvents[event]) {
      const msg = Errors.removeNonExistedUnicast(event)
      throw new Error(msg)
    }
    delete this.#unicastEvents[event]
  }

  public emitBroadcast(event: string, ...args: any[]) {
    this.#broadcastEvents[event] = this.#broadcastEvents[event] || new Set()
    const listeners = this.#broadcastEvents[event]
    listeners.forEach((callback) => {
      try {
        // eslint-disable-next-line n/no-callback-literal
        callback(...args)
      } catch (error) {
        console.error(Errors.broadcastCallbackError(event))
        console.error(error)
      }
    })
  }

  public emitUnicast(event: string, ...args: any[]) {
    const callback = this.#unicastEvents[event]
    if (callback) {
      // eslint-disable-next-line n/no-callback-literal
      return callback(...args)
    } else {
      throw new Error(Errors.emittedNonExistedUnicast(event))
    }
  }
}
