import { createBlock } from '../../../src'

const block = createBlock('relate-testers/b')
  .relateTo(['relate-testers/a', 'relate-testers/c'])
  .relyOn(['relate-testers/a'])

block.run((env) => {
  if (!env.isEntry) {
    console.warn('relate-testers/b is loaded')
  }
})
