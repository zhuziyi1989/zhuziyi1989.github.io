#骨架和布局

## 1. html5有哪些新特性、移除了那些元素？

- `HTML5` 现在已经不是 `SGML` 的子集，主要是关于图像，位置，存储，多任务等功能的增加
  - 绘画 `canvas`、`svg`
  - 用于媒介回放的 `video` 和 `audio` 元素
  - 本地离线存储 `localStorage` 长期存储数据，浏览器关闭后数据不丢失
  - `sessionStorage` 的数据在浏览器关闭后自动删除
  - 语意化更好的内容元素，比如` article`、`footer`、`header`、`nav`、`section`
  - 表单控件，`calendar`、`date`、`time`、`email`、`url`、`search`
  - 新的技术`webworker`, `websocket`, `Geolocation`
- 支持`HTML5`新标签：
  - `IE8/IE7/IE6`支持通过`document.createElement`方法产生的标签
  - 可以利用这一特性让这些浏览器支`持HTML5`新标签
  - 浏览器支持新标签后，还需要添加标签默认的样式
- 当然也可以直接使用成熟的框架、比如`html5shim`

## 2. 定位（[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)）

- BOM盒模型(IE盒模型的内容含border和padding，box-sizing: border-box; W3C盒模型box-sizing: content-box) [box-sizing MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
- 定位 Position（absolute/relative/fixed/[sticky](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning#position_sticky)）
- 浮动 float（清除浮动？空标签clear:both、伪类、父级设置 overflow:hidden）
- [块级格式化上下文（BFC）](https://zhuanlan.zhihu.com/p/25321647) 可触发 BFC：根元素、浮动元素、绝对定位、display(inline-block、table-cells、flex)、overflow(hidden、auto、scroll)
- 文档流（定位流、浮动流和普通流）
- [z-index](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning#介绍_z-index) 描述元素的堆叠顺序

## 3. 布局

- 纯 CSS 盒子水平垂直居中的实现方法 [Demo](https://zhuziyi1989.github.io/demo/box-center.html)
- flex

### 移动端布局方案

- flex （[图解CSS3 Flexbox属性](https://www.w3cplus.com/css3/a-visual-guide-to-css3-flexbox-properties.html)）
  - 问题1：解释CSS语句 “flex: 0 1 auto”  flex-grow flex-shrink flex-basis [参考链接](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/380)
- css-grid
- rem
- vw 和 vh（按视窗的百分比计算，1vw为窗口的1%，100vw撑满，[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)）
- 媒体查询
- 百分比

问题例子：

- 因使用了标准盒模型，盒子的 border 必然导致盒子挤出去，那么如何实现边框？
  答：用阴影或者outline来画线更加巧妙。



## CSS选择器

- 权重（！important → 行内 → id → class/属性/伪类 → 元素标签 → 其他）

## CSS3动画

- 三个重要属性：`transition`、`transform`、`animation`