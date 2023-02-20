import { MiddlewareFnType } from '@rallie/core'
import { registerBlock, createBlock } from '../../src'

export const createBlockMiddleware =
  (blocksToRegister: string[], registeredBlocks: string[]): MiddlewareFnType =>
  async (ctx, next) => {
    if (blocksToRegister.includes(ctx.name)) {
      registerBlock(createBlock(ctx.name))
      registeredBlocks.push(ctx.name)
    } else {
      await next()
    }
  }
