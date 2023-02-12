import { App, getBus, LifecyleCallbackType, Socket, RelateType, DependencyType } from '@rallie/core'
import { CreatedBlock } from './created-block'
import { constant } from './utils'

type SetUpCallback<State, Exports> = (ctx: {
  initState: (state: State, isPrivate?: boolean) => void
  exports: (exported: Exports) => void
}) => any

export class RegisteredBlock<T extends CreatedBlock<unknown>> {
  private exported: T['exported']
  private socket: Socket
  private app: App
  constructor(private createdBlock: T) {
    this.app = getBus().createApp(createdBlock.name)
    this.exported = {}
    this.socket = getBus(constant.privateBus(createdBlock.name)).createSocket()
    this.socket.onUnicast({
      [constant.exportMethodName]: () => this.exported,
    })
  }

  relyOn(dependencies: DependencyType[]) {
    this.app.relyOn(dependencies)
    return this
  }

  relateTo(relatedApps: RelateType[]) {
    this.app.relateTo(relatedApps)
    return this
  }

  setup(callback: SetUpCallback<T['state'], T['exported']>) {
    // eslint-disable-next-line n/no-callback-literal
    callback({
      initState: (state, isPrivate?) => {
        this.socket.initState(
          constant.stateNamespace(this.createdBlock.name),
          state as object,
          isPrivate,
        )
      },
      exports: (exported) => {
        Object.freeze(exported)
        this.exported = exported
        this.createdBlock.exported = exported
      },
    })
    return this
  }

  onBootstrap(callback: LifecyleCallbackType) {
    this.app.onBootstrap(callback)
    return this
  }

  onActivate(callback: LifecyleCallbackType) {
    this.app.onActivate(callback)
    return this
  }

  onDestroy(callback: LifecyleCallbackType) {
    this.app.onDestroy(callback)
    return this
  }
}
