
import { Errors } from '@rallie/core'
import { App, registerApp } from '../src/index'
import { errors, constant } from '../src/utils'
import nativeLoader from './middlewares/native-loader'

type State = {
  count: number,
  theme: string
}

type Events = {
  log: (text: string) => void;
  error: (text: string) => void;
  record: (text: string) => void;
}

type Methods = {
  getCount: () => number;
  addCount: () => void;
}

const hostApp = new App('host-app')

hostApp.run((env) => {
  env.use(nativeLoader)
})

describe('Test state', () => {
  test('# case 1: test set, get and watch of state', async () => {
    const app = new App('state-case1')
    registerApp(app)
      .relateTo(['connect-testers/state'])
      .onBootstrap(async () => {
        console.log = jest.fn()
        console.warn = jest.fn()
        const targetApp = app.connect<State>('connect-testers/state')
        expect(targetApp.state.count).toEqual(0)
        expect(targetApp.state.theme).toEqual('white')
        targetApp.setState('set count before watch', state => { state.count = 1 })
        targetApp.watchState((state) => {
          console.warn(state.theme)
        })
        await app.activate('connect-testers/state')
        await targetApp.setState('set count after watch', state => { state.count = 2 })
        await app.activate('connect-testers/state', 'green') // set theme
        await app.activate('connect-testers/state', 'red') // set theme
        await app.destroy('connect-testers/state')
        await targetApp.setState('set count state after unwatch', state => { state.count = 3 })
        expect(console.log).toBeCalledTimes(1)
        expect(console.log).toBeCalledWith(2, 1)
        expect(console.warn).toBeCalledTimes(3)
        expect(console.warn).toBeCalledWith('white')
        expect(console.warn).toBeCalledWith('green')
        expect(console.warn).toBeCalledWith('red')
        expect(targetApp.state.count).toEqual(3)
        expect(targetApp.state.theme).toEqual('red')
      })
    await app.activate('state-case1')
  })

  test('# case 2: set and watch uninitialized state', () => {
    registerApp(new App('state-case2-1'))
    const app = new App('state-case2-2')
    registerApp(app).relateTo(['state-case2-1'])
    expect(() => {
      app.connect<any>('state-case2-1').setState('app2 modify app1\'s state', state => { state.value = 1 })
    }).toThrowError(errors.stateNotInitialized('state-case2-1'))

    expect(() => {
      app.connect<any, any>('state-case2-1').watchState(state => state.value).do((value) => {
        console.log(value)
      })
    }).toThrowError(errors.stateNotInitialized('state-case2-1'))
  })

  test('#case 3: test private state', async () => {
    console.log = jest.fn()
    const app = new App('state-case3')
    registerApp(app)
    await app.activate('connect-testers/state')
    // the app 'connect-testers/state.private' will be registered once the app 'connect-testers/state' is registered
    type PrivateState = { user: string }
    type PrivateMethods = {
      login: (user: string) => void;
      logout: () => void;
    }
    const privateApp = app.connect<PrivateState, {}, PrivateMethods>('connect-testers/state.private')
    expect(privateApp.state.user).toEqual('Mike')
    privateApp.watchState(state => state.user).do(value => {
      console.log(value)
    })
    privateApp.setState('set user to Alice', state => { state.user = 'Alice' }).catch(error => {
      expect(error.message).toEqual(Errors.modifyPrivateState(constant.stateNamespace('connect-testers/state.private')))
    })
    privateApp.methods.logout()
    await Promise.resolve()
    expect(privateApp.state.user).toBeNull()
    privateApp.methods.login('Alice')
    await Promise.resolve()
    expect(privateApp.state.user).toEqual('Alice')
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith(null)
    expect(console.log).toBeCalledWith('Alice')
  })
})

describe('Test Events', () => {
  const app = new App('events-tester')
  registerApp(app).relyOn(['connect-testers/events'])

  test('# case 1: test events', async () => {
    await app.activate('events-tester')
    const targetApp = app.connect<{}, Events>('connect-testers/events')
    const recordedTexts = []
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    targetApp.listenEvents({
      record (text) {
        recordedTexts.push(text)
      }
    })
    targetApp.events.log('hello world')
    targetApp.events.error('hello world')
    await app.destroy('connect-testers/events')
    targetApp.events.log('hello world')
    targetApp.events.error('hello world')
    expect(recordedTexts.length).toEqual(2)
    expect(recordedTexts.join(',')).toEqual('hello world,hello world')
    expect(console.log).toBeCalledTimes(1)
    expect(console.error).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith('hello world')
    expect(console.error).toBeCalledWith('hello world')
    await app.destroy('events-tester')
  })
})

describe('Test Methods', () => {
  const app = new App('methods-tester')
  registerApp(app).relyOn(['connect-testers/methods'])

  test('# case 2: test methods', async () => {
    await app.activate('methods-tester')
    const targetApp = app.connect<{}, {}, Methods>('connect-testers/methods')
    expect(targetApp.methods.getCount()).toEqual(0)
    targetApp.methods.addCount()
    expect(targetApp.methods.getCount()).toEqual(1)
  })
})
