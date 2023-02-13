import { Block, BlockService } from './block'
import { constant } from './utils'

export class ConnectedBlock<T extends BlockService> extends Block<T> {
  private innerMethods: {
    [constant.exportMethodName]: () => T['exports']
  }

  constructor(name: string) {
    super(name)
    this.isCreatedBlock = false
    this.innerMethods = this.socket.createUnicaster()
  }

  import() {
    return this.innerMethods[constant.exportMethodName]()
  }
}
