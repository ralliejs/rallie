import logo from '../../../assets/react-logo.svg'
import { vueApp } from '../blocks/vue-app'
import { hostApp } from '../blocks/host-app'
import { reactApp } from '../blocks/react-app'
import { useBlockState } from '@rallie/react'
import classes from './App.module.css'

function App() {
  const count = useBlockState(vueApp, (state) => state.count)
  const setCount = () => {
    vueApp.setState('react-app add the count', (state) => {
      state.count++
    })
  }
  const messageTypes = ['info', 'error', 'warning', 'success', 'loading']
  const hint = {
    currentMode: 'entry',
    navigationMode: 'remote',
    navigationLink: '/rallie/index.html',
  }
  reactApp.run((env) => {
    if (!env.isEntry) {
      hint.currentMode = 'remote'
      hint.navigationMode = 'entry'
      hint.navigationLink = '/rallie/apps/react-app/index.html'
    }
  })

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <img src={logo} className={classes.appLogo} alt="logo" />
        <h1>Hello Vite + React + Rallie!</h1>
        <p>
          this app is running in <strong>{hint.currentMode}</strong> mode, click{' '}
          <a className={classes.appLink} href={hint.navigationLink}>
            here
          </a>{' '}
          to see how it works in {hint.navigationMode} mode
        </p>
        <p>the count is a state initialized by vue app</p>
        <p>
          <button className={classes.button} type="button" onClick={setCount}>
            count is: {count}
          </button>
        </p>
        <div>
          <p>message is an event service provided by host app</p>
          {messageTypes.map((type) => (
            <button
              className={classes.button}
              key={type}
              onClick={() =>
                hostApp.events[type]('message is an event service provided by host app')
              }
            >
              {type}
            </button>
          ))}
        </div>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className={classes.appLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className={classes.appLink}
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
