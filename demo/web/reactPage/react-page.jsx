import React from 'react';
import logo from './logo.svg';
import './react-page.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBus } from '@runnan/obvious';

function ReactPage() {
    const bus = getBus('global');
    const defaultText = 'Hello Obvious';
    const reactSocket = bus.getSocket('reactSocket');
    const [text, setText] = useState(defaultText);
    useEffect(() => {
        if(reactSocket && reactSocket.getState('text') === undefined) {
            reactSocket.initState('text', defaultText);
        }
        setText(reactSocket.getState('text'));
    }, []);

    const handleOnChange = (e) => {
        setText(e.target.value);
        reactSocket && reactSocket.setState('text', e.target.value);
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
