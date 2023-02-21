import { createBlock } from '@rallie/block'

export const vueApp = createBlock<{
  state: {
    count: number
  }
  methods: {
    mount: (container?: HTMLElement) => Promise<void>
  }
}>('vue-app')
