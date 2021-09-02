<div align="center">
  <img style="margin: 16px" width=300 height=300 src="docs/_media/logo_transparent.svg" />
  <br><br>

  [![Coverage Status](https://coveralls.io/repos/github/ObviousJs/obvious-core/badge.svg?branch=master)](https://coveralls.io/github/ObviousJs/obvious-core?branch=master) [![release](https://img.shields.io/github/release/ObviousJs/obvious-core.svg)](https://github.com/ObviousJs/obvious-core/releases) [![lastCommit](https://img.shields.io/github/last-commit/ObviousJs/obvious-core)](https://github.com/ObviousJs/obvious-core/commits/master) [![](https://img.shields.io/badge/document-english-brightgreen)](https://github.com/ObviousJs/obvious-core/blob/master/README.md)
</div>

## 介绍
obvious是一个渐进式微前端库，在微前端架构中，obvious专注于解决前端微应用的依赖编排和应用间的通信问题，旨在通过简洁易懂，符合编程直觉的API以及灵活的中间件机制，帮助用户快速搭建好基础微前端体系，并支持进行更深层次地定制，从而实现完整可靠的微前端架构

## 特性
- 提供基于全局状态，事件广播，事件单播的通信机制
- 支持在定义微应用时声明依赖，当激活一个微应用时，其依赖将被自动激活，从而在设计前端项目时，能灵活拆分和组合各个微应用
- 提供灵活的中间件机制：用户可以通过编写中间件的方式灵活控制微应用的资源加载和执行过程，从而优雅地拓展出自动注册微应用资源，日志，html-entry和js沙箱等功能
- 不同于single-spa，本库天然支持在一个页面中加载多个微应用，微应用激活条件不再局限于路由变化，基于本库可以封装出高阶的微前端单页应用框架
- 概念简单易懂，函数式API简洁明了，学习之后完全可以脱离文档开发

## 安装
npm: 

`npm install obvious-core`

umd:

`<script src="https://unpkg.com/obvious-core@{version}/dist/index.umd.js"></script>`

## 快速开始
在宿主环境中创建bus，并声明微应用资源
```js
import {touchBus} from 'obvious-core';

const [bus] = touchBus();

bus.config({
  assets: {
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
  }
});
```

在微应用中可以获取到bus，并通过bus创建app和socket，通过app指定生命周期，通过socket与其他微应用通信

react-app
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {touchBus} from 'obvious-core';

const bus = touchBus('host');
const socket = bus.createSocket();
bus.createApp('react-app')
  .bootstrap(async (config) => {
    socket.unicast('unicast-event');
    socket.broadcast('broadcast-event');
    socket.initState('someState', true);
    ReactDOM.render(<App />, document.querySelector(config.mountPoint));
  });
```

vue-app
```js
import Vue from 'vue';
import App from './App.vue';
import {touchBus} from 'obvious-core';

Vue.config.productionTip = false;

const [bus] = touchBus('host');
const socket = bus.createSocket();
bus.createApp('vue-app')
  .bootstrap(async (config) => {
    socket.onUnicast('unicast-event', () => {
      // do something
    });
    socket.onBroadcast('broadcast-event', () => {
      // do something
    });
    socket.setState('someState.sub.prop.array', [])
    socket.watchState('someState.sub.prop.array[0]', (val) => {
      // do something
    });
    new Vue({
      render: h => h(App),
    }).$mount(config.mountPoint);
  });
```

在宿主环境中，通过bus激活微应用
```js
bus.activateApp('react-app', {mountPoint: document.getElementById('#react-app')});
bus.activateApp('vue-app', {mountPoint: document.getElementById('#vue-app')});
```

## 样例
![](docs/_media/tutorial-target.gif)

```
npm run demo:install
npm run demo:react
npm run demo:vue
npm run demo:host
```

## 文档
[obvious.js: 渐进式微前端库](https://obviousjs.github.io/obvious-core/#/)

## License
obvious is [MIT Licensed](https://github.com/ObviousJs/obvious-core/blob/master/LICENSE)
