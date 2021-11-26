import ReactDOM from 'react-dom'
import App from './components/App'

let rootContainer: HTMLElement = null

export const onBootstrap = (container: HTMLElement) => {
  rootContainer = container
  // @ts-ignore
  ReactDOM.render(<App />, container) // TODO: remove @ts-ignore
}

export const onDestroy = () => {
  ReactDOM.unmountComponentAtNode(rootContainer)
}
