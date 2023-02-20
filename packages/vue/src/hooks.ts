import { onBeforeUnmount, onBeforeMount, ref, UnwrapRef } from 'vue'
import type { Block, CreatedBlock } from '@rallie/block'

export function useBlockState<T extends Block<any>, U>(block: T, getter: (state: T['state']) => U) {
  const stateRef = ref<U>(getter(block.state))
  let unwatch: () => void
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

export function useBlockEvents<T extends Block<any>>(block: T, events: Partial<T['events']>) {
  let off: () => void
  onBeforeMount(() => {
    off = block.listenEvents(events)
  })
  onBeforeUnmount(() => {
    off()
  })
}

export function useBlockMethods<T extends CreatedBlock<any>>(
  block: T,
  methods: Partial<T['methods']>,
) {
  let off: () => void
  onBeforeMount(() => {
    off = block.addMethods(methods)
  })
  onBeforeUnmount(() => {
    off()
  })
}
