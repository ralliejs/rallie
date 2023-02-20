import { registerBlock, createBlock } from '../../../src'

const blockWithPrivateState = createBlock<{
  state: {
    count: number
  }
  methods: {
    incrementCount: (num: number) => void
  }
}>('connect-testers/private-state')

blockWithPrivateState.addMethods({
  incrementCount: async (num) => {
    await blockWithPrivateState.setState('add count', (state) => {
      state.count += num
    })
  },
})

registerBlock(blockWithPrivateState).initState({ count: 0 }, true)
