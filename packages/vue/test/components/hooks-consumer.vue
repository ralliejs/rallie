<script lang="ts">
import { useBlockState } from '../../src'
import { defineComponent } from 'vue'
import { consumer } from '../blocks/consumer'
import type { ProducerService } from '../blocks/producer'

const producer = consumer.connect<ProducerService>('producer')

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
  const isDarkTheme = useBlockState(producer, (state) => state.isDarkTheme)
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
