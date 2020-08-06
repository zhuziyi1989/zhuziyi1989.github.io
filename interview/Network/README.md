前端知识体系 - 网络原理
----

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

### 跨域资源共享(CORS) 机制

策略：同源策略  ( [源]被定义为 URI、主机名和端口号的组合 )

作用：浏览器作为"安全裁判"，用于隔离潜在恶意数据的重要安全机制

解决方案：

- JSONP (兼容性好，但数据量小，GET请求)
- WebSocket (该协议不受同源政策限制)
- 反向代理（Nginx 服务内部配置 Access-Control-Allow-Origin 选项为 *）
- CORS 前后端协作设置请求头部，如设置 Access-Control-Allow-Origin 等头部信息( "简单请求"；[`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法预检请求 )
- iframe 嵌套通讯。关键技术：① 改变片段标识符，通过 `hashchange` 事件监听；② 利用 `window.name` 属性(影响性能)
- HTML5 新 API：`window.postMessage()`，通过`message`事件监听。

思考题：

- 为什么form表单提交没有跨域问题，但ajax提交有跨域问题？提示：<u>因为原页面用 form 提交到另一个域名之后，原页面的脚本无法获取新页面中的内容。</u>

参考资料：

- [HTTP访问控制（CORS） - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [前端跨域及其解决方案](https://tech.jandou.com/cross-domain.html)

### 正向代理和反向代理的区别？

### 如何部署大型 CDN ？

### 跨域认证问题(JWT)

1. session + Cookie
2. JSON Web Token

JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案

> 阮一峰：[JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
