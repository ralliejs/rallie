import { hostApp } from './block'

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
    hostApp.activate(hostApp.name)
  }
})
