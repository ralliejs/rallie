import { Bus } from '../src/lib/bus';

describe('Test the event communication capabilities between diffrent page sockets:', () => {
    const globalBus = new Bus();
    let skt1 = null, skt2 = null;
    const callback = (msg: string) => {
        console.log(msg);
    };
    test('# case 1: listen an event then emit the event', () => {
        const expectedMsg = 'receive test event';
        console.log = jest.fn();
        globalBus.createSocket('skt1', [], (socket) => {
            skt1 = socket;
            skt1.on('test', callback);
        });
        globalBus.createSocket('skt2', [], (socket) => {
            skt2 = socket;
            skt2.emit('test', expectedMsg);
            expect(console.log).toBeCalledWith(expectedMsg);
        });
    });

    test('# case 2: remove the listener then emit', () => {
        const expectedWarning = '[obvious] you have emitted test event, but there is no listener of this event';
        console.warn = jest.fn();
        skt1.off('test', callback);
        skt2.emit('test');
        expect(console.warn).toBeCalledWith(expectedWarning);
    });
});