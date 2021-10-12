import { createApp } from '../../../src'

createApp('relate-testers/b', (configurator) => {
  configurator.relatedTo(['relate-testers/a', { name: 'relate-testers/c' }]).relyOn(['relate-testers/a'])
}).runInRemoteMode(() => {
  console.warn('relate-testers/b is loaded')
})
