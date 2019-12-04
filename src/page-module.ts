import { EventEmitter } from './event-emitter'; // eslint-disable-line
import { callbackType } from './types'; // eslint-disable-line

export class PageModule {

    private eventEmitter: EventEmitter;
    private state: Object;
    public name: string;

    constructor(name: string, eventEmitter: EventEmitter, state: Object) {
        this.eventEmitter = eventEmitter;
        this.name = name;
        this.state = state;
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

    initState(key: string, value: any) {
        if(this.state[key] !== undefined) {
            const msg = `[obvious] state ${key} has been initialized, please use [setState] instead`;
            throw(new Error(msg));
        } else if(value === undefined) {
            const msg = `[obvious] state ${key} can't be initialized to undefined, please initial it to null instead`;
            throw(new Error(msg));
        }else {
            this.state[key] = value;
            this.emit('$state-initial', key);
        }
    }

    getState() {

    }

    setState() {

    }

    watchState() {

    }
}

