import { App } from 'rallie'

type State = {
  count: number
}

type Events = {}

type Methods = {}

export const app = new App<State, Events, Methods>('vue-app', {
  state: {
    count: 0
  }
})
