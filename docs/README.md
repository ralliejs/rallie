# 介绍
-----------
obvious是一个轻量级的渐进式微前端框架，在微前端架构中，obvious只专注于解决前端微应用的依赖编排和应用间的通信问题，旨在通过简洁易懂，符合编程直觉的API以及灵活的中间件机制，帮助用户快速搭建好微前端体系的基础，并能在此基础上进行更深层次地定制，从而搭建出完整可靠的微前端架构体系

## 关于微前端
前端在软件工程中是迭代更新速度比较快的一个领域，虽然前端人常以"学不动了"自嘲，但是客观地说，技术演进是问题复杂度增加，量变引起质变的结果，前端的快速更新正说明了前端在业务中能做的事情越来越多，地位越来越重要。

最初的前端开发者只做一些静态页面和处理简单的交互，那时刀耕火种地操作原生DOM和使用锋利的jQuery尚且可以应付，后来Ajax技术的风靡带来了前后端分离的浪潮，以前很多由JSPer、PHPer做的事情被交给了javaScripter，前端开发者需要将大量后端接口传回来的数据与UI进行映射，这时候再由开发人员去手动操作DOM就异常痛苦，而三大史诗级框架Angular、React和Vue的出现一举拯救了水深火热中的前端开发者，这三个框架的功能就是把数据与DOM做自动的实时映射，让开发人员只用关注数据，不用再操作DOM。紧接着，单页应用的出现让页面间的数据交换也不必再经过后端，这让前端的体量更大，应用架构以及需要管理的数据的复杂度也变得更大，对于一些to B的应用，有时动辄有几十甚至几百个页面需要管理，很容易变成脆弱和难以维护的巨石应用，这时候，问题复杂度量变引起的质变就是微前端架构的出现。

我们希望引进像后端微服务一样的架构体系，让前端应用也能做到：
1. 应用间技术栈解耦，互不感知，可增量升级
2. 应用间代码仓库和开发团队解耦，每个应用提供相对独立的功能，由相对独立的团队开发和维护
3. 应用间部署解耦，每个微应用可以单独部署和发布，然后在一个集合应用中编排和聚合
4. 应用在聚合后具备相互通信的能力，可以做到跨script的数据交换

