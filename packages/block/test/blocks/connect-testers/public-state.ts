import { registerBlock, createBlock } from '../../../src'

const blockWithPublicState = createBlock<{
  state: {
    count: number
  }
}>('connect-testers/public-state')

registerBlock(blockWithPublicState).initState({
  count: 0,
})
