import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { callbackType } from './types'; // eslint-disable-line
import { getMappedState } from './utils';

export class Socket {

    private eventEmitter: EventEmitter;
    private _state: Object;

    constructor(eventEmitter: EventEmitter, _state: Object) {
        this.eventEmitter = eventEmitter;
        this._state = _state;
    }

    /**
     * add a broadcast event listener
     * @param {string} eventName 
     * @param {Function} callback 
     */
    public onBroadcast(eventName: string, callback: callbackType) {
        this.eventEmitter.addBroadcastEventListener(eventName, callback);
    }

    /**
     * remove a broadcast event listener
     * @param {string} eventName 
     * @param {Function} callback 
     */
    public offBroadcast(eventName: string, callback: callbackType) {
        this.eventEmitter.removeBroadcastEventListener(eventName, callback);
    }

    /**
     * emit a broadcast event
     * @param {string} eventName 
     * @param {...rest} args 
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
     * @param {string} eventName 
     * @param {Function} callback 
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
        this.eventEmitter.emitUnicast(eventName, ...args);
    }

    /**
     * init a state
     * @param {string} key state's name 
     * @param {any} value state's value 
     * @param {any} isPrivate is state can only be modified by the socket which initialized it
     */
    public initState(key: string, value: any, isPrivate: boolean = false) {
        if(this._state[key] !== undefined) {
            const msg = `[obvious] state ${key} has been initialized, please use "setState" instead`;
            throw(new Error(msg));
        } else if(value === undefined) {
            const msg = `[obvious] state ${key} can't be initialized to undefined, please initial it to null instead`;
            throw(new Error(msg));
        }else {
            this._state[key] = {
                value,
                owner: isPrivate ? this : null
            };
            this.onBroadcast(`$state-${key}-change`, () => {
                // an empty callback to avoid warning of no listener
            });
            this.emitBroadcast('$state-initial', key);
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
     * @param {string} stateName 
     * @param {any} newValue 
     */
    public setState(stateName: string, newValue: any) {
        if(this._state[stateName] === undefined) {
            const msg = `[obvious] you are trying to set state ${stateName} before it is initialized, init it first`;
            throw new Error(msg);
        }
        const stateOwner = this._state[stateName].owner;
        if( stateOwner !== this && stateOwner !== null ) {
            const msg = `[obvious] state ${stateName} is private, you are not allowed to modify it`;
            throw new Error(msg);
        }
        const oldValue = this._state[stateName].value;
        this._state[stateName].value = newValue;
        this.emitBroadcast(`$state-${stateName}-change`, newValue, oldValue);
    }

    /**
     * watch the change of state
     * @param {string} stateName 
     * @param {Function} callback 
     */
    public watchState(stateName: string, callback: (newValue: any, oldValue?: any) => void) {
        if(this._state[stateName] === undefined) {
            const msg = `[obvious] you are trying to watch state ${stateName} before it is initialized, init it first`;
            throw new Error(msg);
        }
        this.eventEmitter.addBroadcastEventListener(`$state-${stateName}-change`, callback);
    }

    /**
     * remove the listener of watching the state
     * @param {string} stateName 
     * @param {Function} callback 
     */
    public unwatchState(stateName: string, callback: (newValue: any, oldValue: any) => void) {
        if(this._state[stateName] === undefined) {
            const msg = `[obvious] you are trying to unwatch state ${stateName} before it is initialized, init it first`;
            throw new Error(msg);
        }
        this.eventEmitter.removeBroadcastEventListener(`$state-${stateName}-change`, callback);
    }

    /**
     * waiting for some states to be initialized
     * @param {string[]} dependencies the states to be waited for
     * @param {number} timeout the time to wait
     */
    public waitState(dependencies: string[], timeout = 10 * 1000) {
        // remove all ready states first
        dependencies = dependencies.filter((stateName: string) => {
            return this._state[stateName] === undefined;
        });

        if (dependencies.length === 0) {
            return Promise.resolve();
        } else {
            return new Promise((resolve, reject) => {
                const timeId = setTimeout(() => {
                    clearTimeout(timeId);
                    const msg = `[obvious] wait for states ${JSON.stringify(dependencies)} timeout`;
                    reject(new Error(msg));
                }, timeout);
                const stateInitialCallback = (stateName: string) => {
                    const index = dependencies.indexOf(stateName);
                    if( index !== -1) {
                        dependencies.splice(index, 1);
                    }
                    if(dependencies.length === 0) {
                        clearTimeout(timeId);
                        this.offBroadcast('$state-initial', stateInitialCallback);
                        resolve();
                    }
                };
                this.onBroadcast('$state-initial', stateInitialCallback);
            });
        }
    }

    /**
     * @deprecated
     */
    public on = this.onBroadcast;

    /**
     * @deprecated
     */
    public off = this.offBroadcast;

    /**
     * @deprecated
     */
    public emit = this.emitBroadcast

}

