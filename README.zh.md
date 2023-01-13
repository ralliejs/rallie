<div align="center">
  <img style="margin: 16px" width=300 height=300 src="https://raw.githubusercontent.com/ralliejs/docs/main/.vuepress/public/logo.png" />
  <br><br>

[![Coverage Status](https://coveralls.io/repos/github/ralliejs/rallie/badge.svg?branch=master)](https://coveralls.io/github/ralliejs/rallie?branch=master) [![release](https://img.shields.io/github/release/ralliejs/rallie.svg)](https://github.com/ralliejs/rallie/releases) [![lastCommit](https://img.shields.io/github/last-commit/ralliejs/rallie)](https://github.com/ralliejs/rallie/commits/master) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

<div align="center">

[English](https://github.com/ralliejs/rallie/blob/master/README.md) ｜ 简体中文

</div>

## 介绍

rallie 是一个可以帮助用户实现去中心化的前端微服务架构的库。基于 rallie 开发的前端应用可以成为一个对外暴露响应式状态，事件和方法的服务，不同服务之间可共享依赖，灵活组合与编排，从而提高大型前端应用的可扩展性

## 特性

- **去中心化的服务编排**：没有所谓的基座应用和内容应用的概念区分，一切应用皆服务，服务间的依赖关系由 rallie 管理和编排
- **服务间通信**：服务可对外暴露基于`@vue/reactivity`的响应式状态以及基于 proxy 的事件和方法
- **灵活的中间件扩展**：基于`koa-compose`实现的中间件机制，使应用资源加载变得高度灵活可扩展
- **支持主流前端技术**：typescript 友好，针对 vue2, vue3 和 react 技术栈均提供辅助支持

## 样例

- 代码地址：[https://github.com/ralliejs/rallie/tree/master/playground](https://github.com/ralliejs/rallie/tree/master/playground)
- 预览地址：[https://ralliejs.github.io/rallie/index.html](https://ralliejs.github.io/rallie/index.html)

## 文档

[Rallie.js: 帮助用户构建去中心化的前端微服务架构的库](https://ralliejs.github.io/docs/)

## 生态

- [@rallie/react](https://github.com/ralliejs/rallie/tree/master/packages/react): 为 react 服务提供 hooks 支持
- [@rallie/vue](https://github.com/ralliejs/rallie/tree/master/packages/vue): 为 vue3 服务提供 composition api 支持，为 vue2 服务提供 mixin 支持
- [@rallie/load-html](https://github.com/ralliejs/rallie/tree/master/packages/load-html): 一个让服务直接从 html 路径中加载资源的中间件

## License

rallie is [MIT Licensed](https://github.com/ralliejs/rallie/blob/master/LICENSE)
