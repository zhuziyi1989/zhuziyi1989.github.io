

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

### 简单说说 JS 数据类型

7 种原始(基本)数据类型  ▶ `栈内存`存储的是值

  - Boolean
  - Null （完全不存在）
  - Undefined（一个没有被赋值的变量会有个默认值 undefined，也就说已存在，但还没值）
  - Number（基于 IEEE 754 标准的`双精度` 64 位`二进制`格式的值（-(2^63 -1) 到 2^63 -1））
  - String
  - Symbol (ECMAScript 6 新定义)
  - BigInt（ECMAScript 新提案）

> 在JavaScript中，Number 可以准确表达的最大数字是2^53，比 2^53 大的所有数字可以使用BigInt表达。

对象类型  ▶`堆内存`存储的是地址
  - 数组（Array）
  - 函数（Function）
  - 正则（RegExp）
  - 日期（Date）

### 数组(array)：

Array.prototype.find() - 返回数组中满足提供的测试函数的**第一个**元素的值。否则返回 undefined。

Array.prototype.findIndex() – find and return an **index**

Array.prototype.includes() – 用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。

Array.prototype.filter() – _创建一个新数组_, 其包含通过所提供函数实现的测试的所有元素。 

Array.prototype.every() – 测试数组的**所有元素**是否都通过了指定函数的测试。

Array.prototype.some() – 测试是否**至少有一个元素**通过由提供的函数实现的测试。

Array.prototype.forEach() - 对数组的每个元素执行一次提供的函数。

##### 数组的哪些API会改变原数组？

![数组的哪些API会改变原数组](./images/arrary.jpg)

#### 类数组

Array.prototype.slice.call() -可对**类数组**进行截取

### 字符串(String)：

### 对象(Object):

应该熟悉掌握`Object` 的一些 API：

#### 如何遍历对象的属性和值

1. `for`循环：`for (var property in obj) { console.log(property) }`。但这还会遍历到它的继承属性，在使用之前，你需要加入`obj.hasOwnProperty(property)`检查。
2. `Object.keys()`：`Object.keys(obj).forEach(function (property) { ... })`。`Object.keys()`方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
3. `Object.getOwnPropertyNames()`：`Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`。`Object.getOwnPropertyNames()`方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

### 类型的判断

#### 操作符typeof 

[typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof) 操作符返回一个`字符串`，表示未经计算的操作数的`类型`，主要用于判断除 null 以外的基本类型。

```js
typeof null        // "object" (因为一些历史原因而不是'null'，Null表示一个空指针)
typeof undefined   // "undefined"
```

#### 操作符 instanceof 

instanceof 判断对象类型，但数组可能被 `instanceof` 判断为 Object。

[instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符用于测试构造函数的`prototype`属性是否出现在对象的`原型链`中的任何位置 (简单地说，可以判断是否是某个对象的实例，举个例子： `奥迪 instanceof 汽车`) 

#### Object.prototype.toString.call()

 Object.prototype.toString 可精确判断类型

```javascript
Object.prototype.toString.call(1) // "[object Number]" 
Object.prototype.toString.call('hi') // "[object String]"  
Object.prototype.toString.call({a:'hi'}) // "[object Object]"  
Object.prototype.toString.call([1,'a']) // "[object Array]"  
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(() => {}) // "[object Function]"
Object.prototype.toString.call(null) // "[object Null]"  
Object.prototype.toString.call(undefined) // "[object Undefined]"  
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

// 加上 slice(8,-1) 的效果
Object.prototype.toString.call(true)slice(8,-1) // "Boolean"
```

### 相等与全等区别

相等（==）操作符会执行 `类型转换`，具体流程如下:

1. 首先**判断两者类型**，如果相同，则判断`值`是否相等即可。
2. 如果类型不同，先进行类型转换，再判断。

`类型转换`的几条规则：

- 判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
- 判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
- 判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断
- 判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断

**总结一句话**：对于基本类型Boolean，Number，String，三者之间做比较时，*总是向 Number进行类型转换*，然后再比较；如果有Object，那么将Object转化成这三者，再进行比较；对于 null 和 undefined，只有 == 两边分别是它们时才相同，其他都为false。

```javascript
''  ==  '0'  //  类型都是字符串，直接判断值；false
0  ==  ''  //  类型不同，空字符串转换成 Number 后为 0 ，再直接判断值相等；true
false == 'false'   // 有Boolean，转化成Number，所以第一步转化后为0=='false'；然后'false'向Number转，结果是NaN,最后变成比较0==NaN；所以是false。（NaN和任何相比都是false，就算是自己也是false， NaN==NaN //false)

false == '0'  // 有Boolean，转化成Number，经过第一次转化就成了0=='0';就变成了上面的第3个例子，所以是true
true == '1'	 // true
false == undefined // 对于undefined和null，只有两边分别是两者才是true，其他都是false；所以是false
false == null  // 对于undefined和null，只有两边分别是两者才是true，其他都是false；所以是false
0 == []	// 类型不同，空数组转换成 Number 后为 0 ，再直接判断值相等；所以是true
![]     // 上一条中 [] 转换成 0，而引用类型转换成布尔值都是true，所有![]；所以是false
[]==![] // true  

' \t\r\n ' == 0    // true
//对于String，先转成Number，对于空String，都将转成0，所以转化后成为0==0,结果为true（注意，空字符不仅仅是只是空格，还包括\t\r\n等等，更多可以见ECMAScript spec的9.3.1）

null === undefined // false 
null ==  undefined // true  对于undefined和null，只有两边分别是两者才是true，其他都是false；所以是true
null === null // true
null == null // true
!null  //true

isNaN(1 + null) // false
isNaN(1 + undefined) // true
```

### 哪些值是 false

可用 Boolean() 去检测，以下在条件语句中被认为是 false

- `false`
- `undefined`
- `null`
- `""` （空字符串）
- `NaN`
- `0`（两个`+0`和`-0`）

### 谈谈类型转换



### 什么是函数式编程？

**函数式编程** （通常简称为 FP）是指通过复合 **纯函数** 来构建软件的过程，它避免了**共享的状态（share state）**、**易变的数据(mutable data)**、以及**副作用(side-effects)**。函数式编程是**声明式**而不是**命令式**，并且应用程序状态通过纯函数流转。对比面向对象编程，后者的应用程序状态通常是共享并共用于对象方法。

**关键词**：`纯函数`、`不可变数据`、`私有状态`、`无副作用`

Via：[征服 JavaScript 面试: 什么是函数式编程？| Eric Elliott](https://www.zcfy.cc/article/master-the-javascript-interview-what-is-functional-programming-2221.html)

**关于纯函数**：纯函数 » 相同的输入，永远会得到相同的输出！

✪  纯函数的优势有哪些？ (来自维基百科)

- ❶ 无状态，线程安全，不需要线程同步
- ❷ 纯函数相互调用组装起来的函数，还是纯函数
- ❸ 应用程序或者运行环境(Runtime) 可以对纯函数的运算结果进行*缓存*，运算加快速度

什么是纯函数？ https://t.cn/EJELtXz

### DOM 事件绑定的几种方式？

- 1. 在 DOM 元素上直接绑定（不推荐）

```html
<div id="btn" onclick="clickone()"></div> //直接在DOM里绑定事件
<script>
　　　　function clickone(){ alert("hello"); }
</script>
```

- 2. 在JavaScript代码中绑定 (DOM0级 onclick)

```html
<div id="btn"></div>
<script>
　　document.getElementById("btn").onclick = function（）{ alert("hello"); } //脚本里面绑定
</script>
```
- 3. 绑定事件监听函数 (DOM2级)

```html
<div id="btn"></div>
<script>
  function dosomething(){ alert("hello"); }
　document.getElementById("btn").addEventListener("click",dosomething,false); 
/* 
通过监听事件，处理相应的函数 dosomething
*/
</script>
```

obj.addEventListener(event,fn,useCapture); 是标准的绑定事件监听函数的方法，第三个参数为 `true` 代表在捕获阶段调用事件处理程序，否者为 `false` 表示在冒泡阶段调用事件处理程序，默认为`false`。

IE8.0及其以下版本用`attachEvent(event,fn);`代替。

*DOM2级的几个优点:*
① 可以绑定 / 卸载事件
② 支持事件流
③ 冒泡 + 捕获：相当于每个节点同一个事件，至少 2 次处理机会
④ 同一类事件，可以绑定多个函数

### 事件冒泡和捕获

事件冒泡：子元素的触发事件会一直向父节点传递，一直到根结点停止。此过程中，可以在每个节点捕捉到相关事件。可以通过`stopPropagation`方法终止冒泡。

事件冒泡的传播方向：子元素 → 根节点

事件捕获的传播方向：根节点 → 子元素

### 事件委托的优势

使用事件委托是需要在 DOM 树中尽量最高的层次节点上添加一个事件处理程序，因为子节点的事件会冒泡，最终会被委托节点处理的，优势：① 如果绑定在 document 上，document是很快能被访问的，而且可在页面生命周期的任何时点上为它添加时间事件程序(无需等待 load 事件)；② 更简洁，多个事件处理不需要更多代码；③ 整个页面占用的内存空间较少，性能也得到了大大的提升。

### 值类型和引用类型、变量提升

1. var 的函数作用域、有变量提升
2. let 和 const 定义前的区域为`暂时性死区`

### 立即执行函数, 模块化, 命名空间

IIFE（Immediately Invoked Function Expressions）代表立即执行函数。

1. (function(){ … })()   私有化变量
2. ES6+ 的 import、export 模块化相对比 Common.js 的优势？

### 剩余参数、默认参数和解构赋值参数

### setTimeout, setInterval


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

### “new” 关键字有什么作用？
当代码 new Foo(...) 执行时，会发生以下事情：

- 1.一个继承自 Foo.prototype 的`新对象`被创建。
- 2.使用指定的参数调用构造函数 Foo，并*将 this 绑定到新创建的对象* 。new Foo 等同于 Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
- 3.由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

### 关于“闭包”的相关话题

关键点在于一个函数返回另一个函数，另一个函数就是“闭包”

### 原型、原型链、继承等相关话题

关于原型继承， 我们应该记住以下几条：

- 类属性使用 this 绑定
- 类方法使用 prototype 对象来绑定
- 为了继承属性， 使用 call 函数来传递 this
- 为了继承方法, 使用 Object.create 连接父和子的原型
- 始终将子类构造函数设置为自身，以获得其对象的正确类型



**一个对象都有原型对象，且原型对象是独立的！**如图：

![](./images/prototype.jpg)

原型链查找图：

![](./images/Prototypechain-min.jpg)

### 关于 this

- 如果要想把 this 的值从一个环境传到另一个，就要用 call 或者 apply 方法。
- this 的值取决于**函数的调用方式**。一般来说，谁调用了该方法，那么 this 就指向谁。
- 箭头函数中，是在闭合的执行环境内设置 this 的值。
- 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。
- 特殊情况下，bind/call/apply 能够强制改变 this 的绑定。
- 使用 new 操作符时，也会涉及 this 的绑定。

#### bind / call / apply

首先 call、apply、bind 第一个参数都是 this 指向的对象，call 和 apply 如果第一个参数指向 null 或 undefined 时，那么this会指向windows对象。

- call、apply 都是改变上下文中的 this，并立即执行。

- call 与 apply 方法的区别： call 方法接受的是参数列表，而 apply 方法接受的是一个参数数组（联想下解构）。

- bind 方法不立即执行，需要的时候再调用！

参考资料：

- [前端面试之手写一个bind方法](https://zhuanlan.zhihu.com/p/45992705)
- [细说Array.prototype.slice.call](https://juejin.im/post/5a5a201f5188257345017af1)
- [手动实现call/apply/bind](https://juejin.im/post/5ca088fb51882568093c24ee)

#### 普通函数和箭头函数的this

ES5中的普通函数：
  - 函数被直接调用，上下文一定是 window (请区别 w 大写 的 Window 对象)
  - 函数作为对象属性被调用，例如：obj.foo()，上下文就是对象本身obj
  - 通过 new 调用，this 绑定在返回的 `实例` 上

ES6中的箭头函数：它本身没有 this，会沿着作用域向上寻找，直到global / window。

*以上方法指定 this 的优先级：new > bind/call/apply > 对象调用 > 直接调用*

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



### Object.assign 如何实现深拷贝？

Object.assign({}, state, { visibilityFilter: action.filter })，把第一个参数设置为空对象，就可以避免改变 state

![assign](./images/assign2.jpg)

### 理解和深挖 map() 等高阶函数

1. 熟练掌握诸如 map() 、foreach() 、fliter() 、reduce() 新的 API
2. 说说`map()`和`forEach()`的比较？均不改变原数组（除非 callback 有操作）。 `forEach()`的执行速度较慢，无返回值；`map()`则会要求分配新的内存空间，用于存储新数组 **并返回**。
3. for(let key in Obj){ console.log(key, Obj[key]) } 的性能比较

### 浮点数问题 0.1+0.2 != 0.3

解释 console.log(0.1+0.2) //0.30000000000000004 

参考资料：： [浮点数为什么不精确？](https://juejin.im/entry/575543857db2a2006993114e)

### 异步相关，解释 promises，observables，generator 或 async-wait 

### JavaScript 中有哪些不同的函数调用模式？ 详细解释。 

    ** 提示: 有四种模式，函数调用，方法调用，.call() 和 .apply()。

### ES6定义类与ES5有何区别？

1. ES6 类内部所有定义的方法都是`不可枚举`
2. ES6 类必须使用 `new 调用`
3. ES6 类`不存在变量提升`
4. ES6 类默认即是严格模式
5. ES6 子类必须在父类的构造函数中调用`super()`，这样才有this对象；ES5中类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。

### ES6+ 的新特性，与 ES5 的一些区别

#### let、const 与 var 的区别

let 和 const 属于`块级作用域`，且`不存在变量提升`，也`不允许重复声明`(会抛出错误)，`变量不能在声明之前使用`(因 **暂时性死区** 会抛出错误)。

const 声明一个只读的常量。一旦声明，**常量的值就不能改变**，如果声明是一个对象，那么不能改变的是对象的引用地址。

#### 箭头函数

- promis

- for of

    箭头函数和普通 function 的区别？从而课衍生到 `call、apply、bind` 三者的运用问题，更或者涉及到 `this` 的使用。

#### AMD，CMD，CommonJS和ES6的对比

参考文章：[ECMAScript 6 的模块相比 CommonJS 的 有什么优点？](https://tech.jandou.com/ECMAScript6-CommonJS-Module-Compare.html)

#### CommonJS、AMD的起源

​	**CommonJS 起源于 Node.js ，因此在服务端广泛使用。**对于服务端，所有的模块都存放在本地硬盘，可以**同步加载**完成，等待时间就是硬盘的读取时间。但对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。因此，浏览器端的模块，不能采用"同步加载"（synchronous），**只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。**

#### CMD与AMD区别？

​	AMD和CMD最大的区别是**对依赖模块的执行时机处理不同**，而不是加载的时机或者方式不同，二者皆为异步加载模块。

#### ES6模块机制与CommonJS的区别

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是**<u>值的引用</u>**。
2. CommonJS 模块是运行时加载，ES6 模块是**<u>编译时</u>**输出接口
3. ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

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

### TypeScript对JS的改进？

主要在于`静态类型检查`，那么静态类型检查有何意义呢？

**标准答案是：**“<u>静态类型更有利于构建大型应用</u>”。

其一，静态类型检查可以做到early fail，即你编写的代码即使没有被执行到，一旦你编写代码时发生类型不匹配，语言在编译阶段（解释执行也一样，可以在运行前）即可发现。针对大型应用，测试调试分支覆盖困难，很多代码并不一定能够在所有条件下执行到。而假如你的代码简单到任何改动都可以从UI体现出来，这确实跟大型应用搭不上关系，那么静态类型检查确实没什么作用。

其二，静态类型对阅读代码是友好的，比如我们举个例子 jQuery API Documentation 这是大家都非常喜欢用的jQuery.ajax，在这份文档中，详尽地解释了类型为object的唯一一个参数settings，它是如此之复杂，如果没有文档，我们只看这个函数声明的话，根本不可能有人把这个用法猜对。针对大型应用，方法众多，调用关系复杂，不可能每个函数都有人编写细致的文档，所以静态类型就是非常重要的提示和约束。而假如你的代码像jQuery这样所有函数基本全是API，根本没什么内部函数，而且逻辑关系看起来显而易见，这确实跟大型应用搭不上关系，那么静态类型对阅读代码确实也没什么帮助。

作者：winter
链接：https://www.zhihu.com/question/64563945/answer/221904107
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

智者见智，仁者见仁

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

- [Node.js 基础指南](https://nodejs.org/zh-cn/docs/guides/)
- Koa
- 服务器管理(Linux、Centos等)
- Nginx 的使用

### Node.js中的事件循环是什么？

`事件循环`是 Node.js 处理**非阻塞 I/O 操作**的机制，尽管 JavaScript 是单线程处理的。当有可能的时候，它们会把操作转移到系统内核中去。

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
![](./images/dom-diff.jpg)

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

查看 [Demo](https://zhuziyi1989.github.io/demo/box-center.html)

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
- 30秒系列
  - 30秒JS (link: https://github.com/30-seconds/30-seconds-of-code) 
  - 30秒CSS (link: https://30-seconds.github.io/30-seconds-of-css/)
  - 30秒面试 (link: https://30secondsofinterviews.org/) 
  - 30秒React (link: https://github.com/30-seconds/30-seconds-of-react) 
  - 30秒Python (link: https://github.com/kriadmin/30-seconds-of-python-code) 
  - 30秒PHP (link: https://github.com/appzcoder/30-seconds-of-php-code) 
- [前端开发人员手册2019 From frontend masters](https://frontendmasters.com/books/front-end-handbook/2019)
- [前端面试题列表，课自我检测](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/javascript-questions.md)

### 学习资料

-  JS 基础类《JavaScript高级程序设计》（第3版）

-  网络类《HTTP权威指南》

-  CSS 基础类《CSS揭秘》

-  JS 基础书籍《You-Dont-Know-JS》 [Github在线阅读](https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN)

	购买链接：[你不知道的JavaScript（上卷）](https://u.jd.com/mwU5Oo) 、  [你不知道的JavaScript（中卷）](https://u.jd.com/jHylwd)  、 [你不知道的JavaScript（下卷）](https://u.jd.com/iO9Z43)

