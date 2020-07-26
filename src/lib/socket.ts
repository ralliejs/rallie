import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { callbackType } from './types'; // eslint-disable-line
import { getMappedState, Errors } from './utils';

export class Socket {

    private eventEmitter: EventEmitter;
    private _state: Object;

    constructor(eventEmitter: EventEmitter, _state: Object) {
        this.eventEmitter = eventEmitter;
        this._state = _state;
    }

    /**
     * add a broadcast event listener
     * @param eventName 
     * @param callback 
     */
    public onBroadcast(eventName: string, callback: callbackType) {
        this.eventEmitter.addBroadcastEventListener(eventName, callback);
    }

    /**
     * remove a broadcast event listener
     * @param eventName 
     * @param callback 
     */
    public offBroadcast(eventName: string, callback: callbackType) {
        this.eventEmitter.removeBroadcastEventListener(eventName, callback);
    }

    /**
     * emit a broadcast event
     * @param eventName 
     * @param args 
     */
    public emitBroadcast(eventName: string, ...args: any[]) {
        this.eventEmitter.emitBroadcast(eventName, ...args);
    }

    /**
     * add a unicast event listener
     * @param {string} eventName 
     * @param {Function} callback 
     */
    public onUnicast(eventName: string, callback: callbackType) {
        this.eventEmitter.addUnicastEventListener(eventName, callback);
    }

    /**
     * remove a unicast event listener
     * @param eventName 
     * @param callback 
     */
    public offUnicast(eventName: string, callback: callbackType) {
        this.eventEmitter.removeUnicastEventListener(eventName, callback);
    }

    /**
     * emit a unicast event
     * @param eventName 
     * @param args 
     */
    public emitUnicast(eventName: string, ...args: any[]) {
        return this.eventEmitter.emitUnicast(eventName, ...args);
    }

    /**
     * init a state
     * @param stateName
     * @param value
     * @param isPrivate is state can only be modified by the socket which initialized it
     */
    public initState(stateName: string, value: any, isPrivate: boolean = false) {
        if(this._state[stateName] !== undefined) {
            throw(new Error(Errors.duplicatedInitial(stateName)));
        } else if(value === undefined) {
            throw(new Error(Errors.initialStateAsUndefined(stateName)));
        }else {
            this._state[stateName] = {
                value,
                owner: isPrivate ? this : null
            };
            this.onBroadcast(`$state-${stateName}-change`, () => {
                // an empty callback to avoid warning of no listener
            });
            this.emitBroadcast('$state-initial', stateName);
        }
    }

    /**
     * get a state
     * @param {string} stateName 
     */
    public getState(stateName: string) {
        const mappedState = getMappedState(this._state);
        const copiedState = mappedState;
        return copiedState[stateName];
    }

    /**
     * set the value of the state
     * @param stateName 
     * @param arg 
     */
    public setState(stateName: string, arg: any) {
        if(this._state[stateName] === undefined) {
            const msg = Errors.accessUninitializedState(stateName);
            throw new Error(msg);
        }
        const stateOwner = this._state[stateName].owner;
        if( stateOwner !== this && stateOwner !== null ) {
            const msg = Errors.modifyPrivateState(stateName);
            throw new Error(msg);
        }
        const oldValue = this._state[stateName].value;
        const getFunctionArg = typeof arg === 'function';
        const newValue = getFunctionArg ? arg(oldValue) : arg;
        this._state[stateName].value = newValue;
        this.emitBroadcast(`$state-${stateName}-change`, newValue, oldValue);
    }

    /**
     * watch the change of state
     * @param stateName 
     * @param callback 
     */
    public watchState(stateName: string, callback: (newValue: any, oldValue?: any) => void) {
        if(this._state[stateName] === undefined) {
            const msg = Errors.accessUninitializedState(stateName);
            throw new Error(msg);
        }
        this.eventEmitter.addBroadcastEventListener(`$state-${stateName}-change`, callback);
    }

    /**
     * remove the listener of watching the state
     * @param stateName 
     * @param callback 
     */
    public unwatchState(stateName: string, callback: (newValue: any, oldValue: any) => void) {
        if(this._state[stateName] === undefined) {
            throw new Error(Errors.accessUninitializedState(stateName));
        }
        this.eventEmitter.removeBroadcastEventListener(`$state-${stateName}-change`, callback);
    }

    /**
     * waiting for some states to be initialized
     * @param dependencies the states to be waited for
     * @param timeout the time to wait
     */
    public waitState(dependencies: string[], timeout = 10 * 1000) {
        // remove all ready states first
        dependencies = dependencies.filter((stateName: string) => {
            return this._state[stateName] === undefined;
        });

        if (dependencies.length === 0) {
            return Promise.resolve(getMappedState(this._state));
        } else {
            return new Promise((resolve, reject) => {
                const timeId = setTimeout(() => {
                    clearTimeout(timeId);
                    const msg = Errors.waitStateTimeout(dependencies);
                    reject(new Error(msg));
                }, timeout);
                const stateInitialCallback = (stateName: string) => {
                    const index = dependencies.indexOf(stateName);
                    if (index !== -1) {
                        dependencies.splice(index, 1);
                    }
                    if (dependencies.length === 0) {
                        clearTimeout(timeId);
                        this.offBroadcast('$state-initial', stateInitialCallback);
                        resolve(getMappedState(this._state));
                    }
                };
                this.onBroadcast('$state-initial', stateInitialCallback);
            });
        }
    }
}

