import { effect, reactive, readonly } from '@vue/reactivity';
import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { CallbackType, StoresType } from './types'; // eslint-disable-line
import { Errors, isPrimitive } from './utils';
import { Watcher } from './watcher';

const STATE_INITIALIZED = '$state-initialized';
export class Socket {

  constructor(private eventEmitter: EventEmitter, private stores: StoresType) {
    this.eventEmitter = eventEmitter;
    this.stores = stores;
  }

  /**
   * add broadcast event listeners
   * @param events
   */
  public onBroadcast<T extends Record<string, CallbackType>>(events: T) {
    Object.entries(events).forEach(([eventName, handler]) => {
      this.eventEmitter.addBroadcastEventListener(eventName, handler);
    });
    return () => {
      Object.entries(events).forEach(([eventName, handler]) => {
        this.eventEmitter.removeBroadcastEventListener(eventName, handler);
      });
    };
  }

  /**
   * add unicast event listeners
   * @param events
   */
  public onUnicast<T extends Record<string, CallbackType>>(events: T) {
    Object.entries(events).forEach(([eventName, handler]) => {
      try {
        this.eventEmitter.addUnicastEventListener(eventName, handler);
      } catch (err) {
        console.error(err);
      }
    });
    return () => {
      Object.entries(events).forEach(([eventName, handler]) => {
        this.eventEmitter.removeUnicastEventListener(eventName, handler);
      });
    };
  }

  /**
   * create a proxy to emit a broadcast event
   * @param logger
   */
  public createBroadcaster<T extends Record<string, CallbackType>>(logger?: (eventName: string) => void) {
    return new Proxy<T>(({} as any), {
      get: (target, eventName) => {
        logger?.(eventName as string);
        return (...args: any[]) => this.eventEmitter.emitBroadcast(eventName as string, ...args);
      },
      set: () => {
        return false;
      }
    });
  }

  /**
   * create a proxy to emit unicast event
   * @param logger
   */
  public createUnicaster<T extends Record<string, CallbackType>>(logger?: (eventName: string) => void) {
    return new Proxy<T>(({} as any), {
      get: (target, eventName) => {
        logger?.(eventName as string);
        return (...args: any[]) => this.eventEmitter.emitUnicast(eventName as string, ...args);
      },
      set: () => {
        return false;
      }
    });
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
        throw new Error(Errors.initializePrimitiveState(namespace));
      }
      this.stores[namespace] = {
        state: reactive(initialState),
        owner: isPrivate ? this : null,
        watchers: []
      };
      this.eventEmitter.emitBroadcast(STATE_INITIALIZED, namespace);
    }
    return this.getState(namespace);
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
  public setState<T = any>(namespace: string, setter: (state: T) => void) {
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
  public watchState<T>(namespace: string, getter: (state: T) => any) {
    if(this.existState(namespace)) {
      const msg = Errors.accessUninitializedState(namespace);
      throw new Error(msg);
    }
    const state: T = readonly(this.stores[namespace].state);
    const watcher = new Watcher(namespace, this.stores);
    const runner = effect(() => {
      getter(state);
      watcher.handler?.(state);
    });
    watcher.stopEffect = () => runner.effect.stop();
    return watcher;
  }

  /**
   * waiting for some states to be initialized
   * @param dependencies the dependencies to be waited for
   * @param timeout the time to wait
   */
  public waitState(dependencies: string[], timeout = 10 * 1000): Promise<any[]> {
    dependencies = dependencies.filter((namespace: string) => { // remove all ready states first
      return !this.existState(namespace);
    });

    if (dependencies.length === 0) {
      const states = dependencies.map((namespace: string) => this.getState(namespace));
      return Promise.resolve(states);
    } else {
      return new Promise<any[]>((resolve, reject) => {
        const timeId = setTimeout(() => {
          clearTimeout(timeId);
          const msg = Errors.waitStateTimeout(dependencies);
          reject(new Error(msg));
        }, timeout);
        const stateInitialCallback = (namespace: string) => {
          const index = dependencies.indexOf(namespace);
          if (index !== -1) {
            dependencies.splice(index, 1);
          }
          if (dependencies.length === 0) {
            clearTimeout(timeId);
            this.eventEmitter.removeBroadcastEventListener(STATE_INITIALIZED, stateInitialCallback);
            const states = dependencies.map((namespace: string) => this.getState(namespace));
            resolve(states);
          }
        };
        this.eventEmitter.addBroadcastEventListener(STATE_INITIALIZED, stateInitialCallback);
      });
    }
  }
}

