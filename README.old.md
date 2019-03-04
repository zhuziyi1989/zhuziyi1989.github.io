# 前端基础知识不完全记录

## 目录

1. JS 语言基础
2. 浏览器及其内核原理
3. 服务端应用、网络等原理
4. 框架使用
5. CSS 布局基础
6. 系统工具和开发效率
7. 算法、计算机基础概念

## JS 语言基础

### JS中的重要关键词

- super关键字用于访问和调用一个对象的父对象上的函数。

    super([arguments]); 
    // 调用 父对象/父类 的**构造函数**
    super.functionOnParent([arguments]); 
    // 调用 父对象/父类 上的**方法**

    参考 [super MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)

- function* 关键字定义了一个 generator 函数表达式。
- yield     暂停和恢复 generator 函数。
- yield*    委派给另外一个 generator 函数或可迭代的对象。
- async function*  async function 定义一个异步函数表达式。
- await     暂停或恢复执行异步函数，并等待 promise 的 resolve/reject 回调。
- promise

### JS引擎的基础概念

调用堆栈：

	V8引擎主要由两部分组成:
		① 内存堆：这是内存分配发生的地方
		② 调用栈：这是你的代码执行时的地方
		
概念：[Call Stack — MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)

堆栈溢出？堆栈溢出的产生是由于过多的函数调用，导致调用堆栈无法容纳这些调用的返回地址，一般在递归中产生。

### JS中的高频API

- call()   apply()数组传递  bind()不立即执行
- split() 字符串切割成数组  splice()  join()  push/pop  unshift/shift  concat()
- map() foreach() fliter() reduce() 
- Object.assign 拷贝

    数组(array)：

    字符(String)：

### 关于 this

- 如果要想把 this 的值从一个环境传到另一个，就要用 call 或者 apply 方法。
- this 的值取决于**函数的调用方式**
- 每次函数被调用时 this 的值也可能会不同
- 箭头函数中，是在闭合的执行环境内设置 this 的值
- 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。
- 谁调用的该方法，那么this就指向谁。



查看此文：[MDN 对 this 的讲解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)


### 关于“闭包”的相关话题

### 原型、原型链、继承等相关话题

### 有哪些基本的算法？

### ES6/7的新特性

### 如何理解虚拟DOM? [@zhizhu](https://www.zhihu.com/question/29504639)

步骤一：用JS对象模拟DOM树

步骤二：比较两棵虚拟DOM树的差异 → 深度优先遍历，标记并记录差异 → 差异类型 → 列表对比算法

步骤三：把差异应用到真正的DOM树上

关键技术：batching(批处理)、Diff算法的优化

    batching(批处理)：将所有DOM的操作搜集打包在js对象中完成，然后一次性的递交给真实DOM（性能上只刷新一次）
    Diff算法的优化：将标准的diff算法的O(n^3)复杂度降低到了O(n)，主要得益于对新旧DOM树进行了一个深度的优先遍历，并对每个节点做唯一标记

优势：结合Node Server层来说，实现服务端与浏览器端的同构更为方便。

类比：CPU 内存(纯JS操作)和硬盘(纯DOM操作)的关系。

### 临时记录

面试分享：

- [半年经验面试阿里前端P6](https://juejin.im/post/5a92c23b5188257a6b06110b)
- [前端面试分享: 两年经验社招-阿里巴巴](https://segmentfault.com/a/1190000013538920)
- [2019年前端面试都聊啥？一起来看看](https://juejin.im/post/5bf5610be51d452a1353b08d)
- [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)


### JS基础问题

> 来源列表：
>  - https://juejin.im/post/5bf5610be51d452a1353b08d

- 解释 console.log(0.1+0.2) //0.30000000000000004
- JavaScript 中有哪些不同的数据类型？
- 异步相关，解释 promises，observables，generator 或 async-wait 
- “new” 关键字在 JavaScript 中有什么作用？
- JavaScript 中有哪些不同的函数调用模式？ 详细解释。 
    
    ** 提示: 有四种模式，函数调用，方法调用，.call() 和 .apply()。

- 新 ECMAScript 提案关注过有哪些？
    
    ** 提示: ECMAScript 2018 的 BigInt、partial function、pipeline operator

- JavaScript 中的迭代器（iterators）和迭代（iterables）是什么？ 你知道什么是内置迭代器吗？

    ```javascript
    const a ={
        key1:Symbol(),
        key2:110
    }
    console.log(JSON.stringify(a)) // {"key2":110}  丢失 key1，为什么丢失？
    ```

- 你熟悉 Typed Arrays 吗？ 如果熟悉，请解释他们与 JavaScript 中的传统数组相比的异同？
- 解释 TCO - 尾调用优化（Tail Call Optimization）。 有没有支持尾调用优化的 JavaScript 引擎？

- 浮点数问题 console.log(0.1+0.2) //0.30000000000000004  
    参考：https://juejin.im/entry/575543857db2a2006993114e
- [JS中的重要关键词](#js中的重要关键词)
- 

## 设计、构架

> 来源列表：
>  - https://juejin.im/post/5bf5610be51d452a1353b08d

- 解释单向数据流和双向数据绑定。
- Vue双向绑定实现原理
- 单向数据流架构在哪些方面适合 MVC？

    MVC 拥有大约 50 年的悠久历史，并已演变为 MVP，MVVM 和 MV *。两者之间的相互关系是什么？如果 MVC 是架构模式，那么单向数据流是什么？这些竞争模式是否能解决同样的问题？

- 客户端 MVC 与服务器端或经典 MVC 有何不同？

    提示：经典 MVC 是适用于桌面应用程序的 Smalltalk MVC。在 Web 应用中，至少有两个不同的数据 MVC 周期。

- 不可变数据结构（immutable data structures）解决了哪些问题？

- 大型应用程序是否应使用静态类型？

    如何比较 TypeScript/Flow 与 Elm/ReasonML/PureScript 等 JS 转换语言？这些方法的优缺点是什么？


## CSS篇

- BOM盒模型 [box-sizing MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 
- 纯 CSS 盒子水平垂直居中的实现方法  [Demo](https://zhuziyi1989.github.io/interview/Code/box-center.html)

## 客户端

- 浏览器内核：V8引擎、
- 进程(系统层面)：一个Chome程序，或者一个标签页，操作系统分配资源的最小单位，独立
- 线程(内核层面)：渲染线程/JS引擎/事件触发/定时器触发/异步HTTP请求，程序执行的最小单位，共享

## 服务器端

- Node
- Koa
- 服务器管理(Linux、Centos等)
- 

## 系统工具和开发效率

- git
- 代码编辑器
- 项目管理工具、BUG管理工具
