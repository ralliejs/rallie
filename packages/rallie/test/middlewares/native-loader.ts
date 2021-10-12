import { ContextType, NextFnType } from '@rallie/core/dist/lib/types'

export default async (ctx: ContextType, next: NextFnType) => {
  try {
    await import(`../apps/${ctx.name}.ts`)
  } catch (err) {
    console.error(err)
    await next()
  }
}
