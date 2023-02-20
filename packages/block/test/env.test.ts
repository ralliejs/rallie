import { Errors } from '@rallie/core'
import { createBlock, registerBlock } from '../src/index'
import { createBlockMiddleware } from './middlewares/create-block-middleware'
import nativeLoader from './middlewares/native-loader'

const hostApp = createBlock('host-app')
hostApp.run((env) => {
  env.use(nativeLoader)
})
describe('Test env', () => {
  test('# case 1: the first-created block should run in entry mode, and other blocks should run in remote mode', async () => {
    const otherApp = createBlock('other-app')
    registerBlock(otherApp)
    console.log = jest.fn()
    hostApp.run((env) => {
      expect(env.isEntry).toBeTruthy()
    })
    otherApp.run((env) => {
      expect(env.isEntry).toBeFalsy()
    })
    let order = ''
    await otherApp.run(() => {
      return new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
          order += '1'
          clearTimeout(timer)
          resolve()
        }, 200)
      })
    })
    otherApp.run(() => {
      order += '2'
    })
    expect(order).toEqual('12')
  })

  test('# case 2: blocks can config the env', () => {
    const app = createBlock('case2')
    hostApp.run((env) => {
      env.config({
        message: 'hello world',
      })
      expect(env.conf.message).toEqual('hello world')
    })
    app.run((env) => {
      expect(env.conf.message).toEqual('hello world')
      env.config({
        message: 'hello rallie',
      })
      expect(env.conf.message).toEqual('hello rallie')
    })
  })

  test('# case 3: entry-block can freeze the env to prevent other blocks to config the env', () => {
    const app = createBlock('case3')
    hostApp.run((env) => {
      env.freeze()
      env.config({
        message: 'hello world',
      })
      expect(env.conf.message).toEqual('hello world')
    })
    app.run((env) => {
      env.unfreeze() // this is useless
      env.config({
        message: 'hello rallie',
      })
      expect(env.conf.message).toEqual('hello world')
    })
    hostApp.run((env) => {
      env.unfreeze() // this takes effect
    })
    app.run((env) => {
      env.config({
        message: 'hello rallie',
      })
      expect(env.conf.message).toEqual('hello rallie')
    })
  })

  test('# case 4: blocks can use middleware', async () => {
    console.error = jest.fn()
    const app = createBlock('case4')
    const blocksCreatedByMiddleware: string[] = []
    registerBlock(app)
    app.run((env) => {
      env.use(createBlockMiddleware(['anyApp1'], blocksCreatedByMiddleware))
    })
    await app.activate('anyApp1')
    expect(console.error).toBeCalledTimes(1) // called by the native-loader
    expect(blocksCreatedByMiddleware).toHaveLength(1)
    expect(blocksCreatedByMiddleware[0]).toEqual('anyApp1')
  })

  test('# case 5: entry-block can freeze the env to prevent other blocks to use middlewares', async () => {
    console.error = jest.fn()
    const app = createBlock('case5')
    const blocksCreatedByMiddleware: string[] = []
    registerBlock(app)
    hostApp.run((env) => {
      env.freeze()
    })
    app.run((env) => {
      env.use(createBlockMiddleware(['anyApp2'], blocksCreatedByMiddleware))
    })
    try {
      await app.activate('anyApp2')
    } catch (e) {
      expect(e.message).toEqual(Errors.resourceNotDeclared('anyApp2', 'DEFAULT_BUS'))
    }
    expect(blocksCreatedByMiddleware).toHaveLength(0)
    hostApp.run((env) => {
      env.unfreeze()
    })
    app.run((env) => {
      env.use(createBlockMiddleware(['anyApp3'], blocksCreatedByMiddleware))
    })
    await app.activate('anyApp3')
    expect(blocksCreatedByMiddleware).toHaveLength(1)
    expect(blocksCreatedByMiddleware[0]).toEqual('anyApp3')
    expect(console.error).toBeCalledTimes(2) // called by the native-loader
  })
})
