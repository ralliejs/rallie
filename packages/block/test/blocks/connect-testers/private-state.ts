import { createBlock } from '../../../src'

const blockWithPrivateState = createBlock<{
  state: {
    count: number
  }
  methods: {
    incrementCount: (num: number) => void
  }
}>('connect-testers/private-state').initState({ count: 0 }, true)

blockWithPrivateState.addMethods({
  incrementCount: async (num) => {
    await blockWithPrivateState.setState('add count', (state) => {
      state.count += num
    })
  },
})
