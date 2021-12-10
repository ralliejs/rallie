import * as utils from '../src/lib/utils'
import * as loader from '../src/lib/loader'
import nock from 'nock'

nock('https://cdn.rallie.com')
  .get('/test-fetch1.js')
  .reply(200, 'console.log("Hello Rallie")')
  .get('/test-fetch2.js')
  .reply(200, 'console.log("Hello Rallie")')
  .get('/test-fetch3.js')
  .reply(200, 'console.log("Hello Rallie")')
  .get('/test-load1.js')
  .reply(200, 'console.log("Hello Rallie")')
  .get('/test-load2.js')
  .reply(200, 'console.log("Hello Rallie")')
  .get('/test-load3.js')
  .reply(200, 'console.log("Hello Rallie")')

describe('Test utils', () => {
  test('#case2: test isPrimitive', () => {
    expect(utils.isPrimitive({})).toBeFalsy()
    expect(utils.isPrimitive(null)).toBeFalsy()
    expect(utils.isPrimitive('')).toBeTruthy()
    expect(utils.isPrimitive(1)).toBeTruthy()
    expect(utils.isPrimitive(false)).toBeTruthy()
  })
})

describe('Test loaders', () => {
  test('test fetchScript', async () => {
    console.log = jest.fn()
    const fetchScript = loader.fetchScript(window.fetch)
    const code1 = await fetchScript('https://cdn.rallie.com/test-fetch1.js')
    const code2 = await fetchScript({ src: 'https://cdn.rallie.com/test-fetch2.js' })
    const script = document.createElement('script')
    script.src = 'https://cdn.rallie.com/test-fetch3.js'
    const code3 = await fetchScript(script)
    loader.excuteCode(code1)
    loader.excuteCode(code2)
    loader.excuteCode(code3)
    expect(console.log).toHaveBeenCalledWith('Hello Rallie')
    expect(console.log).toHaveBeenCalledTimes(3)
  })

  test('test loadScript', async () => {
    console.log = jest.fn()
    const loadScript = loader.loadScript
    await loadScript('https://cdn.rallie.com/test-load1.js')
    await loadScript({ src: 'https://cdn.rallie.com/test-load2.js' })
    const script = document.createElement('script')
    script.src = 'https://cdn.rallie.com/test-load3.js'
    await loadScript(script)
    expect(console.log).toHaveBeenCalledWith('Hello Rallie')
    expect(console.log).toHaveBeenCalledTimes(3)
  })
})
