import { Bus } from './src'

declare global {
  interface Window { // eslint-disable-line
    __Bus__: Record<string, Bus>;
  }
}
