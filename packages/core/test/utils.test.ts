import * as utils from '../src/lib/utils'

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
