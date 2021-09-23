import { Socket } from '@obvious-js/core'
import { errors, constant } from './utils'

export class ReadOnlyState<T extends object> {
  protected socket: Socket
  protected namespace: string
  protected appName: string

  constructor (socket: Socket, appName: string, namespace: string) {
    this.socket = socket
    this.namespace = namespace
    this.appName = appName
  }

  public get<P = any> (getter?: (state: T) => P) {
    return this.socket.getState<T, P>(this.namespace, getter)
  }

  public watch (getter: (state: T, isWatchingEffect?: boolean) => void) {
    if (this.socket.existState(this.namespace)) {
      return this.socket.watchState<T>(this.namespace, getter)
    } else {
      throw new Error(errors.stateNotInitialized(this.appName, this.namespace === constant.privateStateNamespace))
    }
  }
}

export class State<T extends object> extends ReadOnlyState<T> {
  public set (setter: (state: T) => void) {
    if (this.socket.existState(this.namespace)) {
      return this.socket.setState<T>(this.namespace, setter)
    } else {
      throw new Error(errors.stateNotInitialized(this.appName, this.namespace === constant.privateStateNamespace))
    }
  }
}
