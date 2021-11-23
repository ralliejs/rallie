import { App } from 'rallie'
import { stateHook, eventsHook, methodsHook } from '../../src'

type Events = {
  printTheme: () => void
}

type Methods = {
  toggleTheme: () => void
}

const state = {
  isDarkTheme: true,
  count: 0
}

export const producer = new App<typeof state, Events, Methods>('producer', { state })
const useProducerState = stateHook(producer)
const useProducerEvents = eventsHook(producer)
const useProducerMethods = methodsHook(producer)
export const Producer = () => {
  const count = useProducerState<number>(state => state.count)
  const isDarkTheme = useProducerState<boolean>(state => state.isDarkTheme)
  useProducerEvents({
    printTheme () {
      console.log(producer.state.isDarkTheme ? 'dark' : 'light')
    }
  })
  useProducerMethods({
    toggleTheme () {
      producer.setState(state => {
        state.isDarkTheme = !state.isDarkTheme
      })
    }
  })
  return (
    <div data-testid="producer-container" style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}>
      <span data-testid="count">{ count }</span>
      <div id="consumer"></div>
    </div>
  )
}
