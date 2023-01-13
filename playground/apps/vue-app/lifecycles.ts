import { createApp, App as VueApp } from 'vue'
import { hostApp } from './blocks/host-app'
import App from './components/App.vue'

let app: VueApp<any>

export const onBootstrap = (container?: HTMLElement) => {
  app = createApp(App)
  const naiveUI = hostApp.methods.useNaiveUI()
  app.use(naiveUI)
  app.mount(container ?? document.getElementById('vue-app'))
}

export const onDestroy = () => {
  app.unmount()
}
