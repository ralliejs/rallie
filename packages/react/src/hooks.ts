import React from 'react'
import type { App, Connector } from 'rallie'

export function useRallieState<T extends App | Connector, U>(app: T, getter: (state: T['state']) => U, deps: any[] = []) {
  const [value, setValue] = React.useState<U>(getter(app.state))
  React.useEffect(() => {
    const unwatch = app.watchState(getter).do((val) => {
      setValue(val)
    })
    return () => {
      unwatch()
    }
  }, [...deps]) // eslint-disable-line react-hooks/exhaustive-deps
  return value
}

export function useRallieEvents<T extends App | Connector>(app: T, events: Partial<T['events']>, deps: any[] = []) {
  React.useEffect(() => {
    const off = app.listenEvents(events)
    return () => {
      off()
    }
  }, [...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useRallieMethods<T extends App>(app: T, methods: Partial<T['methods']>, deps: any[] = []) {
  React.useEffect(() => {
    const off = app.addMethods(methods)
    return () => {
      off()
    }
  }, [...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}
