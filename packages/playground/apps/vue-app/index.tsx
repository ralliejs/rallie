import { jsdelivrLibraryLoader } from '../../middlewares'
import { registerApp } from 'rallie'
import { app } from './app'

app.runInHostMode((bus) => {
  bus.use(jsdelivrLibraryLoader({
    vue: '@3.2.23/dist/vue.global.js',
    react: '@17.0.2/umd/react.development.js',
    'react-dom': '@17.0.2/umd/react-dom.development.js'
  }))
})

registerApp(app)
  .relyOn(['lib:vue'])
  .onBootstrap(async (container) => {
    (await import('./lifecycles')).onBootstrap(container)
  })
  .onDestroy(async () => {
    (await import('./lifecycles')).onDestroy()
  })

app.runInHostMode(() => {
  app.activate(app.name, document.getElementById('vue-app'))
})
