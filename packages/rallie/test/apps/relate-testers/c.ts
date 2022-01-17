import { registerApp, App } from '../../../src'

const app = new App('relate-testers/c')

registerApp(app)

app.run((env) => {
  if (!env.isEntry) {
    console.error('relate-testers/c is loaded')
  }
})
