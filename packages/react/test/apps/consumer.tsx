import { App } from 'rallie'
import { stateHook } from '../../src'

type Events = {
  printTheme: () => void
}

type Methods = {
  toggleTheme: () => void
}

type State = {
  count: number,
  isDarkTheme: boolean
}

export const consumer = new App('consumer')
const producer = consumer.connect<State, Events, Methods>('producer')
const useProducerState = stateHook(producer)
export const Consumer = () => {
  const toggleTheme = () => {
    producer.methods.toggleTheme()
  }
  const addCount = () => {
    producer.setState(state => {
      state.count++
    })
  }
  const printTheme = () => {
    producer.events.printTheme()
  }
  const isDarkTheme = useProducerState<boolean>(state => state.isDarkTheme)
  return (
    <div data-testid="consumer-container" style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}>
      <button onClick={toggleTheme}>toggle theme</button>
      <button onClick={addCount}>add count</button>
      <button onClick={printTheme}>print theme</button>
    </div>
  )
}
