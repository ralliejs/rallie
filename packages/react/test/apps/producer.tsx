import { App } from 'rallie'
import { getStateHook, getBroadcastHook, getUnicastHook } from '../../src'

type BroadcastEvents = {
  printTheme: () => void
}

type UnicastEvents = {
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

export const producer = new App<BroadcastEvents, UnicastEvents, typeof state.public, typeof state.private>({
  name: 'producer',
  state
})
const usePublicState = getStateHook(producer.publicState)
const usePrivateState = getStateHook(producer.privateState)
const useBroadcast = getBroadcastHook(producer)
const useUnicast = getUnicastHook(producer)
export const Producer = () => {
  const count = usePublicState<number>(state => state.count)
  const isDarkTheme = usePrivateState<boolean>(state => state.isDarkTheme)
  useBroadcast({
    printTheme () {
      console.log(producer.privateState.get(state => state.isDarkTheme) ? 'light' : 'dark')
    }
  })
  useUnicast({
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
