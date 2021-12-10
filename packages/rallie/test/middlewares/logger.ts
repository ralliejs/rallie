import type { ContextType, NextFnType } from '@rallie/core'

export default (pool: string[]) => async (ctx: ContextType, next: NextFnType) => {
  pool.push(ctx.name)
  await next()
}
