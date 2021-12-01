#骨架和布局

## 1.  HTML 5 有哪些新特性？

`HTML5` 现在已经不是 `SGML` 的子集，主要是关于图像，位置，存储，多任务等功能的增加

- 绘画 `canvas`、`svg`
- 用于媒介回放的 `video` 和 `audio` 元素
-  `localStorage` 长期存储数据，浏览器关闭后数据不丢失
- `sessionStorage` 的数据在浏览器关闭后自动删除
- 语意化更好的内容元素` article`、`footer`、`header`、`nav`、`section`
- 表单控件`calendar`、`date`、`time`、`email`、`url`、`search`
- 新的技术`webworker`, `websocket`, `Geolocation`

## 2. 定位（[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)）

- BOM盒模型(IE盒模型的内容含border和padding，box-sizing: border-box; W3C盒模型box-sizing: content-box) [box-sizing MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
- 定位 Position（absolute/relative/fixed/[sticky](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning#position_sticky)）
- 浮动 float（清除浮动？空标签clear:both、伪类、父级设置 overflow:hidden）
- [块级格式化上下文（BFC）](https://zhuanlan.zhihu.com/p/25321647) 可触发 BFC：根元素、浮动元素、绝对定位、display(inline-block、table-cells、flex)、overflow(hidden、auto、scroll)
- 文档流（定位流、浮动流和普通流）
- [z-index](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning#介绍_z-index) 描述元素的堆叠顺序

## 3. 布局

- 纯 CSS 盒子水平垂直居中的实现方法 [Demo](https://zhuziyi1989.github.io/demo/box-center.html)
- Flex

### （1）.移动端布局方案

- flex （[图解CSS3 Flexbox属性](https://www.w3cplus.com/css3/a-visual-guide-to-css3-flexbox-properties.html) 、[一份 Flex 完整指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)）
  - 问题1：解释CSS语句 “flex: 0 1 auto”  flex-grow flex-shrink flex-basis [参考链接](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/380)
  - 请注意`float`，`clear`、`vertical-align`对弹性项目没有影响。
- css-grid
- rem
- vw 和 vh（按视窗的百分比计算，1vw为窗口的1%，100vw撑满，[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)）
- 媒体查询
- 百分比

问题例子：

- 因使用了标准盒模型，盒子的 border 必然导致盒子挤出去，那么如何实现边框？
  答：用阴影或者outline来画线更加巧妙。
- [水平垂直居中方案与flexbox布局](https://www.cnblogs.com/coco1s/p/4444383.html)

## CSS选择器

- 权重（！important → 行内 → id → class/属性/伪类 → 元素标签 → 其他）

- 选择器 nth-child() [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)

  ```css
  /* 举例 */
  nth-child(3n+5)/*匹配第5、第8、第11...*/
  nth-child(5n-1)/*匹配第5-1=4、第10-1=9、…、第5的倍数减1*/
  nth-child(3n±0)/*相当于(3n)*/
  nth-child(±0n+3)/*相当于(3)*/
  ```

  

## CSS3动画

- 三个重要属性：`transition`、`transform`、`animation`



## 收集性能问题

### 1. 相对自身移动的比较

`position: relative;` 和 `transform: translate(1px, 1px);` 均是相对自己的位置在移动，有什么区别呢？

> ##### 参考答案：
>
> 1. 从页面布局的角度看效果是一样的。
> 2. 从动画角度来说使用transform时，可以让 GPU 参与运算，动画的 FPS 更高。position时，最小的动画变化的单位是1px，transform参与时，可以做到更小（动画效果更加平滑）position 是为页面布局而生的。transform 是为动画而生的。
> 3. 表现效果相似，但 **translate 不会引起浏览器的重绘和重排**。

