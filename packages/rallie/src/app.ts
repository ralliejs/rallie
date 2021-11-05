import { State } from './state'
import { touchBus, CallbackType, Bus, Socket, CustomCtxType } from '@rallie/core'
import { constant } from './utils'
import { Connector } from './connector'

interface AppConfig<PublicState, PrivateState> {
  state?: {
    public?: PublicState
    private?: PrivateState
  }
}

export class App<
  PublicState extends object = {},
  PrivateState extends object = {},
  Events extends Record<string, CallbackType> = {},
  Methods extends Record<string, CallbackType> = {}
  > {
  private globalBus: Bus
  private globalSocket: Socket
  private isHost: boolean
  private socket: Socket

  constructor (name: string, config?: AppConfig<PublicState, PrivateState>) {
    this.name = name
    this.isRallieApp = true
    const [globalBus, isHost] = touchBus()
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
    this.publicState = new State<PublicState>(this.socket, this.name, constant.publicStateNamespace, config?.state?.public)
    this.privateState = new State<PrivateState>(this.socket, this.name, constant.privateStateNamespace, config?.state?.private)
  }

  public name: string
  public events: Events
  public methods: Methods
  public publicState: State<PublicState>
  public privateState: State<PrivateState>
  public isRallieApp: boolean

  public listenEvents (events: Partial<Events>) {
    return this.socket.onBroadcast<Partial<Events>>(events)
  }

  public addMethods (methods: Partial<Methods>) {
    return this.socket.onUnicast<Partial<Methods>>(methods)
  }

  public connect<
    ExternalPublicState extends object = {},
    ExternalPrivateState extends object = {},
    ExternalEvents extends Record<string, CallbackType> = {},
    ExternalMethods extends Record<string, CallbackType> = {}
  > (appName: string) {
    return new Connector<ExternalPublicState, ExternalPrivateState, ExternalEvents, ExternalMethods>(appName)
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
