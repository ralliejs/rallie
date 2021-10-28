import { registerApp, App } from '../../../src'

const app = new App({ name: 'relate-testers/c' })

registerApp(app)

app.runInRemoteMode(() => {
  console.error('relate-testers/c is loaded')
})
