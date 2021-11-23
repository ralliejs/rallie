<script setup lang="ts">
import { app } from '../app'
import { stateHook } from '@rallie/vue'

defineProps({ msg: String }) // eslint-disable-line

const count = stateHook(app)(state => state.count)
const addCount = () => {
  app.setState(state => { state.count++ })
}

const hint = {
  currentMode: 'host',
  navigationMode: 'remote',
  navigationLink: '/rallie/index.html'
}
app.runInRemoteMode(() => {
  hint.currentMode = 'remote'
  hint.navigationMode = 'host'
  hint.navigationLink = '/rallie/apps/vue-app/index.html'
})

</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    This app is running in <strong>{{ hint.currentMode }}</strong> mode,
    click <a :href="hint.navigationLink">here</a> to see how it works in {{ hint.navigationMode }} mode
  </p>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="addCount">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
