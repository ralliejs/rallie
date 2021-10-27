import { App, registerApp } from '../../../src'

type PrivateState = {
  count: number
}

type BroadcastEvents = {
  log: (text: string) => void;
  error: (text: string) => void;
  record: (text: string) => void
}

type UnicastEvents = {
  getCount: () => number;
  addCount: () => void;
  printCount: (count: number) => void;
}

const app = new App<{}, PrivateState, BroadcastEvents, UnicastEvents>({
  name: 'connect-testers/event',
  state: {
    private: {
      count: 0
    }
  }
})

const off = {
  unicast: null,
  broadcast: null
}

registerApp(app)
  .onBootstrap(() => {
    off.broadcast = app.onBroadcast({
      log (text) {
        console.log(text)
        app.broadcaster.record(text)
      },
      error (text) {
        console.error(text)
        app.broadcaster.record(text)
      }
    })
    off.unicast = app.onUnicast({
      getCount () {
        const count = app.privateState.get(state => state.count)
        app.unicaster.printCount(count)
        return count
      },
      addCount () {
        app.privateState.set(state => {
          state.count++
          app.unicaster.printCount(state.count)
        })
      }
    })
  })
  .onDestroy(() => {
    off.broadcast()
    off.unicast()
  })
