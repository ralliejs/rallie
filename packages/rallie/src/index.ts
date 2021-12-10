import { getBus } from '@rallie/core'
import type { App } from './app'

export function registerApp (app: App) {
  const bus = getBus()
  return bus.createApp(app.name)
}

export { App } from './app'

export type { Connector } from './connector'
export type {
  App as Registrant,
  CallbackType,
  ScriptType,
  LinkType,
  AssetsConfigType,
  ConfType,
  ContextType,
  NextFnType,
  MiddlewareFnType,
  LifecyleCallbackType,
  DependencyType,
  RelateType,
  Bus
} from '@rallie/core'
