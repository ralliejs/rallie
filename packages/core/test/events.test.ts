import { Bus } from '../src/index'
import { Errors, Warnings } from '../src/lib/utils'

describe('Test broadcast', () => {
  const bus = new Bus('innerBus')
  const socket = bus.createSocket()
  type BroadcastEvents = {
    printHelloWorld: () => void;
    printText: (text: string) => void;
    shouldNotBeCalled: () => void;
  }
  const broadcaster = socket.createBroadcaster<BroadcastEvents>((event) => {
    console.error('trigger', event)
  })
  console.error = jest.fn()
  console.warn = jest.fn()
  console.log = jest.fn()
  const offBroadcast = socket.onBroadcast<BroadcastEvents>({
    printHelloWorld () {
      console.log('Hello World')
    },
    printText (text: string) {
      console.log(text)
    },
    shouldNotBeCalled () {
      console.log('This callback should not be called')
    }
  })
  test('# case 1: listen broadcast events and emit them with broadcaster', () => {
    broadcaster.printHelloWorld()
    broadcaster.printText('Hello Obvious')
    expect(console.log).toBeCalledTimes(2)
    expect(console.error).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('Hello World')
    expect(console.log).toBeCalledWith('Hello Obvious')
    expect(console.error).toBeCalledWith('trigger', 'printHelloWorld')
    expect(console.error).toBeCalledWith('trigger', 'printText')
  })

  test('# case 2: unwatch events with broadcaster', () => {
    offBroadcast('nonExistentEvent')
    expect(console.warn).toBeCalledWith(Warnings.handlerIsNotInTheEventsPool('nonExistentEvent', false))
    offBroadcast('printHelloWorld')
    broadcaster.printHelloWorld()
    expect(console.warn).toBeCalledWith(Warnings.emptyBroadcastEvents('printHelloWorld'))
    offBroadcast()
    broadcaster.printText('')
    broadcaster.shouldNotBeCalled()
    expect(console.warn).toBeCalledWith(Warnings.emptyBroadcastEvents('printText'))
    expect(console.warn).toBeCalledWith(Warnings.emptyBroadcastEvents('shouldNotBeCalled'))
    expect(console.warn).toBeCalledTimes(4)
  })
})

describe('Test unicast', () => {
  const bus = new Bus('innerBus')
  const socket = bus.createSocket()
  type UnicastEvents = {
    getHelloWorld: () => string;
    getText: (text: string) => string;
    shouldNotBeCalled: () => void;
  }
  const unicaster = socket.createUnicaster<UnicastEvents>()
  console.error = jest.fn()
  console.warn = jest.fn()
  console.log = jest.fn()
  const offUnicast = socket.onUnicast<UnicastEvents>({
    getHelloWorld () {
      return 'Hello World'
    },
    getText (text: string) {
      return text
    },
    shouldNotBeCalled () {
      console.log('This callback should not be called')
    }
  })
  test('# case 1: listen unicast events and emit them with unicaster', () => {
    expect(unicaster.getHelloWorld()).toEqual('Hello World')
    expect(unicaster.getText('Hello Obvious')).toEqual('Hello Obvious')
  })

  test('# case 2: unwatch events with unicaster', () => {
    offUnicast('nonExistentEvent')
    expect(console.warn).toBeCalledWith(Warnings.handlerIsNotInTheEventsPool('nonExistentEvent', true))
    offUnicast('getHelloWorld')
    expect(() => {
      unicaster.getHelloWorld()
    }).toThrowError(Errors.emittedNonExistedUnicast('getHelloWorld'))
    offUnicast()
    expect(() => {
      unicaster.getText('')
    }).toThrowError(Errors.emittedNonExistedUnicast('getText'))
    expect(() => {
      unicaster.shouldNotBeCalled()
    }).toThrowError(Errors.emittedNonExistedUnicast('shouldNotBeCalled'))
  })
})
