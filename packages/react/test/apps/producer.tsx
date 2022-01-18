import { App } from 'rallie'
import { useRallieState, useRallieEvents, useRallieMethods } from '../../src'

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

export const Producer = () => {
  const [count, isDarkTheme] = useRallieState(producer, state => [state.count, state.isDarkTheme])
  useRallieEvents(producer, {
    printTheme () {
      console.log(producer.state.isDarkTheme ? 'dark' : 'light')
    }
  })
  useRallieMethods(producer, {
    toggleTheme () {
      producer.setState('toggle theme', state => {
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
