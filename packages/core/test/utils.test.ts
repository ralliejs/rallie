import * as utils from '../src/lib/utils'

describe('Test utils', () => {
  test('#case1: test isPrimitive', () => {
    expect(utils.isPrimitive({})).toBeFalsy()
    expect(utils.isPrimitive(null)).toBeFalsy()
    expect(utils.isPrimitive('')).toBeTruthy()
    expect(utils.isPrimitive(1)).toBeTruthy()
    expect(utils.isPrimitive(false)).toBeTruthy()
  })

  test('#case2: test deduplicate', () => {
    const arr1 = utils.deduplicate(['a', 'a', { name: 'a' }])
    expect(arr1).toHaveLength(1)
    expect(arr1[0]).toEqual('a')
    const arr2 = utils.deduplicate([{ name: 'a' }, { name: 'b' }, 'c', 'a'] as any[])
    expect(arr2).toHaveLength(3)
    expect(arr2[0].name).toEqual('a')
  })
})
