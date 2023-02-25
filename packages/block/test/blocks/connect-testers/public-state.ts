import { createBlock } from '../../../src'

createBlock<{
  state: {
    count: number
  }
}>('connect-testers/public-state').initState({
  count: 0,
})
