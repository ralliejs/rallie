import { createBus } from '@rallie/core'
import { loadHtml } from '../src/load-html'
import nock from 'nock'

nock('https://cdn.rallie.com')
  .get('/case1.html')
  .reply(200, `
    <html>
      <body>
        <link href="/case.css"></link>
        <style>
          body { margin: 0px }
        </style>
        <script src="/remote.js"></script>
        <script>
          window.RALLIE_BUS_STORE.DEFAULT_BUS.createApp('case1').onBootstrap(() => { console.log('case1 app created') })
        </script>
      </body>
    </html>
  `)
  .get('/remote.js')
  .reply(200, "console.log('remote.js loaded')") // eslint-disable-line

describe('Test the load-html middleware', () => {
  const bus = createBus()
  test('#case1: test load-html middleware', async () => {
    bus.use(loadHtml({
      entries: {
        case1: 'https://cdn.rallie.com/case1.html'
      }
    }))
    console.log = jest.fn()
    await bus.activateApp('case1')
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith('remote.js loaded')
    expect(console.log).toHaveBeenCalledWith('case1 app created')
    expect(document.getElementsByTagName('link').length).toEqual(1)
    expect(document.getElementsByTagName('style').length).toEqual(1)
    expect(document.getElementsByTagName('script').length).toEqual(2)
  })
})
