import { createBus, getBus, touchBus, Bus } from './lib/bus'
import { effect } from '@vue/reactivity'

export { createBus, getBus, touchBus, Bus } from './lib/bus'
export { effect } from '@vue/reactivity'

export { Errors, Warnings } from './lib/utils'

export * from './types'

const RallieCore = {
  createBus,
  getBus,
  touchBus,
  Bus,
  effect
}

export default RallieCore
