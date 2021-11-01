import { Socket } from './lib/socket'; // eslint-disable-line
import { Watcher } from './lib/watcher'; // eslint-disable-line

export type CallbackType = (...args: any[]) => any;

export type ScriptType = Partial<HTMLScriptElement> | string;

export type LinkType = Partial<HTMLLinkElement> | string;

export type AssetsConfigType = Record<string, {
  js?: ScriptType[];
  css?: LinkType[];
}>;

export type ConfType = {
  maxDependencyDepth: number;
  loadScriptByFetch: boolean;
  assets: AssetsConfigType
};

export type ContextType = {
  name: string;
  libraryName?: string;
  loadScript: (script: ScriptType) => Promise<void>;
  loadLink: (link: LinkType) => void;
  fetchScript: (script: ScriptType) => Promise<string>;
  excuteCode: (code: string) => void;
  conf: ConfType;
  [key: string]: any
};

export type CustomCtxType = {
  name: string;
  libraryName?: string;
  [key: string]: any;
} | string;

export type NextFnType = (ctx?: ContextType) => void | Promise<void>;

export type MiddlewareFnType = (ctx: ContextType, next: NextFnType) => void | Promise<void>;

export type LifecyleCallbackType = (data?: any) => Promise<void> | void;

export type DependencyType = {
  ctx: CustomCtxType,
  data?: any
} | string;

export type StoreType<T = any> = {
  state: T,
  owner: Socket | null,
  watchers: Watcher[]
}

export type StoresType = Record<string, StoreType>

export { Socket } from './lib/socket'

export { Bus } from './lib/bus'

export { App } from './lib/app'
