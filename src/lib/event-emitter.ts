import { callbackType } from './types'; // eslint-disable-line
import { Errors, Warnings} from './utils';

type broadcastEventsType = {
    [eventName: string] : Array<callbackType>
}

type unicastEventsType = {
    [eventName: string] : callbackType
}

export class EventEmitter {
    
    private broadcastEvents: broadcastEventsType = {
        '$state-initial': [() => {
            // an empty callback to avoid warning of no listener
        }]
    }

    private uniCastEvents: unicastEventsType = {}

    public addBroadcastEventListener(event: string, callback: callbackType) {
        this.broadcastEvents[event] = this.broadcastEvents[event] || [];
        this.broadcastEvents[event].push(callback);
    }

    public addUnicastEventListener(event: string, callback: callbackType) {
        if (this.uniCastEvents[event]) {
            throw new Error(Errors.registedExistedUnicast(event));
        }
        this.uniCastEvents[event] = callback;
    }

    public removeBroadcastEventListener(event: string, callback: callbackType) {
        const registedcallbacks = this.broadcastEvents[event];
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
                const msg = Errors.wrongBroadcastCallback(event);
                throw new Error(msg);
            }
        } else {
            const msg = Errors.removeNonExistedBroadcast(event);
            throw new Error(msg);
        }
    }

    public removeUnicastEventListener(event: string, callback: callbackType) {
        if (!this.uniCastEvents[event]) {
            const msg = Errors.removeNonExistedUnicast(event);
            throw new Error(msg);
        }

        if (this.uniCastEvents[event] !== callback) {
            const msg = Errors.wrongUnicastCallback(event);
            throw new Error(msg);
        }
        delete this.uniCastEvents[event];
    }

    public emitBroadcast(event: string, ...args: any[]) {
        const registedcallbacks = this.broadcastEvents[event];
        if (registedcallbacks && registedcallbacks.length !== 0) {
            registedcallbacks.forEach((callback) => {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(Errors.broadcastCallbackError);
                    console.error(error);
                }
            });
        } else {
            console.warn(Warnings.emptyBroadcastEvents(event));
        }
    }

    public emitUnicast(event: string, ...args: any[]) {
        const callback = this.uniCastEvents[event];
        return callback(...args);
    }
}
