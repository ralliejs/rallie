import { createBlock } from '@rallie/block'
import React from 'react'
import { useBlockState } from '../../src'

interface ConsumerType {
  state: {
    count: number
    isDarkTheme: boolean
  }
  events: {
    printTheme: () => void
  }
  methods: {
    toggleTheme: () => void
  }
}

export const consumer = createBlock('consumer')
const producer = consumer.connect<ConsumerType>('producer')
export const Consumer = () => {
  const toggleTheme = () => {
    producer.methods.toggleTheme()
  }
  const addCount = () => {
    producer.setState('add the count', (state) => {
      state.count++
    })
  }
  const printTheme = () => {
    producer.events.printTheme()
  }
  const isDarkTheme = useBlockState(producer, (state) => state.isDarkTheme)
  return (
    <div
      data-testid="consumer-container"
      style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}
    >
      <button onClick={toggleTheme}>toggle theme</button>
      <button onClick={addCount}>add count</button>
      <button onClick={printTheme}>print theme</button>
    </div>
  )
}
