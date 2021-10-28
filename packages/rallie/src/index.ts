import { getBus } from '@rallie/core'
import { App } from './app'

export function registerApp (app: App) {
  const bus = getBus()
  return bus.createApp(app.name)
}

/* istanbul ignore next */
export { App } from './app'
export { Connector } from './connector'
export { State, ReadOnlyState } from './state'
