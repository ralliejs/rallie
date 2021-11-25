import { registerApp, App } from '../../../src/index'

const app = new App('relate-testers/main')

registerApp(app)
  .relyOn(['relate-testers/c'])
  .relateTo([
    'relate-testers/a',
    'relate-testers/b',
    'relate-testers/c'
  ])
