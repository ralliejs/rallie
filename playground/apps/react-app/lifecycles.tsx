import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { App } from './components/App'

let root: Root

export const onBootstrap = (container: HTMLElement) => {
  const rootContainer = container ?? document.getElementById('react-app')
  root = createRoot(rootContainer)
  root.render(<App />)
}

export const onDestroy = () => {
  root.unmount()
}
