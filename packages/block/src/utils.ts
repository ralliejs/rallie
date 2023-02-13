export type ConstraintedType<T, P, Default> = T extends P ? T : Default

export const symbols = {
  createdBlock: Symbol('createBlock'),
  connectedBlock: Symbol('connectedBlock'),
}

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
    message(`the block ${blockName} is already registered, please rename your block`),
  invalidBlock: (name: string) =>
    message(`failed to register the block ${name} because it is not a valid created block`),
  stateIsReadonly: (blockName: string) => message(`the state of ${blockName} is readonly`),
}

export const warnings = {
  duplicatedExports: (blockName: string) =>
    message(`you can only export once in the block ${blockName}`),
}
