import { touchBus } from '@rallie/core'
import type { CallbackType, Bus, Socket, MiddlewareFnType, ConfType } from '@rallie/core'
import { constant, errors } from './utils'
import { Connector } from './connector'

interface AppConfig<State> {
  state?: State,
  isPrivate?: boolean
}

export interface Env {
  isEntry: boolean;
  conf: Bus['conf'];
  use: (middleware: MiddlewareFnType) => void;
  config: (conf: Partial<ConfType>) => void;
  freeze: (isFreezed: boolean) => void;
}

export class App<
  State extends object = {},
  Events extends Record<string, CallbackType> = {},
  Methods extends Record<string, CallbackType> = {}
  > {
  private globalBus: Bus
  private globalSocket: Socket
  private isEntry: boolean
  private socket: Socket

  constructor (name: string, config?: AppConfig<State>) {
    this.name = name
    this.isRallieApp = true
    const [globalBus, isHost] = touchBus()
    if (globalBus.existApp(name)) {
      throw new Error(errors.duplicatedAppName(name))
    }
    this.globalBus = globalBus
    this.globalSocket = globalBus.createSocket()
    this.isEntry = isHost
    if (isHost) {
      this.globalSocket.initState(constant.isGlobalBusAccessible, { value: true }, true)
    }
    const privateBus = touchBus(constant.privateBus(name))[0]
    this.socket = privateBus.createSocket()
    this.events = this.socket.createBroadcaster()
    this.methods = this.socket.createUnicaster()
    if (config?.state) {
      this.socket.initState(constant.stateNamespace(name), config.state, config?.isPrivate ?? false)
    }
    Reflect.defineProperty(this, 'state', {
      get: () => this.socket.getState<State, State>(constant.stateNamespace(this.name)),
      set: () => false
    })
  }

  public name: string
  public state: State
  public events: Events
  public methods: Methods
  public isRallieApp: boolean

  public setState (action: string, setter: (state: State) => void | Promise<void>) {
    if (this.socket.existState(constant.stateNamespace(this.name))) {
      return this.socket.setState(constant.stateNamespace(this.name), action, setter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public watchState<P = any> (getter: (state: State) => undefined | P) {
    if (this.socket.existState(constant.stateNamespace(this.name))) {
      return this.socket.watchState<State, P>(constant.stateNamespace(this.name), getter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public listenEvents (events: Partial<Events>) {
    return this.socket.onBroadcast<Partial<Events>>(events)
  }

  public addMethods (methods: Partial<Methods>) {
    return this.socket.onUnicast<Partial<Methods>>(methods)
  }

  public connect<
    ExternalState extends object = {},
    ExternalEvents extends Record<string, CallbackType> = {},
    ExternalMethods extends Record<string, CallbackType> = {}
  > (appName: string) {
    return new Connector<ExternalState, ExternalEvents, ExternalMethods>(appName)
  }

  public load (name: string, ctx: Record<string, any> = {}) {
    return this.globalBus.loadApp(name, ctx)
  }

  public activate<T> (name: string, data?: T, ctx: Record<string, any> = {}) {
    return this.globalBus.activateApp(name, data, ctx)
  }

  public destroy<T> (name: string, data?: T) {
    return this.globalBus.destroyApp(name, data)
  }

  public async run (callback: (env: Env) => (void | Promise<void>)) {
    const isBusAccessible = this.isEntry || this.globalSocket.getState(constant.isGlobalBusAccessible)?.value
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
      freeze: (isEnvFreezed) => {
        if (this.isEntry) {
          this.globalSocket.setState(
            constant.isGlobalBusAccessible, `${isEnvFreezed ? 'disable' : 'enable'} remote app to access the bus`,
            state => { state.value = !isEnvFreezed }
          )
        }
      }
    }
    await Promise.resolve(callback(env))
  }
}
