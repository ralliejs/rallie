<script lang="ts">
import { producer } from './app'
import { stateHook } from '../../../src'
import { defineComponent } from 'vue'

const useProducerPrivateState = stateHook(producer.privateState)

export default defineComponent(function Consumer () {
  const toggleTheme = () => {
    producer.methods.toggleTheme()
  }
  const addCount = () => {
    producer.publicState.set(state => {
      state.count++
    })
  }
  const printTheme = () => {
    producer.events.printTheme()
  }
  const isDarkTheme = useProducerPrivateState<boolean>(state => state.isDarkTheme)
  return {
    toggleTheme,
    addCount,
    printTheme,
    isDarkTheme
  }
})
</script>

<template>
  <!--TODO: fix the ts error-->
  <div data-testid="consumer-container" :style="{backgroundColor: isDarkTheme ? 'black' : 'white'}">
      <button @click="toggleTheme">toggle theme</button>
      <button @click="addCount">add count</button>
      <button @click="printTheme">print theme</button>
  </div>
</template>
