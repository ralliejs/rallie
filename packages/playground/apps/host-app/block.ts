import { createBlock } from 'rallie'

interface HostApp {
  events: {
    info: (message: string) => void
    error: (message: string) => void
    success: (message: string) => void
    warning: (message: string) => void
    loading: (message: string) => void
  }
  methods: {
    useNaiveUI: () => any
  }
}

export const hostApp = createBlock<HostApp>('host-app')
