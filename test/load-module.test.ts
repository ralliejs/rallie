import { PageManager } from './../src/lib/page-manager';

describe('Test loading module', () => {
    const pm = new PageManager({
        a: ['/assets/js/a.js', '/assets/css/a.css'],
        b: ['assets/js/b.js', '/assets/css/b.cssdsa']
    });
    pm.createPageSocket('c', [], (socket) => {
        expect(socket.name).toEqual('c');
    });
    test('# Case 1: load module a', () => {
        expect(document.head.getElementsByTagName('script').length).toEqual(0);
        expect(document.head.getElementsByTagName('link').length).toEqual(0);
        pm.loadModule('a').then(() => {
            expect(document.head.getElementsByTagName('script').length).not.toEqual(0);
            expect(document.head.getElementsByTagName('link').length).not.toEqual(0);
        });
    });

    test('# Case 2: load module b', () => {
        console.error = jest.fn();
        pm.loadModule('b').then(() => {
            expect(console.error).toBeCalled();
            expect(document.head.getElementsByTagName('script').length).not.toEqual(0);
            expect(document.head.getElementsByTagName('link').length).toEqual(0);
        });
    });

    test('# Case 3: load a non-existent module', (done) => {
        pm.loadModule('d').then(() => {
            // empty body
        }).catch(err => {
            expect(err).toBeDefined();
            done();
        });
    });

    test('# Case 4: load an existed module and give a config', () => {
        console.warn = jest.fn();
        pm.loadModule('c', {name: 'adad'}).then(() => {
            expect(console.error).toBeCalled();
        });
    });
});