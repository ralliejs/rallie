import { Bus, assetsConfigType, middlewareType } from './bus';
export declare const createBus: (name: string, assets?: assetsConfigType, middleware?: middlewareType) => void;
export declare const getBus: (name: string) => Bus;
