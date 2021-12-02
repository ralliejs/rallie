import { EventEmitter } from './event-emitter'
import { Socket } from './socket'
import { App } from './app'
import { Errors, compose } from './utils'
import loader from './loader'
import { MiddlewareFnType, ContextType, NextFnType, ConfType, StoresType } from '../types'; // eslint-disable-line

export class Bus {
  private name: string
  private eventEmitter: EventEmitter = new EventEmitter()
  private stores: StoresType = {}
  private apps: Record<string, App | boolean> = {}
  private loadingApps: Record<string, Promise<void>> = {}

  private conf: ConfType = {
    maxBootstrapTime: 10 * 1000,
    fetch: null,
    assets: {}
  };

  private middlewares: MiddlewareFnType[] = []
  private composedMiddlewareFn: (ctx: ContextType, next: NextFnType) => Promise<any>

  public state: Record<string, any>

  constructor (name: string) {
    this.name = name
    this.composedMiddlewareFn = compose(this.middlewares)
  }

  private isRallieCoreApp (appName: string) {
    return this.apps[appName] && typeof this.apps[appName] !== 'boolean'
  }

  /**
   * config the bus
   * @param conf the new configuration object
   */
  public config (conf: Partial<ConfType>) {
    this.conf = {
      ...this.conf,
      ...conf,
      assets: {
        ...this.conf.assets,
        ...(conf?.assets || {})
      }
    }
    return this
  }

  /**
   * register the middleware
   * @param middleware
   */
  public use (middleware: MiddlewareFnType) {
    if (typeof middleware !== 'function') {
      throw new Error(Errors.wrongMiddlewareType())
    }
    this.middlewares.push(middleware)
    this.composedMiddlewareFn = compose(this.middlewares)
    return this
  }

  /**
   * create the context to pass to the middleware
   * @param ctx
   * @returns
   */
  private createContext (name: string, ctx: Record<string, any> = {}) {
    const context: ContextType = {
      name,
      loadScript: loader.loadScript,
      loadLink: loader.loadLink,
      fetchScript: loader.fetchScript(this.conf.fetch),
      excuteCode: loader.excuteCode,
      conf: this.conf,
      ...ctx
    }
    return context
  }

  /**
   * the core middleware
   * @param ctx the context
   */
  private async loadResourcesFromAssetsConfig (ctx: ContextType) {
    const {
      name,
      loadScript = loader.loadScript,
      loadLink = loader.loadLink,
      fetchScript = loader.fetchScript(this.conf.fetch),
      excuteCode = loader.excuteCode,
      conf = this.conf
    } = ctx
    const { assets, fetch } = conf
    if (assets[name]) {
      // insert link tag first
      assets[name].css &&
        assets[name].css.forEach((asset) => {
          const href = typeof asset === 'string' ? asset : asset.href
          if (/^.+\.css$/.test(href)) {
            loadLink(asset)
          } else {
            console.error(Errors.invalidResource(href))
          }
        })
      // load and execute js
      if (assets[name].js) {
        for (const asset of assets[name].js) {
          const src = typeof asset === 'string' ? asset : asset.src
          if (/^.+\.js$/.test(src)) {
            if (!fetch) {
              await loadScript(asset)
            } else {
              const code = await fetchScript(src)
              code && excuteCode(code)
            }
          } else {
            console.error(Errors.invalidResource(src))
          }
        }
      }
    } else {
      throw new Error(Errors.resourceNotDeclared(name, this.name))
    }
  }

  /**
   * create a socket
   * @return the socket instance
   */
  public createSocket () {
    return new Socket(this.eventEmitter, this.stores)
  }

  /**
   * return true if an app is created
   */
  public existApp (name: string) {
    return !!this.apps[name]
  }

  /**
   * create an app
   * @param name the name of the app
   * @return the app instance
   */
  public createApp (name: string) {
    if (this.existApp(name)) {
      throw new Error(Errors.createExistingApp(name))
    }
    const app = new App(name)
    this.apps[name] = app
    return app
  }

