import {createBus} from '@runnan/obvious-core';

const bus = createBus('demo', {
    'react-app': {
        js: [
            'http://localhost:3000/static/js/bundle.js',
            'http://localhost:3000/static/js/0.chunk.js',
            'http://localhost:3000/static/js/main.chunk.js'
        ],
        isLib: true
    },
    'vue-app': {
        js: [
            'http://localhost:8081/js/app.js',
            'http://localhost:8081/js/chunk-vendors.js'
        ],
        isLib: true
    }
});

bus.activateApp('react-app').then(() => {
    return bus.activateApp('vue-app');
}).then(() => {
    console.log('enjoy obvious.js');
});