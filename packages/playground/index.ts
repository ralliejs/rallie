import { registerApp, App } from 'rallie'
import { jsdelivrLibraryLoader, dynamicImportLoader, htmlLoader } from './middlewares' // eslint-disable-line
import loadHtml from '@rallie/load-html' // eslint-disable-line

const starter = new App('starter')

starter.run((env) => {
  env.use(
    jsdelivrLibraryLoader({
      vue: '@3.2.23/dist/vue.global.js',
      react: '@17.0.2/umd/react.development.js',
      'react-dom': '@17.0.2/umd/react-dom.development.js',
    }),
  )
  env.use(dynamicImportLoader)
  // you can try to use the htmlLoader to replace the dynamicImportLoader
  // env.use(loadHtml())
  env.use(htmlLoader)

  registerApp(starter).onBootstrap(async () => {
    starter.activate('react-app')
    starter.activate('vue-app')
  })

  if (env.isEntry) {
    starter.activate(starter.name)
  }
})
