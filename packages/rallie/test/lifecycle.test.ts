import { createApp, activateApp, destroyApp } from '../src/index'
import nativeLoader from './middlewares/native-loader'
describe('Test App\'s lifecycles and the behaviour in different mode', () => {
  const hostApp = createApp('host-app')
  hostApp.runInHostMode((use) => {
    use(nativeLoader)
  })
  test('# case 1: test runInHostMode and runInRemoteMode', async () => {
    const remoteApp = createApp('remote-app')
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
  test('# case 2: test lifecycles', async () => {
    const tester = 'lifecycle-tester'
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    await activateApp(tester) // bootstrap
    await activateApp(tester) // reactivate
    await activateApp(tester) // reactivate
    await destroyApp(tester) // destroy
    await activateApp(tester) // bootstrap
    expect(console.log).toBeCalledTimes(2)
    expect(console.warn).toBeCalledTimes(2)
    expect(console.error).toBeCalledTimes(1)
  })
})
