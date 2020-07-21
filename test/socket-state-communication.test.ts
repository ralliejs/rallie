import { createBus, getBus } from '../src';

describe('Test state communication capabilities between sockets', () => {
    createBus('global');
    const bus = getBus('global');
    let socket1 = null, socket2 = null, socket3 =null;
    let dynamicName = ''; // it will be modified as long as the state named name being changed

    test('# case 0: bus.state should be readonly', () => {
        expect(() => {
            bus.state = {'a': 'nasdad'};
        }).toThrowError('[obvious] bus.state is readonly');
    });

    test('# case 1: socket1 init a public state name, socket2 should access it', () => {
        expect(bus.state.$socket1).toBeUndefined();
        bus.createSocket('socket1', [], (socket) => {
            socket1 = socket;
            socket1.initState('name', 'Bob');
        });
        bus.createSocket('socket2', ['name'], (socket) => {
            socket2 = socket;
            const name = socket2.getState('name');
            expect(name).toEqual('Bob');
        });
    });

    test('# case 2: socket3 watch state name then socket2 set it, name should be set and socket', () => {
        const watchCallback = (newValue: string) => {
            dynamicName = newValue;
        };
        bus.createSocket('socket3', [], (socket) => {
            socket3 = socket;
            socket3.watchState('name', watchCallback);
            socket2.setState('name', 'Jack');
            expect(dynamicName).toEqual('Jack');
            socket3.unwatchState('name', watchCallback);
            socket2.setState('name', 'Bob');
            expect(socket2.getState('name')).toEqual('Bob');
            expect(dynamicName).toEqual('Jack');
        });
        
    });

    test('# case 3: socket2 init a private state then socket1 and socket2 set it', () => {
        socket2.initState('locale', 'en', true);
        expect(socket1.getState('locale')).toEqual('en');
        expect(() => {
            socket1.setState('locale', 'zh');
        }).toThrowError(new Error('[obvious] state locale is private, you are not allowed to modify it'));
        socket2.setState('locale', 'zh');
        expect(socket1.getState('locale')).toEqual('zh');
        expect(JSON.stringify(bus.state)).toEqual(JSON.stringify({
            name: 'Bob',
            locale: 'zh',
        }));
    });

    test('# case 4: test error', () => {
        expect(() => {
            socket1.initState('locale', 'en');    
        }).toThrowError('[obvious] state locale has been initialized, please use [setState] instead');

        expect(() => {
            socket1.initState('legalState', undefined);
        }).toThrowError("[obvious] state legalState can't be initialized to undefined, please initial it to null instead"); // eslint-disable-line

        expect(() => {
            socket1.setState('gender', 'male');
        }).toThrowError("[obvious] you are trying to set state gender before it is initialized, init it first"); // eslint-disable-line
        
        expect(() => {
            socket1.watchState('gender', 'male');
        }).toThrowError("[obvious] you are trying to watch state gender before it is initialized, init it first"); // eslint-disable-line
        
        expect(() => {
            socket1.unwatchState('gender', 'male');
        }).toThrowError("[obvious] you are trying to unwatch state gender before it is initialized, init it first"); // eslint-disable-line
    });
});