import { registerApp, App } from '../../../src/index'

registerApp(new App({ name: 'dependency-testers/main' }))
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
