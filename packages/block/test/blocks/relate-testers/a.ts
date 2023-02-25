import { createBlock } from '../../../src'

const block = createBlock('relate-testers/a').relateTo(['relate-testers/b'])

block.run((env) => {
  if (!env.isEntry) {
    console.log('relate-testers/a is loaded')
  }
})
