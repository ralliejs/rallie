import { registerApp, App } from '../src'
import { errors } from '../src/utils'

describe('Test errors', () => {
  test('#case1: apps can not have the same name', () => {
    registerApp(new App('case1'))
    expect(() => {
      registerApp(new App('case1'))
    }).toThrowError(errors.duplicatedAppName('case1'))
  })
})
