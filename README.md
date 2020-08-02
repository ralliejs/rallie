# obvious.js
Obvious is a progressive micro-front-end framework. In the micro-front-end architecture, Obvious focuses on solving the  problem of orchestration and communication between micro frontend applications. It aims to help users quickly build a basic micro-front-end system and support deeper customization to achieve a complete and reliable micro-front-end architecture by providing easy-to-understand APIs flexible middleware mechanisms.

## Features
- Provide flexible and convenient capabilities based on global status, event broadcast, and event unicast
- Support declaring dependencies capabilities when defining micro applications, and automatically activate dependencies when activating micro applications, allowing micro applications to be freely split and combine
- Have a flexible middleware mechanism. Allow developers to freely customize the unified registration and loading rules of resources in the form of writing middleware to realize automatic registration. At the same time, allow developers to write middleware to control the code excuting, so that developers can elegantly access log, js sandbox and other functions
- Naturally supports loading multiple micro-applications in a single-screen page, based on which a high-end spa micro-front-end framework can be encapsulated, and the activation conditions of the micro-applications are completely freely set by the developer, no longer limited to routing hijacking.
- The concept is simple, the functional API is clear and easy to understand, and it can be developed without documentation

## Installation
`npm install @runnan/obvious-core`

## Quick Start
![](docs/_media/tutorial-target.gif)

In host enviroment, create a bus and declare the resource info
```js
import {createBus} from '@runnan/obvious-core';

const bus = createBus('host', {
    'react-app': {
        js: [
            'http://localhost:3000/static/js/bundle.js',
            'http://localhost:3000/static/js/0.chunk.js',
            'http://localhost:3000/static/js/main.chunk.js'
        ]
    },
    'vue-app': {
        js: [
            'http://localhost:8081/js/app.js',
            'http://localhost:8081/js/chunk-vendors.js'
        ]
    }
});
```

micro frontend application can get the bus, and create an App with it, at the same time, a socket can be created to communicate with other App

react-app
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {getBus} from '@runnan/obvious-core';

const bus = getBus('host');
const socket = bus.createSocket();
bus.createApp('react-app')
    .bootstrap(async (config) => {
        socket.unicast('unicast-event');
        socket.broadcast('broadcast-event');
        socket.initState('some-state', true);
        ReactDOM.render(<App />, document.querySelector(config.mountPoint));
    });
```  

vue-app
```js
import Vue from 'vue';
import App from './App.vue';
import {getBus} from '@runnan/obvious-core';

Vue.config.productionTip = false;

const bus = getBus('host');
const socket = bus.createSocket();
bus.createApp('vue-app')
    .bootstrap(async (config) => {
        socket.onUnicast('unicast-event', () => {
            // do something
        });
        socket.onBroadcast('broadcast-event', () => {
            // do something
        });
        socket.watchState('some-state', () => {
            // do something
        });
        new Vue({
            render: h => h(App),
        }).$mount(config.mountPoint);
    });
```

In host enviroment, activate the application
```js
bus.activate('react-app', '#react-app');
bus.activate('vue-app', '#vue-app');
```

## Document

[obvious.js](https://run-nan.github.io/obvious/#/)

## License
obvious is [MIT Licensed](https://github.com/run-nan/obvious/blob/master/LICENSE)