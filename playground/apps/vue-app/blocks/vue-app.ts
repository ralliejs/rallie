import { createBlock } from '@rallie/block'

type State = {
  count: number
}

export const vueApp = createBlock<{
  state: State
}>('vue-app')

vueApp.initState({
  count: 0,
})
