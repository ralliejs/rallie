import { MiddlewareFnType, NextFnType, ContextType } from './types';
export declare const Errors: {
    removeNonExistedBroadcast: (eventName: string) => string;
    wrongBroadcastCallback: (eventName: string) => string;
    broadcastCallbackError: (eventName: string) => string;
    removeNonExistedUnicast: (eventName: string) => string;
    wrongUnicastCallback: (eventName: string) => string;
    registedExistedUnicast: (eventName: string) => string;
    emittedNonExistedUnicast: (eventName: string) => string;
    createExistingApp: (appName: string) => string;
    resourceNotDeclared: (appName: string, busName: string) => string;
    appNotCreated: (appName: string) => string;
    modifyPrivateState: (namespace: string) => string;
    accessUninitializedState: (namespace: string) => string;
    waitStateTimeout: (namespaces: string[]) => string;
    duplicatedInitial: (namespace: string) => string;
    initializePrimitiveState: (namespace: string) => string;
    invalidResource: (asset: string) => string;
    bootstrapNumberOverflow: (num?: number) => string;
    multipleCalledNextFn: () => string;
    wrongMiddlewareType: () => string;
    wrongContextType: () => string;
};
export declare const Warnings: {
    emptyBroadcastEvents: (eventName: string) => string;
    handlerIsNotInTheEventsPool: (eventName: string, isUnicast: boolean) => string;
};
export declare const isObject: (object: unknown) => boolean;
export declare const isPrimitive: (object: unknown) => boolean;
/**
 * the compose function from koa-compose
 * @param middlewares
 * @returns
 */
export declare const compose: (middlewares: MiddlewareFnType[]) => (context: ContextType, next: NextFnType) => Promise<void>;
