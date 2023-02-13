import { createBlock } from '@rallie/block'

export type ProducerService = {
  state: {
    isDarkTheme: boolean
    count: number
  }
  events: {
    printTheme: () => void
  }
  methods: {
    toggleTheme: () => void
  }
}

export const producer = createBlock<ProducerService>('producer')
