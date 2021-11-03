import { App } from 'rallie'
import { getStateHook } from '../../src'

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
const producer = consumer.connect<BroadcastEvents, UnicastEvents, PublicState, PrivateState>('producer')
const useProducerPrivateState = getStateHook(producer.privateState)
export const Consumer = () => {
  const toggleTheme = () => {
    producer.unicaster.toggleTheme()
  }
  const addCount = () => {
    producer.publicState.set(state => {
      state.count++
    })
  }
  const printTheme = () => {
    producer.broadcaster.printTheme()
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
