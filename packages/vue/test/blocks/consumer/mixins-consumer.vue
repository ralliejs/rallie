<script lang="ts">
import { producer } from './blocks'
import { mixinBlockState } from '../../../src'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [
    mixinBlockState(producer, (state) => ({
      isDarkTheme: state.isDarkTheme,
    })),
  ],
  methods: {
    toggleTheme() {
      producer.methods.toggleTheme()
    },
    addCount() {
      producer.setState('add the count', (state) => {
        state.count++
      })
    },
    printTheme() {
      producer.events.printTheme()
    },
  },
})
</script>

<template>
  <div
    data-testid="consumer-container"
    :style="{ backgroundColor: isDarkTheme ? 'black' : 'white' }"
  >
    <button @click="toggleTheme">toggle theme</button>
    <button @click="addCount">add count</button>
    <button @click="printTheme">print theme</button>
  </div>
</template>
