import React from 'react'
import { App, Connector } from 'rallie'

export function stateHook<State extends object> (app: App<State> | Connector<State>) {
  return function <P = any> (getter: (_state: State) => P) {
    const [value, setValue] = React.useState<P>(getter(app.state))
    const unwatch = app.watchState(getter).do((val) => {
      setValue(val)
    })
    React.useEffect(() => {
      return () => {
        unwatch()
      }
    }, []) // eslint-disable-line
    return value
  }
}

export function eventsHook<Events> (app: App | Connector) {
  return function (events: Partial<Events>) {
    React.useEffect(() => {
      const off = app.listenEvents(events)
      return () => {
        off()
      }
    }, []) // eslint-disable-line
  }
}

export function methodsHook<Events> (app: App) {
  return function (events: Partial<Events>) {
    React.useEffect(() => {
      const off = app.addMethods(events)
      return () => {
        off()
      }
    }, []) // eslint-disable-line
  }
}
