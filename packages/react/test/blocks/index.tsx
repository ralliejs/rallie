import React from 'react'
import { createBlock } from '@rallie/block'
import { useBlockState, useBlockEvents, useBlockMethods } from '../../src'

export type BlockService = {
  state: {
    locale: 'en' | 'zh'
    count: number
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
  const [count, locale] = useBlockState(block, (state) => [state.count, state.locale])
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
        console.log(count)
      },
    },
    [count],
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
        <span>count: {count}</span>
      </div>
      <div>
        <span>locale: {locale}</span>
      </div>
      <div>
        <button onClick={block.events.incrementCount}>increment count</button>
        <button onClick={block.events.printCount}>print count</button>
        <button onClick={block.methods.switchLocale}>switch locale</button>
      </div>
    </div>
  )
}
