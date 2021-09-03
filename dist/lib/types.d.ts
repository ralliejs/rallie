export declare type CallbackType = (...args: any[]) => any;
export declare type ScriptType = {
    src?: string;
    [attr: string]: any;
} | string;
export declare type LinkType = {
    href?: string;
    [attr: string]: any;
} | string;
export declare type AssetsConfigType = Record<string, {
    js?: ScriptType[];
    css?: LinkType[];
    isLib?: boolean;
}>;
export declare type ConfType = {
    maxDependencyDepth: number;
    loadScriptByFetch: boolean;
    assets: AssetsConfigType;
};
export declare type ContextType = {
    name: string;
    loadJs: (script: ScriptType) => Promise<void>;
    loadCss: (link: LinkType) => void;
    fetchJs: (script: ScriptType) => Promise<string>;
    excuteCode: (code: string) => void;
    conf: ConfType;
    [key: string]: any;
};
export declare type CustomCtxType = {
    name: string;
    [key: string]: any;
} | string;
export declare type NextFnType = (ctx?: ContextType) => void | Promise<void>;
export declare type MiddlewareFnType = (ctx: ContextType, next: NextFnType) => void | Promise<void>;
export declare type LifecyleCallbackType = (config?: any) => Promise<void>;
export declare type DependenciesType = Array<{
    ctx: CustomCtxType;
    config: any;
} | string>;
