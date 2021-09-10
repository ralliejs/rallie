import { Bus } from '../src/index';
import { Errors } from '../src/lib/utils';

describe('Test event communication capabilities between sockets', () => {

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