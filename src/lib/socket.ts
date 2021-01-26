import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { CallbackType } from './types'; // eslint-disable-line
import { get, set, getMappedState, getResolvedStates,Errors, getStateNameLink } from './utils';

export class Socket {

    constructor(private eventEmitter: EventEmitter, private _state: Object) {
        this.eventEmitter = eventEmitter;
        this._state = _state;
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
     * @param stateName
     */
    public existState(stateName: string) {
        const stateNameLink = getStateNameLink(stateName)
        const rootStateName = stateNameLink[0] as string
        return this._state[rootStateName] !== undefined;
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
            this.broadcast('$state-initial', stateName);
        }
    }

    /**
     * get a state
     * @param {string} stateName
     */
    public getState(stateName: string) {
        const mappedState = getMappedState(this._state);
        return get(mappedState, getStateNameLink(stateName));
    }

    /**
     * set the value of the state
     * @param stateName
     * @param arg
     */
    public setState(stateName: string, arg: any) {
        const stateNameLink = getStateNameLink(stateName)
        const rootStateName = stateNameLink[0] as string;
        if(this._state[rootStateName] === undefined) {
            const msg = Errors.accessUninitializedState(rootStateName);
            throw new Error(msg);
        }
        const stateOwner = this._state[rootStateName].owner;
        if( stateOwner !== this && stateOwner !== null ) {
            const msg = Errors.modifyPrivateState(rootStateName);
            throw new Error(msg);
        }

        const oldState = getMappedState(this._state);
        const isFunctionArg = typeof arg === 'function';
        const oldValue = this.getState(stateName);
        const newValue = isFunctionArg ? arg(oldValue) : arg;
        if (stateNameLink.length === 1) {
            this._state[rootStateName].value = newValue;
        } else {
            const subStateNameLink = stateNameLink.slice(1);
            const isSuccess = set(rootStateName, this._state[rootStateName].value, subStateNameLink, newValue);
            if (!isSuccess) {
                return;
            }
        }
        const newState = getMappedState(this._state);

        const events = Object.keys(this.eventEmitter.getBroadcastEvents());
        const resolvedStates = getResolvedStates(stateName, events);
        resolvedStates.forEach((name) => {
            const notifiedStateNameLink = getStateNameLink(name)
            this.broadcast(`$state-${name}-change`, get(newState, notifiedStateNameLink), get(oldState, notifiedStateNameLink));
        });
    }

    /**
     * watch the change of state
     * @param stateName
     * @param callback
     */
    public watchState(stateName: string, callback: (newValue: any, oldValue?: any) => void) {
        const stateNameLink = getStateNameLink(stateName);
        const rootStateName = stateNameLink[0] as string;
        if(this._state[rootStateName] === undefined) {
            const msg = Errors.accessUninitializedState(rootStateName);
            throw new Error(msg);
        }
        this.eventEmitter.addBroadcastEventListener(`$state-${stateName}-change`, callback);
    }

    /**
     * remove the listener of state watcher
     * @param stateName
     * @param callback
     */
    public unwatchState(stateName: string, callback: (newValue: any, oldValue: any) => void) {
        if (!this.existState(stateName)) {
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
        dependencies = dependencies.map((stateName: string) => { // get root state array
            const stateNameLink = getStateNameLink(stateName)
            const rootStateName = stateNameLink[0] as string
            return rootStateName
        }).filter((rootStateName: string) => { // remove all ready states first
            return this._state[rootStateName] === undefined;
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
                const stateInitialCallback = (rootStateName: string) => {
                    const index = dependencies.indexOf(rootStateName);
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

