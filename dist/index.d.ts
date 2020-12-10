import { Bus } from './lib/bus';
declare global {
    interface Window {
        __Bus__: Record<string, Bus>;
    }
}
declare const Obvious: {
    createBus: (name: string, assets?: Record<string, {
        js?: string[];
        css?: string[];
        isLib?: boolean;
    }>, middleware?: import("./lib/bus").MiddlewareType) => Bus;
    getBus: (name: string) => Bus;
};
export { Bus } from './lib/bus';
export { App } from './lib/app';
export { Socket } from './lib/socket';
export { createBus } from './lib/createBus';
export { getBus } from './lib/createBus';
export default Obvious;
