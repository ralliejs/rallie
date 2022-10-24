import { registerBlock, createBlock } from '../../src/index'

registerBlock(createBlock('lifecycle-tester'))
  .onBootstrap(() => {
    console.log('bootstraped')
  })
  .onActivate(() => {
    console.warn('activated')
  })
  .onDestroy(() => {
    console.error('destroyed')
  })
