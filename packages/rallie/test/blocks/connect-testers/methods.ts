import { createBlock, registerBlock } from '../../../src'

const block = createBlock<{
  state: {
    count: number
  }
  methods: {
    getCount: () => number
    addCount: () => void
    printCount: (count: number) => void
  }
}>('connect-testers/methods')

block.initState({
  count: 0,
})

let removeMethods: () => void

registerBlock(block)
  .onBootstrap(() => {
    removeMethods = block.addMethods({
      getCount() {
        return block.state.count
      },
      addCount() {
        block.setState('add count', (state) => {
          state.count++
        })
      },
    })
  })
  .onDestroy(() => {
    removeMethods()
  })
