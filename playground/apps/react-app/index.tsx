import { reactApp } from './blocks/react-app'
import { registerBlock } from '@rallie/block'

registerBlock(reactApp)
  .relyOn(['host-app'])
  // you can try to replace the next line with `.relyOn([{ name: 'vue-app', data: document.getElementById('vue-app') }])`
  .relateTo(['vue-app'])
  .onActivate(async () => {
    console.log('react-app bootstrapped')
    await import('./app')
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
    reactApp.activate(reactApp.name)
  }
})
