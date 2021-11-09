import cheerio from 'cheerio'
import * as utils from '../src/utils'

describe('Test utils', () => {
  test('#case1: test getEntirePath', () => {
    console.error = jest.fn()
    expect(utils.getEntirePath('/a/b/c.js', 'https://test.com/prefix/index.html', false)).toEqual('https://test.com/a/b/c.js')
    expect(utils.getEntirePath('/a/b/c.js', 'https://test.com/prefix/index.html', true)).toEqual('https://test.com/prefix/a/b/c.js')
    expect(utils.getEntirePath('/a/b/c.js', 'http://test.com/prefix/index.html', true)).toEqual('http://test.com/prefix/a/b/c.js')
    expect(utils.getEntirePath('/a/b/c.js', '//test.com/prefix/index.html', true)).toEqual('//test.com/prefix/a/b/c.js')

    expect(utils.getEntirePath('d/e/f.js', 'https://test.com/a/b/index.html', false)).toEqual('https://test.com/a/b/d/e/f.js')
    expect(utils.getEntirePath('d/e/f.js', 'https://test.com/a/b/index.html', true)).toEqual('https://test.com/a/b/d/e/f.js')
    expect(utils.getEntirePath('d/e/f.js', 'http://test.com/a/b/index.html', true)).toEqual('http://test.com/a/b/d/e/f.js')
    expect(utils.getEntirePath('d/e/f.js', '//test.com/a/b/index.html', true)).toEqual('//test.com/a/b/d/e/f.js')

    expect(utils.getEntirePath('./d/e/f.js', 'https://test.com/a/b/index.html', false)).toEqual('https://test.com/a/b/d/e/f.js')
    expect(utils.getEntirePath('./d/e/f.js', 'https://test.com/a/b/index.html', true)).toEqual('https://test.com/a/b/d/e/f.js')
    expect(utils.getEntirePath('./d/e/f.js', 'http://test.com/a/b/index.html', true)).toEqual('http://test.com/a/b/d/e/f.js')
    expect(utils.getEntirePath('./d/e/f.js', '//test.com/a/b/index.html', true)).toEqual('//test.com/a/b/d/e/f.js')

    expect(utils.getEntirePath('../d/e/f.js', 'https://test.com/a/b/index.html', false)).toEqual('https://test.com/a/d/e/f.js')
    expect(utils.getEntirePath('../d/e/f.js', 'https://test.com/a/b/index.html', true)).toEqual('https://test.com/a/d/e/f.js')
    expect(utils.getEntirePath('../d/e/f.js', 'http://test.com/a/b/index.html', true)).toEqual('http://test.com/a/d/e/f.js')
    expect(utils.getEntirePath('../d/e/f.js', '//test.com/a/b/index.html', true)).toEqual('//test.com/a/d/e/f.js')

    expect(utils.getEntirePath('/a/b/c.js', '/test.com')).toEqual('')
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenLastCalledWith(utils.errors.invalidEntirePath('/test.com', '/a/b/c.js'))
  })

  test('#case2: test getContent', () => {
    const $ = cheerio.load(`
      <html>
        <head>
          <script>
            console.log("hello world")
          </script>
          <style>
            body { margin: 0px }
          </style>
          <link href="xxxx.css"></link>
        </head>
      </html>
    `)
    expect(utils.getContent($('script').toArray()[0] as cheerio.TagElement).trim()).toEqual('console.log("hello world")')
    expect(utils.getContent($('style').toArray()[0] as cheerio.TagElement).trim()).toEqual('body { margin: 0px }')
    expect(utils.getContent($('link').toArray()[0] as cheerio.TagElement).trim()).toEqual('')
  })

  test('#case3: test getAttrs', () => {
    const $ = cheerio.load(`
      <html>
        <head>
          <script type="module" src="//a/b/c.js"></script>
          <script async defer src="a/b/c.js"></script>
          <script>
            console.log("hello world")
          </script>
          <link href="/a/b/c.css"></link>
          <style>
            body { margin: 0px }
          </style>
        </head>
      </html>
    `)
    const scripts = $('script').toArray().map(item => utils.getAttrs(item as cheerio.TagElement, '//jsdelivr/npm/test-library/index.html', false))
    const links = $('link').toArray().map(item => utils.getAttrs(item as cheerio.TagElement, '//jsdelivr/npm/test-library/index.html', true))
    const styles = $('style').toArray().map(item => utils.getAttrs(item as cheerio.TagElement, '//jsdelivr/npm/test-library/index.html', false))
    expect(scripts.length).toEqual(3)
    expect(links.length).toEqual(1)
    expect(styles.length).toEqual(1)

    expect(Object.keys(scripts[0]).length).toEqual(2)
    expect(scripts[0].type).toEqual('module')
    expect(scripts[0].src).toEqual('//a/b/c.js')
    expect(Object.keys(scripts[1]).length).toEqual(3)
    expect(scripts[1].async).toEqual(true)
    expect(scripts[1].defer).toEqual(true)
    expect(scripts[1].src).toEqual('//jsdelivr/npm/test-library/a/b/c.js')
    expect(Object.keys(scripts[2]).length).toEqual(1)
    expect((scripts[2].innerHTML as string).trim()).toEqual('console.log("hello world")')

    expect(Object.keys(links[0]).length).toEqual(1)
    expect(links[0].href).toEqual('//jsdelivr/npm/test-library/a/b/c.css')

    expect(Object.keys(styles[0]).length).toEqual(1)
    expect((styles[0].innerHTML as string).trim()).toEqual('body { margin: 0px }')

    console.error = jest.fn()
    const invalidScripts = $('script').toArray().map(item => utils.getAttrs(item as cheerio.TagElement, 'http:jsdelivr/npm/test-library/index.html', false))
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(Object.keys(invalidScripts[0]).length).toEqual(2)
    expect(invalidScripts[0].src).toBeDefined()
    expect(Object.keys(invalidScripts[1]).length).toEqual(2)
    expect(invalidScripts[1].src).toBeUndefined()
  })

  test('#case4: test insertStyle', () => {
    const $ = cheerio.load(`
      <html>
        <head>
          <style>
            body { margin: 0px }
          </style>
        </head>
      </html>
    `)
    const style = $('style').toArray()[0] as cheerio.TagElement
    utils.insertStyle(style)
    expect(document.getElementsByTagName('style').length).toEqual(1)
    const styleElement = document.getElementsByTagName('style')[0]
    expect(styleElement.innerHTML.trim()).toEqual('body { margin: 0px }')
  })
})
