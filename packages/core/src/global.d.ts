import { Bus } from './lib/bus'

declare global {
  interface Window { // eslint-disable-line
    __Bus__: Record<string, Bus>;
  }
}
