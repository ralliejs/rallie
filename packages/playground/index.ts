import { registerApp, App } from 'rallie'
import { jsdelivrLibraryLoader, dynamicImportLoader, htmlLoader } from './middlewares' // eslint-disable-line
import loadHtml from '@rallie/load-html' // eslint-disable-line

const starter = new App('starter')

starter.run(({ bus, isEntryApp }) => {
  bus
    ?.use(jsdelivrLibraryLoader({
      vue: '@3.2.23/dist/vue.global.js',
      react: '@17.0.2/umd/react.development.js',
      'react-dom': '@17.0.2/umd/react-dom.development.js'
    }))
    // .use(dynamicImportLoader)
    // you can try to use the htmlLoader to replace the dynamicImportLoader
    .use(loadHtml())
    .use(htmlLoader)

  registerApp(starter)
    .onBootstrap(async () => {
      starter.activate('react-app')
      starter.activate('vue-app')
    })

  if (isEntryApp) {
    starter.activate(starter.name)
  }
})
