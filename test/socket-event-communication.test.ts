import { PageManager } from '../src/lib/page-manager';

describe('Test the event communication capabilities between diffrent page sockets:', () => {
    const pm = new PageManager();
    let ps1 = null, ps2 = null;
    const callback = (msg: string) => {
        console.log(msg);
    };
    test('# case 1: listen a event then emit the event', () => {
        const expectedMsg = 'receive test event';
        console.log = jest.fn();
        pm.createPageSocket('ps1', [], (socket) => {
            ps1 = socket;
            ps1.on('test', callback);
        });
        pm.createPageSocket('ps2', [], (socket) => {
            ps2 = socket;
            ps2.emit('test', expectedMsg);
        });
        expect(console.log).toBeCalledWith(expectedMsg);
    });

    test('# case 2: remove the listener then emit', () => {
        const expectedWarning = '[obvious] you have emitted test event, but there is no listener of this event';
        console.warn = jest.fn();
        ps1.off('test', callback);
        ps2.emit('test');
        expect(console.warn).toBeCalledWith(expectedWarning);
    });
});