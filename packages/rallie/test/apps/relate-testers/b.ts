import { registerApp, App } from '../../../src'

const app = new App({ name: 'relate-testers/b' })

registerApp(app)
  .relateTo(['relate-testers/a', { name: 'relate-testers/c' }])
  .relyOn(['relate-testers/a'])

app.runInRemoteMode(() => {
  console.warn('relate-testers/b is loaded')
})
