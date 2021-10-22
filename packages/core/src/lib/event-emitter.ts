import { CallbackType } from '../types'; // eslint-disable-line
import { Errors, Warnings } from './utils'

type BroadcastEventsType = Record<string, Array<CallbackType>>

type unicastEventsType = Record<string, CallbackType>

export class EventEmitter {
  private broadcastEvents: BroadcastEventsType = {}

  private unicastEvents: unicastEventsType = {}

  public addBroadcastEventListener (event: string, callback: CallbackType) {
    this.broadcastEvents[event] = this.broadcastEvents[event] || []
    this.broadcastEvents[event].push(callback)
  }

  public addUnicastEventListener (event: string, callback: CallbackType) {
    if (this.unicastEvents[event]) {
      throw new Error(Errors.registedExistedUnicast(event))
    }
    this.unicastEvents[event] = callback
  }

  public removeBroadcastEventListener (event: string, callback: CallbackType) {
    const registedcallbacks = this.broadcastEvents[event]
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

  public removeUnicastEventListener (event: string, callback: CallbackType) {
    if (!this.unicastEvents[event]) {
      const msg = Errors.removeNonExistedUnicast(event)
      throw new Error(msg)
    }

    if (this.unicastEvents[event] !== callback) {
      const msg = Errors.wrongUnicastCallback(event)
      throw new Error(msg)
    }
    delete this.unicastEvents[event]
  }

  public emitBroadcast (event: string, ...args: any[]) {
    const registedcallbacks = this.broadcastEvents[event]
    const isInternalStateEvent = event.startsWith('$state')
    if (registedcallbacks && registedcallbacks.length !== 0) {
      registedcallbacks.forEach((callback) => {
        try {
          callback(...args); // eslint-disable-line
        } catch (error) {
          console.error(Errors.broadcastCallbackError(event))
          console.error(error)
        }
      })
    } else if (!isInternalStateEvent) {
      console.warn(Warnings.emptyBroadcastEvents(event))
    }
  }

  public emitUnicast (event: string, ...args: any[]) {
    const callback = this.unicastEvents[event]
    if (callback) {
      return callback(...args); // eslint-disable-line
    } else {
      throw new Error(Errors.emittedNonExistedUnicast(event))
    }
  }
}
