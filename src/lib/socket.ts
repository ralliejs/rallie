import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { callbackType } from './types'; // eslint-disable-line
import { getMappedState } from './utils';

export class Socket {

    public name: string;
    private eventEmitter: EventEmitter;
    private _state: Object;

    constructor(name: string, eventEmitter: EventEmitter, _state: Object) {
        this.eventEmitter = eventEmitter;
        this.name = name;
        this._state = _state;
    }

    on(eventName: string, callback: callbackType) {
        this.eventEmitter.addEventListener(eventName, callback);
    }

    off(eventName: string, callback: callbackType) {
        this.eventEmitter.removeEventListener(eventName, callback);
    }

    emit(eventName: string, ...args: any[]) {
        this.eventEmitter.emit(eventName, ...args);
    }

    initState(key: string, value: any, isPrivate: boolean = false) {
        if(this._state[key] !== undefined) {
            const msg = `[obvious] state ${key} has been initialized, please use [setState] instead`;
            throw(new Error(msg));
        } else if(value === undefined) {
            const msg = `[obvious] state ${key} can't be initialized to undefined, please initial it to null instead`;
            throw(new Error(msg));
        }else {
            this._state[key] = {
                value,
                owner: isPrivate ? this : null
            };
            this.on(`$state-${key}-change`, () => {
                // an empty callback to avoid warning of no listener
            });
            this.emit('$state-initial', key);
        }
    }

    getState(stateName: string) {
        const mappedState = getMappedState(this._state);
        const copiedState = mappedState;
        return copiedState[stateName];
    }

    setState(stateName: string, newValue: any) {
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
        this.emit(`$state-${stateName}-change`, newValue, oldValue);
    }

    watchState(stateName: string, callback: (newValue: any, oldValue?: any) => void) {
        if(this._state[stateName] === undefined) {
            const msg = `[obvious] you are trying to watch state ${stateName} before it is initialized, init it first`;
            throw new Error(msg);
        }
        this.eventEmitter.addEventListener(`$state-${stateName}-change`, callback);
    }

    unwatchState(stateName: string, callback: (newValue: any, oldValue: any) => void) {
        if(this._state[stateName] === undefined) {
            const msg = `[obvious] you are trying to unwatch state ${stateName} before it is initialized, init it first`;
            throw new Error(msg);
        }
        this.eventEmitter.removeEventListener(`$state-${stateName}-change`, callback);
    }
}

