import { createBus, getBus, touchBus } from '../src/index';
import { DEFAULT_BUS_NAME } from '../src/lib/bus';
import nock from 'nock';
import cssCode from './test-apps/css';
import appACode from './test-apps/app-to-test-fetch-script';
import appInvalidCode from './test-apps/app-invalid';
import reactCode from './test-apps/react';
import { Errors } from '../src/lib/utils';
import loader from '../src/lib/loader';

nock('https://cdn.obvious.com')
  .get('/assets/app-a.js')
  .reply(200, appACode)
  .get('/assets/app-a.css')
  .reply(200, cssCode)
  .get('/assets/react.js')
  .reply(200, reactCode);

nock('https://localhost')
  .get('/assets/app-invalid.js')
  .reply(200, appInvalidCode);

describe('Test the capability to load the resources of an app or lib', () => {
  const staticAssetsConfig = {
    'react': {
      js: [
        { src: 'https://cdn.obvious.com/assets/react.js' }
      ],
      isLib: true
    },
    'app-to-test-fetch-script': {
      js: [
        'https://cdn.obvious.com/assets/app-a.js',
      ],
      css: [
        { href: 'https://cdn.obvious.com/assets/app-a.css' },
        'https://cdn.obvious.com/assets/app-a.css'
      ]
    },
    'app-to-test-load-script': {
      js: [
        { src: 'https://cdn.obvious.com/assets/app-a.js' },
        'https://cdn.obvious.com/assets/react.js'
      ],
      isLib: true
    },
    'invalid-resource-app': {
      js: [
        'validFile.png'
      ],
      css: [
        '/invalidFile.png'
      ]
    }
  };

  window['appsLoadedFromLocalhost'] = [];

  const bus = createBus('testBus');
  bus.config({
    loadScriptByFetch: true,
    assets: staticAssetsConfig
  }).use(async (ctx, next) => {
    window['lastLoadingApp'] = ctx.name;
    await next();
  }).use(async (ctx, next) => {
    if (ctx.loadedFromLocalhost) {
      window['appsLoadedFromLocalhost'].push(ctx.name);
      const code = await ctx.fetchJs(`https://localhost/assets/${ctx.name}.js`);
      ctx.excuteCode(code);
    } else {
      await next();
    }
  });

  test('# case 1: create a bus, it should be mounted on window.__Bus__ ', () => {
    expect(getBus('testBus')).toBe(bus);
    expect(() => {
      window['__Bus__'].testBus = null;
    }).toThrowError();
  });

  test('# case 2: activate app-a, it should activate its dependencies and the bootstrap callback should be called', (done) => {
    console.log = jest.fn();
    bus.activateApp('app-to-test-fetch-script').then(() => {
      expect(window['React']).toEqual('reactSourceCode');
      expect(window['lastLoadingApp']).toEqual('react');
      expect(console.log).toBeCalledWith('bootstraped');
      expect(window['appsLoadedFromLocalhost'].length).toEqual(0);
      done();
    });
  });

  test('# case 3: activate app-invalid, the middleware should be excuted', (done) => {
    console.log = jest.fn();
    bus.activateApp({
      name: 'app-invalid',
      loadedFromLocalhost: true
    }).then(() => {
      throw new Error('this callback should not be reached');
    }).catch((error) => {
      expect(error.message).toEqual(Errors.appNotCreated('app-invalid'));
      expect(window['appsLoadedFromLocalhost'][0]).toEqual('app-invalid');
      expect(window['lastLoadingApp']).toEqual('app-invalid');
      expect(console.log).toBeCalledWith('app-invalid loaded');
      done();
    });
  });

  test('# case 4: activate an app which does not have valid resource declaration, console.error should be called', (done) => {
    console.error = jest.fn();
    bus.activateApp('invalid-resource-app').then(() => {
      throw new Error('this callback should not be reached');
    }).catch((error) => {
      expect(console.error).toBeCalledTimes(2);
      expect(error.message).toEqual(Errors.appNotCreated('invalid-resource-app'));
      done();
    });
  });

  test('# case 5: activate an non-existence app, an error should be throwed', (done) => {
    const bus = createBus('testBus2');
    bus.activateApp('non-existence-app').then(() => {
      throw new Error('this callback should not be reached');
    }).catch((error) => {
      expect(error.message).toEqual(Errors.resourceNotDeclared('non-existence-app', 'testBus2'));
      done();
    });
  });

  test('# case 6: test touchBus and default bus', () => {
    const [testBus, isTestBusAlreadyExists] = touchBus('testBus');
    expect(isTestBusAlreadyExists).toBeTruthy();
    expect(testBus).toEqual(bus);
    const [defaultBus1, isDefaultBus1AlreadyExists] = touchBus();
    expect(isDefaultBus1AlreadyExists).toBeFalsy();
    expect(defaultBus1).toEqual(window.__Bus__[DEFAULT_BUS_NAME]);
    const [defaultBus2, isDefaultBus2AlreadyExists] = touchBus();
    expect(isDefaultBus2AlreadyExists).toBeTruthy();
    expect(defaultBus2).toEqual(defaultBus1);
  });

  test('# case 7: test load script tag', () => {
    bus.config({
      loadScriptByFetch: false,
      assets: {
        'another-app-to-test-load-script': {
          js: [
            'thisCanNotBeTested.js'
          ],
          isLib: true
        }
      }
    });
    bus.activateApp('app-to-test-load-script'); // to increase the coverage
    loader.loadJs = jest.fn();
    bus.activateApp('another-app-to-test-load-script');
    expect(loader.loadJs).toBeCalledTimes(1);
  });
});
