import { CreatedBlock } from './created-block'
import { touchBus, getBus, CallbackType, App as RegisteredBlock } from '@rallie/core'
import { errors, constant } from './utils'

export function createBlock<
  State extends Record<string, any>,
  Events extends Record<string, CallbackType>,
  Methods extends Record<string, CallbackType>,
>(name: string) {
  const [globalBus, isEntry] = touchBus()
  if (globalBus.existApp(name)) {
    throw new Error(errors.duplicatedBlockName(name))
  }
  const globalSocket = globalBus.createSocket()
  if (isEntry) {
    globalSocket.initState(constant.isGlobalBusAccessible, { value: true }, true)
  }
  return new CreatedBlock<State, Events, Methods>(name, globalBus, globalSocket, isEntry)
}

export function registerBlock(block: CreatedBlock<any, any, any>): RegisteredBlock {
  if (block.isCreatedBlock) {
    const bus = getBus()
    return bus.createApp(block.name)
  } else {
    throw new Error(errors.invalidBlock(block.name))
  }
}

export type { Block } from './block'
export type { CreatedBlock, Env } from './created-block'
export type { ConnectedBlock } from './connected-block'

export type {
  App as RegisteredBlock,
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
