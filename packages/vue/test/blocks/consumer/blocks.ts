import { createBlock } from 'rallie'

type State = {
  count: number
  isDarkTheme: boolean
}

type Events = {
  printTheme: () => void
}

type Methods = {
  toggleTheme: () => void
}

export const consumer = createBlock('consumer')
export const producer = consumer.connect<State, Events, Methods>('producer')
