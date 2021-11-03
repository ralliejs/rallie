import { App } from 'rallie'

type BroadcastEvents = {
  printTheme: () => void
}

type UnicastEvents = {
  toggleTheme: () => void
}

type PublicState = {
  count: number
}

type PrivateState = {
  isDarkTheme: boolean
}

export const consumer = new App('consumer')
export const producer = consumer.connect<BroadcastEvents, UnicastEvents, PublicState, PrivateState>('producer')
