import { createBlock } from '@rallie/block'
import React from 'react'
import { useBlockState, useBlockEvents, useBlockMethods } from '../../src'

interface ProducerType {
  state: {
    isDarkTheme: boolean
    count: number
  }
  events: {
    printTheme: () => void
  }
  methods: {
    toggleTheme: () => void
  }
}

export const producer = createBlock<ProducerType>('producer')

export const Producer = () => {
  const [count, isDarkTheme] = useBlockState(producer, (state) => [state.count, state.isDarkTheme])
  useBlockEvents(producer, {
    printTheme() {
      console.log(producer.state.isDarkTheme ? 'dark' : 'light')
    },
  })
  useBlockMethods(producer, {
    toggleTheme() {
      producer.setState('toggle theme', (state) => {
        state.isDarkTheme = !state.isDarkTheme
      })
    },
  })
  return (
    <div
      data-testid="producer-container"
      style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}
    >
      <span data-testid="count">{count}</span>
      <div id="consumer"></div>
    </div>
  )
}
