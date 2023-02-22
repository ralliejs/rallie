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
      <button @click="incrementCount">increment count</button>
      <button @click="printCount">print count</button>
      <button @click="switchLocale">switch locale</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mixinBlockEvents, mixinBlockMethods, mixinBlockState } from '../../src'
import { block } from '../blocks'

export default defineComponent({
  name: 'MixinsTester',
  mixins: [
    mixinBlockState(block, (state) => ({
      locale: state.locale,
      count: state.count,
      funcState: state.funcState
    })),
    mixinBlockEvents(block, {
      incrementCount() {
        block.setState('increment count', (state) => {
          state.count++
        })
      },
      printCount() {
        console.log(this.count)
      }
    }),
    mixinBlockMethods(block, {
      async switchLocale() {
        await block.setState('switch locale', (state) => {
          const currentLocale = state.locale
          state.locale = currentLocale === 'en' ? 'zh' : 'en'
        })
      }
    })
  ]
})
</script>