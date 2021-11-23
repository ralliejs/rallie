import { touchBus, CallbackType, Bus, Socket, CustomCtxType } from '@rallie/core'
import { constant, errors } from './utils'
import { Connector } from './connector'

interface AppConfig<State> {
  state?: State
}

export class App<
  State extends object = {},
  Events extends Record<string, CallbackType> = {},
  Methods extends Record<string, CallbackType> = {}
  > {
  private globalBus: Bus
  private globalSocket: Socket
  private isHost: boolean
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
    this.isHost = isHost
    if (isHost) {
      this.globalSocket.initState(constant.isGlobalBusAccessed, { value: false }, true)
    }
    const privateBus = touchBus(constant.privateBus(name))[0]
    this.socket = privateBus.createSocket()
    this.events = this.socket.createBroadcaster()
    this.methods = this.socket.createUnicaster()
    if (config?.state) {
      this.socket.initState(constant.stateNamespace(name), config.state)
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

  public setState (setter: (state: State) => void | Promise<void>) {
    if (this.socket.existState(constant.stateNamespace(this.name))) {
      return this.socket.setState(constant.stateNamespace(this.name), setter)
    } else {
      throw new Error(errors.stateNotInitialized(this.name))
    }
  }

  public watchState<P = any> (getter: (state: State, isWatchingEffect?: boolean) => undefined | P) {
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

  public load (ctx: CustomCtxType) {
    return this.globalBus.loadApp(ctx)
  }

  public activate<T> (ctx: CustomCtxType, data?: T) {
    return this.globalBus.activateApp(ctx, data)
  }

  public destroy<T> (name: string, data?: T) {
    return this.globalBus.destroyApp(name, data)
  }

  public async runInHostMode (callback: (bus: Bus, setBusAccessible: (val: boolean) => void) => (void | Promise<void>)) {
    if (this.isHost) {
      const setBusAccessible = (val: boolean) => {
        this.globalSocket.setState(constant.isGlobalBusAccessed, state => { state.value = val })
      }
      await Promise.resolve(callback(this.globalBus, setBusAccessible))
    }
  }

  public async runInRemoteMode (callback: (bus: Bus | null) => (void | Promise<void>)) {
    if (!this.isHost) {
      const bus = this.globalSocket.getState(constant.isGlobalBusAccessed)?.value ? this.globalBus : null
      await Promise.resolve(callback(bus))
    }
  }
}
