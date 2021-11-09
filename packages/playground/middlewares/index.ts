import { MiddlewareFnType } from '@rallie/core'

export const jsdelivrLibraryLoader: MiddlewareFnType = async (ctx, next) => {
  const { name, libFilePath = '' } = ctx
  if (name.startsWith('lib:')) {
    const lib = name.slice(4)
    await ctx.loadScript(`https://cdn.jsdelivr.net/npm/${lib}${libFilePath}`)
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
  await ctx.loadHtml(`${window.location.origin}/rallie/apps/${ctx.name}/index.html`)
}
