import { Bus } from './src'

declare global {
  interface Window { // eslint-disable-line
    RALLIE_BUS_STORE: Record<string, Bus>;
  }
}
