import { App } from '../src/index'
import nativeLoader from './middlewares/native-loader'
import logger from './middlewares/logger'

describe('Test the dependencies', () => {
  const appsLoaded = []
  const hostApp = new App('host-app')
  hostApp.runInHostMode((bus) => {
    bus.use(logger(appsLoaded))
    bus.use(nativeLoader)
  })

  test('# case 1: the main app relys on a, b and c, activate the main app, a, b and c should be activated', async () => {
    await hostApp.activate('dependency-testers/main')
    expect(appsLoaded.includes('dependency-testers/a')).toBeTruthy()
    expect(appsLoaded.includes('dependency-testers/b')).toBeTruthy()
    expect(appsLoaded.includes('dependency-testers/c')).toBeTruthy()
  })
})
