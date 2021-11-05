import { app } from './app'
import App from './components/App'
import ReactDOM from 'react-dom'
import { jsdelivrLibraryLoader, dynamicImportLoader } from '../../middlewares'
import { registerApp } from 'rallie'

const rootContainer = null

app.runInHostMode((bus) => {
  bus.use(jsdelivrLibraryLoader).use(dynamicImportLoader)
})

registerApp(app)
  // you can try to replace the next line with `.relyOn([{ ctx: 'vue-app', data: document.getElementById('vue-app') }])`
  .relateTo(['vue-app'])
  .onBootstrap((container) => {
    // @ts-ignore
    ReactDOM.render(<App />, container) // TODO: remove @ts-ignore
  })
  .onDestroy(() => {
    ReactDOM.unmountComponentAtNode(rootContainer)
  })

app.runInHostMode(() => {
  app.activate(app.name, document.getElementById('react-app'))
})
