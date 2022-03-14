<script lang="ts">
import { producer } from './apps'
import { useRallieState } from '../../../src'
import { defineComponent } from 'vue'

export default defineComponent(function Consumer() {
  const toggleTheme = () => {
    producer.methods.toggleTheme()
  }
  const addCount = () => {
    producer.setState('add the count', (state) => {
      state.count++
    })
  }
  const printTheme = () => {
    producer.events.printTheme()
  }
  const isDarkTheme = useRallieState(producer, (state) => state.isDarkTheme)
  return {
    toggleTheme,
    addCount,
    printTheme,
    isDarkTheme,
  }
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
