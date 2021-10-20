import { createApp } from '../../../src'

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

const app = createApp<{}, PrivateState, BroadcastEvents, UnicastEvents>('connect-testers/event', configurator => {
  const off = {
    unicast: null,
    broadcast: null
  }
  configurator
    .initPrivateState({
      count: 0
    })
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
})
