import { reactApp } from './app'
import { jsdelivrLibraryLoader, dynamicImportLoader } from '../../middlewares'
import { registerApp } from 'rallie'

reactApp.runInHostMode((bus) => {
  bus
    .use(jsdelivrLibraryLoader({
      vue: '@3.2.23/dist/vue.global.js',
      react: '@17.0.2/umd/react.development.js',
      'react-dom': '@17.0.2/umd/react-dom.development.js'
    }))
    .use(dynamicImportLoader)
})

registerApp(reactApp)
  .relyOn(['lib:react', 'lib:react-dom'])
  // you can try to replace the next line with `.relyOn([{ name: 'vue-app', data: document.getElementById('vue-app') }])`
  .relateTo(['vue-app'])
  .onBootstrap(async (container) => {
    (await import('./lifecycles')).onBootstrap(container)
  })
  .onDestroy(async () => {
    (await import('./lifecycles')).onDestroy()
  })

reactApp.runInHostMode(() => {
  reactApp.activate(reactApp.name, document.getElementById('react-app'))
})
