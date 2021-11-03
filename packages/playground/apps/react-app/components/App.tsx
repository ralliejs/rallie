import logo from '../../../assets/react-logo.svg'
import * as vueApp from '../connect-apps/vue-app'
import { app as reactApp } from '../app'
import classes from './App.module.css'

function App () {
  const count = vueApp.usePublicState<number>(state => state.count)
  const setCount = () => {
    vueApp.app.publicState.set(state => state.count++)
  }
  const hint = {
    currentMode: 'host',
    navigationMode: 'remote',
    navigationLink: '/'
  }
  reactApp.runInRemoteMode(() => {
    hint.currentMode = 'remote'
    hint.navigationMode = 'host'
    hint.navigationLink = '/apps/react-app/index.html'
  })

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <img src={logo} className={classes.appLogo} alt="logo" />
        <h1>Hello Vite + React!</h1>
        <p>
          this app is running in <strong>{hint.currentMode}</strong> mode,
          click <a className={classes.appLink} href={hint.navigationLink}>here</a> to see how it works in {hint.navigationMode} mode
        </p>
        <p>
          <button type="button" onClick={setCount}>
            count is: {count}
          </button>
        </p>
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
