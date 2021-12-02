import { MiddlewareFnType } from '@rallie/core'
import { parseHtml, getEntirePath, parseHtmlPath } from './utils'

export type Config = {
  regardHtmlPathAsRoot?: boolean,
  fetch?: typeof window.fetch,
  entries?: Record<string, string>
}

export const loadHtml = (config: Config = {}): MiddlewareFnType => async (ctx, next) => {
  const fetch = config.fetch ?? window.fetch
  ctx.loadHtml = async (url: string): Promise<boolean> => {
    const regardHtmlPathAsRoot = ctx.regardHtmlPathAsRoot ?? config.regardHtmlPathAsRoot ?? false
    const res = await fetch(url)
    const html = await res.text()
    const [basePath, rootSelector] = parseHtmlPath(url)
    const { root, scripts, links, styles } = parseHtml(html, rootSelector, (src) => {
      return getEntirePath(src, basePath, regardHtmlPathAsRoot)
    })
    for (const style of styles) {
      document.head.appendChild(style)
    }
    for (const link of links) {
      ctx.loadLink(link)
    }
    if (root) {
      const rootContainer = document.querySelector(rootSelector)
      if (rootContainer) {
        rootContainer.innerHTML = root.innerHTML
      } else {
        document.body.appendChild(root)
      }
    }
    for (const script of scripts) {
      await ctx.loadScript(script)
    }
    return !!(scripts.length + links.length + styles.length) || !!root
  }
  const htmlEntries = config.entries || {}
  const entryUrl = htmlEntries[ctx.name]
  if (entryUrl) {
    await ctx.loadHtml(entryUrl)
  } else {
    await next()
  }
}
