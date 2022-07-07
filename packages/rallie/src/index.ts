import { CreatedBlock } from './created-block'
import { touchBus, getBus, CallbackType, App as RegisteredBlock } from '@rallie/core'
import { errors, constant } from './utils'
import type { ConstraintedType } from './utils'

export function createBlock<
  T extends {
    state?: Record<string, any>
    events?: Record<string, CallbackType>
    methods?: Record<string, CallbackType>
    exports?: Record<string, any>
  } = {},
>(name: string) {
  const [globalBus, isEntry] = touchBus()
  if (globalBus.existApp(name)) {
    throw new Error(errors.duplicatedBlockName(name))
  }
  const globalSocket = globalBus.createSocket()
  if (isEntry) {
    globalSocket.initState(constant.isGlobalBusAccessible, { value: true }, true)
  }
  return new CreatedBlock<
    ConstraintedType<T['state'], undefined>,
    ConstraintedType<T['events'], never>,
    ConstraintedType<T['methods'], never>,
    ConstraintedType<T['exports'], {}>
  >(name, globalBus, globalSocket, isEntry)
}

export function registerBlock(block: CreatedBlock<any, any, any, any>): RegisteredBlock {
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
