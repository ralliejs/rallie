import { createApp } from '../../src/index'

createApp('lifecycle-tester', (configurator) => {
  configurator
    .onBootstrap(() => {
      console.log('bootstraped')
    })
    .onActivate(() => {
      console.warn('activated')
    })
    .onDestroy(() => {
      console.error('destroyed')
    })
})
