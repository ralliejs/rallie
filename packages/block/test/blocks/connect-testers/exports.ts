import { createBlock, registerBlock } from '../../../src'

const block = createBlock<{
  exports: {
    testedValue: number
  }
}>('connect-testers/exports')

registerBlock(block)
  .setup(({ exports }) => {
    exports({
      testedValue: 1,
    })
  })
  .onActivate(() => {
    block.exported = {
      testedValue: 2,
    }
  })
