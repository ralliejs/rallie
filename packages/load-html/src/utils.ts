import cheerio from 'cheerio'
import path from 'path-browserify'

const message = (info: string) => `[@rallie/load-html] ${info}`

export const errors = {
  invalidEntirePath: (base: string, src: string) => message(`Can not construct a url by the base '${base}' and the path '${src}'`)
}

export const getEntirePath = (src: string, base: string, regardHtmlPathAsRoot: boolean = false) => {
  if (/^(http:\/\/|https:\/\/|\/\/).+/.test(src)) {
    return src
  }
  const regex = /^(http:\/\/|https:\/\/|\/\/)(.*)((?<=\/).+\.html$)/
  const mathResult = regex.exec(base)
  if (mathResult) {
    const protocol = mathResult[1]
    const prePath = mathResult[2]
    if (src.startsWith('../') || src.startsWith('./')) {
      return protocol + path.join(prePath, src)
    }
    if (regardHtmlPathAsRoot) {
      if (src.startsWith('/')) {
        src = src.slice(0)
      }
      return protocol + path.join(prePath, src)
    } else {
      let url = ''
      const _protocol = protocol === '//' ? 'http://' : protocol
      url = (new URL(src, _protocol + prePath)).href
      if (protocol === '//') {
        url = url.slice(5)
      }
      return url
    }
  } else {
    console.error(errors.invalidEntirePath(base, src))
    return ''
  }
}

export const getContent = (element: cheerio.TagElement) => {
  if (element.children.length === 1) {
    return element.children[0].data
  } else {
    return ''
  }
}

export const getAttrs = (element: cheerio.TagElement, base: string, regardHtmlPathAsRoot: boolean) => {
  const attrs: Record<string, string | boolean> = {}
  Object.entries(element.attribs).forEach(([key, value]) => {
    if (value === '') {
      attrs[key] = true
    } else if (['src', 'href'].includes(key)) {
      const entirePath = getEntirePath(value, base, regardHtmlPathAsRoot)
      if (entirePath) {
        attrs[key] = entirePath
      }
    } else {
      attrs[key] = value
    }
  })
  const content = getContent(element)
  if (content) {
    attrs.innerHTML = content
  }
  return attrs
}

export const insertStyle = (element: cheerio.TagElement) => {
  const attrs = element.attribs
  const content = getContent(element)
  const style = document.createElement('style')
  Object.entries(attrs).forEach(([attr, value]) => {
    style[attr] = value === '' ? true : value
  })
  if (content) {
    style.innerHTML = content
  }
  document.head.appendChild(style)
}
