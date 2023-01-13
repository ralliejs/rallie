import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

let rootContainer: HTMLElement

export const onBootstrap = (container: HTMLElement) => {
  rootContainer = container ?? document.getElementById('react-app')
  ReactDOM.render(<App />, rootContainer)
}

export const onDestroy = () => {
  ReactDOM.unmountComponentAtNode(rootContainer)
}
