import React from 'react'
import type { BaseBlock, CreatedBlock } from '@rallie/block'

const useForceUpdate = () => {
  const [, setState] = React.useState({})
  const forceUpdate = React.useCallback(() => {
    setState({})
  }, [])
  return forceUpdate
}

export function useBlockState<T extends BaseBlock<unknown>, U>(
  block: T,
  getter: (state: T['state']) => U,
  deps: any[] = [],
) {
  const forceUpdate = useForceUpdate()
  const valueRef = React.useRef<U>(getter(block.state))
  React.useEffect(() => {
    const unwatch = block.watchState(getter).do((val) => {
      valueRef.current = val
      forceUpdate()
    })
    return () => {
      unwatch()
    }
  }, [forceUpdate, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps
  return valueRef.current
}

export function useBlockEvents<T extends BaseBlock<unknown>>(
  block: T,
  events: Partial<T['events']>,
  deps: any[] = [],
) {
  React.useEffect(() => {
    const off = block.listenEvents(events)
    return () => {
      off()
    }
  }, [...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useBlockMethods<T extends CreatedBlock<unknown>>(
  block: T,
  methods: Partial<T['methods']>,
  deps: any[] = [],
) {
  React.useEffect(() => {
    const off = block.addMethods(methods)
    return () => {
      off()
    }
  }, [...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}
