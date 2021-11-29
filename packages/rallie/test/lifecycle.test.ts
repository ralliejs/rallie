import { App, registerApp } from '../src/index'
import { Bus, Errors } from '@rallie/core'
import nativeLoader from './middlewares/native-loader'

const hostApp = new App('host-app')
hostApp.runInHostMode((bus) => {
  bus.use(nativeLoader)
})
describe('Test runInHostMode and runInRemoteMode', () => {
  test('# case 1: the host-app should run in host mode, and other apps should run in remote mode', async () => {
    const remoteApp = new App('remote-app')
    registerApp(remoteApp)
    console.log = jest.fn()
    hostApp.runInHostMode(() => {
      console.log('host-app is running in host mode')
    })
    hostApp.runInRemoteMode(() => {
      console.log('host-app is running in remote mode')
    })
    remoteApp.runInHostMode(() => {
      console.log('remote-app in running in host mode')
    })
    remoteApp.runInRemoteMode(() => {
      console.log('remote-app is running in remote mode')
    })
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('host-app is running in host mode')
    expect(console.log).toBeCalledWith('remote-app is running in remote mode')
    let order = ''
    await remoteApp.runInRemoteMode(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          order += '1'
          resolve()
        }, 200)
      })
    })
    remoteApp.runInRemoteMode(() => {
      order += '2'
    })
    expect(order).toEqual('12')
  })

  test('# case 2: config in host mode should take effect', (done) => {
    hostApp.runInHostMode((bus) => {
      bus.config({
        maxBootstrapTime: 100
      })
    })
    registerApp(new App('case2-1')).relyOn(['case2-2'])
    registerApp(new App('case2-2')).relyOn(['case2-3'])
    registerApp(new App('case2-3')).relyOn(['case2-1'])
    hostApp.activate('case2-1').then(() => {
      throw new Error('this should never be reached')
    }).catch((err) => {
      const expectedError = Errors.bootstrapTimeout('case2-1', 100)
      expect(err.message).toEqual(expectedError)
      done()
    })
  })

  test('# case 3: remote app should access global bus if host app allowed', () => {
    const remoteApp = new App('case3')
    registerApp(remoteApp)
    let globalBus: Bus = null
    remoteApp.runInRemoteMode((bus) => {
      expect(bus).toBeNull()
    })
    hostApp.runInHostMode((bus, setBusAccessible) => {
      globalBus = bus
      setBusAccessible(true)
    })
    remoteApp.runInRemoteMode((bus) => {
      expect(bus).toEqual(globalBus)
    })
  })
})
describe('Test App\'s lifecycles', () => {
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
