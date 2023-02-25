import { CreatedBlock } from './created-block'
import { BlockType } from './base-block'
import { touchBus } from '@rallie/core'
import { errors, constant } from './utils'

export function createBlock<T extends BlockType = {}>(name: string) {
  const [globalBus, isEntry] = touchBus()
  if (globalBus.existApp(name)) {
    throw new Error(errors.duplicatedBlockName(name))
  }
  const globalSocket = globalBus.createSocket()
  if (isEntry) {
    globalSocket.initState(constant.isGlobalBusAccessible, { value: true }, true)
  }
  return new CreatedBlock<T>(name, globalBus, globalSocket, isEntry)
}

export type { BlockType, BaseBlock } from './base-block'
export type { CreatedBlock, Env } from './created-block'

export type {
  ScriptType,
  LinkType,
  AssetsConfigType,
  ConfType,
  ContextType,
  NextFnType,
  MiddlewareFnType,
  Bus,
} from '@rallie/core'
