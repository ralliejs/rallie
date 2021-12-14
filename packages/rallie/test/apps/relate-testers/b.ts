import { registerApp, App } from '../../../src'

const app = new App('relate-testers/b')

registerApp(app)
  .relateTo(['relate-testers/a', 'relate-testers/c'])
  .relyOn(['relate-testers/a'])

app.run(({ isEntryApp }) => {
  if (!isEntryApp) {
    console.warn('relate-testers/b is loaded')
  }
})
