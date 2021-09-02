import { createBus } from '../src/index';
import { Errors } from '../src/lib/utils';

describe('Test lifecycles of App', () => {
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
         * after it is destroyed, when the bus reactivate the app, it will recall the bootstrap lifecycle callback
         */
    let bootstraped = false;
    let activated = false;
    bus.createApp('d')
      .bootstrap(async () => {
        bootstraped = true; 
      })
      .activate(async () => {
        activated = true;
      })
      .destroy(async () => {
        bootstraped = false;
        activated = false;
      });
    bus.activateApp('d').then(() => {
      expect(bootstraped).toBeTruthy();
      expect(activated).toBeFalsy();
      return bus.activateApp('d');
    }).then(() => {
      expect(bootstraped).toBeTruthy();
      expect(activated).toBeTruthy();
      return bus.destroyApp('d');
    }).then(() => {
      expect(bootstraped).toBeFalsy();
      expect(activated).toBeFalsy();
      return bus.activateApp('d');
    }).then(() => {
      expect(bootstraped).toBeTruthy();
      expect(activated).toBeFalsy();
      done();
    });
  });

});

describe('Test dependencies of App', () => {
  const bus = createBus('testBus2');
  let appNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  let apps: any = {};
  appNames.forEach((appName) => {
    const app =  bus.createApp(appName);
    apps[appName] = app;
    app.bootstrap(async () => {
      bootstrapedApps.push(appName);
    }).activate(async () => {
      reactivateApps.push(appName);
    }).destroy(async () => {
      bootstrapedApps.splice(bootstrapedApps.indexOf(appName), 1);
    } );
  });
  let bootstrapedApps = [];
  let reactivateApps = [];

  afterEach(() => {
    appNames.forEach((appName) => {
      reactivateApps = [];
      bus.destroyApp(appName);
    });
  });

  test('# case 1: test normal dependencies', (done) => {
    /** the dependencies relationship
         * |-- a
         *     |--b
         *        |--c
         *     |--d
         *        |--e
         *        |--f
         *     |--g
         */
    apps.a.relyOn(['b', 'd', 'g']);
    apps.b.relyOn(['c']);
    apps.c.relyOn([]);
    apps.d.relyOn(['e', 'f']);
    bus.activateApp('a').then(() => {
      expect(bootstrapedApps.join(',')).toEqual('c,b,e,f,d,g,a');
      bootstrapedApps = [];
      return bus.activateApp('a');
    }).then(() => {
      // reactivate app 'a', its dependencies shouldn't be reactivated
      expect(bootstrapedApps.join(',')).toEqual('');
      expect(reactivateApps.join(',')).toEqual('a');
      done();
    });
  });
    
  test('# case 2: test circular dependency', (done) => {
    apps.a.relyOn(['b']);
    apps.b.relyOn(['a']);
    bus.activateApp('a').then(() => {
      throw new Error('you should never reach here');
    }).catch((error) => {
      expect(error.message).toEqual(Errors.bootstrapNumberOverflow());
      done();
    });
  });

  test('# case 3: test params of lifecycles', (done) => {
    apps.a.relyOn([ { ctx: 'c', config: 'app named a activate me'} ]);
    apps.c.relyOn([]).bootstrap(async (config) => {
      console.log(config);
    });
    console.log = jest.fn();
    bus.activateApp('a').then(() => {
      expect(console.log).toBeCalledWith('app named a activate me');
      done();
    });
  });
    
});