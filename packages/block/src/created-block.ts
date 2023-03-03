import { Bus, Socket, MiddlewareFnType, ConfType, touchBus, App } from '@rallie/core'
import { constant } from './utils'
import { BaseBlock, type BlockType } from './base-block'

export interface Env {
  isEntry: boolean
  conf: Bus['conf']
  use: (middleware: MiddlewareFnType) => void
  config: (conf: Partial<ConfType>) => void
  freeze: () => void
  unfreeze: () => void
}

export class CreatedBlock<T extends BlockType> extends BaseBlock<T> {
  #globalBus: Bus
  #globalSocket: Socket
  #isEntry: boolean
  #socket: Socket
  #app: App
  #connectedBlocks: Record<string, BlockType> = {}

  constructor(name: string, globalBus: Bus, globalSocket: Socket, isEntry: boolean) {
    const [bus] = touchBus(constant.privateBus(name))
    const socket = bus.createSocket()
    super(name, name, socket)
    this.#socket = socket
    this.#globalBus = globalBus
    this.#globalSocket = globalSocket
    this.#app = globalBus.createApp(name)
    this.#isEntry = isEntry
  }

  public initState(state: T['state'], isPrivate?: boolean) {
    this.#socket.initState(constant.stateNamespace(this.name), state as object, isPrivate)
    return this
  }

  public addMethods(methods: Partial<T['methods']>) {
    return this.#socket.onUnicast(methods)
  }

  public relyOn(dependencies: string[]) {
    this.#app.relyOn(dependencies)
    return this
  }

  public relateTo(relatedApps: string[]) {
    this.#app.relateTo(relatedApps)
    return this
  }

  public onActivate(callback: () => void | Promise<void>) {
    this.#app.onActivate(callback)
    return this
  }

  public connect<P extends BlockType>(name: string) {
    if (!this.#connectedBlocks[name]) {
      const [bus] = touchBus(constant.privateBus(name))
      const socket = bus.createSocket()
      this.#connectedBlocks[name] = new BaseBlock<P>(name, this.name, socket)
    }
    return this.#connectedBlocks[name] as BaseBlock<P>
  }

  public load(name: string) {
    return this.#globalBus.loadApp(name)
  }

  public activate(name: string) {
    return this.#globalBus.activateApp(name)
  }

  public async run(callback: (env: Env) => void | Promise<void>) {
    const isBusAccessible =
      this.#isEntry || this.#globalSocket.getState(constant.isGlobalBusAccessible)?.value
    const setBusAccessible = (isAccessible: boolean) => {
      if (this.#isEntry) {
        this.#globalSocket.setState(
          constant.isGlobalBusAccessible,
          isAccessible ? 'unfreeze the enviroment' : 'freeze the enviroment',
          (state) => {
            state.value = isAccessible
          },
        )
      }
    }
    const env: Omit<Env, 'conf'> = {
      isEntry: this.#isEntry,
      use: (middleware) => {
        if (isBusAccessible) {
          this.#globalBus.use(middleware)
        }
      },
      config: (conf) => {
        if (isBusAccessible) {
          this.#globalBus.config(conf)
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
            return JSON.parse(JSON.stringify(this.#globalBus.conf))
          }
          return Reflect.get(target, prop, receiver)
        },
        set: () => false,
      }),
    )
    await Promise.resolve(result)
  }
}
