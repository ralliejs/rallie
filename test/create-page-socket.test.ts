import {createBus, getBus} from '../src/index';

describe('Test creating page socket in diffrent situations', () => {
    createBus('global');
    const globalBus = getBus('global');
    let socket1 = null, socket2 = null, socket3 =null;

    test('# Case 0: __Bus__ and __Bus__.global should be readonly', () => {
        expect(() => {
            window.__Bus__ = null;
        }).toThrowError();

        expect(() => {
            window.__Bus__.global = null;
        }).toThrowError();
    });

    globalBus.DEPRECATED_createSocket('socket1', [], (socket) => {
        socket1 = socket;
        socket1.initState('locale', 'en');
        socket1.initState('session', {id: 'alksmdjuwiodnf'});
        socket1.initState('user', 'obvious');
    });

    test('# Case 1: waiting for ready state, state should be accessed', () => {
        console.log = jest.fn();
        globalBus.DEPRECATED_createSocket('socket2', ['locale', 'session', 'user'], (socket) => {
            socket2 = socket;
            const locale = socket2.getState('locale');
            console.log(locale);
            expect(console.log).toBeCalledWith('en');
        });
    });

    test('# Case 2: waiting for some unready state, state should be accessed after it is ready', (done) => {
        globalBus.DEPRECATED_createSocket('socket3', ['locale', 'session', 'user', 'theme'], (socket) => {
            socket3 = socket;
            expect(socket3.getState('theme')).toBe('black');
        }, 300);
        setTimeout(() => {
            socket2.initState('theme', 'black');
        }, 200);
        setTimeout(() => {
            done();
        }, 400);
    });

    test('# Case 3: waiting state time out, console.error should be called', (done) => {
        console.error = jest.fn();
        globalBus.DEPRECATED_createSocket('socket4', ['icon'] , (socket) => {
            socket.getState('icon');
        }, 100);
        setTimeout(() => {
            expect(console.error).toBeCalledWith('[obvious] wait for states ["icon"] timeout');
            done();
        }, 200);
    });

    test('# Case 4: create an existed socket, it should throw an error', () => {
        expect(() => {
            globalBus.DEPRECATED_createSocket('socket1', [], (socket) => {
                socket.getState('locale');
            });
        }).toThrowError('[obvious] socket1 socket already exists, you are not allowed to create it again');
    });
});