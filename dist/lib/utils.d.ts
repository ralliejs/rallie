export declare const Errors: {
    removeNonExistedBroadcast: (eventName: string) => string;
    wrongBroadcastCallback: (eventName: string) => string;
    broadcastCallbackError: (eventName: string) => string;
    removeNonExistedUnicast: (eventName: string) => string;
    wrongUnicastCallback: (eventName: string) => string;
    registedExistedUnicast: (eventName: string) => string;
    createExistingApp: (appName: string) => string;
    resourceNotDeclared: (appName: string, busName: string) => string;
    appNotCreated: (appName: string) => string;
    modifyPrivateState: (stateName: string) => string;
    accessUninitializedState: (stateName: string) => string;
    waitStateTimeout: (states: string[]) => string;
    duplicatedInitial: (stateName: string) => string;
    initialStateAsUndefined: (stateName: string) => string;
    stateIsReadOnly: () => string;
    invalidResource: (asset: string) => string;
    bootstrapNumberOverflow: () => string;
    regardArrayAsObject: (subStateName: string, subscript: string) => string;
    regardBasicTypeAsObject: (subStateName: string, type: string) => string;
};
export declare const Warnings: {
    emptyBroadcastEvents: (eventName: string) => string;
};
export declare const getMappedState: (state: object) => any;
export declare const get: (rootState: object | any[], stateLink: string[]) => object;
export declare const set: (rootStateName: string, rootState: object, stateLink: string[], value: any) => boolean;
export declare const getResolvedStates: (stateName: string, events: string[]) => any[];
