import { ConnectedBlock, type ConnectedBlockType } from './connected-block'
import type { Bus, Socket, MiddlewareFnType, ConfType } from '@rallie/core'
import { constant } from './utils'
import { Block, type BlockType } from './block'

export interface Env {
  isEntry: boolean
  conf: Bus['conf']
  use: (middleware: MiddlewareFnType) => void
  config: (conf: Partial<ConfType>) => void
  freeze: () => void
  unfreeze: () => void
}

export type CreatedBlockType = BlockType & {
  exports?: Record<string, any>
}

export class CreatedBlock<T extends CreatedBlockType> extends Block<Omit<T, 'exports'>> {
  private globalBus: Bus
  private globalSocket: Socket
  private isEntry: boolean
  private connectedBlocks: Record<string, ConnectedBlockType> = {}
  public exported: T['exports']

  constructor(name: string, globalBus: Bus, globalSocket: Socket, isEntry: boolean) {
    super(name)
    this.isCreatedBlock = true
    this.globalBus = globalBus
    this.globalSocket = globalSocket
    this.isEntry = isEntry
  }

  public addMethods(methods: Partial<T['methods']>) {
    return this.socket.onUnicast<Partial<T['methods']>>(methods)
  }

  public connect<P extends ConnectedBlockType>(name: string) {
    if (!this.connectedBlocks[name]) {
      this.connectedBlocks[name] = new ConnectedBlock<P>(name)
    }
    return this.connectedBlocks[name] as ConnectedBlock<P>
  }

  public load(name: string, ctx: Record<string, any> = {}) {
    return this.globalBus.loadApp(name, ctx)
  }

  public activate<P>(name: string, data?: P, ctx: Record<string, any> = {}) {
    return this.globalBus.activateApp(name, data, ctx)
  }

  public destroy<P>(name: string, data?: P) {
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
