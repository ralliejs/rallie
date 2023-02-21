import type { MiddlewareFnType } from '@rallie/block'

export const jsdelivrLibraryLoader =
  (filePathMap: Record<string, string> = {}): MiddlewareFnType =>
  async (ctx, next) => {
    const { name } = ctx
    if (name.startsWith('lib:')) {
      const lib = name.slice(4)
      const filePath = filePathMap[lib] || ''
      const start = Date.now()
      const src = `https://cdn.jsdelivr.net/npm/${lib}${filePath}`
      await ctx.loadScript(src)
      const end = Date.now()
      console.log(`load ${lib} from ${src}. cost ${end - start}ms`)
    } else {
      await next()
    }
  }

export const dynamicImportLoader: MiddlewareFnType = async (ctx, next) => {
  await import(`../apps/${ctx.name}/index.tsx`).catch(async (err) => {
    console.error(err)
    await next()
  })
}

// use @rallie/importHtml before use this middleware
export const htmlLoader: MiddlewareFnType = async (ctx, next) => {
  try {
    const src = `${window.location.origin}/rallie/apps/${ctx.name}/index.html#${ctx.name}`
    const start = Date.now()
    await ctx.loadHtml(src)
    const end = Date.now()
    console.log(`load ${ctx.name} from ${src}, cost ${end - start}ms`)
  } catch (err) {
    console.error(err)
    await next()
  }
}
