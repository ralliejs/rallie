import { Block, BlockService } from './block'
import { constant, SYMBOLS } from './utils'

export class ConnectedBlock<T extends BlockService> extends Block<T> {
  private innerMethods: {
    [constant.exportMethodName]: () => T['exports']
  }

  public symbol = SYMBOLS.CONNECTED_BLOCK

  constructor(name: string) {
    super(name)
    this.innerMethods = this.socket.createUnicaster()
  }

  import() {
    return this.innerMethods[constant.exportMethodName]()
  }
}
