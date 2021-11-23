
import { Warnings } from '@rallie/core'
import { App, registerApp } from '../src/index'
import { errors } from '../src/utils'
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

hostApp.runInHostMode((bus) => {
  bus.use(nativeLoader)
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
        targetApp.setState(state => { state.count = 1 }) // set count before watch
        targetApp.watchState((state, isWatchingEffect) => {
          if (isWatchingEffect) {
            console.warn(state.theme)
          }
        })
        await app.activate('connect-testers/state')
        targetApp.setState(state => { state.count = 2 }) // set count after watch
        await app.activate('connect-testers/state', 'green') // set theme
        await app.activate('connect-testers/state', 'red') // set theme
        await app.destroy('connect-testers/state')
        targetApp.setState(state => { state.count = 3 }) // set count state after unwatch
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
      app.connect<any>('state-case2-1').setState(state => { state.value = 1 })
    }).toThrowError(errors.stateNotInitialized('state-case2-1'))

    expect(() => {
      app.connect<any, any>('state-case2-1').watchState(state => state.value).do((value) => {
        console.log(value)
      })
    }).toThrowError(errors.stateNotInitialized('state-case2-1'))
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
    expect(console.warn).toBeCalledTimes(2)
    expect(console.warn).toBeCalledWith(Warnings.emptyBroadcastEvents('log'))
    expect(console.warn).toBeCalledWith(Warnings.emptyBroadcastEvents('error'))
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
