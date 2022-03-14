import { Bus } from './src'

declare global {
  // eslint-disable-next-line
  interface Window {
    RALLIE_BUS_STORE: Record<string, Bus>
  }
}
