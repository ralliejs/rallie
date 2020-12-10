import { CallbackType } from './types'; // eslint-disable-line
import { Errors, Warnings} from './utils';

type BroadcastEventsType = Record<string, Array<CallbackType>>

type UnicastEventsType = Record<string, CallbackType>

export class EventEmitter {

    private broadcastEvents: BroadcastEventsType = {}

    private uniCastEvents: UnicastEventsType = {}

    public getBroadcastEvents() {
        return this.broadcastEvents;
    }

    public addBroadcastEventListener(event: string, callback: CallbackType) {
        this.broadcastEvents[event] = this.broadcastEvents[event] || [];
        this.broadcastEvents[event].push(callback);
    }

    public addUnicastEventListener(event: string, callback: CallbackType) {
        if (this.uniCastEvents[event]) {
            throw new Error(Errors.registedExistedUnicast(event));
        }
        this.uniCastEvents[event] = callback;
    }

    public removeBroadcastEventListener(event: string, callback: CallbackType) {
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

    public removeUnicastEventListener(event: string, callback: CallbackType) {
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
        const isInternalStateEvent = event.startsWith('$state');
        if (registedcallbacks && registedcallbacks.length !== 0) {
            registedcallbacks.forEach((callback) => {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(Errors.broadcastCallbackError);
                    console.error(error);
                }
            });
        } else if (!isInternalStateEvent) {
            console.warn(Warnings.emptyBroadcastEvents(event));
        }
    }

    public emitUnicast(event: string, ...args: any[]) {
        const callback = this.uniCastEvents[event];
        return callback(...args);
    }
}
