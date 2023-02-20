import { Errors } from '@rallie/core'
import { createBlock, registerBlock } from '../src/index'
import { errors, constant, warnings } from '../src/utils'
import nativeLoader from './middlewares/native-loader'

const hostApp = createBlock('host-app')

hostApp.run((env) => {
  // load block from ./block/${name}.tsx
  env.use(nativeLoader)
})

describe('Test state', () => {
  test('# case 1: test set, get and watch of public state', async () => {
    console.log = jest.fn()
    const app = createBlock('case1')
    registerBlock(app)
    const blockWithPublicState = app.connect<{
      state: {
        count: number
      }
    }>('connect-testers/public-state')
    expect(blockWithPublicState.state).toBeNull()
    await app.activate(blockWithPublicState.name)
    expect(blockWithPublicState.state.count).toEqual(0)
    await blockWithPublicState.setState('set state before watch', (state) => {
      state.count++
    })
    expect(blockWithPublicState.state.count).toEqual(1)
    const unwatch = blockWithPublicState
      .watchState((state) => state.count)
      .do((newCount, oldCount) => {
        console.log(newCount, oldCount)
      })
    await blockWithPublicState.setState('set state after watch', (state) => {
      state.count++
    })
    expect(blockWithPublicState.state.count).toEqual(2)
    unwatch()
    await blockWithPublicState.setState('set state after unwatch', (state) => {
      state.count++
    })
    expect(blockWithPublicState.state.count).toEqual(3)
    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith(2, 1)
  })

  test('# case 2: test set, get and watch of private state', async () => {
    console.log = jest.fn()
    const app = createBlock('case2')
    registerBlock(app)
    const blockWithPrivateState = app.connect<{
      state: {
        count: number
      }
      methods: {
        incrementCount: (num: number) => Promise<void>
      }
    }>('connect-testers/private-state')
    expect(blockWithPrivateState.state).toBeNull()
    await app.activate(blockWithPrivateState.name)
    expect(blockWithPrivateState.state.count).toEqual(0)
    try {
      await blockWithPrivateState.setState('set private state', (state) => {
        state.count++
      })
    } catch (error) {
      expect(error.message).toEqual(
        Errors.modifyPrivateState(constant.stateNamespace(blockWithPrivateState.name)),
      )
    }
    await blockWithPrivateState.methods.incrementCount(1)
    expect(blockWithPrivateState.state.count).toEqual(1)
    const unwatch = blockWithPrivateState
      .watchState((state) => state.count)
      .do((newCount, oldCount) => {
        console.log(newCount, oldCount)
      })
    await blockWithPrivateState.methods.incrementCount(1)
    expect(blockWithPrivateState.state.count).toEqual(2)
    unwatch()
    await blockWithPrivateState.methods.incrementCount(1)
    expect(blockWithPrivateState.state.count).toEqual(3)
    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith(2, 1)
  })

  test('# case 3: set and watch uninitialized state', () => {
    const blockWithoutState = createBlock('block-without-state')
    const app = createBlock('case3')
    expect(() => {
      app.connect<any>(blockWithoutState.name).setState('modify state', (state) => {
        state.value = 1
      })
    }).toThrowError(errors.stateNotInitialized(blockWithoutState.name))

    expect(() => {
      app
        .connect<any>(blockWithoutState.name)
        .watchState((state) => state.value)
        .do((value) => {
          console.log(value)
        })
    }).toThrowError(errors.stateNotInitialized(blockWithoutState.name))
  })
})

describe('Test Events', () => {
  const app = createBlock('events-tester')
  registerBlock(app).relyOn(['connect-testers/events'])

  test('# case 1: test events', async () => {
    console.log = jest.fn()
    const target = app.connect<{
      events: {
        log: (text: string) => void
        cancelListen: () => void
      }
    }>('connect-testers/events')
    target.events.log('before listen')
    await app.activate(app.name)
    target.events.log('listening')
    target.events.cancelListen()
    target.events.log('after cancel listen')
    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith('listening')
  })
})

describe('Test Methods', () => {
  const app = createBlock('methods-tester')
  registerBlock(app).relyOn(['connect-testers/methods'])

  test('# case 1: test methods', async () => {
    const target = app.connect<{
      methods: {
        getCount: () => number
        addCount: (num: number) => number
        removeMethods: () => void
      }
    }>('connect-testers/methods')
    expect(() => {
      target.methods.getCount()
    }).toThrowError()
    await app.activate('methods-tester')
    expect(target.methods.getCount()).toEqual(0)
    expect(target.methods.addCount(1)).toEqual(1)
    target.methods.removeMethods()
    expect(() => {
      target.methods.getCount()
    }).toThrowError()
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
