export const constant = {
  privateBus: (appName: string) => `${appName}.bus`,
  stateNamespace: (appName: string) => `${appName}.state`,
  isGlobalBusAccessible: 'isGlobalBusAccessible'
}

const message = (text: string) => `[rallie] ${text}`
export const errors = {
  stateNotInitialized: (appName: string) => message(
    ` app ${appName}'s state is not initialized, please check:\n` +
    `1. whether app ${appName} is loaded.\n` +
    `2. whether app ${appName} initializes the state`
  ),
  duplicatedAppName: (appName: string) => message(`the app ${appName} is already registered, please rename your app`)
}
