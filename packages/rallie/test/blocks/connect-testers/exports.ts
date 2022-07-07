import { createBlock, registerBlock } from '../../../src'

const block = createBlock<{
  exports: {
    testedValue: number
  }
}>('connect-testers/exports')

registerBlock(block)
  .onBootstrap(() => {
    block.export({
      testedValue: 1,
    })
  })
  .onActivate(() => {
    block.export({
      // should not take effect
      testedValue: 2,
    })
  })
