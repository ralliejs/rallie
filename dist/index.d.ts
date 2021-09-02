import { Bus } from './lib/bus';
declare global {
    interface Window {
        __Bus__: Record<string, Bus>;
    }
}
declare const Obvious: {
    createBus: (name?: string) => Bus;
    getBus: (name?: string) => Bus;
    touchBus: (name?: string) => [Bus, boolean];
};
export { Bus, createBus, getBus, touchBus } from './lib/bus';
export { App } from './lib/app';
export { Socket } from './lib/socket';
export default Obvious;
