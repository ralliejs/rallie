import { App, registerApp } from '../../../src'

type PrivateState = {
  count: number
}

type Events = {
  log: (text: string) => void;
  error: (text: string) => void;
  record: (text: string) => void
}

const app = new App<{}, PrivateState, Events>('connect-testers/events', {
  state: {
    private: {
      count: 0
    }
  }
})

let removeEvents: () => void

registerApp(app)
  .onBootstrap(() => {
    removeEvents = app.listenEvents({
      log (text) {
        console.log(text)
        app.events.record(text)
      },
      error (text) {
        console.error(text)
        app.events.record(text)
      }
    })
  })
  .onDestroy(() => {
    removeEvents()
  })
