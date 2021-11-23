import { onBeforeUnmount, onBeforeMount, ref, UnwrapRef } from 'vue'
import { App, Connector } from 'rallie'

export function stateHook<State extends object> (app: App<State> | Connector<State>) {
  return function <P> (getter: (_state: State) => P) {
    const stateRef = ref<P>(getter(app.state))
    const unwatch = app.watchState(getter).do((value) => {
      stateRef.value = value as UnwrapRef<P>
    })
    onBeforeUnmount(() => {
      unwatch()
    })
    return stateRef
  }
}

export function eventsHook<Events> (app: App | Connector) {
  return function (events: Partial<Events>) {
    let off = null
    onBeforeMount(() => {
      off = app.listenEvents(events)
    })
    onBeforeUnmount(() => {
      off()
    })
  }
}

export function methodsHook<Methods> (app: App) {
  return function (events: Partial<Methods>) {
    let off = null
    onBeforeMount(() => {
      off = app.addMethods(events)
    })
    onBeforeUnmount(() => {
      off()
    })
  }
}
