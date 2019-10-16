#### 特殊选择器 ~ , + >
* 1、**m~n** : 表示m**之后**的所有**同级别兄弟**节点 n 
* 2、**m>n** : m的直接子元素中的所有n
    与没有>号的 m n 的区别；m n 是m的所有后代子元素n，而m>n是只选择一代
* 3、**m,n** : m和n有相同的样式
* 4、**m+n** : m**之后**的相邻兄弟节点
#### 选择器权重
* important: 最高
* 内联样式： 1000
* ID选择器： 0100
* .class选择器： 0010
* 标签选择器： 0001
* 通配符、子选择器、相邻选择器： 0000
* 继承的样式没有权值，包括父级是 !important
#### 三等分
```css
/* 方法1：flex */
/* 方法2： 父元素 display:table  +  子元素 display:table-cell */
/* 方法3： 子元素高度/宽度 设置为 calc(100% / 3) */
```
#### 1px 边框
```css
.scale-1px{
  position: relative;
  border:none;
}
.scale-1px:after{
  content:'';
  position:absolute;
  border-bottom: 1px solid #000;
  top:-50%;
  right:-50%;
  bottom:-50%;
  left:-50%;
  transform: scale(0.5);
}
```
#### 清除浮动
```html
<!-- 方法1 -->
<!-- 在父元素添加最后一个子元素，并设置为 clear：both -->
<div class="father">
  <div class="float"></div>
  <div class="float"></div>
  <div class="clear"></div>
</div>
<style>
  .clear{
    clear: both;
  }
</style>

<!-- 方法2 -->
<!-- 父级添加overflow：hidden， 触发BFC方式，实现清除浮动 -->
<div class="father">
  <div class="float"></div>
  <div class="float"></div>
</div>
<style>
  .father{
    overflow: hidden;
  }
</style>

<!-- 方法3 -->
<!-- 使用after伪元素清除浮动 -->
<div class="father clearfix">
  <div class="float"></div>
  <div class="float"></div>
</div>
<style>
  .clearfix:after {
    clear: both;
    content: '';
    display: block;
    visibility: hidden;
    height: 0;
  }
</style>


```
#### 文本溢出
```css
/* 单行 */
.div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 多行 只支持webkit 内核 */
.div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; 
  overflow: hidden;
}
/* 所有情况最后都有 ... ，需要js 判断，但是兼容所有浏览器 */
.div {
  width: 400px;
  position: relative;
  line-height: 20px;
  max-height: 20px;
  overflow: hidden;
}
.div::after{
  content: "...";
  position: absolute; 
  bottom: 0; 
  right: 0; 
  padding-left: 2px;
  background: #fff;
}
```
#### 三角形
```css
/* 就是设置 border 的颜色为透明，显示的一边为三角形的底边 */
.div{
  width: 0;
  height: 0;
  border-color: red transparent transparent transparent;
  border-width: 30px;
  border-style: solid;
}
```
#### 小箭头

