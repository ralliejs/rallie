import { createBus } from '../src/lib/createBus';
import { Errors } from '../src/lib/utils';

describe('Test event communication capabilities between sockets', () => {
    const bus = createBus('socketTester');// new Bus();
    const socketA = bus.createSocket();
    const socketB = bus.createSocket();
    const hello = 'hello';
    const world = 'world';

    test('# case 1: two sockets listen a broadcast event, emit it, callback should be called twice', () => {
        socketA['onMessage'] = (value) => {
            socketA['message'] = value;
        };
        socketB['onMessage'] = (value) => {
            socketB['message'] = value;
        };
        socketA.onBroadcast('message', socketA['onMessage']);
        socketB.onBroadcast('message', socketB['onMessage']);
        const hello = 'hello';
        socketA.broadcast('message', hello);
        expect(socketA['message']).toBe(hello);
        expect(socketB['message']).toBe(hello);
    });

    test('# case 2: socketA stop to listen the broadcast event, emit it, callback should be called once', () => {
        socketA.offBroadcast('message', socketA['onMessage']);
        socketA.broadcast('message', world);
        expect(socketA['message']).toBe(hello);
        expect(socketB['message']).toBe(world);
    });

    test('# case 4: socketA listen a unicast event, socketB emit it, callback should be called', () => {
        socketA['getMessage'] = () => {
            return socketA['message'];
        };
        socketA.onUnicast('getSocketAMessage', socketA['getMessage']);
        const socketAMessage = socketB.unicast('getSocketAMessage');
        expect(socketAMessage).toBe(hello);
    });

    test('# case 5: socket A stop to listen the unicast event, socketB emit it, an error should be throwed', () => {
        expect(() => {
            socketA.offUnicast('getSocketAMessage', socketA['getMessage']);
            const socketAMessage = socketB.unicast('getSocketAMessage');
            expect(socketAMessage).toBeUndefined();
        }).toThrowError();
    });
});

describe('Test state communication capabilities between sockets', () => {
    const bus = createBus('socketTester2');// new Bus();
    const socketC = bus.createSocket();
    const socketD = bus.createSocket();
    const socketF = bus.createSocket();

    test('# case 1: bus.state should be readonly', () => {
        expect(() => {
            bus.state = {'a': 'nasdad'};
        }).toThrowError(Errors.stateIsReadOnly());
    });
    
    test('# case 2: socketC init a public state, other sockets should be able to get and set it', () => {
        socketC.initState('locale', 'en');
        expect(socketD.getState('locale')).toEqual('en');
        socketD.setState('locale', 'zh');
        expect(socketF.getState('locale')).toEqual('zh');
    });

    test('# case 3: socketC init a private state, other socket can get and watch it, but can not set it', () => {
        socketC.initState('user', 'admin', true);
        expect(socketD.getState('user')).toEqual('admin');
        expect(() => {
            socketD.setState('user', 'jack');
        }).toThrowError(new Error(Errors.modifyPrivateState('user')));
        socketD['watchUserCallback'] = (newUser) => {
            console.log(`new user is ${newUser}`);
        };
        socketD.watchState('user', socketD['watchUserCallback']);
        console.log = jest.fn();
        socketC.setState('user', 'jack');
        expect(console.log).toBeCalledWith('new user is jack');
        socketD.unwatchState('user', socketD['watchUserCallback']);
        socketC.setState('user', 'tom');
        expect(console.log).toBeCalledTimes(1);
    });

    test('# case 4: wait for some states to be initialized, callback should be called after all states are ready', (done) => {
        socketF.waitState(['user', 'theme'], 2 * 1000).then((state: any) => {
            expect(state.user).toEqual('tom');
            expect(state.theme).toEqual('dark');
            done();
        });
        const timerId = setTimeout(() => {
            socketC.initState('theme', 'dark');
            clearTimeout(timerId);
        }, 1 * 1000);
    });

    test('# case 5: wait for some states time out, an error should be throwed', (done) => {
        let callBackNeverReached = () => {};
        socketF.waitState(['user', 'session'], 2 * 1000)
            .then(callBackNeverReached)
            .catch((error) => {
                expect(error.message).toEqual(Errors.waitStateTimeout(['session']));
            });
        const timerId1 = setTimeout(() => {
            socketC.initState('session', 'abc');
            clearTimeout(timerId1);
        }, 3 * 1000);
        const timerId2 = setTimeout(() => {
            socketF.waitState(['user', 'session']).then((state: any) => {
                expect(state.session).toEqual('abc');
                done();
            });
            clearTimeout(timerId2);
        }, 4 * 1000);
    });

    test('# case 6: test exceptions', () => {
        expect(() => {
            socketC.initState('locale', 'en');
        }).toThrowError(new Error(Errors.duplicatedInitial('locale')));
        
        expect(() => {
            socketC.initState('undefinedState', undefined);
        }).toThrowError(new Error(Errors.initialStateAsUndefined('undefinedState')));
        
        expect(() => {
            socketC.setState('gender', 'male');
        }).toThrowError(new Error(Errors.accessUninitializedState('gender')));

        const callbackNeverReached = () => {};
        expect(() => {
            socketC.watchState('gender', callbackNeverReached);
        }).toThrowError(new Error(Errors.accessUninitializedState('gender')));

        expect(() => {
            socketC.unwatchState('gender', callbackNeverReached);
        }).toThrowError(new Error(Errors.accessUninitializedState('gender')));
    });
});

