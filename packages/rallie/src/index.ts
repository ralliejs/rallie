import { touchBus } from '@rallie/core'
import { CustomCtxType, CallbackType } from '@rallie/core/dist/types'
import { Configurator } from './configurator'
import { App } from './app'

export function createApp<
  PublicState extends object = {},
  PrivateState extends object = {},
  BroadcastEvents extends Record<string, CallbackType> = {},
  UnicastEvents extends Record<string, CallbackType> = {}
> (
  name: string,
  config?: (
    configurator: Configurator<PublicState, PrivateState>
  ) => void | Promise<void>
) {
  const [globalBus, isHost] = touchBus()
  const configurator = new Configurator<PublicState, PrivateState>(name, globalBus)
  config?.(configurator)
  const app = new App<PublicState, PrivateState, BroadcastEvents, UnicastEvents>(configurator, isHost)
  return app
}

export function activateApp<T = any> (ctx: CustomCtxType, data?: T) {
  const [bus] = touchBus()
  return bus.activateApp(ctx, data)
}

export const destroyApp = <T = any>(name: string, data?: T) => {
  const [bus] = touchBus()
  return bus.destroyApp(name, data)
}

export const loadApp = (ctx: CustomCtxType) => {
  const [bus] = touchBus()
  return bus.loadApp(ctx)
}
