import React from 'react'
import { createBlock } from '@rallie/block'
import { useBlockState, useBlockEvents, useBlockMethods } from '../../src'

export type BlockService = {
  state: {
    locale: 'en' | 'zh'
    count: number
    funcState: () => void
  }
  events: {
    incrementCount: () => void
    printCount: () => void
  }
  methods: {
    switchLocale: () => void
    mount: () => void
    unmount: () => void
  }
}

export const block = createBlock<BlockService>('block')

export const Component = () => {
  const [stateCount, setStateCount] = React.useState(0)
  const [blockCount, locale, funcState] = useBlockState(block, (state) => [
    state.count,
    state.locale,
    state.funcState,
  ])
  const sumCount = useBlockState(block, (state) => state.count + stateCount, [stateCount])
  useBlockEvents(block, {
    incrementCount() {
      block.setState('increment count', (state) => {
        state.count++
      })
    },
  })
  useBlockEvents(
    block,
    {
      printCount() {
        console.log(blockCount)
      },
    },
    [blockCount],
  )
  useBlockMethods(block, {
    async switchLocale() {
      await block.setState('switch locale', (state) => {
        const currentLocale = state.locale
        state.locale = currentLocale === 'en' ? 'zh' : 'en'
      })
    },
  })
  return (
    <div>
      <div>
        <span>block count: {blockCount}</span>
      </div>
      <div>
        <span>state count: {stateCount}</span>
      </div>
      <div>
        <span>sum count: {sumCount}</span>
      </div>
      <div>
        <span>locale: {locale}</span>
      </div>
      <div>
        <button onClick={typeof funcState === 'function' ? funcState : () => {}}>
          trigger funcState
        </button>
        <button onClick={block.events.incrementCount}>increment block count</button>
        <button onClick={() => setStateCount((val) => val + 1)}>increment state count</button>
        <button onClick={block.events.printCount}>print block count</button>
        <button onClick={block.methods.switchLocale}>switch locale</button>
      </div>
    </div>
  )
}
