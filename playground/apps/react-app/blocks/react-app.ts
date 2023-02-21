import { createBlock } from '@rallie/block'

export const reactApp = createBlock<{
  methods: {
    mount: (container: HTMLElement) => Promise<void>
  }
}>('react-app')
