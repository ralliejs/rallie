import { App } from 'rallie'

type BroadcastEvents = {
  printTheme: () => void
}

type UnicastEvents = {
  toggleTheme: () => void
}

const state = {
  private: {
    isDarkTheme: true
  },
  public: {
    count: 0
  }
}

export const producer = new App<BroadcastEvents, UnicastEvents, typeof state.public, typeof state.private>('producer', { state })
