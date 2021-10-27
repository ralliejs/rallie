import { getBus } from '@rallie/core'
import { App } from './app'

export function registerApp (app: App) {
  const bus = getBus()
  return bus.createApp(app.name)
}

export { App } from './app'
