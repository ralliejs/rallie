import { getStateHook } from '@rallie/react'
import { app as reactApp } from '../app'

export const app = reactApp.connect<{}, {}, { count: number }, {}>('vue-app')

export const usePublicState = getStateHook(app.publicState)
