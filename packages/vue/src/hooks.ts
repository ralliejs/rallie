import { onBeforeUnmount, onBeforeMount, ref, UnwrapRef } from 'vue'
import { App, Connector, State, ReadOnlyState } from 'rallie'
// import { effect } from '@rallie/core'

export function getStateHook<T extends object> (state: State<T> | ReadOnlyState<T>) {
  return function <P> (getter: (_state: T) => P) {
    const stateRef = ref<P>(state.get(getter))
    const unwatch = state.watch(getter).do((value) => {
      stateRef.value = value as UnwrapRef<P>
    })
    onBeforeUnmount(() => {
      unwatch()
    })
    return stateRef
  }
}

export function getBroadcastHook<BroadcastEvents> (app: App) {
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

export function getUnicastHook<UnicastEvents> (app: App | Connector) {
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

// export function useRallieState<P> (getter: () => P) {
//   const stateRef = ref(getter())
//   const runner = effect(() => {
//     stateRef.value = getter() as UnwrapRef<P>
//   })
//   onBeforeUnmount(() => {
//     runner.effect.stop()
//   })
//   return stateRef
// }
