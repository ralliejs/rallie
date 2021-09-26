import { touchBus } from '@obvious-js/core'
import { CustomCtxType, CallbackType, MiddlewareFnType, ConfType } from '@obvious-js/core/dist/lib/types'
import { Configurator } from './configurator'
import { Contactor } from './contactor'

export function registerApp<
  PublicState extends object = {},
  PrivateState extends object = {},
  BroadcastEvents extends Record<string, CallbackType> = {},
  UnicastEvents extends Record<string, CallbackType> = {}
> (
  name: string,
  config: (
    app: Configurator<PublicState, PrivateState>,
    runInHostMode?: (callback: (use: (middleware: MiddlewareFnType) => void, config: (conf: ConfType) => void) => void) => void,
    runInRemoteMode?: (callback: () => any) => void
  ) => void
) {
  const [globalBus, isHost] = touchBus()
  const configurator = new Configurator<PublicState, PrivateState>(name, globalBus)
  const runInHostMode = (callback: (use: (middleware: MiddlewareFnType) => void, config: (conf: ConfType) => void) => void) => {
    if (isHost) {
      const use = (middleware: MiddlewareFnType) => {
        globalBus.use(middleware)
      }
      const config = (conf: ConfType) => {
        globalBus.config(conf)
      }
      callback(use, config)
    }
  }
  const runInRemoteMode = (callback: () => any) => {
    if (!isHost) {
      callback()
    }
  }
  config(configurator, runInHostMode, runInRemoteMode)
  const contactor = new Contactor<PublicState, PrivateState, BroadcastEvents, UnicastEvents>(configurator, runInHostMode, runInRemoteMode)
  return contactor
}

export function activateApp<T = any> (ctx: CustomCtxType, data?: T) {
  const [bus] = touchBus()
  return bus.activateApp(ctx, data)
}

export const destroyApp = <T = any>(name: string, data?: T) => {
  const [bus] = touchBus()
  return bus.destroyApp(name, data)
}
