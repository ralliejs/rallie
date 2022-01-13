import { createBus, touchBus, App } from '../src'
import { Errors } from '../src/lib/utils'
import nock from 'nock'

describe('Test lifecycles of App', () => {
  const bus = createBus('testBus')
  test('# case 1: test the lifecycle of the app which indicate both bootstrap and activate callback', (done) => {
    /**
         * app 'a' indicates both bootstrap and activate callback,
         * when it is activated at the first time, the bootstrap callback should be called,
         * when it is activated after the first time , the activate callback should be called
         */
    let activateCount = 0
    bus.createApp('case1')
      .onBootstrap(() => {
        activateCount = 1
      }).onActivate(() => {
        activateCount++
      })
    bus.activateApp('case1').then(() => {
      expect(activateCount).toEqual(1)
      return bus.activateApp('case1')
    }).then(() => {
      expect(activateCount).toEqual(2)
      done()
    })
  })

  test('# case 2: test the lifecycle of the app which only indicate the bootstrap callback', (done) => {
    /**
         * app 'b' indicate only the bootstrap callback
         * when it is activated at the first time, the bootstrap callback should be called,
         * when it is activated after the first time, nothing will happen
         */
    let activateCount = 0
    bus.createApp('case2')
      .onBootstrap(async () => {
        activateCount++
      })
    bus.activateApp('case2').then(() => {
      expect(activateCount).toEqual(1)
      return bus.activateApp('case2')
    }).then(() => {
      expect(activateCount).toEqual(1)
      done()
    })
  })

  test('# case 3: test the lifecycle of the app which only indicate the activate callback', (done) => {
    /**
         * app 'c' indicate only the activate callback
         * the activate callback will be called everytime it's activated
         */
    let activateCount = 0
    bus.createApp('case3')
      .onActivate(async () => {
        activateCount++
      })
    bus.activateApp('case3').then(() => {
      expect(activateCount).toEqual(1)
      return bus.activateApp('case3')
    }).then(() => {
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
    bus.createApp('case4')
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
    bus.activateApp('case4').then(() => {
      expect(bootstraped).toBeTruthy()
      expect(activated).toBeFalsy()
      return bus.activateApp('case4')
    }).then(() => {
      expect(bootstraped).toBeTruthy()
      expect(activated).toBeTruthy()
      return bus.destroyApp('case4')
    }).then(() => {
      expect(bootstraped).toBeFalsy()
      expect(activated).toBeFalsy()
      return bus.activateApp('case4')
    }).then(() => {
      expect(bootstraped).toBeTruthy()
      expect(activated).toBeFalsy()
      done()
    })
  })

  test('#case 5: test activate an app multi times at a time', async () => {
    nock('https://test.case5.com')
      .get('/index.js')
      .reply(200, `
        const bus = window.RALLIE_BUS_STORE.DEFAULT_BUS
        bus.createApp('case5')
          .onBootstrap((counter) => {
            counter.bootstrap++
          })
          .onActivate((counter) => {
            counter.activate++
          })
      `)
    const [bus] = touchBus()
    bus.config({
      assets: {
        case5: {
          js: ['https://test.case5.com/index.js']
        }
      }
    })
    const counter = {
      bootstrap: 0,
      activate: 0
    }
    await Promise.all([
      bus.activateApp('case5', counter),
      bus.activateApp('case5', counter),
      bus.activateApp('case5', counter)
    ])
    expect(counter.bootstrap).toEqual(1)
    expect(counter.activate).toEqual(2)
  })
})

describe('Test dependencies of App', () => {
  const bus = createBus('testBus2')
  const appNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
  const apps: Record<string, App> = {}
  appNames.forEach((appName) => {
    const app = bus.createApp(appName)
    apps[appName] = app
    app.onBootstrap(async () => {
      bootstrapedApps.push(appName)
    }).onActivate(async () => {
      reactivateApps.push(appName)
    }).onDestroy(async () => {
      bootstrapedApps.splice(bootstrapedApps.indexOf(appName), 1)
    })
  })
  let bootstrapedApps = []
  let reactivateApps = []

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
    apps.a.relyOn(['b', 'd', 'g']).relateTo(['b', 'c', 'd', 'e', { name: 'f', ctx: { version: '0.1.0' } }, 'g', 'b'])
    apps.b.relyOn(['c']).relateTo(['c']).relateTo(['c']) // circular relations doesn't matter
    apps.c.relyOn([]).relateTo(['b']) // circular relations doesn't matter
    apps.d.relyOn(['e']).relyOn(['f']) // test duplicated dependencies
    bus.activateApp('a').then(() => {
      expect(bootstrapedApps.join(',')).toEqual('c,b,e,f,d,g,a')
      bootstrapedApps = []
      return bus.activateApp('a')
    }).then(() => {
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
