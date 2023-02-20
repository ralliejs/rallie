import { ConnectedBlock } from './connected-block'
import type { Bus, Socket, MiddlewareFnType, ConfType } from '@rallie/core'
import { constant, errors, SYMBOLS } from './utils'
import { Block, type BlockService } from './block'
import { socketsPool } from './sockets-pool'

export interface Env {
  isEntry: boolean
  conf: Bus['conf']
  use: (middleware: MiddlewareFnType) => void
  config: (conf: Partial<ConfType>) => void
  freeze: () => void
  unfreeze: () => void
}

export class CreatedBlock<T extends BlockService> extends Block<T> {
  private globalBus: Bus
  private globalSocket: Socket
  private isEntry: boolean
  private connectedBlocks: Record<string, BlockService> = {}
  public exports: T['exports']
  public symbol = SYMBOLS.CREATED_BLOCK

  constructor(name: string, globalBus: Bus, globalSocket: Socket, isEntry: boolean) {
    super(name)
    this.globalBus = globalBus
    this.globalSocket = globalSocket
    this.isEntry = isEntry
    socketsPool.set(name, this.socket)
  }

  public addMethods(methods: Partial<T['methods']>) {
    return this.socket.onUnicast<Partial<T['methods']>>(methods)
  }

  public connect<P extends BlockService>(name: string) {
    if (!this.connectedBlocks[name]) {
      this.connectedBlocks[name] = new ConnectedBlock<P>(name)
    }
    return this.connectedBlocks[name] as ConnectedBlock<P>
  }

  public load(name: string) {
    if (this.globalBus.existApp(this.name)) {
      return this.globalBus.loadApp(name)
    }
    throw new Error(errors.operateBeforeRegister(this.name, 'load'))
  }

  public activate(name: string) {
    if (this.globalBus.existApp(this.name)) {
      return this.globalBus.activateApp(name)
    }
    throw new Error(errors.operateBeforeRegister(this.name, 'activate'))
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
    const env: Omit<Env, 'conf'> = {
      isEntry: this.isEntry,
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
    const result = callback(
      new Proxy(env as Env, {
        get: (target, prop: keyof Env, receiver) => {
          if (prop === 'conf') {
            return JSON.parse(JSON.stringify(this.globalBus.conf))
          }
          return Reflect.get(target, prop, receiver)
        },
        set: () => false,
      }),
    )
    await Promise.resolve(result)
  }
}
