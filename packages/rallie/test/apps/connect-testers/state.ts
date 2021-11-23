import { registerApp, App } from '../../../src'

let unwatchCount: () => void = null
const app = new App('connect-testers/state', {
  state: {
    count: 0,
    theme: 'white'
  }
})

registerApp(app)
  .onBootstrap(() => {
    unwatchCount = app.watchState(state => state.count).do((newValue, oldValue) => {
      console.log(newValue, oldValue)
    })
  })
  .onActivate((newTheme) => {
    app.setState(state => {
      state.theme = newTheme
    })
  })
  .onDestroy(() => {
    unwatchCount()
  })
