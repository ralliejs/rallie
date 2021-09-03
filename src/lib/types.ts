export type CallbackType = (...args: any[]) => any;

export type ScriptType = { 
  src?: string;
  [attr: string]: any
} | string;

export type LinkType = {
  href?: string;
  [attr: string]: any
} | string;

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
  loadJs: (script: ScriptType) => Promise<void>;
  loadCss: (link: LinkType) => void;
  fetchJs: (script: ScriptType) => Promise<string>;
  excuteCode: (code: string) => void;
  conf:  ConfType;
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