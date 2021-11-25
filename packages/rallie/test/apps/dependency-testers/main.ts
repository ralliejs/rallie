import { registerApp, App } from '../../../src/index'

registerApp(new App('dependency-testers/main'))
  .relyOn(['dependency-testers/a', 'dependency-testers/b', 'dependency-testers/c'])
