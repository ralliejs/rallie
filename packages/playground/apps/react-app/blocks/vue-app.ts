import { reactApp } from './react-app'

export const vueApp = reactApp.connect<{
  state: {
    count: number
  }
}>('vue-app')
