import { App } from 'rallie'

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

export const producer = new App<typeof state, Events, Methods>('producer', { state })
