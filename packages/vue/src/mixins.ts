import { App, Connector } from 'rallie'

export function mixinRallieState<T extends App | Connector, U> (app: T, mapStateToComputed: (state: T['state']) => U) {
  let unwatchState = null
  const computed = {}
  const mappedState = mapStateToComputed(app.state)
  const dataKey = `rallie-state-${app.name}`
  Object.keys(mappedState).forEach((key) => {
    computed[key] = function () {
      return this[dataKey][key]
    }
  })
  return {
    data () {
      const result = {
        [dataKey]: mappedState
      }
      return result
    },
    computed,
    mounted () {
      unwatchState = app.watchState(mapStateToComputed).do(value => {
        this[dataKey] = value
      })
    },
    beforeDestroy () { // for vue2
      unwatchState()
    },
    beforeUnmount () { // for vue3
      unwatchState()
    }
  }
}

export function mixinRallieEvents<T extends App | Connector> (app: T, events: Partial<T['events']>) {
  let offEvents = null
  return {
    methods: events,
    mounted () {
      const _events = {}
      Object.entries(events).forEach(([key, Fn]) => {
        _events[key] = (Fn as Function).bind(this)
      })
      offEvents = app.listenEvents(_events)
    },
    beforeDestroy () { // for vue2
      offEvents()
    },
    beforeUnmount () { // for vue3
      offEvents()
    }
  }
}

export function mixinRallieMethods<T extends App> (app: T, methods: Partial<T['methods']>) {
  let offMethods = null
  return {
    methods,
    created () {
      const _methods = {}
      Object.entries(methods).forEach(([key, Fn]) => {
        _methods[key] = (Fn as Function).bind(this)
      })
      offMethods = app.addMethods(_methods)
    },
    beforeDestroy () { // for vue2
      offMethods()
    },
    beforeUnmount () { // for vue3
      offMethods()
    }
  }
}
