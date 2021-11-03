import { createApp, App as VueApp } from 'vue'
import App from './components/App.vue'

import { registerApp } from 'rallie'
import { app } from './app'

let vm: VueApp<any>
registerApp(app)
  .onBootstrap((container) => {
    console.log(container)
    vm = createApp(App)
    vm.mount(container)
  })
  .onDestroy(() => {
    vm.unmount()
  })

app.runInHostMode(() => {
  app.activate(app.name, document.getElementById('vue-app'))
})
