import { createBlock } from '../../../src/index'

createBlock('relate-testers/main')
  .relyOn(['relate-testers/c'])
  .relateTo(['relate-testers/a', 'relate-testers/b', 'relate-testers/c'])
