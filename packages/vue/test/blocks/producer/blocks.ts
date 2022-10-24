import { createBlock } from '@rallie/block'

export const producer = createBlock<{
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
}>('producer')
producer.initState({
  isDarkTheme: true,
  count: 0,
})
