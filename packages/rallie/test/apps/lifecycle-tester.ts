import { registerApp, App } from '../../src/index'

registerApp(new App({ name: 'lifecycle-tester' }))
  .onBootstrap(() => {
    console.log('bootstraped')
  })
  .onActivate(() => {
    console.warn('activated')
  })
  .onDestroy(() => {
    console.error('destroyed')
  })
