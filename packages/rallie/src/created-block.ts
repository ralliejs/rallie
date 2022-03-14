import { ConnectedBlock } from './connected-block'
import type { CallbackType, Bus, Socket, MiddlewareFnType, ConfType } from '@rallie/core'
import { constant, warnings } from './utils'
import { Block } from './block'

export interface Env {
  isEntry: boolean
  conf: Bus['conf']
  use: (middleware: MiddlewareFnType) => void
  config: (conf: Partial<ConfType>) => void
  freeze: () => void
  unfreeze: () => void
}

export class CreatedBlock<
  State extends Record<string, any>,
  Events extends Record<string, CallbackType>,
  Methods extends Record<string, CallbackType>,
> extends Block<State, Events, Methods> {
  private globalBus: Bus
  private globalSocket: Socket
  private isEntry: boolean

  constructor(name: string, globalBus: Bus, isEntry: boolean) {
    super(name)
    this.isCreatedBlock = true
    this.globalBus = globalBus
    this.globalSocket = globalBus.createSocket()
    this.isEntry = isEntry
  }

  public initState(state: State, isPrivate: boolean = false) {
    this.socket.initState(constant.stateNamespace(this.name), state, isPrivate)
    // state should be initialized before the block is registered
    if (this.globalBus.existApp(this.name)) {
      console.warn(warnings.suggestToInitStateBeforeRegister(this.name))
    }
  }

  public addMethods(methods: Partial<Methods>) {
    return this.socket.onUnicast<Partial<Methods>>(methods)
  }

  public connect<
    ExternalState extends Record<string, any> = {},
    ExternalEvents extends Record<string, CallbackType> = never,
    ExternalMethods extends Record<string, CallbackType> = never,
  >(name: string) {
    return new ConnectedBlock<ExternalState, ExternalEvents, ExternalMethods>(name)
  }

  public load(name: string, ctx: Record<string, any> = {}) {
    return this.globalBus.loadApp(name, ctx)
  }

  public activate<T>(name: string, data?: T, ctx: Record<string, any> = {}) {
    return this.globalBus.activateApp(name, data, ctx)
  }

  public destroy<T>(name: string, data?: T) {
    return this.globalBus.destroyApp(name, data)
  }

  public async run(callback: (env: Env) => void | Promise<void>) {
    const isBusAccessible =
      this.isEntry || this.globalSocket.getState(constant.isGlobalBusAccessible)?.value
    const setBusAccessible = (isAccessible: boolean) => {
      if (this.isEntry) {
        this.globalSocket.setState(
          constant.isGlobalBusAccessible,
          isAccessible ? 'unfreeze the enviroment' : 'freeze the enviroment',
          (state) => {
            state.value = isAccessible
          },
        )
      }
    }
    const env: Env = {
      isEntry: this.isEntry,
      conf: JSON.parse(JSON.stringify(this.globalBus.conf)),
      use: (middleware) => {
        if (isBusAccessible) {
          this.globalBus.use(middleware)
        }
      },
      config: (conf) => {
        if (isBusAccessible) {
          this.globalBus.config(conf)
        }
      },
      freeze: () => {
        setBusAccessible(false)
      },
      unfreeze: () => {
        setBusAccessible(true)
      },
    }
    await Promise.resolve(callback(env))
  }
}
