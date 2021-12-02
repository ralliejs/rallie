import * as loader from '../src/lib/loader'
import nock from 'nock'

nock('https://cdn.load-script.com')
  .get('/with-string.js')
  .reply(200, 'console.log("load script with string")')
  .get('/with-option.js')
  .reply(200, 'console.log("load script with option")')
  .get('/with-external-script.js')
  .reply(200, 'console.log("load script with external script")')

nock('https://cdn.load-link.com')
  .get('/with-string.css')
  .reply(200, 'body { color: red; }')
  .get('/with-option.css')
  .reply(200, 'body { color: blue; }')
  .get('/with-external-link.css')
  .reply(200, 'body { color: green; }')

describe('Test loader', () => {
  test('#case1: test loadScript', async () => {
    console.log = jest.fn()
    await loader.loadScript('https://cdn.load-script.com/with-string.js')
    await loader.loadScript({ src: 'https://cdn.load-script.com/with-option.js' })
    const script1 = document.createElement('script')
    script1.src = 'https://cdn.load-script.com/with-external-script.js'
    await loader.loadScript(script1)
    const script2 = document.createElement('script')
    script2.innerHTML = 'console.log("load script with internal script")'
    await loader.loadScript(script2)
    expect(console.log).toHaveBeenCalledWith('load script with string')
    expect(console.log).toHaveBeenCalledWith('load script with option')
    expect(console.log).toHaveBeenCalledWith('load script with external script')
    expect(console.log).toHaveBeenCalledWith('load script with internal script')
    expect(console.log).toHaveBeenCalledTimes(4)
  })

  test('#case2: test loadLink', () => {
    loader.loadLink('https://cdn.load-link.com/with-string.css')
    loader.loadLink({ href: 'https://cdn.load-link.com/with-option.css' })
    const link1 = document.createElement('link')
    link1.href = 'https://cdn.load-link.com/with-external-link.css'
    loader.loadLink(link1)
    const link2 = document.createElement('link')
    link2.innerHTML = 'body { color: pink; }'
    loader.loadLink(link2)
    expect(document.querySelectorAll('link').length).toBe(4)
  })
})
