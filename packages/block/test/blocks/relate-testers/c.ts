import { createBlock } from '../../../src'

createBlock('relate-testers/c').run((env) => {
  if (!env.isEntry) {
    console.error('relate-testers/c is loaded')
  }
})
