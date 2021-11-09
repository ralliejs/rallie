import { registerApp, App } from 'rallie'
import { jsdelivrLibraryLoader, dynamicImportLoader, htmlLoader } from './middlewares' // eslint-disable-line
import loadHtml from '@rallie/load-html' // eslint-disable-line

const host = new App('host')

host.runInHostMode((bus) => {
  bus.use(jsdelivrLibraryLoader)
    .use(dynamicImportLoader)
    // you can try to use the htmlLoader to replace the dynamicImportLoader
    // .use(loadHtml())
    // .use(htmlLoader)
})

registerApp(host)
  .onBootstrap(() => {
    host.activate('vue-app', document.getElementById('vue-app'))
    host.activate('react-app', document.getElementById('react-app'))
  })

host.runInHostMode(() => {
  host.activate(host.name)
})
