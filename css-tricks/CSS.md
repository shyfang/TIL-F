[link1](https://juejin.cn/post/7061588533214969892#heading-20)
[link2](https://juejin.cn/post/6960866014384881671)
- BFC
 1.块级元素会在垂直方向一个接一个的排列，和文档流的排列方式一致。
 2.在 BFC 中上下相邻的两个容器的 margin  会重叠，创建新的 BFC 可以避免外边距重叠。
 3.计算 BFC 的高度时，需要计算浮动元素的高度。
 4.BFC 区域不会与浮动的容器发生重叠。
 5.BFC 是独立的容器，容器内部元素不会影响外部元素。
 6.每个元素的左 margin  值和容器的左 border  相接触。


利用这些特性，我们可以解决以下问题：
利用 4  和 6 ，我们可以实现三栏（或两栏）自适应布局。
利用 2 ，我们可以避免 margin  重叠问题。
利用 3 ，我们可以避免高度塌陷。

创建 BFC 的方式：

绝对定位元素（position 为 absolute 或 fixed ）。
行内块元素，即 display 为 inline-block 。
overflow 的值不为 visible 。

---
- 水平垂直居中
- 三栏/两栏自适应布局
- flex
- 双飞翼 圣杯布局


---
- css specificity （ABC）
- 伪类和伪元素
- css前N个 后N个元素
- odd even
- \+ 和 ～

---
- position布局
- position: sticky
- z-index

---
- css variable
- 暗黑主题色实现
- 多主题配置
- 栅格布局
- 媒体查询

---
- css动画
- 实现loading动画
```css

```

---
- 实现过的css效果
- CSS 如何设置一行/多行超出显示省略号
- 画一个三角形 triangle
```css
```