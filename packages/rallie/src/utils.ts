import { CustomCtxType } from '@rallie/core/dist/types'

export const constant = {
  privateBus: (appName: string) => `$${appName}:bus`,
  publicStateNamespace: '$public',
  privateStateNamespace: '$private'
}

export const warnings = {
  connectUnrelatedApp: (selfApp: string, targetApp: string) => `[obvious] the app ${selfApp} is connecting app ${targetApp} which is not specified as its related app, it's recommended to specify an app that you will connect as the related app`
}

export const errors = {
  stateNotInitialized: (appName: string, isPrivate: boolean) => `[obvious] the app ${appName} hasn't initialized ${isPrivate ? 'private' : 'public'} state`,
  appIsNotCreated: (appName: string) => `[obvious] the app ${appName} is not created, it's not allowed to connect it`
}

export const getAppNameFromCtx = (ctx: CustomCtxType) => {
  return typeof ctx === 'string' ? ctx : ctx.name
}
