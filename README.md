# obvious.js
轻量级的前端微服务通信框架

- ## 介绍
要说前端微服务自然绕不开后端微服务，一个技术或概念的出现并不是凭空产生，而是为
解决开发中存在的痛点和问题。在后端没有微服务架构的时候，随着系统体量的增加，整个项目中大大小小的功能模块集中在一起，变得非常臃肿，难以维护。同时单体系统的各个功能模块依赖于同样的数据库、内存资源等，一旦某个模块对资源使用不当，整个系统都被拖垮。同时在对系统做集群扩展的时候，只能对整个系统进行水平扩展，而不能只针对性地对造成性能瓶颈的模块进行扩展。正是由于这样的原因，后端才出现了微服务的架构，即各个功能模块单独开发和部署，可以用不同的编程语言编写，占用独立的资源，每一个服务都跑在自己的进程中，微服务之间通过轻量级机制（http, uds等）进行消息通信，最终多个微服务共同组成完整的系统。这样系统的灵活性大大增加，同时在团队组织和开发方式上，各个微服务组可以自由选择编程语言，相对独立地进行开发和维护，大大减少了管理成本。
说回前端微服务，其实这并不算一个很新的概念，也有许多公司做过相应的实践。React、Angular、Vue等前端框架出现后，DOM操作已经由框架帮你做了，另外页面渲染也几乎被javaScript完全cover, 在jQuery大行其道的时代，前端开发是先有页面结构，再用数据填充结构，而三大框架出现后，前端开发模式变成了先有数据，再根据数据生成页面结构。因此自然可以开发出愈发复杂的前端应用，而我认为真正让前端地位出现质的提升的一个标志是单页应用（SPA）的出现，在没有SPA的时候，页面之间的数据传递一定要经过后端，而单页应用时代，复杂的页面数据传递被前端cover之后，前端的体量一下子可以变得很大，特别是一些toB的应用，可能动辄有四五十页需要管理。这时跟后端同样的问题也就出现了，虽然React、Vue、Angular各自都有成熟的状态管理和单页框架，但是如果要做一个大的前端系统，就只能选择一套技术栈，当然了，在前端领域，一般一个公司都会用相对统一的技术栈，但是另一个问题是这种模式下所有人都得往同一个仓库推代码，对于一个四五十页的应用来说，这样的架构恐怕过于臃肿了。
因此就有了前端微服务的概念，我们希望有这样一种架构体系：前端应用被切分为相对独立的微服务，对前端来说，一个微服务可以认为是一段可执行的js代码。这些微服务可以被独立开发，独立伺服，最终以script标签的形式引入同一个html中，然后各自渲染自己负责的部分，最重要的是，这些微服务应该能够相互通信。后端微服务的通信可以通过rest接口等方式实现，但是对于前端来说，微服务之间的通信不可能走网络请求，这样的代价太大了，甚至可以说本末倒置。那么前端微服务之间应该怎么通信呢？似乎js在后端的存在形式——Node.js已经给出了答案，Node.js基于EventEmitter构筑了完整的事件通信机制，同样是javaScript, 或许我们也可以在前端做同样的事情——这就是Obvious.js

- ## 概念
  - EventEmiter: 事件收发器，类似Node.js的EventEmitter, 提供事件通信能力，是Obvious的核心
  - Bus: 消息总线，每new一个Bus实例，实例内部都有一个EventEmitter，可以被传递给微服务, 同时可以配置微服务的伺服路径，由Bus拉取js代码执行
  - Socket: 消息接口，一个微服务与其他微服务通信的前端套接字。在EventEmitter提供的消息通信的基础上，封装了一层状态通信能力
  - App： 前端微服务，负责页面渲染或其他功能的前端代码，通过socket与其他app通信， app名与socket必须同名

- ## API
### Socket:

**socket.on()**: 监听事件

***参数***：

|参数名|是否可选|类型|描述|
|:---:|:---:|:---:|:---:|
|eventName|否|string|事件名|
|callback|否|Function|回调函数|

**socket.off()**: 解绑回调函数

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| eventName | 否 | string | 事件名 |
| callback | 否 | Function | 回调函数 |

同Node.js的EventEmiter一样，解绑时的回调函数必须和监听事件时绑定的回调函数是同一个

**socket.emit()**: 触发事件

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| eventName | 否 | string | 事件名 |
| ...args | 是 | 不定长参数 | 传递给事件回调函数的参数

**socket.initState()**: 初始化状态

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| stateName | 否 | string | 状态名 |
| value | 否 | any | 状态值 |
| private | 是 | boolean | 是否是私有状态， 默认为false， 如果为true，则其他socket将不能修改该状态的值

**socket.getState()**: 获取状态

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| stateName | 否 | string | 状态名 |

**socket.setState()**: 修改状态

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| stateName | 否 | string | 状态名 |
| value | 否 | any | 状态值 |

一个状态必须在init之后才能被set，否则将报错，如果状态在init时被声明为私有状态，则只有init该状态的socket才可以修改它的值

**socket.watchState()**: 监听状态

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| stateName | 否 | string | 状态名 |
| callback | 否 | Function | 回调函数， 接收两个参数，分别是newValue和oldValue |

**socket.unwatchState()**: 取消监听状态

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| stateName | 否 | string | 状态名 |
| callback | 否 | Function | 回调函数， 接收两个参数，分别是newValue和oldValue |

