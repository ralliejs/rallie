import { App } from 'rallie'

type PublicState = {
  count: number
}

type PrivateState = {
  isDarkTheme: boolean
}

type Events = {
  printTheme: () => void
}

type Methods = {
  toggleTheme: () => void
}

export const consumer = new App('consumer')
export const producer = consumer.connect<PublicState, PrivateState, Events, Methods>('producer')