  /**
   * load the resources of an app
   * @param ctx
   */
  public async loadApp (name:string, ctx: Record<string, any> = {}) {
    if (!this.apps[name]) {
      if (!this.loadingApps[name]) {
        this.loadingApps[name] = new Promise((resolve, reject) => {
          const context = this.createContext(name, ctx)
          // apply the middlewares
          this.composedMiddlewareFn(context, this.loadResourcesFromAssetsConfig.bind(this)).then(() => {
            const isLib = name.startsWith('lib:')
            if (isLib && !this.apps[name]) {
              this.apps[name] = true
            }
            if (!this.apps[name]) {
              reject(new Error(Errors.appNotCreated(name)))
            }
            resolve()
          }).catch((error) => {
            reject(error)
          })
        })
      }
      await this.loadingApps[name]
    }
  }

  private async activateDependencies (app: App) {
    if (!app.dependenciesReady && app.dependencies.length !== 0) {
      for (const dependence of app.dependencies) {
        const { name, data, ctx } = dependence
        await this.activateApp(name, data, ctx)
      }
      app.dependenciesReady = true
    }
  }

  private async loadRelatedApps (app: App) {
    for (const { name, ctx } of app.relatedApps) {
      await this.loadApp(name, ctx)
    }
  }

  /**
   * activate an app
   * @param name
   * @param data
   */
  public async activateApp<T = any> (name: string, data?: T, ctx: Record<string, any> = {}) {
    await this.loadApp(name, ctx)
    if (this.isRallieCoreApp(name)) {
      const app = this.apps[name] as App
      await this.loadRelatedApps(app)
      if (!app.bootstrapping) {
        const bootstrapping = async () => {
          await this.activateDependencies(app)
          if (app.doBootstrap) {
            await Promise.resolve(app.doBootstrap(data))
          } else if (app.doActivate) {
            await Promise.resolve(app.doActivate(data))
          }
        }
        const timeout = (time: number) => new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            reject(new Error(Errors.bootstrapTimeout(name, time)))
          }, time)
        })
        app.bootstrapping = Promise.race([bootstrapping(), timeout(this.conf.maxBootstrapTime)])
        await app.bootstrapping
      } else {
        await app.bootstrapping
        app.doActivate && (await Promise.resolve(app.doActivate(data)))
      }
    }
  }

  /**
   * destroy an app
   * @param name
   * @param data
   */
  public async destroyApp<T = any> (name: string, data?: T) {
    if (this.isRallieCoreApp(name)) {
      const app = this.apps[name] as App
      app.doDestroy && (await Promise.resolve(app.doDestroy(data)))
      app.bootstrapping = null
      app.dependenciesReady = false
    }
  }
}

const busProxy = {}
export const DEFAULT_BUS_NAME = 'DEFAULT_BUS'
/**
 * create a bus and record it on window.RALLIE_BUS_STORE
 * @param name the name of the bus
 */
export const createBus = (name: string = DEFAULT_BUS_NAME) => {
  if (window.RALLIE_BUS_STORE === undefined) {
    Reflect.defineProperty(window, 'RALLIE_BUS_STORE', {
      value: busProxy,
      writable: false
    })
  }

  if (window.RALLIE_BUS_STORE[name]) {
    throw new Error(Errors.duplicatedBus(name))
  } else {
    const bus = new Bus(name)
    Reflect.defineProperty(window.RALLIE_BUS_STORE, name, {
      value: bus,
      writable: false
    })
    return bus
  }
}

/**
 * get the bus from window.RALLIE_BUS_STORE
 * @param name the name of the bus
 * @returns
 */
export const getBus = (name: string = DEFAULT_BUS_NAME) => {
  return window.RALLIE_BUS_STORE && window.RALLIE_BUS_STORE[name]
}

/**
 * get the bus from window.RALLIE_BUS_STORE, if the bus is not created, then create it
 * @param name the name of the bus
 * @returns
 */
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
