import { App, Connector } from 'rallie'

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
        this.$set(this, dataKey, value)
      })
    },
    beforeDestroy () {
      unwatchState()
    }
  }
}

export const eventsMixin = <Events extends {}>(app: App<{}, Events> | Connector<{}, Events>) => (events: Partial<Events>) => {
  let offEvents = null
  return {
    methods: events,
    created () {
      offEvents = app.listenEvents(events)
    },
    beforeDestroy () {
      offEvents()
    }
  }
}

export const methodsMixin = <Methods extends {}>(app: App<{}, {}, Methods>) => (methods: Partial<Methods>) => {
  let offMethods = null
  return {
    methods,
    created () {
      offMethods = app.addMethods(methods)
    },
    beforeDestroy () {
      offMethods()
    }
  }
}
