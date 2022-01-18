import { onBeforeUnmount, onBeforeMount, ref, UnwrapRef } from 'vue'
import type { App, Connector } from 'rallie'

export function useRallieState<T extends App | Connector, U> (app: T, getter: (state: T['state']) => U) {
  const stateRef = ref<U>(getter(app.state))
  let unwatch = null
  onBeforeMount(() => {
    unwatch = app.watchState(getter).do((value) => {
      stateRef.value = value as UnwrapRef<U>
    })
  })
  onBeforeUnmount(() => {
    unwatch()
  })
  return stateRef
}

export function useRallieEvents<T extends App | Connector> (app: T, events: Partial<T['events']>) {
  let off = null
  onBeforeMount(() => {
    off = app.listenEvents(events)
  })
  onBeforeUnmount(() => {
    off()
  })
}

export function useRallieMethods<T extends App> (app: T, methods: Partial<T['methods']>) {
  let off = null
  onBeforeMount(() => {
    off = app.addMethods(methods)
  })
  onBeforeUnmount(() => {
    off()
  })
}
