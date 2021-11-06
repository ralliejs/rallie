export const constant = {
  privateBus: (appName: string) => `${appName}.bus`,
  publicStateNamespace: (appName: string) => `${appName}.public`,
  privateStateNamespace: (appName: string) => `${appName}.private`,
  isGlobalBusAccessed: 'isGlobalBusAccessed'
}

const message = (text: string) => `[rallie] ${text}`
export const errors = {
  stateNotInitialized: (appName: string, isPrivate: boolean) => message(
    `the ${isPrivate ? 'private' : 'public'} state of the app ${appName} is not initialized, please check:\n` +
    `1. whether app ${appName} is loaded.\n` +
    `2. whether app ${appName} initializes the ${isPrivate ? 'private' : 'public'} state`
  ),
  duplicatedAppName: (appName: string) => message(`the app ${appName} is already registered, please rename your app`)
}
