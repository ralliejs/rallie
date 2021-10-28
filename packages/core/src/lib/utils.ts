
import { MiddlewareFnType, NextFnType, ContextType, CustomCtxType, DependencyType, CallbackType } from '../types'; // eslint-disable-line

export const Errors = {
  // ================= EventEmitter.broadcast  =================
  removeNonExistedBroadcast: (eventName: string) => {
    return `[rallie] you are trying to remove a listener of the broadcast event ${eventName}, but ${eventName} hasn't been registed as a broadcast event`
  },
  wrongBroadcastCallback: (eventName: string) => {
    return `[rallie] you are trying to remove a listener of the broadcast event ${eventName}, but the listener hasn't been registed`
  },
  broadcastCallbackError: (eventName: string) => {
    return `[rallie] one of the callbacks of the broadcast event ${eventName} throws an uncaught error`
  },
  // ================= EventEmitter.unicast ====================
  removeNonExistedUnicast: (eventName: string) => {
    return `[rallie] you are trying to remove a listener of the unicast event ${eventName}, but ${eventName} hasn't been registed as a unicast event`
  },
  wrongUnicastCallback: (eventName: string) => {
    return `[rallie] you are trying to remove a listener of the unicast event ${eventName}, but the listener hasn't been registed`
  },
  registedExistedUnicast: (eventName: string) => {
    return `[rallie] you are trying to regist a unicast event ${eventName}, but it has been registed before`
  },
  emittedNonExistedUnicast: (eventName: string) => {
    return `[rallie] you have emitted ${eventName} unicast, but there is no listener of this event`
  },
  // ================= App ===================
  createExistingApp: (appName: string) => {
    return `[rallie] ${appName} is existing, you are not allowed to create it again`
  },
  resourceNotDeclared: (appName: string, busName: string) => {
    return `[rallie] can not find any assets of the app ${appName} on the bus ${busName}`
  },
  appNotCreated: (appName: string) => {
    return `[rallie] you are trying to activate app ${appName}, but it was not created`
  },
  // ================= Socket ===============
  modifyPrivateState: (namespace: string) => {
    return `[rallie] state ${namespace} is private, you are not allowed to set it`
  },
  accessUninitializedState: (namespace: string) => {
    return `[rallie] it's not allowed to set or watch state ${namespace} before it is initialized`
  },
  waitStateTimeout: (namespaces: string[]) => {
    return `[rallie] wait for states ${JSON.stringify(namespaces)} timeout`
  },
  duplicatedInitial: (namespace: string) => {
    return `[rallie] duplicated initialized state ${namespace}`
  },
  initializePrimitiveState: (namespace: string) => {
    return `[rallie] it's not allowed to initialized state ${namespace} to a primitive value`
  },
  // ================= Bus ==================
  invalidResource: (asset: string) => {
    return `[rallie] ${asset} is not a valid asset`
  },
  bootstrapNumberOverflow: (num = 100) => {
    return `[rallie] the number of apps bootstraped at a time is greater than the maximum value of ${num},` +
      ' it means that there may be circular dependencies, please check the app dependencies declaration' +
      ' or reset the bus\'s maxDependencyDepth'
  },
  multipleCalledNextFn: () => {
    return '[rallie] next() called multiple times in the middleware'
  },
  wrongMiddlewareType: () => {
    return '[rallie] the middleware must be a function'
  },
  wrongContextType: () => {
    return '[rallie] the app\'s name is not specified when load or activate'
  }
}

export const Warnings = {
  emptyBroadcastEvents: (eventName: string) => {
    return `[rallie] you have emitted ${eventName} broadcast, but there is no listener of this event`
  },
  handlerIsNotInTheEventsPool: (eventName: string, isUnicast: boolean) => {
    return `[rallie] the event ${eventName} is not in the events pool that you specified when calling on${isUnicast ? 'Unicast' : 'Broadcast'}`
  }
}

export function isObject (object: unknown): boolean {
  return Object.prototype.toString.call(object) === '[object Object]'
}

export function isPrimitive (object: unknown): boolean {
  return ['string', 'number', 'boolean', 'undefined'].includes(typeof object)
}

export function getNameFromCtx (ctx: CustomCtxType): string {
  return typeof ctx === 'string' ? ctx : ctx.name
}

export function getNameFromDependency (dependency: DependencyType): string {
  if (typeof dependency === 'string') {
    return dependency
  } else {
    return typeof dependency.ctx === 'string' ? dependency.ctx : dependency.ctx.name
  }
}

function deduplicate<T> (items: T[], getName: (item: T) => string) {
  const flags: Record<string, boolean> = {}
  const result: T[] = []
  items.forEach(item => {
    const name = getName(item)
    if (!flags[name]) {
      result.push(item)
      flags[name] = true
    }
  })
  return result
}

export function getDeduplicatedRelatedApps (relatedApps: CustomCtxType[]): CustomCtxType[] {
  return deduplicate<CustomCtxType>(relatedApps, getNameFromCtx)
}

export function getDeduplicatedDependencies (dependencies: DependencyType[]): DependencyType[] {
  return deduplicate<DependencyType>(dependencies, getNameFromDependency)
}

/**
 * the compose function from koa-compose
 * @param middlewares
 * @returns
 */
export const compose = (middlewares: MiddlewareFnType[]) => (context: ContextType, next: NextFnType) => {
  // last called middleware #
  let index = -1
  const dispatch = (i: number) => {
    if (i <= index) {
      return Promise.reject(new Error(Errors.multipleCalledNextFn()))
    }
    index = i
    let fn = middlewares[i]
    if (i === middlewares.length) {
      fn = next
    }
    if (!fn) {
      return Promise.resolve()
    }
    try {
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
    } catch (err) {
      return Promise.reject(err)
    }
  }
  return dispatch(0)
}
