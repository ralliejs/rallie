import { createBus } from '@runnan/obvious-core';

const bus = createBus('host', {
    'react-app': {
        js: [
            'http://localhost:3001/static/js/bundle.js',
            'http://localhost:3001/static/js/1.chunk.js',
            'http://localhost:3001/static/js/main.chunk.js'
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

bus.activateApp('react-app');
bus.activateApp('vue-app');