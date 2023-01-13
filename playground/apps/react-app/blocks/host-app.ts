import { reactApp } from './react-app'

export const hostApp = reactApp.connect<{
  events: {
    info: (message: string) => void
    error: (message: string) => void
    success: (message: string) => void
    warning: (message: string) => void
    loading: (message: string) => void
  }
}>('host-app')
