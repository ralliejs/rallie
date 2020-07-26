import { Bus } from './lib/bus'; // eslint-disable-line
import { createBus } from './lib/createBus';
import { getBus } from './lib/createBus';

declare global {
    interface Window {
        __Bus__: {
            [name: string]: Bus;
        };
    }
}

const Obvious = {
    createBus,
    getBus
};

export { Bus } from './lib/bus'; // eslint-disable-line
export { App } from './lib/app';
export { Socket } from './lib/socket';
export { createBus } from './lib/createBus';
export { getBus } from './lib/createBus';

export default Obvious;


