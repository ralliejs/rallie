import { App } from 'rallie'

type State = {}

type Events = {
  info: (message: string) => void
  error: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  loading: (message: string) => void
}

type Methods = {
  useNaiveUI: () => any
}

export const hostApp = new App<State, Events, Methods>('host-app')
