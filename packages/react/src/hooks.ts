import React from 'react'
import { App, Connector, State, ReadOnlyState } from 'rallie'

export function getStateHook<T extends object> (state: State<T> | ReadOnlyState<T>) {
  return function <P = any> (getter: (_state: T) => P) {
    const [value, setValue] = React.useState<P>(state.get(getter))
    const unwatch = state.watch(getter).do((val) => {
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

export function getBroadcastHook<Events> (app: App | Connector) {
  return function (events: Partial<Events>) {
    React.useEffect(() => {
      const off = app.onBroadcast(events)
      return () => {
        off()
      }
    }, []) // eslint-disable-line
  }
}

export function getUnicastHook<Events> (app: App | Connector) {
  return function (events: Partial<Events>) {
    React.useEffect(() => {
      const off = app.onUnicast(events)
      return () => {
        off()
      }
    }, []) // eslint-disable-line
  }
}
