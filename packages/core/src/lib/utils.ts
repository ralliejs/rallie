import type { MiddlewareFnType, NextFnType, ContextType, DependencyType, RelateType } from '../types' // eslint-disable-line

export const Errors = {
  // ================= EventEmitter.broadcast  =================
  removeNonExistedBroadcast: (eventName: string) => {
    return `[@rallie/core] you are trying to remove a listener of the broadcast event ${eventName}, but ${eventName} hasn't been registed as a broadcast event`
  },
  wrongBroadcastCallback: (eventName: string) => {
    return `[@rallie/core] you are trying to remove a listener of the broadcast event ${eventName}, but the listener hasn't been registed`
  },
  broadcastCallbackError: (eventName: string) => {
    return `[@rallie/core] one of the callbacks of the broadcast event ${eventName} throws an uncaught error`
  },
  // ================= EventEmitter.unicast ====================
  removeNonExistedUnicast: (eventName: string) => {
    return `[@rallie/core] you are trying to remove a listener of the unicast event ${eventName}, but ${eventName} hasn't been registed as a unicast event`
  },
  registedExistedUnicast: (eventName: string) => {
    return `[@rallie/core] you are trying to register a unicast event ${eventName}, but it has been registered before`
  },
  emittedNonExistedUnicast: (eventName: string) => {
    return `[@rallie/core] you have emitted ${eventName} unicast, but there is no listener of this event`
  },
  // ================= App ===================
  createExistingApp: (appName: string) => {
    return `[@rallie/core] ${appName} is existing, you are not allowed to create it again`
  },
  resourceNotDeclared: (appName: string, busName: string) => {
    return `[@rallie/core] can not find any assets of the app ${appName} on the bus ${busName}`
  },
  appNotCreated: (appName: string) => {
    return `[@rallie/core] you are trying to activate app ${appName}, but it was not created`
  },
  // ================= Socket ===============
  modifyPrivateState: (namespace: string) => {
    return `[@rallie/core] state ${namespace} is private, you are not allowed to set it`
  },
  actionIsNotDefined: (namespace: string) => {
    return `[@rallie/core] please describe your action when you modify the state ${namespace}`
  },
  accessUninitializedState: (namespace: string) => {
    return `[@rallie/core] it's not allowed to set or watch state ${namespace} before it is initialized`
  },
  duplicatedInitial: (namespace: string) => {
    return `[@rallie/core] duplicated initialized state ${namespace}`
  },
  initializePrimitiveState: (namespace: string) => {
    return `[@rallie/core] it's not allowed to initialized state ${namespace} to a primitive value`
  },
  // ================= Bus ==================
  duplicatedBus: (name: string) => `[@rallie/core] the bus named ${name} has been defined before, please rename your bus`,
  circularDependencies: (appName: string, circularPath: string[]) =>
    `[@rallie/core] There is a circular dependency when activating the app ${appName}, and the circular path is ${circularPath.join('->')}`,
  multipleCalledNextFn: () => {
    return '[@rallie/core] next() called multiple times in the middleware'
  },
  wrongMiddlewareType: () => {
    return '[@rallie/core] the middleware must be a function'
  },
}

export const Warnings = {
  handlerIsNotInTheEventsPool: (eventName: string, isUnicast: boolean) => {
    return `[@rallie/core] the event ${eventName} is not in the events pool that you specified when calling on${isUnicast ? 'Unicast' : 'Broadcast'}`
  },
}

export function isPrimitive(object: unknown): boolean {
  return ['string', 'number', 'boolean', 'undefined'].includes(typeof object)
}

export function deduplicate(items: DependencyType[] | RelateType[]) {
  const flags: Record<string, boolean> = {}
  const result = []
  items.forEach((item: DependencyType | RelateType) => {
    const name = typeof item === 'string' ? item : item.name
    if (!flags[name]) {
      result.push(item)
      flags[name] = true
    }
  })
  return result
}

/**
 * the compose function copied from koa-compose
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
