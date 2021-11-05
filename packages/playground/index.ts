import { registerApp, App } from 'rallie'
import { jsdelivrLibraryLoader, dynamicImportLoader } from './middlewares'

const host = new App('host')

host.runInHostMode((bus) => {
  bus.use(jsdelivrLibraryLoader).use(dynamicImportLoader)
})

registerApp(host)
  .onBootstrap(() => {
    host.activate('vue-app', document.getElementById('vue-app'))
    host.activate('react-app', document.getElementById('react-app'))
  })

host.runInHostMode(() => {
  host.activate(host.name)
})
