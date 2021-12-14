import { registerApp } from 'rallie'
import { vueApp } from './app'

registerApp(vueApp)
  .relyOn(['lib:vue', 'host-app'])
  .onBootstrap(async (container) => {
    console.log('vue-app bootstrapped');
    (await import('./lifecycles')).onBootstrap(container)
  })
  .onDestroy(async () => {
    (await import('./lifecycles')).onDestroy()
  })

vueApp.run(async ({ bus, isEntryApp, setBusAccessible }) => {
  if (isEntryApp) {
    setBusAccessible?.(true)
    bus?.use(async (ctx, next) => {
      if (ctx.name === 'starter') {
        await import('../../index')
      } else {
        await next()
      }
    })
    await vueApp.load('starter')
    setBusAccessible?.(false)
    vueApp.activate(vueApp.name, document.getElementById('vue-app'))
  }
})
