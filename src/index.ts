import { Bus } from './index'; // eslint-disable-line

declare global {
    interface Window {
        __Bus__: {
            [name: string]: Bus;
        };
    }
}

export { EventEmitter } from './lib/event-emitter';
export { createBus } from './lib/createBus';
export { getBus } from './lib/createBus';
export { Bus } from './lib/bus';
