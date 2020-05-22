# obvious.js

轻量级的前端微服务通信框架

![示例](https://user-gold-cdn.xitu.io/2019/12/25/16f38c92aecb9b9c?imageslim)

- ## 介绍

要说前端微服务自然绕不开后端微服务，一个技术或概念的出现并不是凭空产生，而是为
解决开发中存在的痛点和问题。在后端没有微服务架构的时候，随着系统体量的增加，整个项目中大大小小的功能模块集中在一起，变得非常臃肿，难以维护。同时单体系统的各个功能模块依赖于同样的数据库、内存资源等，一旦某个模块对资源使用不当，整个系统都被拖垮。同时在对系统做集群扩展的时候，只能对整个系统进行水平扩展，而不能只针对性地对造成性能瓶颈的模块进行扩展。正是由于这样的原因，后端才出现了微服务的架构，即各个功能模块单独开发和部署，可以用不同的编程语言编写，占用独立的资源，每一个服务都跑在自己的进程中，微服务之间通过轻量级机制（http restful接口, rpc调用等）进行消息通信，最终多个微服务共同组成完整的系统。这样系统的灵活性大大增加，同时在团队组织和开发方式上，各个微服务组可以自由选择编程语言，相对独立地进行开发和维护，大大减少了管理成本。
说回前端微服务，其实这并不算一个很新的概念，也有许多公司做过相应的实践。React、Angular、Vue等前端框架出现后，DOM操作已经由框架帮你做了，另外页面渲染也几乎被javaScript完全cover, 在jQuery大行其道的时代，前端开发是先有页面结构，再用数据填充结构，而三大框架出现后，前端开发模式变成了先有数据，再根据数据生成页面结构。因此自然可以开发出愈发复杂的前端应用，而我认为真正让前端地位出现质的提升的一个标志是单页应用（SPA）的出现，在没有SPA的时候，页面之间的数据传递一定要经过后端，而单页应用时代，复杂的页面数据传递被前端cover之后，前端的体量一下子可以变得很大，特别是一些toB的应用，可能动辄有四五十页需要管理。这时跟后端同样的问题也就出现了，虽然React、Vue、Angular各自都有成熟的状态管理和单页框架，但是如果要做一个大的前端系统，就只能选择一套技术栈，当然了，在前端领域，一般一个公司都会用相对统一的技术栈，但是另一个问题是这种模式下所有人都得往同一个仓库推代码，对于一个四五十页的应用来说，这样的架构恐怕过于臃肿了。
因此就有了前端微服务的概念，我们希望有这样一种架构体系：前端应用被切分为相对独立的微服务，对前端来说，一个微服务可以认为是一段可执行的js代码。这些微服务可以被独立开发，独立伺服，最终以script标签的形式引入同一个html中，然后各自渲染自己负责的部分，最重要的是，这些微服务应该能够相互通信。后端微服务的通信可以通过rest接口等方式实现，但是对于前端来说，微服务之间的通信不可能走网络请求，这样的代价太大了，甚至可以说本末倒置。那么前端微服务之间应该怎么通信呢？似乎js在后端的存在形式——Node.js已经给出了答案，Node.js基于EventEmitter构筑了完整的事件通信机制，同样是javaScript, 或许我们也可以在前端做同样的事情——这就是Obvious.js

- ## 概念

  - EventEmiter: 事件收发器，类似Node.js的EventEmitter, 提供事件通信能力，是Obvious的核心
  - Bus: 消息总线，每new一个Bus实例，实例内部都有一个EventEmitter，可以被传递给微服务, 同时可以配置微服务的伺服路径，由Bus拉取js代码执行
  - Socket: 消息接口，一个微服务与其他微服务通信的前端套接字。在EventEmitter提供的消息通信的基础上，封装了一层状态通信能力
  - App： 前端微服务，负责页面渲染或其他功能的前端代码，通过socket与其他app通信， app名与socket必须同名
  
  ![架构](https://user-gold-cdn.xitu.io/2019/12/25/16f38c7dca68cbc0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- ## 使用

下载依赖包

```javaScript
npm install @runnan/obvious // 请从1.0.3版本开始使用
```

在平台微服务中创建bus, 并配置bus所管理的微服务的资源

```javaScript
// 平台服务
import { createBus } from '@runnan/obvious';

// 调用完createBus后，window.Bus上将会挂载一个名为global的bus
createBus('global', {
    service1：{
        js: ['/assets/service1/bundle.js', '/assets/service1/chunk.js'],
        css: ['/assets/service1/app.css']
    },
    service2: {
        js: ['/assets/service2/bundle.js', '/assets/service2/chunk.js'],
        css: ['/assets/service2/app.css']
    }
});
```

微服务开发团队在约定好bus之后，就可以分头开发微服务，在微服务中创建socket, 并用socket读写状态和收发事件

```javaScript
// http://localhost/assets/service1/bundle.js
import { getBus } from '@runnan/obvious';

const bus = getBus('global');

bus.createSocket('service1', [], (socket, config) => {
    /**
     * callback函数里写微服务的业务逻辑: 与技术栈无关，可以用react、vue、angular
     * 渲染页面，也可以用jQuery或者原生js操作dom; 甚至也可以专门
     * 用来发ajax请求。因此微服务的本质只是一段可执行的javaScript
     * 代码, obvious提供的是用socket与其他微服务通信的能力
     */

    // 监听事件
    socket.on('service2BroadCast', (message) => {
        console.log(`get service2 broadCast: ${message}`);
    });

    // 操作dom
    document.getElementById('addCount').onclick = () => {
        const currentCount = socket.getState('count');
        socket.setState('count', currentCount + 1);
    };

    // 操作状态
    socket.initState('service1_ready', true);
});
```

```javaScript
// http://localhost/assets/service2/bundle.js
import { getBus } from '@runnan/obvious';

const bus = getBus('global');

bus.createSocket('service2', ['service1_ready'], (socket, config) => {
    // 读取配置信息
    socket.initState('count', config.initCount);

    // 触发事件
    socket.emit('service2Broadcast', 'hello, I am service2');
});
```

在平台服务中拉起子微服务

```javaScript
import { createBus, getBus } from '@runnan/obvious';

createBus('global', {
    service1：{
        js: ['/assets/service1/bundle.js', '/assets/service1/chunk.js'],
        css: ['/assets/service1/app.css']
    },
    service2: {
        js: ['/assets/service2/bundle.js', '/assets/service2/chunk.js'],
        css: ['/assets/service2/app.css']
    }
});

const bus = getBus('global');

bus.startApp('service2', {initCount: 1}).then(() => {
    console.log('成功拉起service2');
});

/**
 * 虽然拉起service1在拉起service2之后执行
 * 但是由于ervice2依赖状态service1_ready,
 * 所以实际是service1中执行完socket.initSta('service1_ready', true);
 * 之后，才执行service2中的回调
 */
bus.startApp('service1').then(() => {
    console.log('成功拉起service1');
})

```

高级：资源配置中间件
```javaScript

// 一个最简单的资源加载中间件
const async simpleMiddleware = (name, loadJs, loadCss) => {
    await loadJs(`/assets/js/${name}.js`);
    await loadCss(`/assets/css/${name}.css`);
}

/**
 * 在创建bus时，可以通过实现中间件
 * 来配置如何根据微服务名拉取对应的资源，这一般需要有
 * 对应的服务端进行配合
 */
createBus('global', null, simpleMiddleWare);

```

- ## API

  - ### Socket:

    - **socket.on()**: 监听事件

        |参数名|是否可选|类型|描述|
        |:---:|:---:|:---:|:---:|
        |eventName|否|string|事件名|
        |callback|否|Function|回调函数|

    - **socket.off()**: 解绑回调函数

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | eventName | 否 | string | 事件名 |
        | callback | 否 | Function | 回调函数 |

        同Node.js的EventEmiter一样，解绑时的回调函数必须和监听事件时绑定的回调函数是同一个

     - **socket.emit()**: 触发事件

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | eventName | 否 | string | 事件名 |
        | ...args | 是 | 不定长参数 | 传递给事件回调函数的参数

    - **socket.initState()**: 初始化状态

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | stateName | 否 | string | 状态名 |
        | value | 否 | any | 状态值 |
        | private | 是 | boolean | 是否是私有状态， 默认为false， 如果为true，则其他socket将不能修改该状态的值

    - **socket.getState()**: 获取状态

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | stateName | 否 | string | 状态名 |

    - **socket.setState()**: 修改状态

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | stateName | 否 | string | 状态名 |
        | value | 否 | any | 状态值 |

        一个状态必须在init之后才能被set，否则将报错，如果状态在init时被声明为私有状态，则只有init该状态的socket才可以修改它的值

    - **socket.watchState()**: 监听状态

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | stateName | 否 | string | 状态名 |
        | callback | 否 | Function | 回调函数， 接收两个参数，分别是newValue和oldValue |

    - **socket.unwatchState()**: 取消监听状态

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | stateName | 否 | string | 状态名 |
        | callback | 否 | Function | 回调函数， 接收两个参数，分别是newValue和oldValue |

        解绑时的回调函数必须和监听事件时绑定的回调函数是同一个

    - **socket.name**: socket的名字

  - ### Bus: 
    - **Bus()**：构造函数

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | assets | 是 |{ [appName: string]: { js: string[], css: string[] } } | 配置要拉取的微服务的静态资源
        | middleware | 是 |   (appName: string, loadJs?: Function, loadCss?: Function) => Promise<void> |  配置如何拉取js资源的中间件

        在Bus构造函数中, 可以通过assets手动配置静态资源，只需要配置资源路径即可
        如果配置了middleware（插件）, 则assets配置失效， middleware是一个函数，接收三个参数，第一个参数是必选的app名， 插件开发者需要根据app名拉取对应的js和css资源， 插件可接收obvious提供的两个参数loadJS和loadCss， 这两个参数都是函数，入参是资源路径，loadJS(src
        )将拉取src下的js代码并执行， loadCss(src)将拉取css资源并插入link标签， 插件最后需要返回一个Promise。
        关联API: [createBus](#createBus)

    - **startApp()**：拉起app并启动（执行对应的js代码）

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        |appName| 否| string | app名，必须与app内声明的socket同名 |
        | config | 是 | any | app配置， 将在app对应的socket被create时被传给socket，config只能配置一次 |

        startApp将返回一个Promise, 如果app是第一次被拉起，则bus会加载app对应的资源，等资源加载并执行成功后才进入promise的then回调， 但是如果app已经被start过一次，则执行startApp将直接进入then回调。需要注意的是，startApp的第二个参数是初始化app的配置

    - **<span id='createSocket'>createSocket()</span>**: 创建前端套接字

        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | socketName | 否 | string | socket名，必须与app同名 |
        | dependencies | 否 | string[] | app依赖的状态列表（状态参见socket介绍）
        | callback | 否 | Function | 执行app逻辑的函数，例如用React将视图渲染进一个div中。接收两个参数， 一个是app对应的socket实例，用于与其他app通信， 第二个参数是可选的，是Bus在startApp时传入的config对象，用于初始化app |
        | timeout | 是 | number | 依赖状态的超时时间，默认为10*1000ms

        startApp和createSocket需要配合使用，createSocket通常是某个微服务代码的入口函数，在createSocket的callback内执行app具体逻辑，例如有一个helloWorld微服务，作用是将字符串hello {{ config }}渲染到id为hello-wolrd-app的div中, 其中config由微服务被拉起时初始化，假设该helloWorld微服务的代码伺服在/helloWorld/assets/js/index.js下， 则需要在平台服务中创建Bus并拉起helloWorld微服务：
        ```javaScript
        window.globalBus = new Bus({
            helloWorld: {
                js: ['/helloWorld/assets/js/index.js']
            }
        });
        window.globalBus.startApp('helloWorld', 'world').then(() => {
            console.log('成功拉起helloWorld微服务');
        });
        ```
        而/helloWorld/assets/js/index.js中的逻辑则是：
        ```javaScript
        window.globalBus.createSocket('helloWorld', [], (socket, config) => {
            ReactDOM.render(<div>hello {config}</div>, document.getElementById('#hello-world-app'));
        });
        ```

    - **getSocket()**: 获取Bus管理下的对应名字的socket的实例
    
        | 参数名 | 是否可选 | 类型 | 描述 |
        |:---:|:---:|:---:|:---:|
        | socketName | 否 | string | socket名 |

    - **state**：Bus管理下的所有state。该值是总线状态的一个映射，是只读的，要修改状态必须通过socket.initState和setState进行修改，直接修改bus.state会抛出异常

  - ## <span id='createBus'>createBus()</span>
    | 参数名 | 是否可选 | 类型 | 描述 |
    |:---:|:---:|:---:|:---:|
    | name | 否 | string | bus的名字 |
    | assets | 是 |{ [appName: string]: { js: string[], css: string[] } } | 配置要拉取的微服务的静态资源
    | middleware | 是 |   (appName: string, loadJs?: Function, loadCss?: Function) => Promise<void> |  配置如何拉取js资源的中间件

    正如[createSocket](#createSocket)中的样例代码所示，独立部署的两个微服务要进行通信，需要基于同一个bus实例，为了达到这个目的，在`new Bus()`创建出bus实例后，我们把这个实例手动挂载到window对象上，这样带来的一个问题是，当有多个团队分别基于多个bus进行通信时，有可能会不小心命名出重名bus，出现全局变量冲突。因此，obvious提供了`createBus`函数，它会创建一个Bus，并将其挂载到window.Bus上，例如，执行`createBus('global')`将会new一个Bus实例并挂载在window.Bus上，然后可以通过`getBus('global')`获取bus实例，执行其他操作。推荐使用createBus来创建bus, 因为不必添加额外的全局变量，且window.Bus做了属性保护，是只读的，挂载在window.Bus上的属性也是只读的，可以保证bus实例创建并挂载后不会被修改。用createBus创建同名bus，在运行时会抛出错误提示。
  - ## <span id='getBus'>getBus()</span> ##
    | 参数名 | 是否可选 | 类型 | 描述 |
    |:---:|:---:|:---:|:---:|
    | name | 否 | string | bus的名字 |

    获取bus实例，与createBus搭配使用


- # 预置状态
    - ${appName}: 表示app就绪，用createSocket创建app对应的socket，且回调函数执行完后，该状态被init。该状态常用于声明微服务依赖
    例子：
        有两个微服务A和B，基于demoBus进行消息通信
        微服务A在启动时监听printHelloWorld事件:
        ```javaScript
        import {getBus} from '@runnan/obvious';

        const bus = getBus('demoBus');
        bus.createSocket('A', [], (socket) => {
            socket.on('printHelloWorld', () => {
                console.log('Hello World');
            });
        });
        ```
        微服务B在启动时触发printHelloWorld事件，为了保证在触发事件时，微服务A已经监听了该事件，微服务B在创建socket时可以把$A作为状态依赖：
        ```javaScript
        import {getBus} from '@runnan/obvious';

        const bus = getBus('demoBus');
        bus.createSocket('B', ['$A'], (socket) => {
            socket.emit('printHelloWorld');
        });
        ```
        在平台服务中，由于微服务B已经声明了它依赖微服务A，因此即使demoBus先拉起微服务B，B的回调逻辑也会等待A的回调逻辑执行完后才执行
        ```javaScript
        import {createBus, getBus} from '@runnan/obvious';

        createBus('demoBus', {
            A: {
                js: ['http://{hosta}/assets/a.js'] // 先执行A
            },
            B: {
                js: ['http://{hostb}/assets/b.js'] // 后执行B
            }
        });

        const bus = getBus('demoBus');

        bus.startApp('B'); // 先拉起B
        bus.startApp('A'); // 后拉起A
        ```

- # Q&A
    - **Q:** 不同微服务定义的全局变量和样式如何避免互相影响？
    
      **A:** 对于要定义全局变量的场景，建议改为通过socket定义微服务私有状态, 或者使用Symbol把全局变量挂载到window对象上；为了避免样式污染，建议在构建时加入css module特性
      
    - **Q:** 事件收发和状态更改是同步的还是异步的? 
    
      **A:** EventEmitter的所有操作都是同步的，obvious的状态机制也是基于同步的EventEmitter实现的
      
    - **Q:** 内置状态`${appName}`就绪可以保证app的所有代码都执行完了吗？
    
      **A:** `${appName}`就绪只能保证app内的所有同步逻辑都执行完了，而不能保证异步逻辑也执行完了

- # 关联项目
    - [react-obvious](https://github.com/SMIELPF/react-obvious)： 结合了obvious和react的一个类react-redux框架
    - [omicro-cli](https://github.com/SMIELPF/omicro-cli)：obvious微前端体系的脚手架工具，支持生成代码模板和上传包到Feda
    - [feda](https://github.com/SMIELPF/feda): Front End Deploy Agent, 基于Node.js、Nginx、docker技术构建的一个前端静态资源管理应用，可以帮助你理解obvious资源配置中间件的使用场景
- # TO DO
    - 对Vue、Angular框架的适配

- # 写在最后
    本代码仓的demo目录是一个简单的微前端示例工程，实现了把Vue页面嵌入React单页框架中的功能，为了方便开发者理解不同微服务能独立部署，没有使用dev-server热更新，而是用express进行静态伺服。
    闭门造车，水平有限，现将代码开源，希望感兴趣的朋友能帮忙提出意见，一起多交流，欢迎star和fork，更欢迎参与完善代码。