```css

```
#### loading圈圈
```html
<div class="donut"></div>
```
```css
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```
#### 纯css实现switch
```css
/* css */
.offscreen {
  position: absolute; /* input 不占文档流中位置 */
  opacity: 0; /* input 不能显示看到 */
}
.switch {
  position: relative;
  display: inline-block; /* label 标签默认是inline的，要修改为块的，宽高才有效 */
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25); /* 未选择时背景色 */
  border-radius: 20px;
  transition: all 0.3s;
}
.switch::after { /* after 来展示作为switch的圆圈 */
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
.offscreen:checked + .switch::after {
  /* 选中时圆圈的位置靠右 */
  transform: translateX(20px);
}
input[type='checkbox']:checked + .switch {
  /* 选中时背景色改变 */
  background-color: #7983ff;
}
```
```html
<!-- html -->
<!-- label一定要在input之后 -->
<input type="checkbox" id="toggle" class="offscreen"/>
<label for="toggle" class="switch"></label>
```
vue中使用v-model同步数据，封装switch组件做的相应修改如下：
```html
<!-- HTML -->
<!-- 添加 v-model -->
<input type="checkbox" id="toggle" class="offscreen"  v-model="checkVal"/>
<label for="toggle" class="switch"></label>
```
```js
export default {
  // 组件中应用时，可以将 checkVal 修改为 prop 传进的参数来定
  data() {
    return {
      checkVal: false  // 关联input的选中情况，true 或者 false
    }
  },
  watch: {
    // 通过watch实时传递处理 checkVal 的值情况。
    checkVal (newval, oldval) {
      console.log(newval);
      // todo 处理 checkVal 修改后js逻辑
    }
  }
}
```
#### 品字布局
```css
.box {
  position: relative;
  .top {
    width: 100%;
    height: 50px;
  }
  .left {
    position: absolute;
    width: 100px;
    top: 50px;
    bottom: 0;
    z-index: 2;
  }
  .rigth{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding-left: 100px;
    top: 0;
  }
}

```
#### 边界塌陷
* 兄弟元素 上元素的margin-bottom 会和 下一个元素的margin-top取margin值大的展示
```css
/* 方法1：子元素触发BFC模式 */
```
* 子元素的margin-top/bottom值和父元素的重叠。
```css
/* 方法1：父元素设置border */
/* 方法2：父元素设置padding */
/* 方法3：父元素设置overflow：hidden 触发bfc */
```
#### BFC
HTML文档的 块格式化上下文 (Block Formatting Context)
##### 触发BFC
* 浮动元素 (元素的 float 不是 none)
* 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
* 内联块 (元素具有 display: inline-block)
* 表格标题、单元格(元素具有 display: table-caption,table-cell)
* 具有overflow 且值不是 visible 的块元素
##### BFC 特性(功能)
* 使 BFC 内部浮动元素不会到处乱跑
* 和浮动元素产生边界
#### hover 展示另一个元素 ，用 after 伪元素 + attr
```html
<div class="hoverbtn" testattr="show me">
  hover me
</div>
<style>
.hoverbtn{
  width: 100px;
  height: 80px;
  position: relative;
}
.hoverbtn::after{
  content: attr(testattr)
  /* 获取到自定义属性 testattr，并赋值到content内容展示 */
}
</style>
```
#### 高度为宽度的2倍
```css
/* 完美方法，无兼容问题，且允许将内容正常放置在元素内 */
.div {
  background: rgb(247, 140, 140);
  width: 100%; /* 设置相对于父元素的宽度占比，即div的宽度 */
}
.div::before {
  content: '';
  padding-top: 50%; /* 百分比的值是按照宽度计算的，所以会是一个高是宽的一半的div */
  float: left;
}
.div::after {
  content: '';
  display: block;
  clear: both; /* 用来清除before的浮动，将元素完整的展示出来 */
}
/* 方法一： 利用的是padding用百分比的时候是相对于父元素的宽度来定的 */
/* 缺点子元素宽度也是0，还有位置问题 */
div {
  height: 0;
  width: 0;
  padding: 10% 20%;
}
/* 方法二： 利用vh 、 vw 单位 */
div {
  width: 100vh;
  height: 200vh;
}
/* 方法三： 利用calc计算 */
div {
  width: calc((100px)*0.1);
  height: calc((100px)* 0.2);
}
```
#### 图片按比例显示
```html
<!-- 方法一：换img标签为div，使用background-image和background-size属性来实现 -->
<!-- 方法二：使用css3样式，除ie外兼容还OK -->
<img class="image image-contain" src="https://picsum.photos/600/200" />
<img class="image image-cover" src="https://picsum.photos/600/200" />
<style>
/* object-position: [x] [y] 对图像的显示部位进行调整 */
.image {
  background: #34495e;
  border: 1px solid #34495e;
  width: 200px;
  height: 200px;
}
.image-contain {
  /* 实现 background-size: contain 的效果 */
  object-fit: contain; /* 容器内显示整个图像，并且保持宽高比 */
  object-position: center; 
}
.image-cover {
  /* 实现 background-size: cover 的效果 */
  object-fit: cover; /* 图像填充容器，并且保持宽高比 */
  object-position: right top;
}
</style>
```
#### flexbox布局
http://caibaojian.com/mobile-responsive-example.html
https://github.com/amfe/article/issues/17
https://www.w3cplus.com/css/viewports.html