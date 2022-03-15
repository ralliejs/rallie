import { reactApp } from './react-app'

type State = {
  count: number
}

type Events = {}

type Methods = {}

export const vueApp = reactApp.connect<State, Events, Methods>('vue-app')
