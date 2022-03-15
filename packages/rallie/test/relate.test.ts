import { createBlock } from '../src/index'
import nativeLoader from './middlewares/native-loader'
import logger from './middlewares/logger'

describe('Test the dependencies', () => {
  const appsLoaded = []
  const hostApp = createBlock('host-app')
  hostApp.run((env) => {
    env.use(logger(appsLoaded))
    env.use(nativeLoader)
  })

  test('# case 1: the main app relate to a, b and c, activate the main app, a, b and c should be loaded', async () => {
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    await hostApp.load('relate-testers/main') // only to increase the covarage
    await hostApp.activate('relate-testers/main')
    expect(appsLoaded.includes('relate-testers/a')).toBeTruthy()
    expect(appsLoaded.includes('relate-testers/b')).toBeTruthy()
    expect(appsLoaded.includes('relate-testers/c')).toBeTruthy()
    expect(appsLoaded.length).toEqual(4)
    expect(console.log).toBeCalledTimes(1)
    expect(console.warn).toBeCalledTimes(1)
    expect(console.error).toBeCalledTimes(1)
  })
})
