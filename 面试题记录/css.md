### 浏览器适配
```
htmlFontSize/clientWidth = baseFontSize/UiWidth
即  
clientWidth : js获取的设备宽度
baseFontSize : 想要 1rem 是多少像素的宽度
UiWidth : 设计稿的宽度
例如 750 的设计稿，想要 1rem 是 100px
htmlFontSize/clientWidth = 100/750
```
```js
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<script>
# 适配
    var clientWidth = document.documentElement.clientWidth < 640 ? document.documentElement.clientWidth : 640;
    document.documentElement.style.fontSize = clientWidth / 7.5 + 'px';
</script>
```
#### 动画
* **animation:** name duration timing-function delay iteration-count direction fill-mode play-state;
* **@keyframes**
```css
div:hover {
  animation: rainbow 1s;
}
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```
```
iteration-count: 定义动画的播放次数。取值 n | infinite n次或者无限次
direction: 播放多次时，是佛偶反向播放。取值 normal|reverse|alternate(正反交替)|alternate-reverse
fill-mode: 开始前和结束后的样式。取值:none|forwards(结束位置样式)|backwards(开始位置样式)|both
```
* **transition:**  property duration timing-function delay
```
property: CSS属性的name，transition效果； 取值：none|all| property(width,height)
duration: 完成效果的时间  取值： 5s
timing-function: 速度曲线 取值: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
delay: 开始的时间
```
#### absolute 宽度问题
如果元素设置了 position: absolute 或者 float，都会让元素以 display:inline-block 的方式展示，可以设置宽度，默认宽度不占满父元素，就算显示的设置了display的其他值，仍会无效(none 除外)。
#### absolute 和 float 都会脱离文档流，其区别是什么？
absolute 就不占据文档流中的位置了，float 仍会占据一个位置。
#### BFC理解，作用，及触发条件
就是块级格式化，就是说在这个区域内，只有 block 块 box 参与，规定内部如何布局，与外部无关。
##### BFC的布局规则
* 内部的box的垂直方向距离由margin决定，相邻box的margin会重叠，取值大的
* 就是一个隔离的独立容器，容器内的不会影响外部的，反之相同
* 计算高度时，浮动元素也参与计算
* 浮动元素不会乱跑
##### 触发BFC
* 浮动元素 (元素的 float 不是 none)
* 绝对定位元素 (position的值不是 static 或者 relative )
* 内联块 (display的值是inline-block、table-cell、flex、table-caption或者inline-flex)
* overflow 值不是 visible 的块元素
##### BFC 特性(功能)
* 使 BFC 内部浮动元素不会到处乱跑
* 和浮动元素产生边界
#### 解释盒模型宽高计算公式、边界塌陷、负值 和 box-sizing
##### 盒模型宽高计算公式
标准模式盒模型的宽度是 content，占位宽是 content + padding + border + margin
##### 边界塌陷
* 兄弟元素 上元素的margin-bottom 会和下一个元素的margin-top取margin值大的展示
```css
/* 方法1：子元素触发BFC模式 */
```
* 子元素的margin-top/bottom值和父元素的重叠。
```css
/* 方法1：父元素设置border */
/* 方法2：父元素设置padding */
/* 方法3：父元素设置overflow：hidden 触发bfc */
```
##### 负值
只有 margin 可以使用负值，width、height、padding 设置负值都不会生效。  
margin 负值一般用来调整位置，例如居中的时候设置
##### box-sizing
会将 width 和的计算包括上 padding 和 border
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