describe('Test deep state', () => {
    const bus = createBus('socketTester3');
    const socketG = bus.createSocket();
    const socketH = bus.createSocket();
    const socketI = bus.createSocket();
    const message = 'hello obvious';
    socketG.initState('foo', {
        bar: {
            can: {
                be: {
                    accessed: message
                }
            }
        }
    });
    test('# case 1: socketG init a state, other sockets can get the value deeply', () => {
        expect(socketH.getState('foo.bar.can.be.accessed')).toEqual(message);
        expect(socketH.getState('foo.bar.can')['be']['accessed']).toEqual(message);
        expect(socketI.getState('foo.bar.not.be.accessed')).toBeUndefined();
    });

    test('# case 2: socket can set the state deeply',() => {
        socketH.setState('foo.bar.can.be.accessed', (oldValue: string) => oldValue + oldValue);
        expect(socketI.getState('foo.bar.can.be.accessed')).toEqual(message + message);
        socketH.setState('foo.bar.new.can.be.accessed', 'hello_obvious');
        expect(Object.keys(socketI.getState('foo.bar'))).toHaveLength(2);
        expect(socketI.getState('foo.bar.new.can.be.accessed')).toEqual('hello_obvious');
        expect(() => {
            socketH.setState('foooo.bar.can.be.accessed', 'error');
        }).toThrow(new Error(Errors.accessUninitializedState('foooo')));
    });

    test('# case 3: test the deep state with array', () => {
        console.error = jest.fn();
        socketH.setState('foo.bar.array', ['a', 'b', 'c']);
        expect(socketI.getState('foo.bar.array.1')).toEqual('b');
        socketH.setState('foo.bar.array.a', 'shouldPrintError');
        socketH.setState('foo.bar.array.3', 'd');
        expect(socketI.getState('foo.bar.array')).toHaveLength(4);
        expect(bus.state.foo.bar.array[3]).toEqual('d');
        socketH.setState('foo.bar.array.f.g', 'h');
        socketH.setState('foo.bar.array.1.a', 'test');
        expect(console.error).toHaveBeenCalledTimes(3);
        expect(console.error).toHaveBeenCalledWith(Errors.regardArrayAsObject('foo.bar.array', 'a'));
        expect(console.error).toHaveBeenCalledWith(Errors.regardArrayAsObject('foo.bar.array', 'f'));
        expect(console.error).toHaveBeenCalledWith(Errors.regardBasicTypeAsObject('foo.bar.array.1', 'string'));
    });

    test('# case 4: socket can watch and unwatch the state deeply', () => {
        let foo_bar_changed = false;
        let foo_bar_can_be_accessed_changed = false;
        let foo_bar_new_can_be_accessed = false;
        const callback1 = () => {
            foo_bar_can_be_accessed_changed = true;
        };
        const callback2 = () => {
            foo_bar_changed = true;
        };
        const callback3 = () => {
            foo_bar_new_can_be_accessed = true;
        };
        socketH.watchState('foo.bar.can.be.accessed', callback1);
        socketH.watchState('foo.bar', callback2);
        socketH.watchState('foo.bar.new.can.be.accessed', callback3);
    
        socketI.setState('foo.bar.can.be.accessed', 'otherValue');
        expect(foo_bar_can_be_accessed_changed).toBeTruthy();
        expect(foo_bar_changed).toBeTruthy();
        expect(foo_bar_new_can_be_accessed).toBeFalsy();
    
        socketI.unwatchState('foo.bar.can.be.accessed', callback1);
        socketH.unwatchState('foo.bar', callback2);
        socketH.unwatchState('foo.bar.new.can.be.accessed', callback3);

        foo_bar_can_be_accessed_changed = false;
        foo_bar_changed = false;

        const newFooBar = 'newFooBar';

        const callback5 = (newValue, oldValue) => {
            expect(newValue).toBeUndefined();
            expect(oldValue).toEqual('otherValue');
            callback1();
        };
        const callback6 = (newValue, oldValue) => {
            expect(newValue).toEqual(newFooBar);
            expect(oldValue.can.be.accessed).toEqual('otherValue');
            expect(oldValue.new).toBeDefined();
            callback2();
        };
        const callback7 = (newValue, oldValue) => {
            expect(newValue).toBeUndefined();
            expect(oldValue).toEqual('hello_obvious');
            callback3();
        };

        socketH.watchState('foo.bar.can.be.accessed', callback5);
        socketH.watchState('foo.bar', callback6);
        socketH.watchState('foo.bar.new.can.be.accessed', callback7);

        socketI.setState('foo.bar', newFooBar);
        expect(foo_bar_can_be_accessed_changed).toBeTruthy();
        expect(foo_bar_changed).toBeTruthy();
        expect(foo_bar_new_can_be_accessed).toBeTruthy();

        socketH.unwatchState('foo.bar.can.be.accessed', callback5);
        socketH.unwatchState('foo.bar', callback6);
        socketH.unwatchState('foo.bar.new.can.be.accessed', callback7);

        foo_bar_changed = false;
        foo_bar_can_be_accessed_changed = false;
        foo_bar_new_can_be_accessed = false;

        socketI.setState('foo.bar', 'anotherValue');
        expect(foo_bar_can_be_accessed_changed).toBeFalsy();
        expect(foo_bar_changed).toBeFalsy();
        expect(foo_bar_new_can_be_accessed).toBeFalsy();
    });
});