解绑时的回调函数必须和监听事件时绑定的回调函数是同一个

**socket.name**: socket的名字


### Bus: 
**Bus()**：构造函数

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| assets | 是 |{ [appName: string]: { js: string[], css: string[] } } | 配置要拉取的微服务的静态资源
| middleware | 是 |   (appName: string, loadJs?: Function, loadCss?: Function) => Promise<void> |  配置如何拉取js资源的中间件

在Bus构造函数中, 可以通过assets手动配置静态资源，只需要配置资源路径即可，这种方式配置的js资源将通过fetch请求拉取并执行，意味着不接受跨域js， css则将以link标签的形式被插入到页面中。
如果配置了middleware（插件）, 则assets配置失效， middleware是一个函数，接收三个参数，第一个参数是必选的app名， 插件开发者需要根据app名拉取对应的js和css资源， 插件可接收obvious提供的两个参数loadJS和loadCss， 这两个参数都是函数，入参是资源路径，loadJS(src
)将拉取src下的非跨域js代码并执行， loadCss(src)将拉取css资源并插入link标签， 插件最后需要返回一个Promise。

**startApp()**：拉起app并启动（执行对应的js代码）

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
|appName| 否| string | app名，必须与app内声明的socket同名 |
| config | 是 | any | app配置， 将在app对应的socket被create时被传给socket，config只能配置一次 |

startApp将返回一个Promise, 如果app是第一次被拉起，则bus会加载app对应的资源，等资源加载并执行成功后才进入promise的then回调， 但是如果app已经被start过一次，则执行startApp将直接进入then回调。需要注意的是，startApp的第二个参数是初始化app的配置

**createSocket()**: 创建前端套接字

***参数***：

| 参数名 | 是否可选 | 类型 | 描述 |
|:---:|:---:|:---:|:---:|
| socketName | 否 | string | socket名，必须与app同名 |
| dependencies | 否 | string[] | app依赖的状态列表（状态参见socket介绍）
| callback | 否 | Function | 执行app逻辑的函数，例如用React将视图渲染进一个div中。接收两个参数， 一个是app对应的socket实例，用于与其他app通信， 第二个参数是可选的，是Bus在startApp时传入的config对象，用于初始化app |
| timeout | 是 | number | 依赖状态的超时时间，默认为10*1000ms

startApp和createSocket需要配合使用，createSocket通常是某个微服务代码的入口函数，在createSocket的callback内执行app具体逻辑，例如有一个helloWorld微服务，作用是将字符串hello {{ config }}渲染到id为root的div中, 其中config由微服务被拉起时初始化，假设该helloWorld微服务的代码伺服在/helloWorld/assets/js/index.js下， 则需要在平台服务中创建Bus并拉起helloWorld微服务：
```
window.globalBus = new Bus({
    helloWorld: {
        js: ['/helloWorld/assets/js/index.js']
    }
});
window.globalBus.startApp('helloWorld', 'world').then(() => {
    console.log('成功拉起helloWorld微服务');
});
```
而helloWorld.js的逻辑则是：
```
window.globalBus.createSocket('helloWorld', [], (socket, config) => {
    ReactDOM.render(<div>hello {config}</div>);
});
```

**state**：Bus管理下的所有state，该值是总线状态的一个映射，是只读的，要修改状态必须通过socket.initState和setState进行修改，直接修改bus.state会抛出异常

- ## 使用
```
npm install @runnan/obvious // 务必使用1.0.3版本，前两个版本存在一些问题
import { Bus } from '@runnan/obvious'
```
- ## 总结
前端服务化需要的是一套全套的解决方案，obvious只提供纯净的前端微服务间的通信能力，obvious提供的通过配置assets对象注册微服务的方式只适用于小型前端微服务体系，其实设计这个配置项主要是为了方便各个微服务自己开发的时候mock别的微服务。一个成熟的前端微服务架构应该包含前端资源在后台伺服后的服务发现功能，这也是一个很有意思的议题，在此不再细谈。obvious定位是轻量级的通信框架，通过插件机制避免了与服务端耦合，不同的服务注册机制配合不同的obvious插件即可。
在前端微服务领域，其实可以深耕的地方很多，新的技术必然引入新的问题，页面中的js和css代码来源不再单一后，如果管理不当，必然会导致全局变量污染和css样式污染。在系统相对小型，团队沟通成本相对较低的时候，或许还可以通过人工约定的方式规避。但是当系统越滚越大时，这将是很严重的问题，或许需要引入AST语法树分析（其实我也只知道名字而已）去实现微服务容器化，这看起来是不是很像前端的docker。
这是我个人利用下班时间写的一个项目，在demo中实现了用react-router单页框架集成create-react-app欢迎页微服务和vue-cli欢迎页微服务，并实现了两个页面间的通信功能。
演示demo可以进入demo目录，先npm install, 再npm run build, 资源将以watch模式被webpack打包， 然后npm start, 会启动一个express服务将资源伺服在localhost:3000，服务启动后会自动打开浏览器展示demo的。


由于是闭门造车，难免错误百出，现将代码开源，希望感兴趣的朋友能帮忙提出意见，一起多交流，欢迎star和fork，更欢迎参与完善代码。
