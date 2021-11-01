<script lang="ts">
// @ts-ignore
import { producer } from './app'
import { getStateHook } from '../../../src'
import { defineComponent } from 'vue'

const useProducerPrivateState = getStateHook(producer.privateState)

export default defineComponent(function Consumer () {
  const toggleTheme = () => {
    producer.unicaster.toggleTheme()
  }
  const addCount = () => {
    producer.publicState.set(state => {
      state.count++
    })
  }
  const printTheme = () => {
    producer.broadcaster.printTheme()
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
