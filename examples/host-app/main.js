import { createBus } from '@runnan/obvious-core';

const bus = createBus('demo', {
    'react-app': {
        js: [
            'http://localhost:3001/static/js/bundle.js',
            'http://localhost:3001/static/js/0.chunk.js',
            'http://localhost:3001/static/js/1.chunk.js',
            'http://localhost:3001/static/js/main.chunk.js'
        ]
    },
    'vue-app': {
        js: [
            'http://localhost:8081/js/app.js',
            'http://localhost:8081/js/chunk-vendors.js'
        ]
    }
});

bus.activateApp('react-app').then(() => {
    return bus.activateApp('vue-app');
}).then(() => {
    console.log('enjoy obvious.js');
});