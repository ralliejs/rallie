export const constant = {
  privateBus: (blockName: string) => `${blockName}.bus`,
  stateNamespace: (blockName: string) => `${blockName}.state`,
  isGlobalBusAccessible: 'isGlobalBusAccessible',
}

const message = (text: string) => `[rallie] ${text}`
export const errors = {
  stateNotInitialized: (blockName: string) =>
    message(
      ` the block ${blockName}'s state is not initialized, please check:\n` +
        `1. whether the block ${blockName} is loaded.\n` +
        `2. whether the block ${blockName} has initialized the state`,
    ),
  duplicatedBlockName: (blockName: string) => message(`the block ${blockName} is already registered, please rename your block`),
  invalidBlock: (name: string) => message(`failed to register the block ${name} because it is not a valid created block`),
}

export const warnings = {
  suggestToInitStateBeforeRegister: (blockName: string) => message(`it's recomanded to initialize the state before you register the block ${blockName}`),
}
