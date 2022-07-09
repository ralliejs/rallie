import { Block } from './block'
import type { CallbackType } from '@rallie/core'
import { constant } from './utils'

export class ConnectedBlock<
  State extends Record<string, any>,
  Events extends Record<string, CallbackType>,
  Methods extends Record<string, CallbackType>,
  Exports extends Record<string, any>,
> extends Block<State, Events, Methods> {
  private innerMethods: {
    __RallieInnerExport__: () => Exports
  }

  constructor(name: string) {
    super(name)
    this.isCreatedBlock = false
    this.innerMethods = this.socket.createUnicaster()
  }

  import() {
    return this.innerMethods[constant.exportMethodName]()
  }
}
