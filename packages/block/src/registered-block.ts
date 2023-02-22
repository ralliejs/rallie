import { App, getBus, Socket } from '@rallie/core'
import { CreatedBlock } from './created-block'
import { socketsPool } from './sockets-pool'
import { constant, warnings } from './utils'
export class RegisteredBlock<T extends CreatedBlock<unknown>> {
  private socket: Socket
  private app: App
  private exports: T['exports'] = {}
  private exported = false
  constructor(private createdBlock: T) {
    this.app = getBus().createApp(createdBlock.name)
    this.socket = socketsPool.get(createdBlock.name)
    this.socket.onUnicast({
      [constant.exportMethodName]: () => this.exports,
    })
  }

  relyOn(dependencies: string[]) {
    this.app.relyOn(dependencies)
    return this
  }

  relateTo(relatedApps: string[]) {
    this.app.relateTo(relatedApps)
    return this
  }

  initState(state: T['state'], isPrivate?: boolean) {
    this.socket.initState(
      constant.stateNamespace(this.createdBlock.name),
      state as object,
      isPrivate,
    )
    return this
  }

  export(exports: T['exports']) {
    if (!this.exported) {
      Object.freeze(exports)
      this.exports = exports
      this.createdBlock.exports = exports
      this.exported = true
    } else {
      console.warn(warnings.duplicatedExports(this.createdBlock.name))
    }
    return this
  }

  onActivate(callback: () => void | Promise<void>) {
    this.app.onActivate(callback)
    return this
  }
}