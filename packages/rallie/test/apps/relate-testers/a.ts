import { registerApp, App } from '../../../src'

const app = new App('relate-testers/a')

registerApp(app)
  .relateTo(['relate-testers/b'])

app.run(({ isEntryApp }) => {
  if (!isEntryApp) {
    console.log('relate-testers/a is loaded')
  }
})
