export type CallbackType = (...args: any[]) => any;

export type AssetsConfigType = Record<string, {
  js?: string[];
  css?: string[];
  isLib?: boolean
}>;

export type ConfType = {
  maxDependencyDepth: number;
  loadScriptByFetch: boolean;
  assets: AssetsConfigType
};

export type ContextType = {
  name: string;
  loadJs: (src: string) => Promise<void>;
  loadCss: (src: string) => void;
  fetchJs: (src: string) => Promise<string>;
  excuteCode: (code: string) => void;
  conf:  ConfType;
  [key: string]: any
};

export type CustomCtxType = {
  name: string;
  [key: string]: any;
} | string;

export type NextFnType = (ctx?: ContextType) => void | Promise<void>;

export type MiddlewareFnType = (ctx?: ContextType, next?: NextFnType) => void | Promise<void>;

export type LifecyleCallbackType = (config?: any) => Promise<void>;

export type DependenciesType = Array<{ 
  ctx: CustomCtxType,
  config: any
} | string>;