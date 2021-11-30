import { App } from 'rallie'

type State = {
  count: number
}

type Events = {}

type Methods = {}

export const vueApp = new App<State, Events, Methods>('vue-app', {
  state: {
    count: 0
  }
})
