import { Bus, createBus, getBus, touchBus } from './lib/bus'; // eslint-disable-line

declare global {
  interface Window { // eslint-disable-line
    __Bus__: Record<string, Bus>;
  }
}

const Obvious = {
  createBus,
  getBus,
  touchBus
}

export { Bus, createBus, getBus, touchBus } from './lib/bus'; // eslint-disable-line
export { App } from './lib/app'
export { Socket } from './lib/socket'

export default Obvious
