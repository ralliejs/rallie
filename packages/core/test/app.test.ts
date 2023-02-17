import { createBus, App } from '../src'
import { Errors } from '../src/lib/utils'
import nock from 'nock'

type CharOf<T extends string = ''> = T extends `${infer First}${infer Rest}`
  ? First | CharOf<Rest>
  : never

describe('Test lifecycles of App', () => {
  const bus = createBus('testBus')
  test('# case 1: test the lifecycle of the app which indicates a synchronous activate callback', async () => {
    let activateCount = 0
    bus.createApp('case1').onActivate(() => {
      activateCount++
    })
    await bus.activateApp('case1')
    expect(activateCount).toEqual(1)
    bus.activateApp('case1')
    bus.activateApp('case1')
    bus.activateApp('case1')
    expect(activateCount).toEqual(1)
  })

  test('# case 2: test the lifecycle of the app which indicates a asynchronous callback', async () => {
    let activateCount = 0
    bus.createApp('case2').onActivate(async () => {
      activateCount++
    })
    const activated = bus.activateApp('case2')
    expect(activateCount).toEqual(0)
    await activated
    expect(activateCount).toEqual(1)
    await bus.activateApp('case2')
    await bus.activateApp('case2')
    await bus.activateApp('case2')
    expect(activateCount).toEqual(1)
  })

  test('#case 3: test activate an app multi times at a time', async () => {
    let activateCount = 0
    bus.createApp('case3').onActivate(async () => {
      activateCount++
    })
    await Promise.all([
      bus.activateApp('case3'),
      bus.activateApp('case3'),
      bus.activateApp('case3'),
    ])
    expect(activateCount).toEqual(1)
  })
})

describe('Test relations', () => {
  nock('https://cdn.rallie.com')
    .get('/assets/related-app.js')
    .reply(
      200,
      `
        (function() {
          const bus = window.RALLIE_BUS_STORE.DEFAULT_BUS;
          console.log('relatedApp is loaded')
          bus.createApp('relatedApp')
            .onActivate(() => {
              console.log('relatedApp is activated');
            })
        })()
      `,
    )
  const bus = createBus()
  bus.config({
    assets: {
      relatedApp: {
        js: ['https://cdn.rallie.com/assets/related-app.js'],
      },
    },
  })
  test('# case 1: activate an app, its related app will be loaded but not activated', async () => {
    console.log = jest.fn()
    const app = bus.createApp('case1')
    app.relateTo(['relatedApp']).onActivate(() => {
      console.log('case1 is activated')
    })
    await bus.activateApp('case1')
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('relatedApp is loaded')
    expect(console.log).toBeCalledWith('case1 is activated')
    await bus.activateApp('relatedApp')
    expect(console.log).toBeCalledWith('relatedApp is activated')
  })

  test('# case 2: circular relations is allowed', async () => {
    console.log = jest.fn()
    bus
      .createApp('case2-1')
      .relateTo(['case2-2'])
      .onActivate(() => {
        console.log('case2-1 is activated')
      })
    bus
      .createApp('case2-2')
      .relateTo(['case2-1'])
      .onActivate(() => {
        console.log('case2-2 is activated')
      })
    await Promise.all([bus.activateApp('case2-1'), bus.activateApp('case2-2')])
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('case2-1 is activated')
    expect(console.log).toBeCalledWith('case2-2 is activated')
  })
})

describe('Test dependencies', () => {
  const bus = createBus('testBus2')
  const appNameStrs = 'abcdefghijklmnopqr' as const
  const appNames = appNameStrs.split('') as Array<CharOf<typeof appNameStrs>>
  const apps = {} as Record<CharOf<typeof appNameStrs>, App>
  let activatedApps: string[] = []
  appNames.forEach((appName) => {
    const app = bus.createApp(appName).onActivate(async () => {
      activatedApps.push(appName)
    })
    apps[appName] = app
  })

  afterEach(() => {
    activatedApps = []
  })

  test('# case 1: test normal dependencies', async () => {
    /** the dependencies relationship
     * |-- a
     *     |--b
     *        |--c
     *     |--d
     *        |--e
     *        |--f
     *     |--g
     */
    apps.a.relyOn(['b', 'd', 'g'])
    apps.b.relyOn(['c'])
    apps.d.relyOn(['e']).relyOn(['f'])
    await bus.activateApp('a')
    expect(activatedApps.join(',')).toEqual('c,b,e,f,d,g,a')
  })

  test('# case 2: test circular dependency', async () => {
    /** the dependencies relationship
     * |--h----|
     *    |    |
     *    |----i
     * */
    apps.h.relyOn(['i'])
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
})
