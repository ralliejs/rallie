
import { Bus } from '../src/lib/bus';

describe('Test state communication capabilities between sockets', () => {
    const globalBus = new Bus();
    let ps1 = null, ps2 = null, ps3 =null;
    let dynamicName = ''; // it will be modified as long as state name being changed
    test('# case 1: ps1 init a public state name then ps2 get it', () => {
        globalBus.createSocket('ps1', [], (socket) => {
            ps1 = socket;
            ps1.initState('name', 'Bob');
        });
        globalBus.createSocket('ps2', [], (socket) => {
            ps2 = socket;
            const name = ps2.getState('name');
            expect(name).toEqual('Bob');
        });
    });

    test('# case 2: ps3 watch state name then ps2 set it', () => {
        const watchCallback = (newValue: string) => {
            dynamicName = newValue;
        };
        globalBus.createSocket('ps3', [], (socket) => {
            ps3 = socket;
            ps3.watchState('name', watchCallback);
        });
        ps2.setState('name', 'Jack');
        expect(dynamicName).toEqual('Jack');
        ps3.unwatchState('name', watchCallback);
        ps2.setState('name', 'Bob');
        expect(ps2.getState('name')).toEqual('Bob');
        expect(dynamicName).toEqual('Jack');
    });

    test('# case 3: ps2 init a private state then ps1 and ps2 set it', () => {
        ps2.initState('locale', 'en', true);
        expect(ps1.getState('locale')).toEqual('en');
        expect(() => {
            ps1.setState('locale', 'zh');
        }).toThrowError(new Error('[obvious] state locale is private, you are not allowed to modify it'));
        ps2.setState('locale', 'zh');
        expect(ps1.getState('locale')).toEqual('zh');
        expect(JSON.stringify(globalBus.state)).toEqual(JSON.stringify({
            name: 'Bob',
            locale: 'zh'
        }));
    });

    test('# case 4: test error', () => {
        expect(() => {
            ps1.initState('locale', 'en');    
        }).toThrowError('[obvious] state locale has been initialized, please use [setState] instead');

        expect(() => {
            ps1.initState('legalState', undefined);
        }).toThrowError("[obvious] state legalState can't be initialized to undefined, please initial it to null instead"); // eslint-disable-line

        expect(() => {
            ps1.setState('gender', 'male');
        }).toThrowError("[obvious] you are trying to set state gender before it is initialized, init it first"); // eslint-disable-line
        
        expect(() => {
            ps1.watchState('gender', 'male');
        }).toThrowError("[obvious] you are trying to watch state gender before it is initialized, init it first"); // eslint-disable-line
        
        expect(() => {
            ps1.unwatchState('gender', 'male');
        }).toThrowError("[obvious] you are trying to unwatch state gender before it is initialized, init it first"); // eslint-disable-line
    });
});