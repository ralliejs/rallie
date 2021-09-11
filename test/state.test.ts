import { Bus } from '../src/index';
import { Errors } from '../src/lib/utils';

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
  const bus = new Bus('innerBus');
  const socket = bus.createSocket();
  test('# case 1: wait for some states to be initialized, callback should be called after all states are ready', (done) => {
    socket.initState('user', {value: 'user'});
    socket.waitState(['user', 'theme'], 2 * 100).then(([user, theme]) => {
      expect(user.value).toEqual('user');
      expect(theme.value).toEqual('dark');
      done();
    });
    const timerId = setTimeout(() => {
      socket.initState('theme', {value: 'dark'});
      clearTimeout(timerId);
    }, 1 * 100);
  });

  test('# case 2: wait for some states time out, an error should be throwed', (done) => {
    socket.waitState(['gender', 'session'], 50).then(() => {
      throw new Error('this should not be callled');
    }).catch((error) => {
      expect(error.message).toEqual(Errors.waitStateTimeout(['session']));
      done();
    });
    socket.initState('gender', {value: 'female'});
    const timerId = setTimeout(() => {
      socket.initState('session', {value: 'abc'});
      clearTimeout(timerId);
    }, 1 * 100);
  });
});

describe('Test socket.watchState', () => {
  const bus = new Bus('innerBus');
  const socket = bus.createSocket();
  let unwatch = null;
  test('# case 1: state can not be watched before it is initialized', () => {
    expect(() => {
      socket.watchState('uninitialized', state => state);
    }).toThrowError(Errors.accessUninitializedState('uninitialized'));
  });

  test('# case 2: when state changes, the watching callback should be called', () => {
    const rawUser = {
      name: 'Mary',
      age: 11,
      gender: 'female'
    };
    type User = typeof rawUser;
    socket.initState<User>('user', rawUser);
    type WatchingType = [string, number];
    console.log = jest.fn();
    console.warn = jest.fn();
    unwatch = socket.watchState<User, WatchingType>('user', (state) => {
      return [state.name, state.age];
    }).do<WatchingType>(([name, age], [oldName, oldAge]) => {
      console.log(name, age);
      console.warn(oldName, oldAge);
    });
    socket.setState('user', (state) => {
      state.name = 'Mike';
      state.age = 12;
      state.gender = 'male';
    });
    expect(rawUser.name).toEqual('Mike');
    expect(rawUser.age).toEqual(12);
    expect(rawUser.gender).toEqual('male');
    expect(console.log).toBeCalledTimes(2);
    expect(console.log).toBeCalledWith('Mike', 11);
    expect(console.log).toBeCalledWith('Mike', 12);
    expect(console.warn).toBeCalledTimes(2);
    expect(console.warn).toBeCalledWith('Mary', 11);
    expect(console.warn).toBeCalledWith('Mike', 11);
    expect(socket['stores']['user']['watchers']['length']).toEqual(1);
  });

  test('# case 3: watching callback should not be called after unwatching', () => {
    console.log = jest.fn();
    unwatch();
    socket.setState('user', (state) => {
      state.name = 'Lily';
      state.age = 13;
      state.gender = 'female';
    });
    expect(console.log).toBeCalledTimes(0);
    const user = socket.getState('user');
    expect(user.name).toEqual('Lily');
    expect(user.age).toEqual(13);
    expect(user.gender).toEqual('female');
    expect(socket['stores']['user']['watchers']['length']).toEqual(0);
  });

  test('# case 4: test the behavior like watchEffect', async () => {
    await socket.waitState(['user']); // only to increase the coverage
    console.log = jest.fn();
    const watcher = socket.watchState('user', (state, isWatchingEffect) => {
      if (isWatchingEffect) {
        console.log(state.name);
      }
    });
    socket.setState('user', user => {
      user.name = 'Tom';
    });
    watcher.unwatch();
    socket.setState('user', user => {
      user.name = 'Jack';
    });
    expect(console.log).toBeCalledTimes(2);
    expect(console.log).toBeCalledWith('Lily');
    expect(console.log).toBeCalledWith('Tom');
    expect(socket['stores']['user']['watchers']['length']).toEqual(0);
  });
});
