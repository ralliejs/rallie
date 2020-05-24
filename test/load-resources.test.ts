import {createBus, getBus} from '../src';
import nock from 'nock';

const testAppCode = (busName: string) => {
    return `
        window._Bus_.${busName}.createSocket('testApp', [], (socket, config) => {
            console.log(config.text);
        });`
    ;
};

const cssCode = `
    body {
        color: black
    }
`;

describe('load resources by sercice name', () => {

    beforeAll(() => {
        nock('http://127.0.0.1')
            .get('/testAssets/js/testApp.js')
            .reply(200, testAppCode('testAssets'))
            .get('/testAssets/css/testApp.css')
            .reply(200, cssCode)
            .get('/testMiddleware/js/testApp.js')
            .reply(200, testAppCode('testMiddleware'))
            .get('/testMiddleware/css/testApp.css')
            .reply(200, cssCode);

    });

    test('# case 1: load resources by config assets', (done) => {
        console.log = jest.fn();
        createBus('testAssets', {
            testApp: {
                js: ['http://127.0.0.1/testAssets/js/testApp.js'],
                css: ['http://127.0.0.1/testAssets/css/testApp.css']
            }
        });

        const testBus = getBus('testAssets');
        testBus.allowCrossDomainJs = false;
        testBus.startApp('testApp', {
            text: 'hello'
        }).then(() => {
            expect(console.log).toBeCalledWith('hello');
            done();
        });
    });

    test('# case 2: load resources by middleware', (done) => {
        console.log = jest.fn();
        createBus('testMiddleware', null, async (name, loadJs, loadCss) => {
            await loadJs(`http://127.0.0.1/testMiddleware/js/${name}.js`);
            await loadCss(`http://127.0.0.1/testMiddleware/css/${name}.css`);
        });

        const testBus = getBus('testMiddleware');
        testBus.allowCrossDomainJs = false;
        testBus.startApp('testApp', {
            text: 'hello'
        }).then(() => {
            expect(console.log).toBeCalledWith('hello');
            done();
        });
    });
});