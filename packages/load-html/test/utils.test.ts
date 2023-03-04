import { parseHtmlPath } from './../src/utils'
import * as utils from '../src/utils'

describe('Test utils', () => {
  test('#case1: test getEntirePath', () => {
    console.error = jest.fn()
    expect(
      utils.getEntirePath('https://cdn.unpkg.com/react.js', 'https://test.com/index.html'),
    ).toBe('https://cdn.unpkg.com/react.js')
    expect(utils.getEntirePath('/a/b/c.js', 'https://test.com/prefix/index.html', false)).toEqual(
      'https://test.com/a/b/c.js',
    )
    expect(utils.getEntirePath('/a/b/c.js', 'https://test.com/prefix/index.html', true)).toEqual(
      'https://test.com/prefix/a/b/c.js',
    )
    expect(utils.getEntirePath('/a/b/c.js', 'http://test.com/prefix/index.html', true)).toEqual(
      'http://test.com/prefix/a/b/c.js',
    )
    expect(utils.getEntirePath('/a/b/c.js', '//test.com/prefix/index.html', true)).toEqual(
      '//test.com/prefix/a/b/c.js',
    )

    expect(utils.getEntirePath('d/e/f.js', 'https://test.com/a/b/index.html', false)).toEqual(
      'https://test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('d/e/f.js', 'https://test.com/a/b/index.html', true)).toEqual(
      'https://test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('d/e/f.js', 'http://test.com/a/b/index.html', true)).toEqual(
      'http://test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('d/e/f.js', '//test.com/a/b/index.html', true)).toEqual(
      '//test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('d/e/f.js', '//test.com/a/b/index.html?a=1#test', true)).toEqual(
      '//test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('d/e/f.js', '//test.com/a/b/index.html?a=1', true)).toEqual(
      '//test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('d/e/f.js', '//test.com/a/b/index.html#test', true)).toEqual(
      '//test.com/a/b/d/e/f.js',
    )

    expect(utils.getEntirePath('./d/e/f.js', 'https://test.com/a/b/index.html', false)).toEqual(
      'https://test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('./d/e/f.js', 'https://test.com/a/b/index.html', true)).toEqual(
      'https://test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('./d/e/f.js', 'http://test.com/a/b/index.html', true)).toEqual(
      'http://test.com/a/b/d/e/f.js',
    )
    expect(utils.getEntirePath('./d/e/f.js', '//test.com/a/b/index.html', true)).toEqual(
      '//test.com/a/b/d/e/f.js',
    )

    expect(utils.getEntirePath('../d/e/f.js', 'https://test.com/a/b/index.html', false)).toEqual(
      'https://test.com/a/d/e/f.js',
    )
    expect(utils.getEntirePath('../d/e/f.js', 'https://test.com/a/b/index.html', true)).toEqual(
      'https://test.com/a/d/e/f.js',
    )
    expect(utils.getEntirePath('../d/e/f.js', 'http://test.com/a/b/index.html', true)).toEqual(
      'http://test.com/a/d/e/f.js',
    )
    expect(utils.getEntirePath('../d/e/f.js', '//test.com/a/b/index.html', true)).toEqual(
      '//test.com/a/d/e/f.js',
    )

    expect(utils.getEntirePath('/a/b/c.js', 'ftp://test.com')).toEqual('')
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenLastCalledWith(
      utils.errors.invalidEntirePath('ftp://test.com', '/a/b/c.js'),
    )
  })

  test('#case2: test parseHtmlPath', () => {
    const [path1, selector1] = parseHtmlPath('https://test.com/prefix/index.html')
    expect(path1).toEqual('https://test.com/prefix/index.html')
    expect(selector1).toBeNull()
    const [path2, selector2] = parseHtmlPath('//test.com/prefix/index.html#test')
    expect(path2).toEqual('//test.com/prefix/index.html#test')
    expect(selector2).toEqual('#test')
    const [path3, selector3] = parseHtmlPath('http://test.com/prefix/index.html?_=123#test')
    expect(path3).toEqual('http://test.com/prefix/index.html?_=123#test')
    expect(selector3).toEqual('#test')
    const [path4, selector4] = parseHtmlPath('http://test.com/prefix/index.html?_=123')
    expect(path4).toEqual('http://test.com/prefix/index.html?_=123')
    expect(selector4).toBeNull()
    const [path5, selector5] = parseHtmlPath('http://test.com/prefix/index.html#test')
    expect(path5).toEqual('http://test.com/prefix/index.html#test')
    expect(selector5).toEqual('#test')
    expect(() => {
      parseHtmlPath('ftp://test.com/prefix')
    }).toThrowError(utils.errors.invalidHtmlPath('ftp://test.com/prefix'))
  })

  test('#case3: test parseHtml', () => {
    const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>test</title>
          <style>
            background-color: "green";
          </style>
          <style>
            color: "red";
          </style>
          <link href="1.css" />
          <link href="2.css" />
        </head>
        <body>
          <div id="app">app</div>
          <script>
            console.log("script1")
          </script>
          <script src="script2.js" />
        </body>
      </html>
    `
    const { scripts, links, styles, root } = utils.parseHtml(html)
    expect(root).toBeNull()
    expect(scripts.length).toEqual(2)
    expect(scripts[0].innerHTML.trim()).toEqual('console.log("script1")')
    expect(scripts[1].getAttribute('src')).toEqual('script2.js')
    expect(links.length).toEqual(2)
    expect(links[0].getAttribute('href')).toEqual('1.css')
    expect(links[1].getAttribute('href')).toEqual('2.css')
    expect(styles.length).toEqual(2)
    expect(styles[0].innerHTML.trim()).toEqual('background-color: "green";')
    expect(styles[1].innerHTML.trim()).toEqual('color: "red";')
    const { root: root2 } = utils.parseHtml(html, '#app')
    expect(root2?.innerHTML.trim()).toEqual('app')

    console.error = jest.fn()
    const result = utils.parseHtml('<div>xxxx<div>')
    // expect(console.error).toHaveBeenCalledTimes(1)
    expect(result.root).toBeNull()
    expect(result.scripts.length + result.links.length + result.styles.length).toEqual(0)
  })
})
