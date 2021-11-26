import { createApp, App as VueApp } from 'vue'
import App from './components/App.vue'

let app: VueApp<any>

export const onBootstrap = (container: HTMLElement) => {
  app = createApp(App)
  if (container) {
    app.mount(container)
  }
}

export const onDestroy = () => {
  app.unmount()
}
