# 性能专题 Performance optimization



## 1. 防止重复发送请求

1. setTimeout + clearTimeout 连续的点击会把上一次点击清除掉，也就是ajax请求会在最后一次点击后发出去
2. UI上限制用户，比如按钮 disable、waiting动画（合理的timeout，失败提示等）
3. 客户端对同一个 form 提交时产生一个相同的 nonce 参数，服务器收到相同的 nonce 参数时，仅处理第一个请求，这样就保持了幂等性。

## 2. 如何实现函数节流(Throttling)和函数防抖(Debouncing)？ #js ❗️❗️❗️

> 精彩讨论：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5

防抖：用户的频繁交互(比如典型的“输入”)，应该用计时器做防抖处理，以减少不必要的资源浪费。

一些应用场景：

- search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
- window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

节流：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

一些应用场景：

- 鼠标不断点击触发，mousedown(单位时间内只触发一次)
- 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断（标记节流法）

1. **防抖**

> 触发高频事件后，n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

- 思路：

> 每次触发事件时都取消之前的延时调用方法

```
function debounce(fn) {
      let timeout = null; // 创建一个标记用来存放定时器的返回值
      return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
          fn.apply(this, arguments);//为了确保上下文环境为当前的this，注意这里使用apply手动绑定。
        }, 500);
      };
    }
    function sayHi() {
      console.log('防抖成功');
    }

    var inp = document.getElementById('inp');
    inp.addEventListener('input', debounce(sayHi)); // 防抖
```

2.  **节流**

> 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

- 思路：

> 每次触发事件时都判断当前是否有等待执行的延时函数

```
function throttle(fn) {
      let canRun = true; // 通过闭包保存一个标记
      return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
          fn.apply(this, arguments);
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
          canRun = true;
        }, 500);
      };
    }
    function sayHi(e) {
      console.log(e.target.innerWidth, e.target.innerHeight);
    }
    window.addEventListener('resize', throttle(sayHi));
```

### 3.性能分析

​	分享一下我近期的经验，之前项目也碰到过用起来很卡的情况，就是用element ui的tab切换组件时，点击tab切换非常卡，非常耗时，在排除了网络请求和js代码执行时间过长等原因后，跑了一次perfermance，结果发现大部分时间都花费在了 DOM GC上了，分析了下原因可能时dom结构太多导致每次tab切换渲染太耗时了。由于我每个tab里面的html结构都一样，都是一个table，只是每次tab切换时请求的数据不一样，我就把table抽离出来了，放到tab组件外面，然后tab里面就空了，就没有那么多dom了，tab切换就不卡了，很流畅。（ps：tab有20-30个切换选项，本人语文水平不行，描述的不清楚，望轻喷。）

首先理一理会造成性能损耗的一些场景:

1. 比如大列表的渲染,大量dom的渲染
   2.大量图片的加载,过多资源的请求.
   3.代码中有没有耗时的计算操作,或则大量循环.递归
2. 编写的组件过于庞大 层级过深,依赖模块过多等.
   我觉得首先就是查看请求的资源体积是否过大,如果过大考虑压缩,减少不必要的资源的请求,不必要的js代码的代码加载,用字体图标代替图片,异步加载等等.
   但是我觉得基本的优化策略(减少请求数,压缩请求资源的体积)都已经做过了,感觉性能还是没有提升,可能应该关注与代码层面的优化吧,比如过大的第三方库能不能换成轻量级的,代码中有没有很耗时的操作循环和递归,过多的分支条件语句,能不能改写以提高执行效率,简化复杂的组件逻辑,减少不必要的依赖,是否有杀鸡用了牛刀的操作等.暂时想到的就这些.