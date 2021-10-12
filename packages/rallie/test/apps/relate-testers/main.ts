import { createApp } from '../../../src/index'

createApp('relate-testers/main', (configurator) => {
  configurator
    .relyOn(['relate-testers/c'])
    .relatedTo([
      'relate-testers/a',
      'relate-testers/b',
      { name: 'relate-testers/c' }
    ])
})
