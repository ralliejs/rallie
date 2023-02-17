import type { Socket } from './lib/socket'
import type { Watcher } from './lib/watcher'

export type ScriptType = Partial<HTMLScriptElement> | string | HTMLScriptElement

export type LinkType = Partial<HTMLLinkElement> | string | HTMLLinkElement

export type AssetsConfigType = Record<
  string,
  {
    js?: Array<ScriptType>
    css?: Array<LinkType>
  }
>

export type ConfType = {
  assets: AssetsConfigType
  [key: string]: any
}

export type ContextType = {
  name: string
  loadScript: (script: ScriptType) => Promise<void>
  loadLink: (link: LinkType) => void
  [key: string]: any
}

export type NextFnType = (ctx?: ContextType) => void | Promise<void>

export type MiddlewareFnType = (ctx: ContextType, next: NextFnType) => void | Promise<void>

export type StoreType<T = any> = {
  state: T
  owner: Socket | null
  watchers: Set<Watcher<any>>
}

export type StoresType = Record<string, StoreType>

export { Socket } from './lib/socket'

export { Bus } from './lib/bus'

export { App } from './lib/app'
