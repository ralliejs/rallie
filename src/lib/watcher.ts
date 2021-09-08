import { StoresType } from './types'; // eslint-disable-line

export class Watcher {
  private namespace: string;
  private stores: StoresType;
  public handler: (state: any) => void;
  public stopEffect: () => void;

  constructor(namespace: string, stores: StoresType) {
    this.namespace = namespace;
    this.stores = stores;
    this.stores[namespace].watchers.push(this);
  }

  public do<T>(handler: (state: T) => void) {
    this.handler = handler;
    return () => this.unwatch();
  }

  public unwatch() {
    this?.stopEffect();
    this.handler = null;
    const index = this.stores[this.namespace].watchers.indexOf(this);
    if (index !== -1) {
      this.stores[this.namespace].watchers.splice(index, 1);
    }
  }
}