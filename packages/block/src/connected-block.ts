import { Block, BlockType } from './block'
import { constant } from './utils'

export type ConnectedBlockType = BlockType & {
  exports?: Record<string, any>
}

export class ConnectedBlock<T extends ConnectedBlockType> extends Block<Omit<T, 'import'>> {
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
