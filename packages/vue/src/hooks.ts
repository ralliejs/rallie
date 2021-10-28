import { onBeforeUnmount, onBeforeMount, ref } from 'vue'
import { App, Connector, State, ReadOnlyState } from 'rallie'

export function getStateHook<T extends object> (state: State<T> | ReadOnlyState<T>) {
  return function <P> (getter: (_state: T) => P) {
    const stateRef = ref<P>(state.get(getter))
    const unwatch = state.watch(getter).do((value) => {
      stateRef.value = value
    })
    onBeforeUnmount(() => {
      unwatch()
    })
    return stateRef
  }
}

export function getBroadcastHooks<BroadcastEvents> (app: App) {
  return function (events: Partial<BroadcastEvents>) {
    let offBroadcast = null
    onBeforeMount(() => {
      offBroadcast = app.onBroadcast(events)
    })
    onBeforeUnmount(() => {
      offBroadcast()
    })
  }
}

export function getUnicastHooks<UnicastEvents> (app: App | Connector) {
  return function (events: Partial<UnicastEvents>) {
    let offUnicast = null
    onBeforeMount(() => {
      offUnicast = app.onUnicast(events)
    })
    onBeforeUnmount(() => {
      offUnicast()
    })
  }
}
