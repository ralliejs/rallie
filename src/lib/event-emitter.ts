import { callbackType } from './types'; // eslint-disable-line

type eventsType = {
    [evnetName: string] : Array<callbackType>
}

export class EventEmitter {
    
    private events: eventsType = {
        '$state-initial': [() => {
            // an empty callback to avoid warning of no listener
        }]
    }

    public addEventListener(event: string, callback: callbackType) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    }

    public removeEventListener(event: string, callback: callbackType) {
        const registedcallbacks = this.events[event];
        if (registedcallbacks) {
            let targetIndex = -1;
            for(let i = 0; i < registedcallbacks.length; i++) {
                if (registedcallbacks[i] === callback) {
                    targetIndex = i;
                    break;
                }
            }
            if(targetIndex !== -1) {
                registedcallbacks.splice(targetIndex, 1);
            } else {
                const msg = `[obvious] you are trying to remove a listener of ${event} event, but the listener hasn't been registed`;
                throw new Error(msg);
            }
        } else {
            const msg = `[obvious] you are trying to remove a listener of ${event} event, but ${event} hasn't been registed as a event`;
            throw new Error(msg);
        }
    }

    public emit(event: string, ...args: any[]) {
        const registedcallbacks = this.events[event];
        if(registedcallbacks && registedcallbacks.length !== 0) {
            registedcallbacks.forEach((cb) => {
                cb(...args);
            });
        } else {
            console.warn(`[obvious] you have emitted ${event} event, but there is no listener of this event`);
        }
    }
}
