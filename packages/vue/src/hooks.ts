import { onBeforeUnmount, onBeforeMount, ref, UnwrapRef } from 'vue'
import type { Block, CreatedBlock } from '@rallie/block'

export function useBlockState<T extends Block<any, any, any>, U>(block: T, getter: (state: T['state']) => U) {
  const stateRef = ref<U>(getter(block.state))
  let unwatch = null
  onBeforeMount(() => {
    unwatch = block.watchState(getter).do((value) => {
      stateRef.value = value as UnwrapRef<U>
    })
  })
  onBeforeUnmount(() => {
    unwatch()
  })
  return stateRef
}

export function useBlockEvents<T extends Block<any, any, any>>(block: T, events: Partial<T['events']>) {
  let off = null
  onBeforeMount(() => {
    off = block.listenEvents(events)
  })
  onBeforeUnmount(() => {
    off()
  })
}

export function useBlockMethods<T extends CreatedBlock<any, any, any, any>>(block: T, methods: Partial<T['methods']>) {
  let off = null
  onBeforeMount(() => {
    off = block.addMethods(methods)
  })
  onBeforeUnmount(() => {
    off()
  })
}
