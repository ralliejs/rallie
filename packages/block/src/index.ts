import { CreatedBlock } from './created-block'
import type { BlockService } from './block'
import { touchBus } from '@rallie/core'
import { errors, constant } from './utils'
import { RegisteredBlock } from './registered-block'

export function createBlock<T extends BlockService = {}>(name: string) {
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

export function registerBlock<T extends CreatedBlock<unknown>>(block: T) {
  if (block.isCreatedBlock) {
    return new RegisteredBlock<T>(block)
  } else {
    throw new Error(errors.invalidBlock(block.name))
  }
}

export type { Block } from './block'
export type { CreatedBlock, Env } from './created-block'
export type { ConnectedBlock } from './connected-block'
export type { RegisteredBlock } from './registered-block'

export type {
  CallbackType,
  ScriptType,
  LinkType,
  AssetsConfigType,
  ConfType,
  ContextType,
  NextFnType,
  MiddlewareFnType,
  LifecyleCallbackType,
  DependencyType,
  RelateType,
  Bus,
} from '@rallie/core'
