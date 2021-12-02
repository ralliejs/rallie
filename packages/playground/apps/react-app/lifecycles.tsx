import ReactDOM from 'react-dom'
import App from './components/App'

let rootContainer: HTMLElement = null

export const onBootstrap = (container: HTMLElement) => {
  rootContainer = container ?? document.getElementById('react-app')
  // @ts-ignore
  ReactDOM.render(<App />, rootContainer) // TODO: remove @ts-ignore
}

export const onDestroy = () => {
  ReactDOM.unmountComponentAtNode(rootContainer)
}
