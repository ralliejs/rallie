import { createApp } from '../../src/index'

createApp('lifecycle-tester', (configurator) => {
  configurator
    .bootstrap(() => {
      console.log('bootstraped')
    })
    .activate(() => {
      console.warn('activated')
    })
    .destroy(() => {
      console.error('destroyed')
    })
})
