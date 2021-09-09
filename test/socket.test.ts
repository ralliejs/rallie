import { Bus, createBus } from '../src/index';
import { Errors } from '../src/lib/utils';

describe('Test event communication capabilities between sockets', () => {
  const bus = createBus('event-tester');
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

describe('Test socket.initState, socket.existState and socket.getState', () => {
  const bus = new Bus('innerBus');
  const socket = bus.createSocket();
  socket.initState('counter', {value: 0});

  test('# case 1: state value can be get', () => {
    expect(socket.existState('counter')).toBeTruthy();
    expect(() => {
      socket.initState('counter', {value: 0});
    }).toThrowError(Errors.duplicatedInitial('counter'));
    expect(socket.getState('counter').value).toEqual(0);
    expect(socket.getState('counter', (state) => state.value)).toEqual(0);
  });

  test('# case 2: uninitialized state should be null', () => {
    expect(socket.existState('uninitialCounter')).toBeFalsy();
    expect(socket.getState('uninitialCounter')).toEqual(null);
    expect(socket.getState('uninitialCounter', (state) => state.value)).toEqual(null);
  });

  test('# case 3: state can not be initialized to primitive value', () => {
    expect(() => {
      socket.initState('primitiveCounter', 0 as any);
    }).toThrowError(Errors.initializePrimitiveState('primitiveCounter'));
    expect(socket.existState('primitiveCounter')).toBeFalsy();
  });

  test('# case 4: the returned value of socket.getState should be readonly', () => {
    const counter = socket.getState('counter');
    console.warn = jest.fn();
    counter.value += 1;
    expect(counter.value).toEqual(0);
    expect(console.warn).toBeCalledWith('Set operation on key "value" failed: target is readonly.', counter);
  });
});

describe('Test socket.setState', () => {
  const bus = new Bus('innerBus');
  const socket = bus.createSocket();
  socket.initState('counter', {
    value: 0
  }, true);

  test('# case 1: state can be modified by socket.setState', () => {
    console.warn = jest.fn();
    const counter = socket.getState('counter');
    expect(counter.value).toEqual(0);
    socket.setState('counter', (state) => {
      state.value++;
    });
    counter.value++;
    expect(counter.value).toEqual(1);
    expect(console.warn).toBeCalledWith('Set operation on key "value" failed: target is readonly.', counter);
  });

  test('# case 2: private state can not be modified by other socket', () => {
    const anotherSocket = bus.createSocket();
    expect(() => {
      anotherSocket.setState('counter', (state) => {
        state.value++;
      });
    }).toThrowError(Errors.modifyPrivateState('counter'));
  });

  test('# case 3: an uninitialized state can not be set', () => {
    expect(() => {
      socket.setState('uninitialized', (state) => {
        state.value = 'whatever';
      });
    }).toThrowError(Errors.accessUninitializedState('uninitialized'));
  });
});

describe('Test socket.waitState', () => {
  // const bus = new Bus('innerBus');
  // const socket = bus.createSocket();
});