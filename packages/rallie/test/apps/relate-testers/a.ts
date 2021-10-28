import { registerApp, App } from '../../../src'

const app = new App({ name: 'relate-testers/a' })

registerApp(app)
  .relateTo(['relate-testers/b'])

app.runInRemoteMode(() => {
  console.log('relate-testers/a is loaded')
})
