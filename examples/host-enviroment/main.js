import { createBus } from 'obvious-core';

const bus = createBus('host', {
    'react-app': {
        js: [
            'http://localhost:3000/static/js/bundle.js',
            'http://localhost:3000/static/js/0.chunk.js',
            'http://localhost:3000/static/js/1.chunk.js',
            'http://localhost:3000/static/js/main.chunk.js'
        ]
    },
    'vue-app': {
        js: [
            'http://localhost:8080/js/app.js',
            'http://localhost:8080/js/chunk-vendors.js'
        ]
    }
});

bus.createApp('unit-app')
    .relyOn([
        {
            'vue-app': { mountPoint: '#vue-app' }
        },
        {
            'react-app': { mountPoint: '#react-app'}
        }
    ])
    .bootstrap(async () => {
        setTimeout(() => {
            alert('I can not wait to star obvious.js');
        }, 2000);
    });

bus.activateApp('unit-app');