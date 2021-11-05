import { onBeforeUnmount, onBeforeMount, ref, UnwrapRef } from 'vue'
import { App, Connector, State, ReadOnlyState } from 'rallie'
// import { effect } from '@rallie/core'

export function stateHook<T extends object> (state: State<T> | ReadOnlyState<T>) {
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
