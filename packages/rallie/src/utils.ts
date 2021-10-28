export const constant = {
  privateBus: (appName: string) => `$${appName}:bus`,
  publicStateNamespace: '$public',
  privateStateNamespace: '$private'
}

export const errors = {
  stateNotInitialized: (appName: string, isPrivate: boolean) => `[rallie] the app ${appName} hasn't initialized ${isPrivate ? 'private' : 'public'} state`,
  appIsNotRegisteredd: (appName: string) => `[rallie] the app ${appName} is not registered, it's not allowed to connect it`
}
