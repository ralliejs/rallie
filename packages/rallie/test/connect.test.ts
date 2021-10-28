
import { App, registerApp } from '../src/index'
import { errors } from '../src/utils'
import nativeLoader from './middlewares/native-loader'

type StateTesterPublicState = {
  value: number
}

type StateTesterPrivateState = {
  value: number
}

type EventTesterBroadcastEvents = {
  log: (text: string) => void;
  error: (text: string) => void;
  record: (text: string) => void;
}

type EventTesterUnicastEvents = {
  getCount: () => number;
  addCount: () => void;
  printCount: (count: number) => void;
}

const hostApp = new App({ name: 'host-app' })

hostApp.runInHostMode((use) => {
  use(nativeLoader)
})

describe('Test basic function of connect', () => {
  test('# case 1: connect app not existed', () => {
    expect(() => {
      hostApp.connect('not-existed-app')
    }).toThrowError(errors.appIsNotRegisteredd('not-existed-app'))
  })

  // test('# case 2: connect app not related to', () => {
  //   const app = createApp('connect-case2')
  //   console.warn = jest.fn()
  //   app.connect('connect-case1')
  //   expect(console.warn).toBeCalledWith(warnings.connectUnrelatedApp('connect-case2', 'connect-case1'))
  // })
})

describe('Test state', () => {
  test('# case 1: test set, get and watch of state', async () => {
    const app = new App({ name: 'state-case1' })
    registerApp(app)
      .relateTo(['connect-testers/state'])
      .onBootstrap(async () => {
        console.log = jest.fn()
        console.warn = jest.fn()
        const targetApp = app.connect<StateTesterPublicState, StateTesterPrivateState>('connect-testers/state')
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
    registerApp(new App({ name: 'state-case2-1' }))
    const app = new App({ name: 'state-case2-2' })
    registerApp(app).relateTo(['state-case2-1'])
    expect(() => {
      app.connect('state-case2-1').publicState.set(state => { state.value = 1 })
    }).toThrowError(errors.stateNotInitialized('state-case2-1', false))

    expect(() => {
      app.connect('state-case2-1').privateState.watch(state => state.value).do((value) => {
        console.log(value)
      })
    }).toThrowError(errors.stateNotInitialized('state-case2-1', true))
  })
})

describe('Test Events', () => {
  const app = new App({ name: 'event-tester' })
  registerApp(app).relyOn(['connect-testers/event'])

  test('# case 1: test broadcast', async () => {
    await app.activate('event-tester')
    const targetApp = app.connect<{}, {}, EventTesterBroadcastEvents, EventTesterUnicastEvents>('connect-testers/event')
    const recordedTexts = []
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    targetApp.onBroadcast({
      record (text) {
        recordedTexts.push(text)
      }
    })
    targetApp.broadcaster.log('hello world')
    targetApp.broadcaster.error('hello world')
    await app.destroy('connect-testers/event')
    targetApp.broadcaster.log('hello world')
    targetApp.broadcaster.error('hello world')
    expect(recordedTexts.length).toEqual(2)
    expect(recordedTexts.join(',')).toEqual('hello world,hello world')
    expect(console.log).toBeCalledTimes(1)
    expect(console.error).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith('hello world')
    expect(console.error).toBeCalledWith('hello world')
    expect(console.warn).toBeCalledTimes(2)
    expect(console.warn).toBeCalledWith('[rallie] you have emitted log broadcast, but there is no listener of this event')
    expect(console.warn).toBeCalledWith('[rallie] you have emitted error broadcast, but there is no listener of this event')
    await app.destroy('event-tester')
  })

  test('# case 2: test unicast', async () => {
    await app.activate('event-tester')
    const targetApp = app.connect<{}, {}, EventTesterBroadcastEvents, EventTesterUnicastEvents>('connect-testers/event')
    console.log = jest.fn()
    targetApp.onUnicast({
      printCount (count) {
        console.log(count)
      }
    })
    expect(targetApp.unicaster.getCount()).toEqual(0)
    targetApp.unicaster.addCount()
    expect(targetApp.unicaster.getCount()).toEqual(1)
    expect(console.log).toBeCalledTimes(3)
    expect(console.log).toBeCalledWith(0)
    expect(console.log).toBeCalledWith(1)
  })
})
