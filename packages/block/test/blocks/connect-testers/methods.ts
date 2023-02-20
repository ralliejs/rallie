import { createBlock, registerBlock } from '../../../src'

let count = 0
const block = createBlock<{
  methods: {
    getCount: () => number
    addCount: (num: number) => number
    removeMethods: () => void
  }
}>('connect-testers/methods')

registerBlock(block).onActivate(() => {
  const removeMethods = block.addMethods({
    getCount() {
      return count
    },
    addCount(num) {
      count += num
      return count
    },
    removeMethods() {
      removeMethods()
    },
  })
})
