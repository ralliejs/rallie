import { createBlock, registerBlock } from '../../../src'

const block = createBlock<{
  exports: {
    testedValue: number
  }
}>('connect-testers/exports')

registerBlock(block)
  .export({
    testedValue: 1,
  })
  .export({
    testedValue: 2,
  })
