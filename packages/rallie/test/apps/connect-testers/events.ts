import { App, registerApp } from '../../../src'

type State = {
  count: number
}

type Events = {
  log: (text: string) => void;
  error: (text: string) => void;
  record: (text: string) => void
}

const app = new App<State, Events>('connect-testers/events', {
  state: {
    count: 0
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
