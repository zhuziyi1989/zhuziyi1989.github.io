# 前端知识体系不完全记录

## 目录

1. [JS 语言基础](#1js语言基础)
2. [客户端及其内核原理](#2客户端及其内核原理)
3. [服务端应用](#3服务端应用)
4. [网络原理](#4网络原理)
5. [框架的使用](#5框架的使用)
6. [CSS 布局基础](#6CSS布局基础)
7. [前端构架和开发效率](#7前端构架和开发效率)
8. [算法、数据结构、计算机基础等](#8算法数据结构计算机基础等)
9. [综合性问题](#9综合性问题)
10. [面试分享和学习资料](#10面试分享和学习资料)

## 1.JS语言基础

### ECMAScript 标准定义的数据类型:

7 种原始数据类型：
  - Boolean
  - Null （完全不存在）
  - Undefined（一个没有被赋值的变量会有个默认值 undefined，也就说已存在，但还没值）
  - Number（基于 IEEE 754 标准的`双精度` 64 位`二进制`格式的值（-(2^63 -1) 到 2^63 -1））
  - String
  - Symbol (ECMAScript 6 新定义)
  - BigInt（ECMAScript 新提案）
  
> 在JavaScript中，Number 可以准确表达的最大数字是2^53，比 2^53 大的所有数字可以使用BigInt表达。

对象类型：
  - 数组（Array）
  - 函数（Function）
  - 正则（RegExp）
  - 日期（Date）


### DOM 事件绑定的几种方式？常见的 API

- 1.在 DOM 元素上直接绑定（不推荐）

```html
<div id="btn" onclick="clickone()"></div> //直接在DOM里绑定事件
<script>
　　　　function clickone(){ alert("hello"); }
</script>
 ```
 
- 2.在JavaScript代码中绑定；onclick

```html
<div id="btn"></div>
<script>
　　document.getElementById("btn").onclick = function（）{ alert("hello"); } //脚本里面绑定
</script>
```
- 3.绑定事件监听函数。

```html
<div id="btn"></div>
<script>
　document.getElementById("btn").addeventlistener("click",clickone,false); //通过侦听事件处理相应的函数，
  //第三个参数设置为true就在捕获过程中执行，反之就在冒泡过程中执行处理函数。

　function clickone(){ alert("hello"); }
</script>
```
	- obj.addEventListener(event,fn,useCapture); 是标准的绑定事件监听函数的方法
	- attachEvent(event,fn); 适用于IE8.0及其以下版本

### 事件冒泡和捕获

### 值类型和引用类型、变量提升

### 立即执行函数, 模块化, 命名空间

### 相等（== ）与全等（===）区别，typeof 与 instanceof

相等（==）操作符会执行 `类型转换`。

typeof null        // "object" (因为一些以前的原因而不是'null')

typeof undefined   // "undefined"

null === undefined // false

null  == undefined // true

null === null // true

null == null // true

!null //true

isNaN(1 + null) // false

isNaN(1 + undefined) // true

- typeof操作符返回一个`字符串`，表示未经计算的操作数的`类型`。[typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
- instanceof运算符用于测试构造函数的prototype属性是否出现在对象的`原型链`中的任何位置 (简单地说，可以判断是否是某个对象的实例) [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

### 剩余参数、默认参数和解构赋值参数

### 围绕 setTimeout, setInterval 和 requestAnimationFrame 展开的话题


#### setTimeout导致实例引用的丢失

<details>
<summary>查看解析</summary>

```javascript
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);// 尝试不使用 bind，看看结果
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```
在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或global）对象。当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。

</details>


### 函数作用域,、块级作用域和词法作用域

### “new” 关键字在 JavaScript 中有什么作用？

### 关于“闭包”的相关话题

关键点在于一个函数返回另一个函数，另一个函数就是“闭包”

### 原型、原型链、继承等相关话题

关于原型继承， 我们应该记住以下几条：

- 类属性使用 this 绑定
- 类方法使用 prototype 对象来绑定
- 为了继承属性， 使用 call 函数来传递 this
- 为了继承方法, 使用 Object.create 连接父和子的原型
- 始终将子类构造函数设置为自身，以获得其对象的正确类型

### 关于 this

- 如果要想把 this 的值从一个环境传到另一个，就要用 call 或者 apply 方法。
- this 的值取决于**函数的调用方式**
- 每次函数被调用时 this 的值也可能会不同
- 箭头函数中，是在闭合的执行环境内设置 this 的值
- 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。
- 谁调用的该方法，那么this就指向谁。
- bind/call/apply 能够强制改变 this 的绑定。

#### 普通函数和箭头函数的this

ES5中的普通函数：
  - 函数被直接调用，上下文一定是 window (请区别 w 大写 的 Window 对象)
  - 函数作为对象属性被调用，例如：obj.foo()，上下文就是对象本身obj
  - 通过 new 调用，this 绑定在返回的 `实例` 上

ES6中的箭头函数：它本身没有 this，会沿着作用域向上寻找，直到global / window。

*以上方法指定 this 的优先级：new > bind > 对象调用 > 直接调用*

参考资料：[MDN 对 this 的讲解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

### 设计模式展开话题

### JS中的重要关键词（大杂烩）

- super关键字用于访问和调用一个对象的父对象上的函数。

    super([arguments]); 
    // 调用 父对象/父类 的**构造函数**
    super.functionOnParent([arguments]); 
    // 调用 父对象/父类 上的**方法**

    	参考资料：[super MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)

- function* 关键字定义了一个 generator 函数表达式。
- yield     暂停和恢复 generator 函数。
- yield*    委派给另外一个 generator 函数或可迭代的对象。
- async function*  async function 定义一个异步函数表达式。
- await     暂停或恢复执行异步函数，并等待 promise 的 resolve/reject 回调。
- promise
 - JSON.stringify() 将一个对象转制成字符串
 - JSON.parse() 将字符串转成对象
 - Object.prototype.hasOwnProperty 用于检查给定的属性/键是否存在于对象中。
 - Object.prototype.instanceof 判断给定对象是否是特定原型的类型。
 - 使用 Object.freeze 可以冻结对象，以便不能修改对象现有属性。
- call()   apply()数组传递  bind()不立即执行
- split() 字符串切割成数组  splice()  join()  push/pop  unshift/shift  concat()
- Object.assign 拷贝

### 理解和深挖 map() 、foreach() 、fliter() 、reduce() 等高阶函数

### 数组(array)：

Array.prototype.find() - 返回数组中满足提供的测试函数的**第一个**元素的值。否则返回 undefined。
Array.prototype.findIndex() – find and return an **index**
Array.prototype.includes() – 用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。
Array.prototype.filter() – _创建一个新数组_, 其包含通过所提供函数实现的测试的所有元素。 
Array.prototype.every() – 测试数组的**所有元素**是否都通过了指定函数的测试。
Array.prototype.some() – 测试是否**至少有一个元素**通过由提供的函数实现的测试。
Array.prototype.forEach() - 对数组的每个元素执行一次提供的函数。



### 字符(String)：

### 对象(Object):

> 来源列表：
>
>  - https://juejin.im/post/5bf5610be51d452a1353b08d

### 浮点数问题，解释 console.log(0.1+0.2) //0.30000000000000004

参考资料：： [浮点数为什么不精确？](https://juejin.im/entry/575543857db2a2006993114e)

### JavaScript 中有哪些不同的数据类型？

### 异步相关，解释 promises，observables，generator 或 async-wait 

### JavaScript 中有哪些不同的函数调用模式？ 详细解释。 

    ** 提示: 有四种模式，函数调用，方法调用，.call() 和 .apply()。

### ES6/7的新特性

- let、const
- 箭头函数
- promis
- for of

    箭头函数和普通 function 的区别？从而课衍生到 `call、apply、bind` 三者的运用问题，更或者涉及到 `this` 的使用。

### 新 ECMAScript 2018 提案关注过有哪些？

    ** 提示: ECMAScript 2018 的 BigInt、partial function、pipeline operator

### JavaScript 中的迭代器（iterators）和迭代（iterables）是什么？ 你知道什么是内置迭代器吗？

    ```javascript
    const a ={
        key1:Symbol(),
        key2:110
    }
    console.log(JSON.stringify(a)) // {"key2":110}  丢失 key1，为什么丢失？
    ```

### 你熟悉 Typed Arrays 吗？ 如果熟悉，请解释他们与 JavaScript 中的传统数组相比的异同？

### 解释 TCO - 尾调用优化（Tail Call Optimization）。 有没有支持尾调用优化的 JavaScript 引擎？ 

### 理解正则表达

正则表达式主要运用在_处理文本_、_对用户输入执行规则_等

创建正则表达式，有如下两种方式：

```
var re = /ar/;
var re = new RegExp('ar'); 
```
### 错误的处理模式，捕获和调试的一些心得？

- try/catch

## 2.客户端及其内核原理

- 浏览器内核：V8引擎、
- 进程(系统层面)：一个Chome程序，或者一个标签页，操作系统分配资源的最小单位，独立
- 线程(内核层面)：渲染线程/JS引擎/事件触发/定时器触发/异步HTTP请求，程序执行的最小单位，共享
- 回流和重绘，以及优化方案 [link](https://juejin.im/post/5c39aeba6fb9a049b41cb0ee)

### JS引擎的基础概念

调用堆栈：

	V8引擎主要由两部分组成:
		① 内存堆：这是内存分配发生的地方
		② 调用栈：这是你的代码执行时的地方

概念：[Call Stack — MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)

堆栈溢出？堆栈溢出的产生是由于过多的函数调用，导致调用堆栈无法容纳这些调用的返回地址，一般在递归中产生。

参考资料：[JavaScript 如何工作：对引擎、运行时、调用堆栈的概述](https://juejin.im/post/5a05b4576fb9a04519690d42)

## 3.服务端应用

- Node
- Koa
- 服务器管理(Linux、Centos等)
- Nginx 的使用

## 4.网络原理

### 简单讲解一下 HTTP2 的多路复用？

<details>
<summary>查看解析</summary>

在 HTTP/1 中，每次请求都会建立一次TCP连接，也就是我们常说的3次握手4次挥手，这在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

- 第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
- 第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6（Chrome），也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。

HTTP2采用二进制格式传输，取代了HTTP1.x的文本格式，二进制格式解析更高效。
多路复用代替了HTTP1.x的序列和阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。在HTTP1.x中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接都限制。
HTTP2中

- 同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。
- 单个连接上可以并行交错的请求和响应，之间互不干扰

**总结**：HTTP/2的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。[More...](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14)

</details>

### 五(七)层因特网协议栈？
- （应用层）HTTP/DNS/FTP等，HTTP 与 HTTPS 的区别？DNS 域名解析过程？
- （传输层）TCP/IP 协议
- （网络层）IP/ARP 寻址，路由器
- （数据链路层）封装成帧，交换机
- （物理层）光纤/网线/无线电磁波等

### HTTP 相关问题
- 强缓存  & 协商缓存
- 跨域的原因及处理方式 [参考资料](https://tech.jandou.com/cross-domain.html)
- get 与 post
- 通用头部、请求/响应头、请求/响应体
- 常用的状态码  200 301 302 304 400 404 500 501 503

### TCP/IP 相关原理及延伸

<details>
<summary>查看解析</summary>

- 为什么握手需要三次，而挥手却需要四次？ ➤为了防止_已失效的_连接请求报文段突然又传送到了服务端，因而产生错误。握手过程中传送的包里不包含数据。
- 为什么要四次挥手？ ➤主机双方相互确认结束报文的发送，并应答对方。
- 为什么要等待2MSL？ ➤ ①.保证TCP协议的全双工连接能够_可靠关闭_；②.保证这次连接的_重复数据段从网络中消失_。备注：MSL是任何报文段被丢弃前在网络内的最长时间。

参考资料：
- [关于 TCP/IP，必知必会的十个问题](https://juejin.im/post/598ba1d06fb9a03c4d6464ab)
- [通俗大白话来理解TCP协议的三次握手和四次分手 #14](https://github.com/jawil/blog/issues/14)
- [掘金搜索TCP结果](https://juejin.im/search?query=tcp&type=all)

</details>

### 正向代理和反向代理的区别？

### 如何部署大型 CDN ？


## 5.框架的使用

### 解释单向数据流和双向数据绑定
只有 UI控件 才存在双向，非 UI控件 只有单向。全局性数据流使用单向，易跟踪调试。局部性数据流使用双向，简单易用。

- [单向数据绑定和双向数据绑定的优缺点，适合什么场景？](https://www.zhihu.com/question/49964363)
- [React 应用的架构模式 Flux](http://stylechen.com/react-flux.html)

### Vue双向绑定实现原理 
➤ 参考资料：[《剖析Vue原理&实现双向绑定MVVM》](https://segmentfault.com/a/1190000006599500)
- 单向数据流架构在哪些方面适合MVC ？

    MVC 拥有大约 50 年的悠久历史，并已演变为 MVP，MVVM 和 MV *。两者之间的相互关系是什么？如果 MVC 是架构模式，那么单向数据流是什么？这些竞争模式是否能解决同样的问题？

### 客户端 MVC 与服务器端或经典 MVC 有何不同？

    提示：经典 MVC 是适用于桌面应用程序的 Smalltalk MVC。在 Web 应用中，至少有两个不同的数据 MVC 周期。

### 不可变数据结构（immutable data structures）解决了哪些问题？

### 大型应用程序是否应使用静态类型？

    如何比较 TypeScript/Flow 与 Elm/ReasonML/PureScript 等 JS 转换语言？这些方法的优缺点是什么？


### Vue 和 React的一些优点？

几个切入点：
- 数据驱动
- 数据单向流
- 虚拟DOM（可减少直接操作DOM）
- Vue 的双向绑定（原理？）
- 无缝结合 webpack 等打包工具，使得开发模式更现代，具有模块化、组件化式的。




### 如何理解虚拟DOM? 

<details>
<summary>查看解析</summary>

参考资料：[如何理解虚拟DOM? @zhihu](https://www.zhihu.com/question/29504639)

- 步骤一：用JS对象模拟DOM树
- 步骤二：比较两棵虚拟DOM树的差异 → 深度优先遍历，标记并记录差异 → 差异类型 → 列表对比算法
- 步骤三：把差异应用到真正的DOM树上

关键技术：batching(批处理)、Diff算法的优化:

    batching(批处理)：将所有DOM的操作搜集打包在js对象中完成，然后一次性的递交给真实DOM（性能上只刷新一次）
    Diff算法的优化：将标准的diff算法的O(n^3)复杂度降低到了O(n)，主要得益于对新旧DOM树进行了一个深度的优先遍历，并对每个节点做唯一 id 标记

逐层进行节点比较
![](https://ws1.sinaimg.cn/large/69b05e0aly1g17x7hycqdj20kg0bdaae.jpg)

更多解析：[深入浅出 React（四）：虚拟 DOM Diff 算法解析](https://infoq.cn/article/react-dom-diff)

> Tips：由于特有的 DOM Diff 算法，我们在实现自己的组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，我们有时可以通过 CSS 隐藏或显示某些节点，而不是真的移除或添加 DOM 节点。

优势：结合Node Server层来说，实现服务端与浏览器端的同构更为方便。

类比：CPU 内存(纯JS操作)和硬盘(纯DOM操作)的关系。

</details>


## 6.CSS布局基础

### BOM盒模型 
- [box-sizing MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 
- 浮动、文档流

### 纯 CSS 盒子水平垂直居中的实现方法  

查看 [Demo](https://zhuziyi1989.github.io/interview/demo/box-center.html)

### 动画相关

### Canvas 和 svg

### 移动端布局方案

- flex
- css-grid
- rem
- vw和vh
- 媒体查询
- 百分比

问题例子：
- 因使用了标准盒模型，盒子的 border 必然导致盒子挤出去，那么如何实现边框？
  答：用阴影或者outline来画线更加巧妙。
- 
## 7.前端构架和开发效率

### git

### 代码编辑器

### 项目管理工具、BUG管理工具

## 8.算法、数据结构、计算机基础等

### 有哪些基本的算法？

### 二进制, 十进制, 十六进制, 科学记数法

### 耗性能操作和时间复杂度

## 9.综合性问题

### 自我介绍

### 介绍印象最深刻的项目

### 高并发高可用的前端架构

场景：诸如京东6.18和双十一这类时期，要求采用高并发、高可用的前端架构，

① 利用**缓存**
    浏览器的静态资源缓存、静态资源的 **cdn** 缓存、分布式缓存、服务端缓存。可在 `localStorage` 里所很多优化，充分利用客户端资源，可在客户端储存一些不常改变的静态数据、base64编码形式的图片。

② 升级为 http2 推送

③ **合并压缩**资源

④ 避免高频刷新页面获取数据

⑤ 设置响应头 cache-control 和 last-modifie


## 10.面试分享和学习资料

### 面试分享

- [半年经验面试阿里前端P6](https://juejin.im/post/5a92c23b5188257a6b06110b)
- [前端面试分享: 两年经验社招-阿里巴巴](https://segmentfault.com/a/1190000013538920)
- [2019年前端面试都聊啥？一起来看看](https://juejin.im/post/5bf5610be51d452a1353b08d)
- [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)
- [记一次“失利后”经过半年准备通过阿里社招的经历与感悟](https://segmentfault.com/a/1190000013129650)

### 学习资料

-  书籍《You-Dont-Know-JS》 [Github在线阅读](https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN)

	购买链接：[你不知道的JavaScript（上卷）](https://u.jd.com/mwU5Oo) 、  [你不知道的JavaScript（中卷）](https://u.jd.com/jHylwd)  、 [你不知道的JavaScript（下卷）](https://u.jd.com/iO9Z43)

