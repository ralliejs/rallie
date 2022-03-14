import type { CallbackType } from '../types' // eslint-disable-line
import { Errors } from './utils'

type BroadcastEventsType = Record<
  string,
  {
    listeners: CallbackType[]
    emitedArgs: Array<any[]>
  }
>

type unicastEventsType = Record<string, CallbackType>

export class EventEmitter {
  private broadcastEvents: BroadcastEventsType = {}

  private unicastEvents: unicastEventsType = {}

  public addBroadcastEventListener(event: string, callback: CallbackType) {
    this.broadcastEvents[event] = this.broadcastEvents[event] || {
      listeners: [],
      emitedArgs: [],
    }
    const { listeners, emitedArgs } = this.broadcastEvents[event]
    listeners.push(callback)
    if (emitedArgs.length > 0) {
      emitedArgs.forEach((args) => {
        this.emitBroadcast(event, ...args)
      })
      this.broadcastEvents[event].emitedArgs = []
    }
  }

  public addUnicastEventListener(event: string, callback: CallbackType) {
    if (this.unicastEvents[event]) {
      throw new Error(Errors.registedExistedUnicast(event))
    }
    this.unicastEvents[event] = callback
  }

  public removeBroadcastEventListener(event: string, callback: CallbackType) {
    const registedcallbacks = this.broadcastEvents[event]?.listeners
    if (registedcallbacks) {
      let targetIndex = -1
      for (let i = 0; i < registedcallbacks.length; i++) {
        if (registedcallbacks[i] === callback) {
          targetIndex = i
          break
        }
      }
      if (targetIndex !== -1) {
        registedcallbacks.splice(targetIndex, 1)
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
      listeners: [],
      emitedArgs: [],
    }
    const { listeners, emitedArgs } = this.broadcastEvents[event]
    if (listeners.length > 0) {
      listeners.forEach((callback) => {
        try {
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
      return callback(...args)
    } else {
      throw new Error(Errors.emittedNonExistedUnicast(event))
    }
  }
}
