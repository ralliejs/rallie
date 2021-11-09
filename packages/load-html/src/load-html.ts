import cheerio from 'cheerio'
import { MiddlewareFnType } from '@rallie/core'
import { getAttrs, insertStyle } from './utils'

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
    const $ = cheerio.load(html)
    const scripts = $('script').toArray()
    const links = $('link').toArray()
    const styles = $('style').toArray()
    links.forEach((link) => {
      ctx.loadLink(getAttrs(link as cheerio.TagElement, url, regardHtmlPathAsRoot))
    })
    styles.forEach((style) => {
      insertStyle(style as cheerio.TagElement)
    })
    for (const script of scripts) {
      await ctx.loadScript(getAttrs(script as cheerio.TagElement, url, regardHtmlPathAsRoot))
    }
    return !!(scripts.length + links.length + styles.length)
  }
  const htmlEntries = config.entries || {}
  const entryUrl = htmlEntries[ctx.name]
  if (entryUrl) {
    await ctx.loadHtml(entryUrl)
  } else {
    await next()
  }
}
