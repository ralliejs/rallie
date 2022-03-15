import { createBlock } from 'rallie'
import { useBlockState } from '../../src'

type Events = {
  printTheme: () => void
}

type Methods = {
  toggleTheme: () => void
}

type State = {
  count: number
  isDarkTheme: boolean
}

export const consumer = createBlock('consumer')
const producer = consumer.connect<State, Events, Methods>('producer')
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
