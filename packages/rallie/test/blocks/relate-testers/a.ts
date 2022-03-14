import { registerBlock, createBlock } from '../../../src'

const block = createBlock('relate-testers/a')

registerBlock(block).relateTo(['relate-testers/b'])

block.run((env) => {
  if (!env.isEntry) {
    console.log('relate-testers/a is loaded')
  }
})
