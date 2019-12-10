import React from 'react';
import logo from './logo.svg';
import './react-page.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ReactPage() {
    const defaultText = 'Hello Obvious';
    const [text, setText] = useState(defaultText);
    useEffect(() => {
        const globalSocket = window.globalSocket;
        if(globalSocket && globalSocket.getState('text') === undefined) {
            globalSocket.initState('text', defaultText);
        }
        setText(globalSocket.getState('text'));
    }, []);

    const handleOnChange = (e) => {
        setText(e.target.value);
        window.globalSocket && window.globalSocket.setState('text', e.target.value);
    };
    
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit the text showed in <Link to='/vuePage'>vue page</Link>: <input value={text} onChange={handleOnChange}/>.
                </p>
            </header>
        </div>
    );
}

export default ReactPage;
