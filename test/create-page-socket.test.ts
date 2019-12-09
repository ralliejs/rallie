import { Bus } from '../src/lib/bus';

describe('Test creating page socket in diffrent situations', () => {
    const globalBus = new Bus();
    let ps1 = null, ps2 = null, ps3 =null;
    globalBus.createSocket('ps1', [], (socket) => {
        ps1 = socket;
        ps1.initState('locale', 'en');
        ps1.initState('session', {id: 'alksmdjuwiodnf'});
        ps1.initState('user', 'obvious');
    });

    test('# Case 1: waiting for ready state', () => {
        console.log = jest.fn();
        globalBus.createSocket('ps2', ['locale', 'session', 'user'], (socket) => {
            ps2 = socket;
            const locale = ps2.getState('locale');
            console.log(locale);
        });
        expect(console.log).toBeCalledWith('en');
    });

    test('# Case 2: waiting for some unready state', (done) => {
        globalBus.createSocket('ps3', ['locale', 'session', 'user', 'theme'], (socket) => {
            ps3 = socket;
            expect(ps3.getState('theme')).toBe('black');
        }, 300);
        setTimeout(() => {
            ps2.initState('theme', 'black');
        }, 200);
        setTimeout(() => {
            done();
        }, 400);
    });

    test('# Case 3: waiting state out', (done) => {
        console.error = jest.fn();
        globalBus.createSocket('ps4', ['icon'] , (socket) => {
            socket.getState('icon');
        }, 100);
        setTimeout(() => {
            expect(console.error).toBeCalledWith('[obvious] failed to create socket ps4 because the following state ["icon"] are not ready');
            done();
        },200);
    });

    test('# Case 4: create exits socket', () => {
        expect(() => {
            globalBus.createSocket('ps1', [], (socket) => {
                socket.getState('locale');
            });
        }).toThrowError('[obvious] ps1 socket already exists, you are not allowed to create it again');
    });
});