import { createBlock, registerBlock, Env } from '../src/index'
import { Errors } from '@rallie/core'
import nativeLoader from './middlewares/native-loader'

const hostApp = createBlock('host-app')
hostApp.run((env) => {
  env.use(nativeLoader)
})
describe('Test running mode', () => {
  test('# case 1: the host-app should run in host mode, and other apps should run in remote mode', async () => {
    const remoteApp = createBlock('remote-app')
    registerBlock(remoteApp)
    console.log = jest.fn()
    hostApp.run((env) => {
      expect(env.isEntry).toBeTruthy()
    })
    remoteApp.run((env) => {
      expect(env.isEntry).toBeFalsy()
    })
    let order = ''
    await remoteApp.run(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          order += '1'
          resolve()
        }, 200)
      })
    })
    remoteApp.run(() => {
      order += '2'
    })
    expect(order).toEqual('12')
  })

  test('# case 2: config in host mode should take effect', (done) => {
    registerBlock(createBlock('case2-1')).relyOn(['case2-2'])
    registerBlock(createBlock('case2-2')).relyOn(['case2-3'])
    registerBlock(createBlock('case2-3')).relyOn(['case2-1'])
    hostApp
      .activate('case2-1')
      .then(() => {
        throw new Error('this should never be reached')
      })
      .catch((err) => {
        const expectedError = Errors.circularDependencies('case2-1', [
          'case2-1',
          'case2-2',
          'case2-3',
          'case2-1',
        ])
        expect(err.message).toEqual(expectedError)
        done()
      })
  })

  test('# case 3: remote app should access global bus if host app allowed', async () => {
    console.error = jest.fn()
    const remoteApp = createBlock('case3')
    let isRemoteAppMiddlewareCalled = false
    registerBlock(remoteApp)
    const remoteAppRunner = async (env: Env) => {
      env.use(async (ctx, next) => {
        isRemoteAppMiddlewareCalled = true
        await next()
      })
      env.config({
        isConfTouchedByRemoteApp: true,
      })
    }
    hostApp.run((env) => {
      env.config({
        isConfTouchedByRemoteApp: false,
      })
      env.freeze()
    })
    await remoteApp.run(remoteAppRunner)
    await remoteApp.activate('anyApp1').catch(() => {
      /* ignore the error */
    })
    expect(console.error).toBeCalledTimes(1) // the error consoled in the nativeLoader middleware
    await hostApp.run((env) => {
      expect(isRemoteAppMiddlewareCalled).toBeFalsy()
      expect(env.conf.isConfTouchedByRemoteApp).toBeFalsy()
      env.unfreeze()
    })
    await remoteApp.run(remoteAppRunner)
    await remoteApp.activate('anyApp2').catch(() => {
      /* ignore the error */
    })
    expect(console.error).toBeCalledTimes(2)
    hostApp.run((env) => {
      expect(isRemoteAppMiddlewareCalled).toBeTruthy()
      expect(env.conf.isConfTouchedByRemoteApp).toBeTruthy()
    })
  })
})
describe("Test App's lifecycles", () => {
  test('# case 1: test lifecycles', async () => {
    // the middleware in host mode should take effect
    const tester = 'lifecycle-tester'
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    await hostApp.activate(tester) // bootstrap
    await hostApp.activate(tester) // reactivate
    await hostApp.activate(tester) // reactivate
    await hostApp.destroy(tester) // destroy
    await hostApp.activate(tester) // bootstrap
    expect(console.log).toBeCalledTimes(2)
    expect(console.warn).toBeCalledTimes(2)
    expect(console.error).toBeCalledTimes(1)
  })
})
