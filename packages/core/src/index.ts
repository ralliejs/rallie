import { createBus, getBus, touchBus, Bus } from './lib/bus'
import { effect } from '@vue/reactivity'

const RallieCore = {
  createBus,
  getBus,
  touchBus,
  Bus,
  effect
}

export default RallieCore

export { createBus, getBus, touchBus, Bus } from './lib/bus'
export { effect } from '@vue/reactivity'

export * from './types'
