import { EventEmitter } from '../src/lib/event-emitter'
import { Errors } from '../src/lib/utils'

describe('Test broadcast:', () => {
  const broadCastTester = new EventEmitter()
  let valueToModify = 0
  const callback = (newValue: number) => {
    valueToModify = newValue
  }
  test('# case 1: emit a broadcast event, callback should be called', () => {
    broadCastTester.addBroadcastEventListener('test', callback)
    expect(valueToModify).toBe(0)
    broadCastTester.emitBroadcast('test', 1)
    expect(valueToModify).toBe(1)
  })

  test('# case 2: emit the broadcast event before listening', () => {
    console.warn = jest.fn()
    broadCastTester.removeBroadcastEventListener('test', callback)
    broadCastTester.emitBroadcast('test')
    broadCastTester.addBroadcastEventListener('test', () => {
      console.warn(valueToModify)
    })
    expect(console.warn).toBeCalledWith(1)
  })

  test('# case 3: remove non-existent listener of an broadcast event, it should throw an error', () => {
    const errorMessage = Errors.wrongBroadcastCallback('test'); // eslint-disable-line
    const expectedError = new Error(errorMessage)
    expect(() => {
      broadCastTester.removeBroadcastEventListener('test', callback)
    }).toThrow(expectedError)
  })

  test('# case 4: remove a listener of a non-existent event, it should throw an error', () => {
    const eventName = 'nonExistentEvent'
        const errorMessage = Errors.removeNonExistedBroadcast(eventName); // eslint-disable-line
    const expectedError = new Error(errorMessage)
    expect(() => {
      broadCastTester.removeBroadcastEventListener(eventName, callback)
    }).toThrow(expectedError)
  })

  test('# case 5: when some callbacks of a broadcast event throw an error, other normal callbacks should not be affected', () => {
    console.error = jest.fn()
    broadCastTester.addBroadcastEventListener('testEvent', () => {
      throw new Error()
    })
    let valueToModify1 = false; let valueToModify2 = false
    broadCastTester.addBroadcastEventListener('testEvent', () => {
      valueToModify1 = true
    })
    broadCastTester.addBroadcastEventListener('testEvent', () => {
      valueToModify2 = true
    })
    broadCastTester.emitBroadcast('testEvent')
    expect(console.error).toBeCalledTimes(2)
    expect(valueToModify1).toBeTruthy()
    expect(valueToModify2).toBeTruthy()
  })
})

describe('Test unicast:', () => {
  const unicastTester = new EventEmitter()
  const callback = (num: number) => {
    return num * 2
  }
  test('#case 1: emit a unicast event, callback should be called and return a value', () => {
    unicastTester.addUnicastEventListener('double', callback)
    const result = unicastTester.emitUnicast('double', 3)
    expect(result).toEqual(2 * 3)
  })

  test('#case 2: remove an existed unicast listener and emit the event, there should be an error to be throwed', () => {
    unicastTester.removeUnicastEventListener('double')
    expect(() => {
      unicastTester.emitUnicast('double', 2)
    }).toThrowError()
  })

  test('#case 3: remove the listener of a non-existence unicast event, there should be an error to be throwed', () => {
    expect(() => {
      unicastTester.removeUnicastEventListener('double')
    }).toThrowError(new Error(Errors.removeNonExistedUnicast('double')))
  })

  test('#case 4: registed a callback on an existed unicast event, there should be an error to be throwed', () => {
    unicastTester.addUnicastEventListener('double', () => {})
    expect(() => {
      unicastTester.addUnicastEventListener('double', () => {})
    }).toThrowError(new Error(Errors.registedExistedUnicast('double')))
  })
})
