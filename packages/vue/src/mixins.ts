import { App, Connector } from 'rallie'
import type { CallbackType } from 'rallie'

export const stateMixin = <State extends {}>(app: App<State> | Connector<State>) => <P>(mapStateToComputed: (state: State) => P) => {
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
    created () {
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

export const eventsMixin = <Events extends Record<string, CallbackType>>(app: App<{}, Events> | Connector<{}, Events>) => (events: Partial<Events>) => {
  let offEvents = null
  return {
    methods: events,
    created () {
      const _events = {}
      Object.entries(events).forEach(([key, Fn]) => {
        _events[key] = Fn.bind(this)
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

export const methodsMixin = <Methods extends Record<string, CallbackType>>(app: App<{}, {}, Methods>) => (methods: Partial<Methods>) => {
  let offMethods = null
  return {
    methods,
    created () {
      const _methods = {}
      Object.entries(methods).forEach(([key, Fn]) => {
        _methods[key] = Fn.bind(this)
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
