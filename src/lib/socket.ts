import { effect, reactive, readonly } from '@vue/reactivity';
import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { CallbackType, StoresType } from './types'; // eslint-disable-line
import { Errors, isPrimitive } from './utils';
import { Watcher } from './watcher';
export class Socket {

  constructor(private eventEmitter: EventEmitter, private stores: StoresType) {
    this.eventEmitter = eventEmitter;
    this.stores = stores;
  }

  /**
   * add a broadcast event listener
   * @param eventName
   * @param callback
   */
  public onBroadcast(eventName: string, callback: CallbackType) {
    this.eventEmitter.addBroadcastEventListener(eventName, callback);
  }

  /**
   * remove a broadcast event listener
   * @param eventName
   * @param callback
   */
  public offBroadcast(eventName: string, callback: CallbackType) {
    this.eventEmitter.removeBroadcastEventListener(eventName, callback);
  }

  /**
   * emit a broadcast event
   * @param eventName
   * @param args
   */
  public broadcast(eventName: string, ...args: any[]) {
    this.eventEmitter.emitBroadcast(eventName, ...args);
  }

  /**
   * add a unicast event listener
   * @param {string} eventName
   * @param {Function} callback
   */
  public onUnicast(eventName: string, callback: CallbackType) {
    this.eventEmitter.addUnicastEventListener(eventName, callback);
  }

  /**
   * remove a unicast event listener
   * @param eventName
   * @param callback
   */
  public offUnicast(eventName: string, callback: CallbackType) {
    this.eventEmitter.removeUnicastEventListener(eventName, callback);
  }

  /**
   * emit a unicast event
   * @param eventName
   * @param args
   */
  public unicast(eventName: string, ...args: any[]) {
    return this.eventEmitter.emitUnicast(eventName, ...args);
  }

  /**
   * judge if state has been initialized
   * @param namespace
   */
  public existState(namespace: string) {
    return !!this.stores[namespace];
  }

  /**
   * init a state
   * @param namespace
   * @param value
   * @param isPrivate is state can only be modified by the socket which initialized it
   */
  public initState<T extends object>(namespace: string, initialState: T, isPrivate: boolean = false) {
    if(this.existState(namespace)) {
      throw(new Error(Errors.duplicatedInitial(namespace)));
    } else {
      if (isPrimitive(initialState)) {
        throw new Error();
      }
      this.stores[namespace] = {
        state: reactive(initialState),
        owner: isPrivate ? this : null,
        watchers: []
      };
      this.broadcast('$state-initial', namespace);
    }
  }

  /**
   * get a state
   * @param {string} namespace
   */
  public getState<T = any, P = T>(namespace: string, getter?: (state: T) => P) {
    if (this.existState(namespace)) {
      const state = readonly(this.stores[namespace].state);
      return getter ? getter(state) : state;
    } else {
      return null;
    }
  }

  /**
   * set the value of the state
   * @param namespace
   * @param arg
   */
  public setState<T>(namespace: string, setter: (state: T) => void) {
    if(!this.existState(namespace)) {
      const msg = Errors.accessUninitializedState(namespace);
      throw new Error(msg);
    }
    const stateOwner = this.stores[namespace].owner;
    if( stateOwner !== this && stateOwner !== null ) {
      const msg = Errors.modifyPrivateState(namespace);
      throw new Error(msg);
    }
    const state: T = this.stores[namespace].state;
    setter(state);
  }

  /**
   * watch the change of state
   * @param namespace
   * @param getter
   */
  public watchState<T>(namespace: string, getter?: (state: T) => any) {
    if(this.existState(namespace)) {
      const msg = Errors.accessUninitializedState(namespace);
      throw new Error(msg);
    }
    const state: T = readonly(this.stores[namespace].state);
    const watcher = new Watcher(namespace, this.stores);
    const runner = effect(() => {
      getter?.(state);
      watcher.handler?.(state);
    });
    watcher.stopEffect = () => runner.effect.stop();
    return watcher;
  }

  /**
   * waiting for some states to be initialized
   * @param namespaces the namespaces to be waited for
   * @param timeout the time to wait
   */
  public waitState(namespaces: string[], timeout = 10 * 1000) {
    namespaces = namespaces.filter((namespace: string) => { // remove all ready states first
      return !this.existState(namespace);
    });

    if (namespaces.length === 0) {
      return Promise.resolve();
    } else {
      return new Promise<void>((resolve, reject) => {
        const timeId = setTimeout(() => {
          clearTimeout(timeId);
          const msg = Errors.waitStateTimeout(namespaces);
          reject(new Error(msg));
        }, timeout);
        const stateInitialCallback = (rootStateName: string) => {
          const index = namespaces.indexOf(rootStateName);
          if (index !== -1) {
            namespaces.splice(index, 1);
          }
          if (namespaces.length === 0) {
            clearTimeout(timeId);
            this.offBroadcast('$state-initial', stateInitialCallback);
            resolve();
          }
        };
        this.onBroadcast('$state-initial', stateInitialCallback);
      });
    }
  }
}

