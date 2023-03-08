const message = (info: string) => `[@rallie/load-html] ${info}`

const basePathRegex = /^(http:\/\/|https:\/\/|\/\/)([^?#]*)(\?[^?#]+)?(#.+)?/

export const errors = {
  invalidHtmlPath: (basePath: string) => message(`Invalid html path: ${basePath}`),
  invalidEntirePath: (base: string, src: string) =>
    message(`Can not construct a url by the base '${base}' and the path '${src}'`),
}

export const getEntirePath = (src: string, base: string, regardHtmlPathAsRoot: boolean = false) => {
  if (/^(http:\/\/|https:\/\/|\/\/).+/.test(src)) {
    return src
  }
  const mathResult = basePathRegex.exec(base)
  if (mathResult) {
    const protocol = mathResult[1]
    const prePath = mathResult[2]
    if (regardHtmlPathAsRoot && src.startsWith('/')) {
      src = src.slice(1)
    }
    let url = ''
    const _protocol = protocol === '//' ? 'http://' : protocol
    url = new URL(src, _protocol + prePath).href
    if (protocol === '//') {
      url = url.slice(5)
    }
    return url
  } else {
    console.error(errors.invalidEntirePath(base, src))
    return ''
  }
}

const cloneElement = <T extends HTMLElement>(element: T): T => {
  const attributes = Array.from(element.attributes)
  const result = document.createElement(element.tagName) as T
  attributes.forEach((attr) => {
    result.setAttribute(attr.name, attr.value)
  })
  result.innerHTML = element.innerHTML
  return result
}

export const parseHtmlPath = (base: string): [string, string] => {
  const mathResult = basePathRegex.exec(base)
  if (mathResult) {
    const path = mathResult[0]
    const rootSelector = mathResult[4] || null
    return [path, rootSelector]
  } else {
    throw new Error(errors.invalidHtmlPath(base))
  }
}

export const parseHtml = (
  html: string,
  rootSelector?: string,
  transferPath?: (src: string) => string,
  filter: (element: HTMLElement) => boolean = () => true,
): {
  root?: HTMLElement
  scripts: Array<HTMLScriptElement>
  links: Array<HTMLLinkElement>
  styles: Array<HTMLStyleElement>
} => {
  const fragment = document.createElement('html')
  fragment.innerHTML = html
  const scripts = Array.from(fragment.querySelectorAll('script'))
    .filter(filter)
    .map((element) => cloneElement<HTMLScriptElement>(element))
    .map((element) => {
      const src = element.getAttribute('src')
      if (transferPath && src) {
        element.setAttribute('src', transferPath(src))
      }
      return element
    })
  const links = Array.from(fragment.querySelectorAll('link'))
    .filter(filter)
    .map((element) => cloneElement<HTMLLinkElement>(element))
    .map((element) => {
      const href = element.getAttribute('href')
      if (transferPath && href) {
        element.setAttribute('href', transferPath(href))
      }
      return element
    })
  const styles = Array.from(fragment.querySelectorAll('style'))
    .filter(filter)
    .map((element) => cloneElement<HTMLStyleElement>(element))
  return {
    root: rootSelector ? fragment.querySelector(rootSelector) : null,
    scripts,
    links,
    styles,
  }
}
