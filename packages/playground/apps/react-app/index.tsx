import { reactApp } from './app'
import { registerApp } from 'rallie'

registerApp(reactApp)
  .relyOn(['lib:react', 'lib:react-dom', 'host-app'])
  // you can try to replace the next line with `.relyOn([{ name: 'vue-app', data: document.getElementById('vue-app') }])`
  .relateTo(['vue-app'])
  .onBootstrap(async (container) => {
    console.log('react-app bootstrapped');
    (await import('./lifecycles')).onBootstrap(container)
  })
  .onDestroy(async () => {
    (await import('./lifecycles')).onDestroy()
  })

reactApp.runInHostMode(async (bus, setBusAccessible) => {
  setBusAccessible(true)
  bus.use(async (ctx, next) => {
    if (ctx.name === 'starter') {
      await import('../../index')
    } else {
      await next()
    }
  })
  await reactApp.load('starter')
  reactApp.activate(reactApp.name, document.getElementById('react-app'))
})
