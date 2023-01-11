import { Bus } from '../src/index'
import { Errors } from '../src/lib/utils'

describe('Test socket.initState, socket.existState and socket.getState', () => {
  const bus = new Bus('innerBus')
  const socket = bus.createSocket()
  socket.initState('counter', { value: 0 })

  test('# case 1: state value can be get', () => {
    expect(socket.existState('counter')).toBeTruthy()
    expect(() => {
      socket.initState('counter', { value: 0 })
    }).toThrowError(Errors.duplicatedInitial('counter'))
    expect(socket.getState('counter').value).toEqual(0)
    expect(socket.getState('counter', (state) => state.value)).toEqual(0)
  })

  test('# case 2: uninitialized state should be null', () => {
    expect(socket.existState('uninitialCounter')).toBeFalsy()
    expect(socket.getState('uninitialCounter')).toEqual(null)
    expect(socket.getState('uninitialCounter', (state) => state.value)).toEqual(null)
  })

  test('# case 3: state can not be initialized to primitive value', () => {
    expect(() => {
      socket.initState('primitiveCounter', 0 as any)
    }).toThrowError(Errors.initializePrimitiveState('primitiveCounter'))
    expect(socket.existState('primitiveCounter')).toBeFalsy()
  })

  test('# case 4: the returned value of socket.getState should be readonly', () => {
    const counter = socket.getState('counter')
    console.warn = jest.fn()
    counter.value += 1
    expect(counter.value).toEqual(0)
    expect(console.warn).toBeCalledWith('[Vue warn] Set operation on key "value" failed: target is readonly.', counter)
  })
})

describe('Test socket.setState', () => {
  const bus = new Bus('innerBus')
  const socket = bus.createSocket()
  socket.initState(
    'counter',
    {
      value: 0,
    },
    true,
  )

  test('# case 1: state can be modified by socket.setState', async () => {
    const delay = (seconds: number) => {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, seconds * 1000)
      })
    }
    console.warn = jest.fn()
    const counter = socket.getState('counter')
    expect(counter.value).toEqual(0)
    await socket.setState('counter', 'add the counter asynchronously', async (state) => {
      await delay(1)
      state.value++
    })
    socket.setState('counter', 'add the counter synchronously', (state) => {
      state.value++
    })
    counter.value++
    expect(counter.value).toEqual(2)
    expect(console.warn).toBeCalledWith('[Vue warn] Set operation on key "value" failed: target is readonly.', counter)
  })

  test('# case 2: private state can not be modified by other socket', (done) => {
    const anotherSocket = bus.createSocket()
    anotherSocket
      .setState('counter', 'add counter by another socket', (state) => {
        state.value++
      })
      .catch((err) => {
        expect(err.message).toEqual(Errors.modifyPrivateState('counter'))
        done()
      })
  })

  test('# case 3: an uninitialized state can not be set', (done) => {
    socket
      .setState('uninitialized', 'set an unintialized state', (state) => {
        state.value = 'whatever'
      })
      .catch((err) => {
        expect(err.message).toEqual(Errors.accessUninitializedState('uninitialized'))
        done()
      })
  })

  test('# case 4: action is neccessary when calling socket.setState', () => {
    socket
      .setState('counter', '', (state) => {
        state.value++
      })
      .catch((error) => {
        expect(error.message).toEqual(Errors.actionIsNotDefined('counter'))
      })
  })
})

describe('Test socket.watchState', () => {
  const bus = new Bus('innerBus')
  const socket = bus.createSocket()
  let unwatch: () => void = () => {}
  test('# case 1: state can not be watched before it is initialized', () => {
    expect(() => {
      socket.watchState('uninitialized', (state) => state)
    }).toThrowError(Errors.accessUninitializedState('uninitialized'))
  })

  test('# case 2: when state changes, the watching callback should be called', async () => {
    const rawUser = {
      name: 'Mary',
      age: 11,
      gender: 'female',
    }
    type User = typeof rawUser
    socket.initState<User>('user', rawUser)
    type WatchingType = [string, number]
    console.log = jest.fn()
    unwatch = socket
      .watchState<User, WatchingType>('user', (state) => {
        return [state.name, state.age]
      })
      .do(([name, age], [oldName, oldAge]) => {
        console.log(name, oldName, age, oldAge)
      })
    await socket.setState('user', 'modify user', (state) => {
      state.name = 'Mike'
      state.age = 12
      state.gender = 'male'
    })
    expect(rawUser.name).toEqual('Mike')
    expect(rawUser.age).toEqual(12)
    expect(rawUser.gender).toEqual('male')
    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith('Mike', 'Mary', 12, 11)
    // @ts-ignore
    expect(socket.stores.user.watchers.size).toEqual(1)
    const deepObj = {
      foo: {
        bar: 1,
      },
    }
    type DeepObj = typeof deepObj
    socket.initState<DeepObj>('deepObj', deepObj)
    socket
      .watchState<DeepObj, { bar: number }>('deepObj', (state) => state.foo)
      .do((newFoo, oldFoo) => {
        console.log(newFoo.bar, oldFoo.bar)
      })
    await socket.setState('deepObj', 'set foo', (state) => {
      state.foo = {
        bar: 2,
      }
    })
    expect(console.log).toBeCalledWith(2, 1)
  })

  test('# case 3: watching callback should not be called after unwatching', async () => {
    console.log = jest.fn()
    unwatch()
    await socket.setState('user', 'modify user', (state) => {
      state.name = 'Lily'
      state.age = 13
      state.gender = 'female'
    })
    expect(console.log).toBeCalledTimes(0)
    const user = socket.getState('user')
    expect(user.name).toEqual('Lily')
    expect(user.age).toEqual(13)
    expect(user.gender).toEqual('female')
    // @ts-ignore
    expect(socket.stores.user.watchers.size).toEqual(0)
  })

  test('# case 4: test the behavior like watchEffect', async () => {
    console.log = jest.fn()
    const watcher = socket.watchState('user', (state) => {
      console.log(state.name)
    })
    await socket.setState('user', "modify user's name", (user) => {
      user.name = 'Tom'
    })
    watcher.unwatch()
    socket.setState('user', "modify user's name", (user) => {
      user.name = 'Jack'
    })
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('Lily')
    expect(console.log).toBeCalledWith('Tom')
    // @ts-ignore
    expect(socket.stores.user.watchers.size).toEqual(0)
  })
})
