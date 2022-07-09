import { ConnectedBlock } from './connected-block'
import type { CallbackType, Bus, Socket, MiddlewareFnType, ConfType } from '@rallie/core'
import { constant, warnings } from './utils'
import type { ConstraintedType } from './utils'
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
  Exports extends Record<string, any>,
> extends Block<State, Events, Methods> {
  private globalBus: Bus
  private globalSocket: Socket
  private isEntry: boolean
  private exports: Exports | {}
  private exported: boolean

  constructor(name: string, globalBus: Bus, globalSocket: Socket, isEntry: boolean) {
    super(name)
    this.isCreatedBlock = true
    this.globalBus = globalBus
    this.globalSocket = globalSocket
    this.isEntry = isEntry
    this.exported = false
    this.exports = {}
    this.socket.onUnicast({
      [constant.exportMethodName]: () => this.exports,
    })
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

  public export(exports: Exports) {
    if (!this.exported) {
      this.exported = true
      this.exports = exports
    }
  }

  public connect<
    T extends {
      state?: Record<string, any>
      events?: Record<string, CallbackType>
      methods?: Record<string, CallbackType>
      exports?: Record<string, any>
    } = {},
  >(name: string) {
    return new ConnectedBlock<
      ConstraintedType<T['state'], undefined>,
      ConstraintedType<T['events'], never>,
      ConstraintedType<T['methods'], never>,
      ConstraintedType<T['exports'], {}>
    >(name)
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
    const isBusAccessible = this.isEntry || this.globalSocket.getState(constant.isGlobalBusAccessible)?.value
    const setBusAccessible = (isAccessible: boolean) => {
      if (this.isEntry) {
        this.globalSocket.setState(constant.isGlobalBusAccessible, isAccessible ? 'unfreeze the enviroment' : 'freeze the enviroment', (state) => {
          state.value = isAccessible
        })
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
