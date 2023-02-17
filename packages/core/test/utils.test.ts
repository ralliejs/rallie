import * as utils from '../src/lib/utils'

describe('Test utils', () => {
  test('#case1: test isPrimitive', () => {
    expect(utils.isPrimitive({})).toBeFalsy()
    expect(utils.isPrimitive(null)).toBeFalsy()
    expect(utils.isPrimitive('')).toBeTruthy()
    expect(utils.isPrimitive(1)).toBeTruthy()
    expect(utils.isPrimitive(false)).toBeTruthy()
  })
})
