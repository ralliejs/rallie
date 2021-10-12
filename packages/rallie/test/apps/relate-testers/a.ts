import { createApp } from '../../../src'

createApp('relate-testers/a', (configurator) => {
  configurator.relatedTo(['relate-testers/b'])
}).runInRemoteMode(() => {
  console.log('relate-testers/a is loaded')
})
