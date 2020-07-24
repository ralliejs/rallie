export const getMappedState = (state: Object) => {
    const mappedState = {}; 
    Object.keys(state).forEach((key) => {
        mappedState[key] = state[key].value;
    });
    return JSON.parse(JSON.stringify(mappedState));
};

export const Errors = {
    // ================= EventEmitter.broadcast  =================
    removeNonExistedBroadcast: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the broadcast event ${eventName}, but ${eventName} hasn't been registed as a broadcast event`;
    },
    wrongBroadcastCallback: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the broadcast event ${eventName}, but the listener hasn't been registed`;
    },
    broadcastCallbackError: (eventName: string) => {
        return `[obvious] one of the callbacks of the broadcast event ${eventName}  hrows an uncaught error`;
    },
    // ================= EventEmitter.unicast ====================
    removeNonExistedUnicast: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the unicast event ${eventName}, but ${eventName} hasn't been registed as a unicast event`;
    },
    wrongUnicastCallback: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the unicast event ${eventName}, but the listener hasn't been registed`;
    },
    registedExistedUnicast: (eventName: string) => {
        return `[obvious] you are trying to regist a unicast event ${eventName}, but it has been registed before`;
    },
    // ================= App ===================
    createExistingApp: (appName: string) => {
        return `[obvious] ${appName} is existing, you are not allowed to create it again`;
    },
    resourceNotFound: (appName: string, busName: string) => {
        return `[obvious] can not find any assets of the app ${appName} on the bus ${busName}`;
    },
    appNotCreated: (appName: string) => {
        return `[obvious] you are trying to start app ${appName}, but it was not created`;
    }
};

export const Warnings = {
    emptyBroadcastEvents: (eventName: string) => {
        return `[obvious] you have emitted ${eventName} event, but there is no listener of this event`;
    }
};