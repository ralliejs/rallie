import { createBus } from '../src/lib/createBus';
import { Errors } from '../src/lib/utils';

describe('Test lifecycles of app', () => {
    const bus = createBus('testBus');
    test('# case 1: test the lifecycle of the app which indicate both bootstrap and activate callback', (done) => {
        /**
         * app 'a' indicates both bootstrap and activate callback,
         * when it is activated at the first time, the bootstrap callback should be called,
         * when it is activated after the first time , the activate callback should be called
         */
        let activateCount = 0;
        bus.createApp('a')
            .bootstrap(async () => {
                activateCount = 1;
            }).activate(async () => {
                activateCount++;
            });
        bus.activateApp('a').then(() => {
            expect(activateCount).toEqual(1);
            return bus.activateApp('a');
        }).then(() => {
            expect(activateCount).toEqual(2);
            done();
        });
    });

    test('# case 2: test the lifecycle of the app which only indicate the bootstrap callback', (done) => {
        /**
         * app 'b' indicate only the bootstrap callback
         * when it is activated at the first time, the bootstrap callback should be called,
         * when it is activated after the first time, nothing will happen
         */
        let activateCount = 0;
        bus.createApp('b')
            .bootstrap(async () => {
                activateCount++; 
            });
        bus.activateApp('b').then(() => {
            expect(activateCount).toEqual(1);
            return bus.activateApp('b');
        }).then(() => {
            expect(activateCount).toEqual(1);
            done();
        });
    });


    test('# case 3: test the lifecycle of the app which only indicate the activate callback', (done) => {
        /**
         * app 'c' indicate only the activate callback
         * the activate callback will be called everytime it's activated
         */
        let activateCount = 0;
        bus.createApp('c')
            .activate(async () => {
                activateCount++; 
            });
        bus.activateApp('c').then(() => {
            expect(activateCount).toEqual(1);
            return bus.activateApp('c');
        }).then(() => {
            expect(activateCount).toEqual(2);
            done();
        });
    });

    test('# case 4: test the lifecycle of the app indicate the destroy callback', (done) => {
        /**
         * app 'd' indicate the destroy callback
         * the destroy callback should be called before it is destroyed
         * after it is destroyed, when the bus reactivate the app, it will try
         * to reload the resources
         */
        let activateCount = 0;
        bus.createApp('d')
            .bootstrap(async () => {
                activateCount++; 
            })
            .destroy(async () => {
                activateCount = 0;
            });
        bus.activateApp('d').then(() => {
            expect(activateCount).toEqual(1);
            return bus.destroyApp('d');
        }).then(() => {
            expect(activateCount).toEqual(0);
            return bus.activateApp('d');
        }).then(() => {
            throw new Error('this callback should never be reached');
        }).catch((error) => {
            expect(error.message).toEqual(Errors.resourceNotDeclared('d', 'testBus'));
            done();
        });
    });

});

describe('Test dependencies of app', () => {
    // TO DO
});