import { createBus } from '@rallie/core'
import { loadHtml } from '../src/load-html'
import nock from 'nock'

nock('https://cdn.rallie.com/test')
  .get('/case1.html')
  .reply(
    200,
    `
    <html>
      <body>
        <link href="/case.css"></link>
        <div id="case1">
          case1 root
        </div>
        <style>
          body { margin: 0px }
        </style>
        <script src="/test/remote.js"></script>
        <script>
          window.RALLIE_BUS_STORE.case1.createApp('case1').onActivate(() => { console.log('case1 app is created') })
        </script>
      </body>
    </html>
  `,
  )
  .get('/case2.html')
  .reply(
    200,
    `
    <html>
      <body>
        <div id="case2">
          case2 root
        </div>
        <script src="/another-remote.js"></script>
        <script>
          window.RALLIE_BUS_STORE.case2.createApp('case2').onActivate(() => { console.log('case2 app is created') })
        </script>
      </body>
    </html>
  `,
  )
  .get('/remote.js')
  .reply(200, "console.log('remote.js loaded')") // eslint-disable-line
  .get('/another-remote.js')
  .reply(200, "console.log('another remote.js loaded')") // eslint-disable-line
  .get('/case3.html')
  .reply(
    200,
    `
    <html>
      <head>
        <link href="/case3.css"></link>
        <style></style>
      </head>
      <body>
        <script id="script1">
          window.RALLIE_BUS_STORE.case3.createApp('case3').onActivate(() => { console.log('script1 loaded') })
        </script>
        <script id="sciprt2">console.log('script2 loaded')</script>
      </body>
    </html>
  `,
  )

describe('Test the load-html middleware', () => {
  afterEach(() => {
    if (document.head) {
      document.head.innerHTML = ''
    }
    if (document.body) {
      document.body.innerHTML = ''
    }
  })
  test('#case1: test load-html middleware with entries', async () => {
    const bus = createBus('case1')
    bus.use(
      loadHtml({
        entries: {
          case1: 'https://cdn.rallie.com/test/case1.html#case1',
        },
      }),
    )
    console.log = jest.fn()
    await bus.activateApp('case1')
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith('remote.js loaded')
    expect(console.log).toHaveBeenCalledWith('case1 app is created')
    expect(document.getElementsByTagName('link').length).toEqual(1)
    expect(document.getElementsByTagName('style').length).toEqual(1)
    expect(document.getElementsByTagName('script').length).toEqual(2)
    expect(document.getElementById('case1')?.innerHTML.trim()).toEqual('case1 root')
  })

  test('#case2: test load-html with other middleware', async () => {
    const root = document.createElement('span')
    root.id = 'case2'
    document.body.appendChild(root)
    const bus = createBus('case2')
    bus
      .use(
        loadHtml({
          fetch: window.fetch,
          regardHtmlPathAsRoot: true,
        }),
      )
      .use(async (ctx) => {
        await ctx.loadHtml(`https://cdn.rallie.com/test/${ctx.name}.html#case2`)
      })
    console.log = jest.fn()
    await bus.activateApp('case2')
    expect(console.log).toHaveBeenCalledWith('another remote.js loaded')
    expect(console.log).toHaveBeenCalledWith('case2 app is created')
    expect(root.innerHTML.trim()).toEqual('case2 root')
  })

  test('#case3: test filter', async () => {
    const bus = createBus('case3')
    bus.use(
      loadHtml({
        entries: {
          case3: 'https://cdn.rallie.com/test/case3.html',
        },
        filter: (element) => {
          if (element.tagName.toLowerCase() === 'script') {
            return element.id === 'script1'
          }
          return false
        },
      }),
    )
    console.log = jest.fn()
    await bus.activateApp('case3')
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('script1 loaded')
    expect(document.getElementsByTagName('link').length).toEqual(0)
    expect(document.getElementsByTagName('style').length).toEqual(0)
    expect(document.getElementsByTagName('script').length).toEqual(1)
  })
})