#### 浏览器的标准模式(即w3c)和怪异模式(即兼容模式)
浏览器会根据 HTML 头部的 Doctype 自动确定使用的模式  
两者的重要不同点：   
    1、宽度：标准模式是只有content，怪异模式是content + padding + border  
    2、怪异模式可以设置行内元素宽度  
    3、若父元素未设置高度，则子元素的高度由内容决定，设置百分比高度是无效的  
    4、怪异模式下 margin: 0 auto 水平居中不生效  
    5、怪异模式下 padding 会失效  
    6、怪异模式下 table 中的字体不能继承上层设置  
    7、怪异模式下 white-space: pre 不生效  
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
#### Z 字型移动
使用 animation 动画 transition 变换
https://www.imooc.com/article/13298
```css

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
#### 左右两列自适应布局方案
https://segmentfault.com/a/1190000004424442#articleHeader2
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
#### 实现一个 div 水平居中有哪些方式
方法一:  margin: auto + 绝对定位元素，只可水平居中，不可垂直居中
```css
div{
    position: absolute;
    width: 200px;
    margin: auto;
    left: 0;
    right: 0;
}
```
方法二： margin 负间距，可水平垂直都居中
```css
div{
    position: absolute;
    width: 200;
    height: 200;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
}
```
方法三： transform 变形 + 定位， 可水平垂直都居中
```css
div {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
```
方法四： flex 实现子元素水平垂直居中
```css
.father {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
```
方法五： 使用表格，父元素设置为 table-cell，加css样式 text-align:center; vertical-align:middle; 子元素 display: inline-block 实现水平垂直居中
```html
```
方法六： 绝对定位 + calc 计算
```html
<p class="calcBox">
    <p class="inner">calc</p>
</p>
```
```css
.calcBox{
    position: relative;
}
.inner {
    position: absolute;
    left: calc((500px-200px)/2);
    top: calc((500px-200px)/2);
}
```


--------------------------
### 已知一个块级元素的宽度是包含块的50%，如何让他所占据的高度是他自己宽度的四分之三
```css

```
#### flexbox布局
http://caibaojian.com/mobile-responsive-example.html
https://github.com/amfe/article/issues/17
https://www.w3cplus.com/css/viewports.html



















-----------
------------
-----------
<link rel=”stylesheet” type=”text/css” href=”default.css”>   

#### 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？
```bash
（1）有两种， IE 盒子模型、W3C 盒子模型；
（2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
（3）区  别： IE的content部分把 border 和 padding计算了进去;
```
#### CSS选择符有哪些？哪些属性可以继承？
```bash
1.id选择器（ #myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul > li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a:hover, li:nth-child）

* 可继承的样式： font-size font-family color, UL LI DL DD DT;
* 不可继承的样式：border padding margin width height ;
```
#### CSS优先级算法如何计算？
```bash
优先级就近原则，同权重情况下样式定义最近者为准;
载入样式以最后载入的定位为准;
优先级为:  !important >  id > class > tag
important 比内联优先级高
```
#### CSS3新增伪类有那些？
```bash
举例：
p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child        选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。

:after          在元素之前添加内容,也可以用来做清除浮动。
:before         在元素之后添加内容
:enabled        
:disabled       控制表单控件的禁用状态。
:checked        单选框或复选框被选中。
```
#### 如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？
```bash
# 居中div
给div设置一个宽度，然后添加margin:0 auto属性
div{
    width:200px;
    margin:0 auto;
}
# 居中一个浮动元素
    确定容器的宽高 宽500 高 300 的层
    设置层的外边距
    .div {
      width:500px ; 
      height:300px;//高度可以不设
      margin: -150px 0 0 -250px;
      position:relative;         //相对定位
      background-color:pink;     //方便看效果
      left:50%;
      top:50%;
    }
# 让绝对定位的div居中
    {
        position: absolute;
        width: 1200px;
        background: none;
        margin: 0 auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
```
#### display有哪些值？说明他们的作用。
```bash
block         象块类型元素一样显示。
none          缺省值。象行内元素类型一样显示。
inline-block  象行内元素一样显示，但其内容象块类型元素一样显示。
list-item     象块类型元素一样显示，并添加样式列表标记。
table         此元素会作为块级表格来显示
inherit       规定应该从父元素继承 display 属性的值
```
#### position的值relative和absolute定位原点是？
```bash
absolute: 生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。
fixed: （老IE不支持）生成绝对定位的元素，相对于浏览器窗口进行定位。
relative: 生成相对定位的元素，相对于其正常位置进行定位。
static: 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
inherit: 规定从父元素继承 position 属性的值。
```
#### CSS3有哪些新特性？
```bash
新增各种CSS选择器  （: not(.input)：所有 class 不是“input”的节点）
圆角           （border-radius:8px）
多列布局        （multi-column layout）
阴影和反射        （Shadow\Reflect）
文字特效      （text-shadow、）
文字渲染      （Text-decoration）
线性渐变      （gradient）
旋转          （transform）
增加了旋转,缩放,定位,倾斜,动画，多背景
transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:
```
#### 请解释一下CSS3的Flexbox（弹性盒布局模型）,以及适用场景？
#### 用纯CSS创建一个三角形的原理是什么？
```bash
把上、左、右三条边隐藏掉（颜色设为 transparent）  
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```
#### 一个满屏 品 字布局 如何设计?
    简单的方式：
    上面的div宽100%，
    下面的两个div分别宽50%，
    然后用float或者inline使其不换行即可

#### 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？
```bash
* png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.

* 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。

* IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。

  浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;}

  这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)

  渐进识别的方式，从总体中逐渐排除局部。

  首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。
  接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。

  css
      .bb{
          background-color:#f1ee18;/*所有识别*/
          .background-color:#00deff\9; /*IE6、7、8识别*/
          +background-color:#a200ff;/*IE6、7识别*/
          _background-color:#1e0bd1;/*IE6识别*/
      }

*  IE下,可以使用获取常规属性的方法来获取自定义属性,
   也可以使用getAttribute()获取自定义属性;
   Firefox下,只能使用getAttribute()获取自定义属性。
   解决方法:统一通过getAttribute()获取自定义属性。

*  IE下,even对象有x,y属性,但是没有pageX,pageY属性;
   Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。

*  解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

*  Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,
   可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:
L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}

