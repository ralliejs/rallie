import { registerBlock, createBlock } from '../../../src/index'

const block = createBlock('relate-testers/main')

registerBlock(block)
  .relyOn(['relate-testers/c'])
  .relateTo(['relate-testers/a', 'relate-testers/b', 'relate-testers/c'])
