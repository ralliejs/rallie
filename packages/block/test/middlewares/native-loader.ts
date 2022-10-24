import type { ContextType, NextFnType } from '@rallie/core'

export default async (ctx: ContextType, next: NextFnType) => {
  try {
    await import(`../blocks/${ctx.name}.ts`)
  } catch (err) {
    console.error(err)
    await next()
  }
}
