import { App } from 'rallie'

type Events = {
  printTheme: () => void
}

type Methods = {
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

export const producer = new App<typeof state.public, typeof state.private, Events, Methods>('producer', { state })
