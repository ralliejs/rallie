import { App } from 'rallie'
import { stateHook, eventsHook, methodsHook } from '../../src'

type Events = {
  printTheme: () => void
}

type Methods = {
  toggleTheme: () => void
}

const state = {
  private: {
    isDarkTheme: true
  },
  public: {
    count: 0
  }
}

export const producer = new App<typeof state.public, typeof state.private, Events, Methods>('producer', { state })
const usePublicState = stateHook(producer.publicState)
const usePrivateState = stateHook(producer.privateState)
const useEvents = eventsHook(producer)
const useMethods = methodsHook(producer)
export const Producer = () => {
  const count = usePublicState<number>(state => state.count)
  const isDarkTheme = usePrivateState<boolean>(state => state.isDarkTheme)
  useEvents({
    printTheme () {
      console.log(producer.privateState.get(state => state.isDarkTheme) ? 'dark' : 'light')
    }
  })
  useMethods({
    toggleTheme () {
      producer.privateState.set(state => {
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
