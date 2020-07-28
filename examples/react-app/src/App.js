import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getBus } from '@runnan/obvious-core';

const bus = getBus('demo');
const socket = bus.createSocket();

function App() {
  const [text, setText] = React.useState('Hello Obvious');
  const [logoClass, setLogoClass] = React.useState('App-logo rotate');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    socket.initState('text', 'Hello Obvious');
    const onRotate = () => {
      setLogoClass('App-logo rotate');
    };
    const onStopRotate = () => {
      setLogoClass('App-logo');
    };
    const getInputDOM = () => {
        console.log(inputRef);
        return inputRef && inputRef.current;
    }
    socket.onBroadcast('rotate', onRotate);
    socket.onBroadcast('stop-rotate', onStopRotate);
    socket.onUnicast('get-input-dom', getInputDOM);

    return () => {
      socket.offBroadcast('rotate', onRotate);
      socket.offBroadcast('stop-rotate', onStopRotate);
      socket.offUnicast('get-input-dom', getInputDOM);
    };
  }, []);

  const handleOnChange = (e) => {
    setText(e.target.value);
    socket.setState('text', e.target.value);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={`http://localhost:3000${logo}`} className={logoClass} alt="logo" />
        <div>
            <div>Edit the text showed in vue area: </div>
            <input ref={inputRef} onChange={handleOnChange} value={text}></input>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