> [micro frontend](https://martinfowler.com/articles/micro-frontends.html)

## 业界实践
微前端是一个说旧不旧,说新不新的概念，目前比较知名的开源微前端库有国外的[single-spa](https://single-spa.js.org/)， 国内的阿里基于此封装的[qiankun](https://qiankun.umijs.org/zh/guide),，以及同样出自阿里的相对独立的微前端库[icestark](https://ice.work/docs/icestark/about)，同时，在各种前端交流会议中，许多公司也分享了自己的微前端解决方案，综合网络上的各种资料，可以大致总结出微前端落地过程中需要解决的几个问题：

1. 微应用的资源如何注册和加载（编排）
2. 微应用间如何通信（通信）
3. 微应用间如何保证全局变量和样式互不影响（容器）

## 关于obvious
事实上，我所在的公司也有自己的微前端实现方案，在使用该方案过程中，我发现针对上面所说的三个问题，解决前两个是架构的基础和刚需，是否有灵活优雅的注册和加载机制以及方便的通信机制是衡量一个微前端框架使用体验的最重要指标，可惜我个人觉得公司内部的实现方案给开发人员的体验实在是糟糕。而了解业界其他方案的过程中，我发现当前的微前端库似乎都是通过硬编码的方式注册应用资源，然后在主应用上通过劫持路由来识别微应用并加载资源，我觉得这好像依然不够灵活。同时，针对应用间的通信，除了icestark有提供一个eventBus之外，其他两个框架似乎鲜有提及。而我发现社区讨论的热点主要是在于如何解决第三个问题——一个在我看来属于锦上添花的功能。正是上面的这些原因让我萌生了写一个自己的基础微前端框架的想法，于是就有了obvious.js

> 我只粗略浏览过其他微前端库的文档，没有具体实践应用过，如果对其他框架的理解有误，欢迎指正

obvious.js是一个轻量级的渐进式的微前端框架，它专注于解决微应用的编排和通信问题，它的特点是：
- 提供基于全局状态、事件广播，事件单播的通信能力，通信机制灵活方便
- 支持在定义微应用时声明依赖关系，激活微应用时自动激活依赖, 让微应用可以自由拆分与合设
- 灵活的中间件机制，提供资源加载中间件配置入口，让开发者能够以编写中间件的形式自由定制资源的统一注册和加载规则，实现自动化注册；同时提供资源运行中间件配置入口，让开发者能优雅接入日志，js沙箱等功能
- 天然支持单屏页面中加载多个微应用，可以基于它封装出高阶的spa微前端框架，同时微应用激活条件完全由开发者自由制定，不再局限于路由劫持
- 概念简单，函数式API清晰易理解，可以做到脱离文档开发

这是我在一个又一个996之后挤出时间开发的项目，如果能帮助你解决自己业务中的问题或者让你感觉有所收获，希望您能给我的github仓库点一个小小的star以示鼓励，如果愿意提issu或者pull request帮助我改进它就更好了。

接下来，我将带你完整实现一个用obvious搭建微前端环境，并在该环境上把react官方脚手架create-react-app和vue官方脚手架vue-cli开发并部署的两个微应用集成在一起的小示例，带你走进obvious.js


# 教程
---------
> 本教程假设你掌握react和vue框架的基础知识，能理解react hook的使用和vue2的模板语法。如果你还不了解这方面的相关知识，不要急，先快速跟着两大框架的官方文档学习一下吧！

## 目标
![](_media/tutorial-target.gif)
经过本教程的学习，你将开发出一个效果如上图的简单微前端应用：
- 用create-react-app创建的一个react工程，被部署在 http://localhost:3000
- 用vue-cli创建的一个vue工程，被部署在 http://localhost:8081
- 上面的两个工程在 http://localhost:9999 上聚合，且在页面交互上能做到：
    - 在react区域的输入框中输入的文字，能在vue区域作为标题实时显示
    - 在vue区域可以通过点击绿色按钮控制react图标是否旋转
    - 点击vue区域的标题react区域的输入框获得焦点

你可以在[这里](https://github.com/run-nan/obvious/tree/dev/examples)查看教程示例的源码

## 准备工作
首先，我们参照[create-react-app](https://github.com/facebook/create-react-app#creating-an-app)和[vue-cli](https://cli.vuejs.org/)官方教程的说明，分别创建一个叫做react-app的react工程和一个叫做vue-app的vue工程，在本地开启dev-server伺服后，react-app被部署在 http://localhost:3000 上
![init-react](_media/init-react.png)
vue-app被部署在 http://localhost:8081 上
![init-vue](_media/init-vue.png)
我们最终要将这两个应用在 http://localhost:9999 上聚合，因此需要搭建一个叫做host-app的宿主工程
> 如果不了解前端构建和Node.js的一些基础知识，下面的部分内容可能会让你感觉有些难以理解，你可以选择直接复制教程中的代码，而不必理解为什么要这么做

由于react-app和vue-app都是用webpack-dev-server伺服的，因此它们的源码中都会带上实现热更新功能的代码，如果宿主环境也是用webpack-dev-server伺服的话，错误的热更新相关请求会让宿主环境dev-server挂掉。因此，我们选择用webpack以watch模式打包宿主代码，由于这个示例只在现代浏览器上演示，所以我们的webpack配置一切从简，只使用一个html-webpack-plugin，将打包好的代码注入到html模板中。
```js
// ./host-app/main.js
alert("I'm ready to learn obvious.js");
```
```js
// ./host-app/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    const entry = {
        'main': path.resolve(__dirname, './main.js')
    };

    const plugins = [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.template.html')
        })
    ];

    return {
        entry,
        devtool: 'source-map',
        plugins
    }
};
```
在我们的宿主html中，需要为react-app和vue-app预留好挂载点, 并布置好一个应用占屏幕一半的样式
```html
<!--  ./host-app/index.template.html   -->
<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>obvious demo</title>
    <style>
        body {
            display: flex;
        }

        #react-app {
            flex: 1;
        }

        #vue-app {
            flex: 1
        }
    </style>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but obvious demo doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id='react-app'></div>
    <div id="vue-app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
打包后，所有host-app的静态资源会被打包到`./dist`目录，我们在开始打包后，用express把它伺服在 http://localhost:9999 
```js
// ./host-app/server.js
const express = require('express');
const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const app = new express();

if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}

const childProcess = child_process.exec('npm run watch');
childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);

app.use(express.static(path.join(__dirname, './dist/')));

app.listen('9999', () => {
    setTimeout(() => {
        child_process.execSync('start http://localhost:9999/index.html');
    }, 3000);
});
```
配置一下npm script
```json
// ./host-app/package.json
{
  "name": "host-app",
  "version": "0.1.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "webpack -w",
    "start": "node ./server.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "express": "^4.17.1",
    "html-webpack-plugin": "^4.3.0",
    "webpack": "^4.44.0",
    "webpack-cli": "^3.3.12"
  }
}
```
这样我们就完成了构建你的第一个obvious应用的第一步
```
|--- react-app
|--- vue-app
|--- host-app
     |--- main.js
     |--- index.template.html
     |--- server.js
     |--- webpack.config.js
     |--- package.json
```
最后，执行一下npm start，http://localhost:9999 被打开
![init-host](_media/init-host.png)

?> <strong>You are ready to learn obvious.js</strong>

## 资源配置和加载
## 应用通信
## 应用编排

# 进阶
------
## App的生命周期
## 绝对轻量引入
## 共享运行时
## 中间件
### 加载资源中间件
### 运行资源中间件
## 最佳实践
### 优雅地本地调试
### 不要滥用应用间通信
### 控制好依赖数量

# API
------
## Bus
## Socket
## App

# 扩展生态
-------
## obvious-react
## obvious-vue
## obvious-cli
## obvious-spa

# 历史版本
-------

# 加入我们
-------

# 捐赠
-------