
import { MiddlewareFnType, NextFnType, ContextType } from './types'; // eslint-disable-line

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
  modifyPrivateState: (namespace: string) => {
    return `[obvious] state ${namespace} is private, you are not allowed to set it`;
  },
  accessUninitializedState: (namespace: string) => {
    return `[obvious] it's not allowed to set or watch state ${namespace} before it is initialized`;
  },
  waitStateTimeout: (namespaces: string[]) => {
    return `[obvious] wait for states ${JSON.stringify(namespaces)} timeout`;
  },
  duplicatedInitial: (namespace: string) => {
    return `[obvious] duplicated initialized state ${namespace}`;
  },
  initializePrimitiveState: (namespace: string) => {
    return `[obvious] it's not allowed to initialized state ${namespace} to a primitive value`;
  },
  // ================= Bus ==================
  invalidResource: (asset: string) => {
    return `[obvious] ${asset} is not a valid asset`;
  },
  bootstrapNumberOverflow: (num = 100) => {
    return `[obvious] the number of apps bootstraped at a time is greater than the maximum value of ${num},` + 
          ' it means that there may be circular dependencies, please check the app dependencies declaration' +
          ' or reset the bus\'s maxDependencyDepth';
  },
  multipleCalledNextFn: () => {
    return '[obvious] next() called multiple times in the middleware';
  },
  wrongMiddlewareType: () => {
    return '[obvious] the middleware must be a function';
  },
  wrongContextType: () => {
    return '[obvious] the app\'s name is not specified when load or activate';
  }
};

export const Warnings = {
  emptyBroadcastEvents: (eventName: string) => {
    return `[obvious] you have emitted ${eventName} event, but there is no listener of this event`;
  }
};

export const isObject = (object: unknown): boolean => {
  return Object.prototype.toString.call(object) === '[object Object]';
};

export const isPrimitive = (object: unknown): boolean => {
  return ['string', 'number', 'boolean', 'undefined'].includes(typeof object);
};

/**
 * the compose function from koa-compose
 * @param middlewares 
 * @returns 
 */
export const compose = (middlewares: MiddlewareFnType[]) => (context: ContextType, next: NextFnType) => {
  // last called middleware #
  let index = -1;
  const dispatch = (i: number) => {
    if (i <= index) {
      return Promise.reject(new Error(Errors.multipleCalledNextFn()));
    }
    index = i;
    let fn = middlewares[i];
    if (i === middlewares.length) {
      fn = next;
    }
    if (!fn) {
      return Promise.resolve();
    }
    try {
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    } catch (err) {
      return Promise.reject(err);
    }
  };
  return dispatch(0);
};