import { registerBlock, createBlock } from '../../../src'

const block = createBlock('relate-testers/c')

registerBlock(block)

block.run((env) => {
  if (!env.isEntry) {
    console.error('relate-testers/c is loaded')
  }
})
