import { Socket } from './socket'; // eslint-disable-line
import { Watcher } from './watcher'; // eslint-disable-line

export type CallbackType = (...args: any[]) => any;

export type ScriptType = Partial<HTMLScriptElement> | string;

export type LinkType = Partial<HTMLLinkElement> | string;

export type AssetsConfigType = Record<string, {
  js?: ScriptType[];
  css?: LinkType[];
  isLib?: boolean
}>;

export type ConfType = {
  maxDependencyDepth: number;
  loadScriptByFetch: boolean;
  assets: AssetsConfigType
};

export type ContextType = {
  name: string;
  loadScript: (script: ScriptType) => Promise<void>;
  loadLink: (link: LinkType) => void;
  fetchScript: (script: ScriptType) => Promise<string>;
  excuteCode: (code: string) => void;
  conf: ConfType;
  [key: string]: any
};

export type CustomCtxType = {
  name: string;
  [key: string]: any;
} | string;

export type NextFnType = (ctx?: ContextType) => void | Promise<void>;

export type MiddlewareFnType = (ctx: ContextType, next: NextFnType) => void | Promise<void>;

export type LifecyleCallbackType = (config?: any) => Promise<void>;

export type DependenciesType = Array<{
  ctx: CustomCtxType,
  config: any
} | string>;

export type StoreType<T = any> = {
  state: T,
  owner: Socket | null,
  watchers: Watcher[]
}

export type StoresType = Record<string, StoreType>
