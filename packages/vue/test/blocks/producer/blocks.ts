import { createBlock } from 'rallie'

type Events = {
  printTheme: () => void
}

type Methods = {
  toggleTheme: () => void
}

const state = {
  isDarkTheme: true,
  count: 0,
}

export const producer = createBlock<typeof state, Events, Methods>('producer')
producer.initState(state)
