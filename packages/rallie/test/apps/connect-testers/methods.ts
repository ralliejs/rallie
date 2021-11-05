import { App, registerApp } from '../../../src'

type PrivateState = {
  count: number
}

type Methods = {
  getCount: () => number;
  addCount: () => void;
  printCount: (count: number) => void;
}

const app = new App<{}, PrivateState, {}, Methods>('connect-testers/methods', {
  state: {
    private: {
      count: 0
    }
  }
})

let removeMethods: () => void

registerApp(app)
  .onBootstrap(() => {
    removeMethods = app.addMethods({
      getCount () {
        const count = app.privateState.get(state => state.count)
        return count
      },
      addCount () {
        app.privateState.set(state => {
          state.count++
        })
      }
    })
  })
  .onDestroy(() => {
    removeMethods()
  })
