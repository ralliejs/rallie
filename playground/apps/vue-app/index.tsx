import { registerBlock } from '@rallie/block'
import { vueApp } from './blocks/vue-app'

registerBlock(vueApp)
  .initState({
    count: 0,
  })
  .relyOn(['lib:vue', 'host-app'])
  .onActivate(() => {
    vueApp.addMethods({
      mount: async (container) => {
        const app = await import('./app')
        app.mount(container)
      },
    })
  })

vueApp.run(async (env) => {
  if (env.isEntry) {
    env.use(async (ctx, next) => {
      if (ctx.name === 'starter') {
        await import('../../index')
      } else {
        await next()
      }
    })
    await vueApp.load('starter')
    env.freeze()
    vueApp.activate(vueApp.name).then(() => {
      vueApp.methods.mount(document.getElementById('vue-app'))
    })
  }
})
