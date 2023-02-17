import { Errors } from './utils'

type BroadcastEventsType = Record<
  string,
  {
    listeners: Set<Function>
    emitedArgs: Array<any[]>
  }
>

type unicastEventsType = Record<string, Function>

export class EventEmitter {
  private broadcastEvents: BroadcastEventsType = {}

  private unicastEvents: unicastEventsType = {}

  public addBroadcastEventListener(event: string, callback: Function) {
    this.broadcastEvents[event] = this.broadcastEvents[event] || {
      listeners: new Set(),
      emitedArgs: [],
    }
    const { listeners, emitedArgs } = this.broadcastEvents[event]
    listeners.add(callback)
    if (emitedArgs.length > 0) {
      emitedArgs.forEach((args) => {
        this.emitBroadcast(event, ...args)
      })
      this.broadcastEvents[event].emitedArgs = []
    }
  }

  public addUnicastEventListener(event: string, callback: Function) {
    if (this.unicastEvents[event]) {
      throw new Error(Errors.registedExistedUnicast(event))
    }
    this.unicastEvents[event] = callback
  }

  public removeBroadcastEventListener(event: string, callback: Function) {
    const registedcallbacks = this.broadcastEvents[event]?.listeners
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
    if (!this.unicastEvents[event]) {
      const msg = Errors.removeNonExistedUnicast(event)
      throw new Error(msg)
    }
    delete this.unicastEvents[event]
  }

  public emitBroadcast(event: string, ...args: any[]) {
    this.broadcastEvents[event] = this.broadcastEvents[event] || {
      listeners: new Set(),
      emitedArgs: [],
    }
    const { listeners, emitedArgs } = this.broadcastEvents[event]
    if (listeners.size > 0) {
      listeners.forEach((callback) => {
        try {
          // eslint-disable-next-line n/no-callback-literal
          callback(...args)
        } catch (error) {
          console.error(Errors.broadcastCallbackError(event))
          console.error(error)
        }
      })
    } else {
      emitedArgs.push(args)
    }
  }

  public emitUnicast(event: string, ...args: any[]) {
    const callback = this.unicastEvents[event]
    if (callback) {
      // eslint-disable-next-line n/no-callback-literal
      return callback(...args)
    } else {
      throw new Error(Errors.emittedNonExistedUnicast(event))
    }
  }
}
