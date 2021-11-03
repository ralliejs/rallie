import { App } from 'rallie'
import { getStateHook } from '@rallie/vue'

export const app = new App('vue-app', {
  state: {
    public: {
      count: 0
    }
  }
})

export const usePublicState = getStateHook(app.publicState)
