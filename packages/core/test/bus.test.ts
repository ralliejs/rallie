import { createBus, getBus, touchBus } from '../src/index'
import { Bus } from '../src/lib/bus'
import nock from 'nock'
import { Errors } from '../src/lib/utils'
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    lastLoadingApp: string
    React: string
    RALLIE_BUS_STORE: Record<string, Bus | null>
  }
}

nock('https://cdn.rallie.com')
  .get('/assets/valid-app.js')
  .reply(
    200,
    `
      (function() {
        const bus = window.RALLIE_BUS_STORE.DEFAULT_BUS;
        bus.createApp('valid-app')
          .relyOn([
            'lib:react'
          ])
          .onActivate(() => {
            console.log('valid-app is created');
          })
      })()
  `,
  )
  .get('/assets/invalid-app.js')
  .reply(200, "console.log('invalid-app loaded');")
  .get('/assets/css-code.css')
  .reply(200, 'css-code')
  .get('/assets/react.js')
  .reply(200, "window.React = 'reactSourceCode'")

describe('Test the capability to load the resources of an app or lib', () => {
  const staticAssetsConfig = {
    'lib:react': {
      js: ['https://cdn.rallie.com/assets/react.js'],
    },
    'valid-app': {
      js: ['https://cdn.rallie.com/assets/valid-app.js'],
      css: ['https://cdn.rallie.com/assets/css-code.css'],
    },
    'invalid-app': {
      js: ['https://cdn.rallie.com/assets/invalid-app.js'],
    },
    'invalid-resource-app': {
      js: ['validFile.png'],
      css: ['/invalidFile.png'],
    },
  }

  const globalBus = createBus()
  globalBus
    .config({
      assets: staticAssetsConfig,
    })
    .use(async (ctx, next) => {
      window.lastLoadingApp = ctx.name
      await next()
    })

  test('# case 1: create a bus, it should be mounted on window.RALLIE_BUS_STORE ', () => {
    expect(getBus()).toBe(globalBus)
    expect(() => {
      window.RALLIE_BUS_STORE.DEFAULT_BUS = null
    }).toThrowError()
  })

  test('# case 2: activate valid-app, it should activate its dependencies and the onActivate callback should be called', async () => {
    console.log = jest.fn()
    await globalBus.activateApp('valid-app')
    expect(window.React).toEqual('reactSourceCode')
    expect(window.lastLoadingApp).toEqual('lib:react')
    expect(console.log).toBeCalledWith('valid-app is created')
  })

  test('# case 3: activate invalid-app, an error should be throwed', async () => {
    console.log = jest.fn()
    try {
      await globalBus.activateApp('invalid-app')
    } catch (error) {
      expect(error.message).toEqual(Errors.appNotCreated('invalid-app'))
      expect(window.lastLoadingApp).toEqual('invalid-app')
      expect(console.log).toBeCalledWith('invalid-app loaded')
    }
  })

  test('# case 4: activate an app which does not have valid resource declaration', async () => {
    console.error = jest.fn()
    try {
      await globalBus.activateApp('invalid-resource-app')
    } catch (error) {
      expect(error.message).toEqual(Errors.appNotCreated('invalid-resource-app'))
    }
  })

  test('# case 5: activate an non-existence app, an error should be throwed', async () => {
    const bus = createBus('case5-bus')
    try {
      await bus.activateApp('non-existence-app')
    } catch (error) {
      expect(error.message).toEqual(Errors.resourceNotDeclared('non-existence-app', 'case5-bus'))
    }
  })

  test('# case 6: test touchBus and default bus', () => {
    const [bus1, isBus1Host] = touchBus('case6-bus')
    expect(isBus1Host).toBeTruthy()
    expect(bus1).toEqual(window.RALLIE_BUS_STORE['case6-bus'])
    const [bus2, isBus2Host] = touchBus('case6-bus')
    expect(isBus2Host).toBeFalsy()
    expect(bus2).toEqual(bus1)
  })

  test('# case 7: test errors of bus', async () => {
    const bus = createBus('case7-bus')
    bus.createApp('case7')
    expect(() => {
      bus.createApp('case7')
    }).toThrowError(Errors.createExistingApp('case7'))

    bus
      .use(async (ctx, next) => {
        await next()
        await next()
      })
      .use(() => {
        // an empty middleware to prevent to go to the core middleware
      })
    try {
      await bus.activateApp('case7-1')
    } catch (error) {
      expect(error.message).toEqual(Errors.multipleCalledNextFn())
    }

    expect(() => {
      // @ts-ignore
      bus.use('')
    }).toThrowError(Errors.wrongMiddlewareType())

    expect(() => {
      createBus('case7-bus')
    }).toThrowError(Errors.duplicatedBus('case7-bus'))
  })
})
