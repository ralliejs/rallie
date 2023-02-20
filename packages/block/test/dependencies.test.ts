import { errors } from '../src/utils'
import { createBlock, registerBlock } from '../src/index'
import nativeLoader from './middlewares/native-loader'
import logger from './middlewares/logger'

describe('Test the dependencies', () => {
  const appsLoaded: string[] = []
  const hostApp = createBlock('host-app')
  registerBlock(hostApp)
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

  test('# case 2: only registered block can load or activate other block', () => {
    const app = createBlock('case2')
    expect(() => {
      app.load('dependency-testers/a')
    }).toThrow(errors.operateBeforeRegister(app.name, 'load'))
    expect(() => {
      app.activate('dependency-testers/a')
    }).toThrow(errors.operateBeforeRegister(app.name, 'activate'))
  })
})
