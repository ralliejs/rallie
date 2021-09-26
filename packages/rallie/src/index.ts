import { touchBus } from '@rallie/core'
import { CustomCtxType, CallbackType } from '@rallie/core/dist/lib/types'
import { Configurator } from './configurator'
import { Contactor } from './contactor'

export function createApp<
  PublicState extends object = {},
  PrivateState extends object = {},
  BroadcastEvents extends Record<string, CallbackType> = {},
  UnicastEvents extends Record<string, CallbackType> = {}
> (
  name: string,
  config: (
    app: Configurator<PublicState, PrivateState>
  ) => void
) {
  const [globalBus, isHost] = touchBus()
  const configurator = new Configurator<PublicState, PrivateState>(name, globalBus, isHost)
  config(configurator)
  const contactor = new Contactor<PublicState, PrivateState, BroadcastEvents, UnicastEvents>(configurator)
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

export const loadApp = (ctx: CustomCtxType) => {
  const [bus] = touchBus()
  return bus.loadApp(ctx)
}
