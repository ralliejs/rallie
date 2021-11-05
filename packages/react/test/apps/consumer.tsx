import { App } from 'rallie'
import { stateHook } from '../../src'

type BroadcastEvents = {
  printTheme: () => void
}

type UnicastEvents = {
  toggleTheme: () => void
}

type PublicState = {
  count: number
}

type PrivateState = {
  isDarkTheme: boolean
}

export const consumer = new App('consumer')
const producer = consumer.connect<PublicState, PrivateState, BroadcastEvents, UnicastEvents>('producer')
const useProducerPrivateState = stateHook(producer.privateState)
export const Consumer = () => {
  const toggleTheme = () => {
    producer.methods.toggleTheme()
  }
  const addCount = () => {
    producer.publicState.set(state => {
      state.count++
    })
  }
  const printTheme = () => {
    producer.events.printTheme()
  }
  const isDarkTheme = useProducerPrivateState<boolean>(state => state.isDarkTheme)
  return (
    <div data-testid="consumer-container" style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}>
      <button onClick={toggleTheme}>toggle theme</button>
      <button onClick={addCount}>add count</button>
      <button onClick={printTheme}>print theme</button>
    </div>
  )
}
