import { App } from 'rallie'

type NotificationType = 'create' | 'error' | 'info' | 'success' | 'warning'
type NotificationContentType = string | ((container: HTMLElement) => void)

type State = {
  count: number
}

type Events = {
  notifiction: (type: NotificationType, content: NotificationContentType) => void
}

type Methods = {
  openModal: (title: string, content: (container: HTMLElement) => void) => () => void
}

export const app = new App<State, Events, Methods>('vue-app', {
  state: {
    count: 0
  }
})
