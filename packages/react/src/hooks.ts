import React from 'react'
import type { App, Connector, CallbackType } from 'rallie'

export function stateHook<State extends object> (app: App<State> | Connector<State>) {
  return function <P = any> (getter: (_state: State) => P) {
    const [value, setValue] = React.useState<P>(getter(app.state))
    React.useEffect(() => {
      const unwatch = app.watchState(getter).do((val) => {
        setValue(val)
      })
      return () => {
        unwatch()
      }
    }, [getter])
    return value
  }
}

export function eventsHook<Events extends Record<string, CallbackType>> (app: App | Connector) {
  return function (events: Partial<Events>) {
    React.useEffect(() => {
      const off = app.listenEvents(events)
      return () => {
        off()
      }
    }, [events])
  }
}

export function methodsHook<Methods extends Record<string, CallbackType>> (app: App) {
  return function (events: Partial<Methods>) {
    React.useEffect(() => {
      const off = app.addMethods(events)
      return () => {
        off()
      }
    }, [events])
  }
}
