import * as utils from '../src/lib/utils'
import { Bus, effect } from '../src/index'

describe('Test utils', () => {
  test('#case1: test isObject', () => {
    expect(utils.isObject({})).toBeTruthy()
    expect(utils.isObject([])).toBeFalsy()
    expect(utils.isObject(null)).toBeFalsy()
    expect(utils.isObject(true)).toBeFalsy()
  })

  test('#case2: test isPrimitive', () => {
    expect(utils.isPrimitive({})).toBeFalsy()
    expect(utils.isPrimitive(null)).toBeFalsy()
    expect(utils.isPrimitive('')).toBeTruthy()
    expect(utils.isPrimitive(1)).toBeTruthy()
    expect(utils.isPrimitive(false)).toBeTruthy()
  })

  test('#case3: test getLibraryName', () => {
    expect(utils.getLibraryName('a')).toBeUndefined()
    expect(utils.getLibraryName('lib：xxx')).toBeUndefined()
    expect(utils.getLibraryName('lib:ab_c123--_-def')).toEqual('AbC123Def')
    expect(utils.getLibraryName('lib:react-dom')).toEqual('ReactDom')
  })
})

describe('Test Effect', () => {
  const bus = new Bus('testEffect')
  const socket = bus.createSocket()
  socket.initState('count', {
    value: 0
  })
  test('#case1: test effect', () => {
    console.log = jest.fn()
    effect(() => {
      console.log(socket.getState('count', count => count.value))
    })
    socket.setState('count', count => { count.value++ }) // 1
    socket.setState('count', count => { count.value++ }) // 2
    socket.setState('count', count => { count.value++ }) // 3
    socket.setState('count', count => { count.value++ }) // 4
    expect(console.log).toBeCalledTimes(5)
    expect(console.log).toHaveBeenCalledWith(0)
    expect(console.log).toHaveBeenCalledWith(1)
    expect(console.log).toHaveBeenCalledWith(2)
    expect(console.log).toHaveBeenCalledWith(3)
    expect(console.log).toHaveBeenCalledWith(4)
  })
})
