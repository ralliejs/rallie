
import { Warnings } from '@rallie/core'
import { App, registerApp } from '../src/index'
import { errors } from '../src/utils'
import nativeLoader from './middlewares/native-loader'

type PublicState = {
  value: number
}

type PrivateState = {
  value: number
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
        const targetApp = app.connect<PublicState, PrivateState>('connect-testers/state')
        expect(targetApp.publicState.get(state => state.value)).toEqual(0)
        expect(targetApp.privateState.get(state => state.value)).toEqual(0)
        targetApp.publicState.set(state => { state.value = 1 }) // set state before watch
        targetApp.privateState.watch((state, isWatchingEffect) => {
          if (isWatchingEffect) {
            console.warn(state.value)
          }
        })
        await app.activate('connect-testers/state')
        targetApp.publicState.set(state => { state.value = 2 }) // set public state after watch
        await app.activate('connect-testers/state', 1) // set private state
        await app.activate('connect-testers/state', 2) // set private state
        await app.destroy('connect-testers/state')
        targetApp.publicState.set(state => { state.value = 3 }) // set public state after unwatch
        expect(console.log).toBeCalledTimes(1)
        expect(console.log).toBeCalledWith(2, 1)
        expect(console.warn).toBeCalledTimes(3)
        expect(console.warn).toBeCalledWith(0)
        expect(console.warn).toBeCalledWith(1)
        expect(console.warn).toBeCalledWith(2)
        expect(targetApp.publicState.get(state => state.value)).toEqual(3)
        expect(targetApp.privateState.get(state => state.value)).toEqual(2)
      })
    await app.activate('state-case1')
  })

  test('# case 2: set and watch uninitialized state', () => {
    registerApp(new App('state-case2-1'))
    const app = new App('state-case2-2')
    registerApp(app).relateTo(['state-case2-1'])
    expect(() => {
      app.connect<any>('state-case2-1').publicState.set(state => { state.value = 1 })
    }).toThrowError(errors.stateNotInitialized('state-case2-1', false))

    expect(() => {
      app.connect<any, any>('state-case2-1').privateState.watch(state => state.value).do((value) => {
        console.log(value)
      })
    }).toThrowError(errors.stateNotInitialized('state-case2-1', true))
  })
})

describe('Test Events', () => {
  const app = new App('events-tester')
  registerApp(app).relyOn(['connect-testers/events'])

  test('# case 1: test events', async () => {
    await app.activate('events-tester')
    const targetApp = app.connect<{}, {}, Events>('connect-testers/events')
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
    const targetApp = app.connect<{}, {}, {}, Methods>('connect-testers/methods')
    expect(targetApp.methods.getCount()).toEqual(0)
    targetApp.methods.addCount()
    expect(targetApp.methods.getCount()).toEqual(1)
  })
})
