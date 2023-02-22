<script lang="ts">
import { defineComponent } from 'vue'
import { block } from '../blocks'
import { useBlockState, useBlockEvents, useBlockMethods } from '../../src'

export default defineComponent(function HooksTester() {
  const count = useBlockState(block, (state) => state.count)
  const locale = useBlockState(block, (state) => state.locale)
  const funcState = useBlockState(block, (state) => state.funcState)
  useBlockEvents(block, {
    incrementCount() {
      block.setState('increment count', (state) => {
        state.count++
      })
    },
    printCount() {
      console.log(count.value)
    }
  })
  useBlockMethods(block, {
    async switchLocale() {
      await block.setState('switch locale', (state) => {
        const currentLocale = state.locale
        state.locale = currentLocale === 'en' ? 'zh' : 'en'
      })
    }
  })
  const { incrementCount, printCount } = block.events
  const { switchLocale } = block.methods
  return {
    count,
    locale,
    funcState,
    incrementCount,
    printCount,
    switchLocale
  }
})
</script>

<template>
  <div>
    <div>
      <span>count: {{ count }}</span>
    </div>
    <div>
      <span>locale: {{ locale }}</span>
    </div>
    <div>
              <button @click="funcState()">trigger funcState</button>
      <button @click="incrementCount()">increment count</button>
      <button @click="printCount()">print count</button>
      <button @click="switchLocale()">switch locale</button>
    </div>
  </div>
</template>