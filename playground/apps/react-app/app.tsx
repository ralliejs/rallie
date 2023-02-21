import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'

export const mount = (container: HTMLElement) => {
  const root = createRoot(container)
  root.render(<App />)
}
