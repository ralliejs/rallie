import { createBus, touchBus, App } from '../src'
import { Errors } from '../src/lib/utils'
import nock from 'nock'

describe('Test lifecycle of App', () => {
  const bus = createBus('testBus')
  test('# case 1: test the lifecycle of the app without destroy hook ', async () => {
    let activateCount = 0
    bus.createApp('case1').onActivate(() => {
      activateCount++
    })
    const { activated: firstActivated, destroy: destroyFirst } = bus.activateApp('case1')
    await firstActivated
    expect(activateCount).toEqual(1)
    await destroyFirst()
    expect(activateCount).toEqual(1)
    const { activated: secondActivated } = bus.activateApp('case1')
    await secondActivated
    expect(activateCount).toEqual(2)
  })

  test('# case 2: test the lifecycle of the app with destroy hook', async () => {
    let activateCount = 0
    bus.createApp('case2').onActivate(async () => {
      activateCount++
      return () => {
        activateCount--
      }
    })
    const { activated: firstActivated, destroy: destroyFirst } = bus.activateApp('case2')
    await firstActivated
    expect(activateCount).toEqual(1)
    await destroyFirst()
    expect(activateCount).toEqual(0)
  })

  test('# case 3: test the lifecycle of the app which only indicate the activate callback', (done) => {
    /**
     * app 'c' indicate only the activate callback
     * the activate callback will be called everytime it's activated
     */
    let activateCount = 0
    bus.createApp('case3').onActivate(async () => {
      activateCount++
    })
    bus
      .activateApp('case3')
      .then(() => {
        expect(activateCount).toEqual(1)
        return bus.activateApp('case3')
      })
      .then(() => {
        expect(activateCount).toEqual(2)
        done()
      })
  })

  test('# case 4: test the lifecycle of the app indicate the destroy callback', (done) => {
    /**
     * app 'd' indicate the destroy callback
     * the destroy callback should be called before it is destroyed
     * after it is destroyed, when the bus reactivate the app, it will recall the bootstrap lifecycle callback
     */
    let bootstraped = false
    let activated = false
    bus
      .createApp('case4')
      .onBootstrap(async () => {
        bootstraped = true
      })
      .onActivate(async () => {
        activated = true
      })
      .onDestroy(async () => {
        bootstraped = false
        activated = false
      })
    bus
      .activateApp('case4')
      .then(() => {
        expect(bootstraped).toBeTruthy()
        expect(activated).toBeFalsy()
        return bus.activateApp('case4')
      })
      .then(() => {
        expect(bootstraped).toBeTruthy()
        expect(activated).toBeTruthy()
        return bus.destroyApp('case4')
      })
      .then(() => {
        expect(bootstraped).toBeFalsy()
        expect(activated).toBeFalsy()
        return bus.activateApp('case4')
      })
      .then(() => {
        expect(bootstraped).toBeTruthy()
        expect(activated).toBeFalsy()
        done()
      })
  })

  test('#case 5: test activate an app multi times at a time', async () => {
    nock('https://test.case5.com')
      .get('/index.js')
      .reply(
        200,
        `
        const bus = window.RALLIE_BUS_STORE.DEFAULT_BUS
        bus.createApp('case5')
          .onBootstrap((counter) => {
            counter.bootstrap++
          })
          .onActivate((counter) => {
            counter.activate++
          })
      `,
      )
    const [bus] = touchBus()
    bus.config({
      assets: {
        case5: {
          js: ['https://test.case5.com/index.js'],
        },
      },
    })
    const counter = {
      bootstrap: 0,
      activate: 0,
    }
    await Promise.all([
      bus.activateApp('case5', counter),
      bus.activateApp('case5', counter),
      bus.activateApp('case5', counter),
    ])
    expect(counter.bootstrap).toEqual(1)
    expect(counter.activate).toEqual(2)
  })
})

describe('Test dependencies of App', () => {
  const bus = createBus('testBus2')
  const appNames = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
  ]
  const apps: Record<string, App> = {}
  let bootstrapedApps: string[] = []
  let reactivateApps: string[] = []
  appNames.forEach((appName) => {
    const app = bus.createApp(appName)
    apps[appName] = app
    app
      .onBootstrap(async () => {
        bootstrapedApps.push(appName)
      })
      .onActivate(async () => {
        reactivateApps.push(appName)
      })
      .onDestroy(async () => {
        bootstrapedApps.splice(bootstrapedApps.indexOf(appName), 1)
      })
  })

  afterEach(() => {
    appNames.forEach((appName) => {
      reactivateApps = []
      bus.destroyApp(appName)
    })
  })

  test('# case 1: test normal dependencies', (done) => {
    /** the dependencies relationship
     * |-- a
     *     |--b
     *        |--c
     *     |--d
     *        |--e
     *        |--f
     *     |--g
     */
    apps.a
      .relyOn(['b', 'd', 'g'])
      .relateTo(['b', 'c', 'd', 'e', { name: 'f', ctx: { version: '0.1.0' } }, 'g', 'b'])
    apps.b.relyOn(['c']).relateTo(['c']).relateTo(['c']) // circular relations doesn't matter
    apps.c.relyOn([]).relateTo(['b']) // circular relations doesn't matter
    apps.d.relyOn(['e']).relyOn(['f']) // test duplicated dependencies
    bus
      .activateApp('a')
      .then(() => {
        expect(bootstrapedApps.join(',')).toEqual('c,b,e,f,d,g,a')
        bootstrapedApps = []
        return bus.activateApp('a')
      })
      .then(() => {
        // reactivate app 'a', its dependencies shouldn't be reactivated
        expect(bootstrapedApps.join(',')).toEqual('')
        expect(reactivateApps.join(',')).toEqual('a')
        done()
      })
  })

  test('# case 2: test circular dependency', async () => {
    /** the dependencies relationship
     * |--h----|
     *    |    |
     *    |----i
     * */
    apps.h.relyOn([{ name: 'i', ctx: { version: '*' } }])
    apps.i.relyOn(['h'])
    try {
      await bus.activateApp('i')
    } catch (err) {
      expect(err.message).toEqual(Errors.circularDependencies('i', ['i', 'h', 'i']))
    }

    /** the dependencies relationship
     *         j<-------------|
     * |-------|--------|     |
     * k------>l        m     |
     * |       |        |     |
     * n------>o        p-----|
     * */
    apps.j.relyOn(['k', 'l', 'm'])
    apps.k.relyOn(['n', 'l'])
    apps.l.relyOn(['o'])
    apps.m.relyOn(['p'])
    apps.n.relyOn(['o'])
    apps.p.relyOn(['j'])
    try {
      await bus.activateApp('j')
    } catch (err) {
      expect(err.message).toEqual(Errors.circularDependencies('j', ['j', 'm', 'p', 'j']))
    }
  })

  test('# case 3: test params of lifecycles', (done) => {
    apps.q.relyOn([{ name: 'r', data: 'app named q activate me' }])
    apps.r.relyOn([]).onBootstrap(async (data) => {
      console.log(data)
    })
    console.log = jest.fn()
    bus.activateApp('q').then(() => {
      expect(console.log).toBeCalledWith('app named q activate me')
      done()
    })
  })
})
