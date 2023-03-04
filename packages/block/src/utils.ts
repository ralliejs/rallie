export const constant = {
  privateBus: (blockName: string) => `${blockName}.bus`,
  stateNamespace: (blockName: string) => `${blockName}.state`,
  isGlobalBusAccessible: 'isGlobalBusAccessible' as const,
  exportMethodName: '__RallieInnerExport__' as const,
}

const message = (text: string) => `[rallie] ${text}`
export const errors = {
  stateNotInitialized: (blockName: string) =>
    message(
      ` the block ${blockName}'s state is not initialized, please check:\n` +
        `1. whether the block ${blockName} is loaded.\n` +
        `2. whether the block ${blockName} has initialized the state`,
    ),
  duplicatedBlockName: (blockName: string) =>
    message(`the block ${blockName} is already registered before, please rename your block`),
  stateIsReadonly: (blockName: string) => message(`the state of ${blockName} is readonly`),
}

export const enhancedEventsTrigger = <T extends Record<string, Function>>(
  events: T,
  trigger: string,
) => {
  return new Proxy<T>(events, {
    get: (target, eventName) => {
      return (...args: any[]) => {
        const fn = target[eventName as string]
        return fn(args, trigger)
      }
    },
    set: () => false,
  })
}

export const enhancedEventsListener = <T extends Record<string, Function>>(listeners: T) => {
  const result: Record<string, Function> = {}
  Object.entries(listeners).forEach(([eventName, listener]) => {
    result[eventName] = (args: any[], trigger: string) => {
      return listener.call({ trigger }, ...args)
    }
  })
  return result
}
