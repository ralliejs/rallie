import React from 'react'
import type { BaseBlock, CreatedBlock } from '@rallie/block'

type Func = (this: any, ...args: any[]) => any
type PickFunction<T extends Func> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>

const useForceUpdate = () => {
  const [, setState] = React.useState({})
  const forceUpdate = React.useCallback(() => {
    setState({})
  }, [])
  return forceUpdate
}

const useMemoizedFn = <T extends Func>(fn: T): T => {
  const fnRef = React.useRef<T>(fn)
  fnRef.current = React.useMemo<T>(() => fn, [fn])
  const memoizedFn = React.useRef<PickFunction<T>>()
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args)
    }
  }
  return memoizedFn.current as T
}

export function useBlockState<T extends BaseBlock<unknown>, U>(
  block: T,
  getter: (state: T['state']) => U,
  deps: any[] = [],
): U {
  const forceUpdate = useForceUpdate()
  const valueRef = React.useRef<U>()
  const unwatchFnRef = React.useRef<() => void>(null)
  const watchState = useMemoizedFn(() => {
    unwatchFnRef.current = block
      .watchState((state) => {
        valueRef.current = getter(state)
        return valueRef.current
      })
      .do((val) => {
        valueRef.current = val
        forceUpdate()
      })
  })
  if (!unwatchFnRef.current) {
    watchState()
  }
  React.useLayoutEffect(() => {
    if (!unwatchFnRef.current) {
      watchState()
      forceUpdate()
    }
    return () => {
      unwatchFnRef.current?.()
      unwatchFnRef.current = null
    }
  }, [forceUpdate, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps
  return valueRef.current
}

export function useBlockEvents<T extends BaseBlock<unknown>>(
  block: T,
  events: Partial<T['events']>,
  deps: any[] = [],
) {
  React.useLayoutEffect(() => {
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
  React.useLayoutEffect(() => {
    const off = block.addMethods(methods)
    return () => {
      off()
    }
  }, [...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}
