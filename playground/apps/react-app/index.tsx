import { reactApp } from './blocks/react-app'
import { registerBlock } from '@rallie/block'

registerBlock(reactApp)
  .relyOn(['host-app', 'vue-app'])
  .onActivate(() => {
    reactApp.addMethods({
      mount: async (container) => {
        const app = await import('./app')
        app.mount(container)
      },
    })
  })

reactApp.run(async (env) => {
  if (env.isEntry) {
    env.use(async (ctx, next) => {
      if (ctx.name === 'starter') {
        await import('../../index')
      } else {
        await next()
      }
    })
    await reactApp.load('starter')
    env.freeze()
    reactApp.activate(reactApp.name).then(() => {
      let container = document.getElementById('react-app')
      if (!container) {
        container = document.createElement('div')
        document.body.appendChild(container)
      }
      reactApp.methods.mount(container)
    })
  }
})
