import { ContextType, NextFnType } from '@rallie/core/dist/types'

export default (pool: string[]) => async (ctx: ContextType, next: NextFnType) => {
  pool.push(ctx.name)
  await next()
}
