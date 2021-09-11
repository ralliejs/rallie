import { effect, reactive, readonly } from '@vue/reactivity';
import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { CallbackType, StoresType } from './types'; // eslint-disable-line
import { Errors, isPrimitive, Warnings } from './utils';
import { Watcher } from './watcher';

const STATE_INITIALIZED = '$state-initialized';
export class Socket {

  constructor(private eventEmitter: EventEmitter, private stores: StoresType) {
    this.eventEmitter = eventEmitter;
    this.stores = stores;
  }

  private offEvents(events: Record<string, CallbackType>, isUnicast: boolean, eventName?: string) {
    let cancelListening = isUnicast ? this.eventEmitter.removeUnicastEventListener : this.eventEmitter.removeBroadcastEventListener;
    cancelListening = cancelListening.bind(this.eventEmitter);
    if (eventName) {
      if (events[eventName]) {
        cancelListening(eventName, events[eventName]);
        delete events[eventName];
      } else {
        console.warn(Warnings.handlerIsNotInTheEventsPool(eventName, isUnicast));
      }
    } else {
      Object.entries(events).forEach(([eventName, handler]) => {
        cancelListening(eventName, handler);
      });
    }
  }

  /**
   * add broadcast event listeners
   * @param events
   */
  public onBroadcast<T extends Record<string, CallbackType>>(events: T) {
    Object.entries(events).forEach(([eventName, handler]) => {
      this.eventEmitter.addBroadcastEventListener(eventName, handler);
    });
    return (eventName?: string) => {
      this.offEvents(events, false, eventName);
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
    return (eventName?: string) => {
      this.offEvents(events, true, eventName);
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
  public initState<T extends object = any>(namespace: string, initialState: T, isPrivate: boolean = false) {
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

  private getStateToSet(namespace: string) {
    if(!this.existState(namespace)) {
      const msg = Errors.accessUninitializedState(namespace);
      throw new Error(msg);
    }
    const stateOwner = this.stores[namespace].owner;
    if( stateOwner !== this && stateOwner !== null ) {
      const msg = Errors.modifyPrivateState(namespace);
      throw new Error(msg);
    }
    return this.stores[namespace].state;
  }

  /**
   * set the value of the state
   * @param namespace
   * @param arg
   */
  public setState<T = any>(namespace: string, setter: (state: T) => void) {
    const state: T = this.getStateToSet(namespace);
    setter(state);
  }

  /**
   * watch the change of state
   * @param namespace
   * @param getter
   */
  public watchState<T = any, P = any>(namespace: string, getter: (state: T, isWatchingEffect?: boolean) => P) {
    if(!this.existState(namespace)) {
      const msg = Errors.accessUninitializedState(namespace);
      throw new Error(msg);
    }
    const state: T = readonly(this.stores[namespace].state);
    const watcher = new Watcher(namespace, this.stores);
    watcher.oldWatchingStates = getter(JSON.parse(JSON.stringify(state)), false);
    const runner = effect(() => {
      const watchingStates = getter(state, true);
      const clonedWatchingStates = isPrimitive(watchingStates) ? watchingStates : JSON.parse(JSON.stringify(watchingStates));
      try {
        watcher.handler?.(watchingStates, watcher.oldWatchingStates);
      } finally {
        watcher.oldWatchingStates = clonedWatchingStates;
      }
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
    const allDependencies = [...dependencies];
    const unreadyDependencies =  dependencies.filter((namespace: string) => { // remove all ready states first
      return !this.existState(namespace);
    });

    if (unreadyDependencies.length === 0) {
      const states = allDependencies.map((namespace: string) => this.getState(namespace));
      return Promise.resolve(states);
    } else {
      return new Promise<any[]>((resolve, reject) => {
        const timeId = setTimeout(() => {
          clearTimeout(timeId);
          const msg = Errors.waitStateTimeout(unreadyDependencies);
          reject(new Error(msg));
        }, timeout);
        const stateInitialCallback = (namespace: string) => {
          const index = unreadyDependencies.indexOf(namespace);
          if (index !== -1) {
            unreadyDependencies.splice(index, 1);
          }
          if (unreadyDependencies.length === 0) {
            clearTimeout(timeId);
            this.eventEmitter.removeBroadcastEventListener(STATE_INITIALIZED, stateInitialCallback);
            const states = allDependencies.map((namespace: string) => this.getState(namespace));
            resolve(states);
          }
        };
        this.eventEmitter.addBroadcastEventListener(STATE_INITIALIZED, stateInitialCallback);
      });
    }
  }
}

