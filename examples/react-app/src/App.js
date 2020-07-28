import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getBus } from '@runnan/obvious-core';

const bus = getBus('demo');
const socket = bus.createSocket();

function App() {
  const [message, setMessage] = React.useState('welcome to learn obvious.js');

  React.useEffect(() => {
    socket.initState('message', 'welcome to learn obvious.js');
  }, []);

  const handleOnChange = (value) => {
    setMessage(value);
    socket.setState(message);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={`http://localhost:3000${logo}`} className="App-logo" alt="logo" />
        <p>
            Edit the text showed in vue area: <input onChange={handleOnChange} value={message}></input>
        </p>
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
