import { Errors } from '@rallie/core'
import { createBlock, registerBlock } from '../src/index'
import { errors, constant, warnings } from '../src/utils'
import nativeLoader from './middlewares/native-loader'

const hostApp = createBlock('host-app')

hostApp.run((env) => {
  env.use(nativeLoader)
})

describe('Test state', () => {
  test('# case 1: test set, get and watch of state', async () => {
    const app = createBlock('state-case1')
    registerBlock(app)
      .relateTo(['connect-testers/state'])
      .onBootstrap(async () => {
        console.log = jest.fn()
        console.warn = jest.fn()
        const targetApp = app.connect<{
          state: {
            count: number
            theme: string
          }
        }>('connect-testers/state')
        expect(targetApp.state.count).toEqual(0)
        expect(targetApp.state.theme).toEqual('white')
        targetApp.setState('set count before watch', (state) => {
          state.count = 1
        })
        targetApp.watchState((state) => {
          console.warn(state.theme)
        })
        await app.activate('connect-testers/state')
        await targetApp.setState('set count after watch', (state) => {
          state.count = 2
        })
        await app.activate('connect-testers/state', 'green') // set theme
        await app.activate('connect-testers/state', 'red') // set theme
        await app.destroy('connect-testers/state')
        await targetApp.setState('set count state after unwatch', (state) => {
          state.count = 3
        })
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
    registerBlock(createBlock('state-case2-1'))
    const app = createBlock('state-case2-2')
    registerBlock(app).relateTo(['state-case2-1'])
    expect(() => {
      app.connect<any>('state-case2-1').setState("app2 modify app1's state", (state) => {
        state.value = 1
      })
    }).toThrowError(errors.stateNotInitialized('state-case2-1'))

    expect(() => {
      app
        .connect<any>('state-case2-1')
        .watchState((state) => state.value)
        .do((value) => {
          console.log(value)
        })
    }).toThrowError(errors.stateNotInitialized('state-case2-1'))
  })

  test('#case 3: test private state', async () => {
    console.log = jest.fn()
    const app = createBlock('state-case3')
    registerBlock(app)
    await app.activate('connect-testers/state')
    // the app 'connect-testers/state.private' will be registered once the app 'connect-testers/state' is registered
    const privateApp = app.connect<{
      state: { user: string }
      methods: {
        login: (user: string) => void
        logout: () => void
      }
    }>('connect-testers/state.private')
    expect(privateApp.state.user).toEqual('Mike')
    privateApp
      .watchState((state) => state.user)
      .do((value) => {
        console.log(value)
      })
    privateApp
      .setState('set user to Alice', (state) => {
        state.user = 'Alice'
      })
      .catch((error) => {
        expect(error.message).toEqual(
          Errors.modifyPrivateState(constant.stateNamespace('connect-testers/state.private')),
        )
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
  const app = createBlock('events-tester')
  registerBlock(app).relyOn(['connect-testers/events'])

  test('# case 1: test events', async () => {
    await app.activate('events-tester')
    const targetApp = app.connect<{
      events: {
        log: (text: string) => void
        error: (text: string) => void
        record: (text: string) => void
      }
    }>('connect-testers/events')
    const recordedTexts: string[] = []
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    targetApp.listenEvents({
      record(text) {
        recordedTexts.push(text)
      },
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
  const app = createBlock('methods-tester')
  registerBlock(app).relyOn(['connect-testers/methods'])

  test('# case 1: test methods', async () => {
    await app.activate('methods-tester')
    const targetApp = app.connect<{
      methods: {
        getCount: () => number
        addCount: () => void
      }
    }>('connect-testers/methods')
    expect(targetApp.methods.getCount()).toEqual(0)
    targetApp.methods.addCount()
    expect(targetApp.methods.getCount()).toEqual(1)
  })
})

describe('Test export and import', () => {
  const app = createBlock('exports-tester')
  registerBlock(app).relateTo(['connect-testers/exports'])
  test('# case 1: test export and import', async () => {
    console.warn = jest.fn()
    await app.activate(app.name)
    const targetApp = app.connect<{
      exports: {
        testedValue: number
      }
    }>('connect-testers/exports')
    const { testedValue: testedValue1 } = targetApp.import()
    expect(testedValue1).toEqual(1)
    expect(console.warn).toBeCalledWith(warnings.duplicatedExports('connect-testers/exports'))
  })
})
