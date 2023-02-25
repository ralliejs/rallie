export type ConstraintedType<T, P, Default> = T extends P ? T : Default

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
