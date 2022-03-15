import { reactApp } from './react-app'

type State = {}

type Events = {
  info: (message: string) => void
  error: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  loading: (message: string) => void
}

type Methods = {}

export const hostApp = reactApp.connect<State, Events, Methods>('host-app')
