import { createApp } from '../../../src/index'

createApp('dependency-testers/main', (configurator) => {
  configurator
    .relyOn([
      'dependency-testers/a',
      {
        ctx: 'dependency-testers/b',
        data: null
      },
      {
        ctx: {
          name: 'dependency-testers/c'
        },
        data: null
      }
    ])
})
