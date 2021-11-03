import { registerApp, App } from '../../../src'

const app = new App('relate-testers/c')

registerApp(app)

app.runInRemoteMode(() => {
  console.error('relate-testers/c is loaded')
})
