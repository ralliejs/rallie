import { createBus, getBus, touchBus } from '../src/index'
import { Bus } from '../src/lib/bus'
import nock from 'nock'
import cssCode from './test-apps/css'
import appToTestFetchScriptCode from './test-apps/app-to-test-fetch-script'
import appToTestLoadScriptCode from './test-apps/app-to-test-load-script'
import appInvalidCode from './test-apps/app-invalid'
import reactCode from './test-apps/react'
import { Errors } from '../src/lib/utils'

declare global {
  interface Window { // eslint-disable-line
    appsLoadedFromLocalhost: any;
    lastLoadingApp: any;
    React: any;
    RALLIE_BUS_STORE: Record<string, Bus>;
  }
}

nock('https://cdn.obvious.com')
  .get('/assets/app-to-test-fetch-script.js')
  .reply(200, appToTestFetchScriptCode)
  .get('/assets/app-to-test-load-script.js')
  .reply(200, appToTestLoadScriptCode)
  .get('/assets/cssCode.css')
  .reply(200, cssCode)
  .get('/assets/react.js')
  .reply(200, reactCode)

nock('https://localhost')
  .get('/assets/app-invalid.js')
  .reply(200, appInvalidCode)

describe('Test the capability to load the resources of an app or lib', () => {
  const staticAssetsConfig = {
    'lib:react': {
      js: [
        { src: 'https://cdn.obvious.com/assets/react.js' }
      ]
    },
    'app-to-test-fetch-script': {
      js: [
        'https://cdn.obvious.com/assets/app-to-test-fetch-script.js'
      ],
      css: [
        { href: 'https://cdn.obvious.com/assets/cssCode.css' },
        'https://cdn.obvious.com/assets/cssCode.css'
      ]
    },
    'app-to-test-load-script': {
      js: [
        'https://cdn.obvious.com/assets/app-to-test-load-script.js'
      ]
    },
    'invalid-resource-app': {
      js: [
        'validFile.png'
      ],
      css: [
        '/invalidFile.png'
      ]
    }
  }

  window.appsLoadedFromLocalhost = []

  const globalBus = createBus()
  globalBus.config({
    loadScriptByFetch: true,
    assets: staticAssetsConfig
  }).use(async (ctx, next) => {
    window.lastLoadingApp = ctx.name
    await next()
  }).use(async (ctx, next) => {
    if (ctx.loadedFromLocalhost) {
      window.appsLoadedFromLocalhost.push(ctx.name)
      const code = await ctx.fetchScript(`https://localhost/assets/${ctx.name}.js`)
      ctx.excuteCode(code)
    } else {
      await next()
    }
  })

  test('# case 1: create a bus, it should be mounted on window.RALLIE_BUS_STORE ', () => {
    expect(getBus()).toBe(globalBus)
    expect(() => {
      window.RALLIE_BUS_STORE.DEFAULT_BUS = null
    }).toThrowError()
  })

  test('# case 2: activate app-a, it should activate its dependencies and the bootstrap callback should be called', (done) => {
    console.log = jest.fn()
    globalBus.activateApp('app-to-test-fetch-script').then(() => {
      expect(window.React.value).toEqual('reactSourceCode')
      expect(window.lastLoadingApp).toEqual('lib:react')
      expect(console.log).toBeCalledWith('app-to-test-fetch-script is created')
      expect(window.appsLoadedFromLocalhost.length).toEqual(0)
      done()
    })
  })

  test('# case 3: activate app-invalid, the middleware should be excuted', (done) => {
    console.log = jest.fn()
    globalBus.activateApp({
      name: 'app-invalid',
      loadedFromLocalhost: true
    }).then(() => {
      throw new Error('this callback should not be reached')
    }).catch((error) => {
      expect(error.message).toEqual(Errors.appNotCreated('app-invalid'))
      expect(window.appsLoadedFromLocalhost[0]).toEqual('app-invalid')
      expect(window.lastLoadingApp).toEqual('app-invalid')
      expect(console.log).toBeCalledWith('app-invalid loaded')
      done()
    })
  })

  test('# case 4: activate an app which does not have valid resource declaration, console.error should be called', (done) => {
    console.error = jest.fn()
    globalBus.activateApp('invalid-resource-app').then(() => {
      throw new Error('this callback should not be reached')
    }).catch((error) => {
      expect(console.error).toBeCalledTimes(2)
      expect(error.message).toEqual(Errors.appNotCreated('invalid-resource-app'))
      done()
    })
  })

  test('# case 5: activate an non-existence app, an error should be throwed', (done) => {
    const bus = createBus('case5-bus')
    bus.activateApp('non-existence-app').then(() => {
      throw new Error('this callback should not be reached')
    }).catch((error) => {
      expect(error.message).toEqual(Errors.resourceNotDeclared('non-existence-app', 'case5-bus'))
      done()
    })
  })

  test('# case 6: test touchBus and default bus', () => {
    const [bus1, isBus1Host] = touchBus('case6-bus')
    expect(isBus1Host).toBeTruthy()
    expect(bus1).toEqual(window.RALLIE_BUS_STORE['case6-bus'])
    const [bus2, isBus2Host] = touchBus('case6-bus')
    expect(isBus2Host).toBeFalsy()
    expect(bus2).toEqual(bus1)
  })

  test('# case 7: test load script tag', async () => {
    globalBus.config({
      loadScriptByFetch: false
    })
    console.log = jest.fn()
    await globalBus.activateApp('app-to-test-load-script')
    expect(console.log).toHaveBeenCalledWith('app-to-test-load-script is created')
  })

  test('# case 8: test errors', (done) => {
    const bus = new Bus('case8-bus')
    bus.createApp('case8')
    expect(() => {
      bus.createApp('case8')
    }).toThrowError(Errors.createExistingApp('case8'))

    bus.use(async (ctx, next) => {
      await next()
      await next()
    }).use(() => {
      // an empty middleware to prevent to go to the core middleware
    })
    bus.activateApp('case8-1').then(() => {
      throw new Error('this should not be reached')
    }).catch((err) => {
      expect(err.message).toEqual(Errors.multipleCalledNextFn())
    })

    expect(() => {
      // @ts-ignore
      bus.use('')
    }).toThrowError(Errors.wrongMiddlewareType())

    // @ts-ignore
    bus.activateApp({}).then(() => {
      throw new Error('this should not be reached')
    }).catch((err) => {
      expect(err.message).toEqual(Errors.wrongContextType())
      done()
    })
  })

  test('# case 9: bus\'s name should be unique', () => {
    createBus('case9-bus')
    expect(() => {
      createBus('case9-bus')
    }).toThrowError(Errors.duplicatedBus('case9-bus'))
  })
})
