import { registerApp } from 'rallie'
import { hostApp } from './app'

registerApp(hostApp)
  .relyOn(['lib:vue'])
  .onBootstrap(async () => {
    console.log('host app is bootstrapped')
    ;(await import('./lifecycles')).onBootstrap()
  })

hostApp.run(async (env) => {
  if (env.isEntry) {
    env.use(async (ctx, next) => {
      if (ctx.name === 'starter') {
        await import('../../index')
      } else {
        await next()
      }
    })
    await hostApp.load('starter')
    hostApp.activate('react-app', document.getElementById('react-app'))
    hostApp.activate('vue-app', document.getElementById('vue-app'))
  }
})
