import type { StoresType } from '../types' // eslint-disable-line

export class Watcher<T> {
  #namespace: string
  #stores: StoresType
  public oldWatchingStates: any
  public handler: (watchingStates: T, oldWatchingStates: T) => void | Promise<void>
  public stopEffect: () => void

  constructor(namespace: string, stores: StoresType) {
    this.#namespace = namespace
    this.#stores = stores
    this.#stores[namespace].watchers.add(this)
  }

  public do(handler: (watchingStates: T, oldWatchingStates: T) => void | Promise<void>) {
    this.handler = handler
    return () => this.unwatch()
  }

  public unwatch() {
    this?.stopEffect()
    this.handler = null
    const watchers = this.#stores[this.#namespace].watchers
    if (watchers.has(this)) {
      watchers.delete(this)
    }
  }
}
