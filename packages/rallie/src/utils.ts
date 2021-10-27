import { CustomCtxType } from '@rallie/core/dist/types'

export const constant = {
  privateBus: (appName: string) => `$${appName}:bus`,
  publicStateNamespace: '$public',
  privateStateNamespace: '$private'
}

export const errors = {
  stateNotInitialized: (appName: string, isPrivate: boolean) => `[rallie] the app ${appName} hasn't initialized ${isPrivate ? 'private' : 'public'} state`,
  appIsNotCreated: (appName: string) => `[rallie] the app ${appName} is not created, it's not allowed to connect it`
}

export const getAppNameFromCtx = (ctx: CustomCtxType) => {
  return typeof ctx === 'string' ? ctx : ctx.name
}
