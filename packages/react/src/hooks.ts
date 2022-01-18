import React from 'react'
import type { App, Connector } from 'rallie'

export function useRallieState<T extends App | Connector, U> (app: T, getter: (state: T['state']) => U) {
  const [value, setValue] = React.useState<U>(getter(app.state))
  React.useEffect(() => {
    const unwatch = app.watchState(getter).do((val) => {
      setValue(val)
    })
    return () => {
      unwatch()
    }
  }, [getter, app])
  return value
}

export function useRallieEvents<T extends App | Connector> (app: T, events: Partial<T['events']>) {
  React.useEffect(() => {
    const off = app.listenEvents(events)
    return () => {
      off()
    }
  }, [events, app])
}

export function useRallieMethods<T extends App> (app: T, methods: Partial<T['methods']>) {
  React.useEffect(() => {
    const off = app.addMethods(methods)
    return () => {
      off()
    }
  }, [methods, app])
}
