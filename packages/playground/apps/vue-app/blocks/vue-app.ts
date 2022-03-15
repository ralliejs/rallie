import { createBlock } from 'rallie'

type State = {
  count: number
}

type Events = {}

type Methods = {}

export const vueApp = createBlock<State, Events, Methods>('vue-app')

vueApp.initState({
  count: 0,
})
