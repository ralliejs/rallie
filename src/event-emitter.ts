type tCallBack = (...args: any[]) => void
type tEvents = {
    [evnetName: string] : Array<tCallBack>
}

export class EventEmitter {
    private events: tEvents // to record the callbacks of coresponding events 

    constructor() {
        this.events = {};
    }

    public addEventListener(event: string, callBack: tCallBack) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callBack);
    }

    public removeEventListener(event: string, callBack: tCallBack) {
        const registedCallBacks = this.events[event];
        if (registedCallBacks) {
            let targetIndex = -1;
            for(let i = 0; i < registedCallBacks.length; i++) {
                if (registedCallBacks[i] === callBack) {
                    targetIndex = i;
                    break;
                }
            }
            if(targetIndex !== -1) {
                registedCallBacks.splice(targetIndex, 1);
            } else {
                const msg = `[obvious] you are trying to remove a listener of [${event}] event, but the listener hasn't been registed`;
                throw new Error(msg);
            }
        } else {
            const msg = `[obvious] you are trying to remove a listener of [${event}] event, but [${event}] hasn't been registed as a event`;
            throw new Error(msg);
        }
    }

    public emit(event: string, ...args: any[]) {
        const registedCallBacks = this.events[event];
        if(registedCallBacks && registedCallBacks.length !== 0) {
            registedCallBacks.forEach((cb) => {
                cb(...args);
            });
        } else {
            console.warn(`[obvious] you have emitted [${event}] event, but there is no listener of this event`);
        }
    }
}