li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

为什么要初始化CSS样式。
- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

- 当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）
```
#### 淘宝的样式初始化代码：
```bash
html {
    color: #000;
    background: #fff;
    overflow-y: scroll;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%
}
html * {
    outline: 0;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}
html,body {
    font-family: sans-serif
}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
    margin: 0;
    padding: 0
}
input,select,textarea {
    font-size: 100%
}
table {
    border-collapse: collapse;
    border-spacing: 0
}
fieldset,img {
    border: 0
}
abbr,acronym {
    border: 0;
    font-variant: normal
}
del {
    text-decoration: line-through
}
address,caption,cite,code,dfn,em,th,var {
    font-style: normal;
    font-weight: 500
}
ol,ul {
    list-style: none
}
caption,th {
    text-align: left
}
h1,h2,h3,h4,h5,h6 {
    font-size: 100%;
    font-weight: 500
}
q:before,q:after {
    content: ''
}
sub,sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
}
sup {
    top: -.5em
}
sub {
    bottom: -.25em
}
a:hover {
    text-decoration: underline
}
ins,a {
    text-decoration: none
}
```
#### absolute的containing block(容器块)计算方式跟正常流有什么不同？
```bash
无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：
1、若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
2、否则,则由这个祖先元素的 padding box 构成。
如果都找不到，则为 initial containing block。

补充：
1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
2. absolute: 向上找最近的定位为absolute/relative的元素
3. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block
```
#### CSS里的visibility属性有个collapse属性值是干嘛用的？在不同浏览器下以后什么区别？
```bash
position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？
对BFC规范(块级格式化上下文：block formatting context)的理解？
（W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）
 一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
 不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。
```
#### css定义的权重
```bash
以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下例子是演示各种定义的权重值：

/*权重为1*/
div{
}
/*权重为10*/
.class1{
}
/*权重为100*/
#id1{
}
/*权重为100+1=101*/
#id1 div{
}
/*权重为10+1=11*/
.class1 div{
}
/*权重为10+10+1=21*/
.class1 .class2 div{
}

如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现
```
#### 请解释一下为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式
- 想要块级元素并排显示时会需要浮动  
- 浮动后会脱离文档流，父元素高度不能撑开
- 清除方法一：最后插入clear:both  
    在父元素的最后加一个冗余子元素并设置clear:both
- 清除方法二：使用伪元素after（IE6/IE7不识别:after伪元素，存在兼容性问题）
    
#### 移动端的布局用过媒体查询吗？
使用 CSS 预处理器吗？喜欢那个？
SASS (SASS、LESS没有本质区别，只因为团队前端都是用的SASS)

#### CSS优化、提高性能的方法有哪些？
#### 浏览器是怎样解析CSS选择器的？
#### 在网页中的应该使用奇数还是偶数的字体？为什么呢？
#### margin和padding分别适合什么场景使用？
#### 抽离样式模块怎么写，说出思路，有无实践经验？[阿里航旅的面试题]
#### 元素竖向的百分比设定是相对于容器的高度吗？
#### 全屏滚动的原理是什么？用到了CSS的那些属性？
#### 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？
#### 视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？）
#### ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用。
#### 如何修改chrome记住密码后自动填充表单的黄色背景 ？
#### 你对line-height是如何理解的？
#### 设置元素浮动后，该元素的display值是多少？（自动变成display:block）
#### 怎么让Chrome支持小于12px 的文字？
#### 让页面里的字体变清晰，变细用CSS怎么做？（-webkit-font-smoothing: antialiased;）
#### font-style属性可以让它赋值为“oblique” oblique是什么意思？
#### position:fixed;在android下无效怎么处理？
#### 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms
#### display:inline-block 什么时候会显示间隙？(携程)
移除空格、使用margin负值、使用font-size:0、letter-spacing、word-spacing
#### overflow: scroll时不能平滑滚动的问题怎么处理？
#### 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。
#### png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
#### 什么是Cookie 隔离？（或者说：请求资源的时候不要让它带cookie怎么做）
如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，所以不如隔离开。  
因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。
同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
提高了webserver的http请求的解析速度。
#### style标签写在body后与body前有什么区别？
#### 什么是CSS 预处理器 / 后处理器？
- 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
  还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。  
- 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的
  是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。