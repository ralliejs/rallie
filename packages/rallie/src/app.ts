import { State } from './state'
import { touchBus, createBus, CallbackType, MiddlewareFnType, ConfType, Bus, Socket, CustomCtxType } from '@rallie/core'
import { constant } from './utils'
import { Connector } from './connector'

interface AppConfig<PublicState, PrivateState> {
  name: string
  state?: {
    public?: PublicState
    private?: PrivateState
  }
}

export class App<
  BroadcastEvents extends Record<string, CallbackType> = {},
  UnicastEvents extends Record<string, CallbackType> = {},
  PublicState extends object = {},
  PrivateState extends object = {},
> {
  private globalBus: Bus
  private isHost: boolean
  private socket: Socket

  constructor (config: AppConfig<PublicState, PrivateState>) {
    this.name = config.name
    const [globalBus, isHost] = touchBus()
    this.globalBus = globalBus
    this.isHost = isHost
    const privateBus = createBus(constant.privateBus(config.name))
    this.socket = privateBus.createSocket()
    this.broadcaster = this.socket.createBroadcaster()
    this.unicaster = this.socket.createUnicaster()
    this.publicState = new State<PublicState>(this.socket, this.name, constant.publicStateNamespace, config?.state?.public)
    this.privateState = new State<PrivateState>(this.socket, this.name, constant.privateStateNamespace, config?.state?.private)
  }

  public name: string
  public broadcaster: BroadcastEvents
  public unicaster: UnicastEvents
  public publicState: State<PublicState>
  public privateState: State<PrivateState>

  public onBroadcast (broadcastEvents: Partial<BroadcastEvents>) {
    return this.socket.onBroadcast<Partial<BroadcastEvents>>(broadcastEvents)
  }

  public onUnicast (unicastEvents: Partial<UnicastEvents>) {
    return this.socket.onUnicast<Partial<UnicastEvents>>(unicastEvents)
  }

  public connect<
    ExternalBroadcastEvents extends Record<string, CallbackType> = {},
    ExternalUnicastEvents extends Record<string, CallbackType> = {},
    ExternalPublicState extends object = {},
    ExternalPrivateState extends object = {},
  > (appName: string) {
    return new Connector<ExternalBroadcastEvents, ExternalUnicastEvents, ExternalPublicState, ExternalPrivateState>(appName)
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

  public async runInHostMode (callback: (use?: (middleware: MiddlewareFnType) => void, config?: (conf: Partial<ConfType>) => void) => void | Promise<void>) {
    if (this.isHost) {
      const use = (middleware: MiddlewareFnType) => {
        this.globalBus.use(middleware)
      }
      const config = (conf: Partial<ConfType>) => {
        this.globalBus.config(conf)
      }
      await Promise.resolve(callback(use, config))
    }
  }

  public async runInRemoteMode (callback: () => any) {
    if (!this.isHost) {
      await Promise.resolve(callback())
    }
  }
}
