import { createBus, getBus, touchBus } from './lib/bus'; // eslint-disable-line

const RallieCore = {
  createBus,
  getBus,
  touchBus
}

export { Bus, createBus, getBus, touchBus } from './lib/bus'; // eslint-disable-line
export { App } from './lib/app'
export { Socket } from './lib/socket'

export default RallieCore
