import { Bus, MiddlewareType } from './bus';
export declare const createBus: (name: string, assets?: Record<string, {
    js?: string[];
    css?: string[];
    isLib?: boolean;
}>, middleware?: MiddlewareType) => Bus;
export declare const getBus: (name: string) => Bus;
