import { App, registerApp } from '../../../src'

type State = {
  count: number
}

type Methods = {
  getCount: () => number;
  addCount: () => void;
  printCount: (count: number) => void;
}

const app = new App<State, {}, Methods>('connect-testers/methods', {
  state: {
    count: 0
  }
})

let removeMethods: () => void

registerApp(app)
  .onBootstrap(() => {
    removeMethods = app.addMethods({
      getCount () {
        return app.state.count
      },
      addCount () {
        app.setState(state => {
          state.count++
        })
      }
    })
  })
  .onDestroy(() => {
    removeMethods()
  })
