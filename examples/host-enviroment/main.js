import { createBus } from 'obvious-core';

const bus = createBus('host');

bus.config({
    assets: {
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
    }
}).use(async (ctx, next) => {
    try {
        await next()
    } catch(err) {
        alert(`启动app:${ctx.name}失败`)
    }
}).use(async (ctx, next) => {
    console.log(`开始启动app:${ctx.name}`)
    await next()
    console.log(`启动app:${ctx.name}成功`)
}).use(async (ctx, next) => {
    console.log(ctx)
    await next()
})

bus.createApp('unit-app')
    .relyOn([
        {
            ctx: 'vue-app',
            config: { mountPoint: '#vue-app' }
        },
        {
            ctx: 'react-app',
            config: { mountPoint: '#react-app'}
        }
    ])
    .bootstrap(async () => {
        setTimeout(() => {
            alert('I can not wait to star obvious.js');
        }, 2000);
    });

bus.activateApp('unit-app');