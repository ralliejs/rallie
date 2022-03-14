import { Block } from './block'
import type { CallbackType } from '@rallie/core'

export class ConnectedBlock<
  State extends Record<string, any>,
  Events extends Record<string, CallbackType>,
  Methods extends Record<string, CallbackType>,
> extends Block<State, Events, Methods> {
  constructor(name: string) {
    super(name)
    this.isCreatedBlock = false
  }
}
