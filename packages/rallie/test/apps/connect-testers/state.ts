import { registerApp, App } from '../../../src'

let unwatchCount: () => void = null
const app = new App('connect-testers/state', {
  state: {
    count: 0,
    theme: 'white'
  }
})

const privateApp = new App('connect-testers/state.private', {
  state: {
    user: 'Mike'
  },
  isPrivate: true
})

privateApp.addMethods({
  logout () {
    privateApp.setState('log out', state => {
      state.user = null
    })
  },
  login (user: string) {
    privateApp.setState('log in', state => {
      state.user = user
    })
  }
})

registerApp(privateApp)
registerApp(app)
  .onBootstrap(() => {
    unwatchCount = app.watchState(state => state.count).do((newValue, oldValue) => {
      console.log(newValue, oldValue)
    })
  })
  .onActivate((newTheme) => {
    app.setState('change theme', state => {
      state.theme = newTheme
    })
  })
  .onDestroy(() => {
    unwatchCount()
  })