import { createBlock, registerBlock } from '../../../src'

type State = {
  count: number
}

type Events = never

type Methods = {
  getCount: () => number
  addCount: () => void
  printCount: (count: number) => void
}

const block = createBlock<State, Events, Methods>('connect-testers/methods')

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
