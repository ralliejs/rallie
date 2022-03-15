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

  test('# case 1: the main app relys on a, b and c, activate the main app, a, b and c should be activated', async () => {
    await hostApp.activate('dependency-testers/main')
    expect(appsLoaded.includes('dependency-testers/a')).toBeTruthy()
    expect(appsLoaded.includes('dependency-testers/b')).toBeTruthy()
    expect(appsLoaded.includes('dependency-testers/c')).toBeTruthy()
  })
})
