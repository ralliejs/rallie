// eslint-disable-next-line vue/prefer-import-from-vue
import { readonly } from '@vue/reactivity'
import { EventEmitter } from './event-emitter'
import { Socket } from './socket'
import { App } from './app'
import { Errors, compose } from './utils'
import loader from './loader'
import type { MiddlewareFnType, ContextType, NextFnType, ConfType, StoresType } from '../types' // eslint-disable-line

export class Bus {
  #name: string
  #eventEmitter: EventEmitter = new EventEmitter()
  #stores: StoresType = {}
  #apps: Record<string, App | boolean> = {}
  #loadingApps: Record<string, Promise<void>> = {}

  public conf: ConfType = readonly({
    assets: {},
  })

  #middlewares: MiddlewareFnType[] = []
  #composedMiddlewareFn: (ctx: ContextType, next: NextFnType) => Promise<any>

  constructor(name: string) {
    this.#name = name
    this.#composedMiddlewareFn = compose(this.#middlewares)
  }

  #isRallieCoreApp(appName: string) {
    return this.#apps[appName] && typeof this.#apps[appName] !== 'boolean'
  }

  #createContext(name: string) {
    const context: ContextType = {
      name,
      loadScript: loader.loadScript,
      loadLink: loader.loadLink,
    }
    return context
  }

  async #loadResourcesFromAssetsConfig(ctx: ContextType) {
    const { name, loadScript = loader.loadScript, loadLink = loader.loadLink } = ctx
    const { assets } = this.conf
    if (assets[name]) {
      // insert link tag first
      assets[name].css &&
        assets[name].css.forEach((asset) => {
          loadLink(asset)
        })
      // load and execute js
      if (assets[name].js) {
        for (const asset of assets[name].js) {
          await loadScript(asset)
        }
      }
    } else {
      throw new Error(Errors.resourceNotDeclared(name, this.#name))
    }
  }

  async #innerActivateApp(name: string, visitedPath: string[]) {
    await this.loadApp(name)
    if (this.#isRallieCoreApp(name)) {
      const app = this.#apps[name] as App
      await this.#loadRelatedApps(app)
      const startIndex = visitedPath.indexOf(name)
      if (startIndex !== -1) {
        const circularPath = [...visitedPath.slice(startIndex), name]
        throw new Error(Errors.circularDependencies(name, circularPath))
      }
      if (!app.activated) {
        const activating = async () => {
          await this.#activateDependencies(app, [...visitedPath, name])
          app.doActivate && (await Promise.resolve(app.doActivate()))
        }
        app.activated = activating()
      }
      await app.activated
    }
  }

  async #activateDependencies(app: App, visitedPath: string[]) {
    if (app.dependencies.length !== 0) {
      for (const appName of app.dependencies) {
        await this.#innerActivateApp(appName, visitedPath)
      }
    }
  }

  async #loadRelatedApps(app: App) {
    await Promise.all(app.relatedApps.map((appName) => this.loadApp(appName)))
  }

  public createSocket() {
    return new Socket(this.#eventEmitter, this.#stores)
  }

  public existApp(name: string) {
    return !!this.#apps[name]
  }

  public createApp(name: string) {
    if (this.existApp(name)) {
      throw new Error(Errors.createExistingApp(name))
    }
    const app = new App(name)
    this.#apps[name] = app
    return app
  }

  public async loadApp(name: string) {
    if (!this.#apps[name]) {
      if (!this.#loadingApps[name]) {
        this.#loadingApps[name] = new Promise((resolve, reject) => {
          const context = this.#createContext(name)
          // apply the middlewares
          this.#composedMiddlewareFn(context, this.#loadResourcesFromAssetsConfig.bind(this))
            .then(() => {
              const isLib = name.startsWith('lib:')
              if (isLib && !this.#apps[name]) {
                this.#apps[name] = true
              }
              if (!this.#apps[name]) {
                reject(new Error(Errors.appNotCreated(name)))
              }
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
      await this.#loadingApps[name]
    }
  }

  public async activateApp(name: string) {
    await this.#innerActivateApp(name, [])
  }

  public config(conf: Partial<ConfType>) {
    this.conf = {
      ...this.conf,
      ...conf,
      assets: {
        ...this.conf.assets,
        ...(conf?.assets || {}),
      },
    }
    return this
  }

  public use(middleware: MiddlewareFnType) {
    if (typeof middleware !== 'function') {
      throw new Error(Errors.wrongMiddlewareType())
    }
    this.#middlewares.push(middleware)
    this.#composedMiddlewareFn = compose(this.#middlewares)
    return this
  }
}

const busProxy = {}
export const DEFAULT_BUS_NAME = 'DEFAULT_BUS'

export const createBus = (name: string = DEFAULT_BUS_NAME) => {
  if (window.RALLIE_BUS_STORE === undefined) {
    Reflect.defineProperty(window, 'RALLIE_BUS_STORE', {
      value: busProxy,
      writable: false,
    })
  }

  if (window.RALLIE_BUS_STORE[name]) {
    throw new Error(Errors.duplicatedBus(name))
  } else {
    const bus = new Bus(name)
    Reflect.defineProperty(window.RALLIE_BUS_STORE, name, {
      value: bus,
      writable: false,
      configurable: false,
    })
    return bus
  }
}

export const getBus = (name: string = DEFAULT_BUS_NAME) => {
  return window.RALLIE_BUS_STORE && window.RALLIE_BUS_STORE[name]
}

export const touchBus = (name: string = DEFAULT_BUS_NAME): [Bus, boolean] => {
  let bus: Bus = null
  let isHost: boolean = false
  const existedBus = getBus(name)
  if (existedBus) {
    bus = existedBus
    isHost = false
  } else {
    bus = createBus(name)
    isHost = true
  }
  return [bus, isHost]
}
