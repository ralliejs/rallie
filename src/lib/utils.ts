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
        return `[obvious] one of the callbacks of the broadcast event ${eventName} throws an uncaught error`;
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
    resourceNotDeclared: (appName: string, busName: string) => {
        return `[obvious] can not find any assets of the app ${appName} on the bus ${busName}`;
    },
    appNotCreated: (appName: string) => {
        return `[obvious] you are trying to activate app ${appName}, but it was not created`;
    },
    // ================= Socket ===============
    modifyPrivateState: (stateName: string) => {
        return `[obvious] state ${stateName} is private, you are not allowed to set it`;
    },
    accessUninitializedState: (stateName: string) => {
        return `[obvious] it's not allowed to set, watch or unwatch state ${stateName} before it is initialized`;
    },
    waitStateTimeout: (states: string[]) => {
        return `[obvious] wait for states ${JSON.stringify(states)} timeout`;
    },
    duplicatedInitial: (stateName: string) => {
        return `[obvious] duplicated initialized state ${stateName}`;
    },
    initialStateAsUndefined: (stateName: string) => {
        return `[obvious] state ${stateName} can't be initialized to undefined, please initial it to null instead`;
    },
    // ================= Bus ==================
    stateIsReadOnly: () => {
        return '[obvious] bus.state is readonly';
    },
    invalidResource: (asset: string) => {
        return `[obvious] ${asset} is not a valid asset`;
    },
    dependenciesOverflow: () => {
        return '[obvious] the number of apps bootstraped at a time is greater than the maximum value of 100, ' + 
               'it means that there may be circular dependencies, please check the app dependencies declaration' +
               'or reset the bus\'s maxDependenciesNum';
    }
};

export const Warnings = {
    emptyBroadcastEvents: (eventName: string) => {
        return `[obvious] you have emitted ${eventName} event, but there is no listener of this event`;
    }
};