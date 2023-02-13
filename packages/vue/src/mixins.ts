import type { Block, CreatedBlock } from '@rallie/block'

export function mixinBlockState<T extends Block<any>, U>(
  block: T,
  mapStateToComputed: (state: T['state']) => U,
) {
  let unwatchState: () => void
  const computed: Record<string, any> = {}
  const mappedState = mapStateToComputed(block.state)
  const dataKey = `rallie-state-${block.name}`
  Object.keys(mappedState).forEach((key) => {
    computed[key] = function () {
      return this[dataKey][key]
    }
  })
  return {
    data() {
      const result = {
        [dataKey]: mappedState,
      }
      return result
    },
    computed,
    mounted() {
      unwatchState = block.watchState(mapStateToComputed).do((value) => {
        /* @ts-ignore */
        this[dataKey] = value
      })
    },
    // for vue2
    beforeDestroy() {
      unwatchState()
    },
    // for vue3
    beforeUnmount() {
      unwatchState()
    },
  }
}

export function mixinBlockEvents<T extends Block<any>>(block: T, events: Partial<T['events']>) {
  let offEvents: () => void
  return {
    methods: events,
    mounted() {
      const _events: Record<string, any> = {}
      Object.entries(events).forEach(([key, Fn]) => {
        _events[key] = (Fn as Function).bind(this)
      })
      offEvents = block.listenEvents(_events)
    },
    // for vue2
    beforeDestroy() {
      offEvents()
    },
    // for vue3
    beforeUnmount() {
      offEvents()
    },
  }
}

export function mixinBlockMethods<T extends CreatedBlock<any>>(
  block: T,
  methods: Partial<T['methods']>,
) {
  let offMethods: () => void
  return {
    methods,
    created() {
      const _methods: Record<string, any> = {}
      Object.entries(methods).forEach(([key, Fn]) => {
        _methods[key] = (Fn as Function).bind(this)
      })
      offMethods = block.addMethods(_methods)
    },
    // for vue2
    beforeDestroy() {
      offMethods()
    },
    // for vue3
    beforeUnmount() {
      offMethods()
    },
  }
}
