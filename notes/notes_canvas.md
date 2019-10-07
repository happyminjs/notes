# canvas
canvas元素用过脚本用来绘制图像，canvas本身没有绘制能力，他只是图形的容器，必须使用脚本来绘制。  
getContext()方法返回一个对象，该对象提供了绘制的方法和属性。  
#### 浏览器对 canvas 的支持
某些浏览器不支持canvas，会展示 canvas 内部的HTML，如果浏览器支持，则会忽略canvas内部元素。  
```html
<canvas id="canvas" width="300" height="200">
  <p>canvas not support</p>
</canvas>
```
#### canvas.getContext
getContext('2d') 方法返回一个 CanvasRenderingContext2D 对象，所有的绘图操作都在这个对象内。同时，我们可以用 canvas.getContext 来测试浏览器是否支持canvas：   
```js
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
    console.log('支持Canvas!');
} else {
    console.log('不支持Canvas!');
}

var ctx = canvas.getContext('2d');
```
#### 坐标
canvas 中是以左上角为原点，水平向右为x轴，竖直向下是y轴，以像素为单位，每个点都是非负整数。
> 所有的绘制方法都在 canvas.getContext 返回的对象中，我们先来了解几个简单的：  
#### 绘制文本
fillText 方法：绘制“被填充的”文本  
```js
ctx.fillText(text,x,y,maxWidth);
// text: 要绘制的文本，
// x: 开始绘制文本的 x 坐标位置，相对于画布
// y: 开始绘制文本的 y 坐标位置，相对于画布
// maxWidth: 允许的最大文本宽度，可选
```
strokeText 方法：绘制文本（无填充） 
```js
ctx.strokeText(text,x,y,maxWidth);
// text: 要绘制的文本，
// x: 开始绘制文本的 x 坐标位置，相对于画布
// y: 开始绘制文本的 y 坐标位置，相对于画布
// maxWidth: 允许的最大文本宽度，可选
```
measureText 方法：返回包含指定文本宽度的对象，可以在输出文本之前，检查字体宽度 
```js
ctx.measureText(text).width;
// text: 要测量的文本
```
font 属性：设置或返回画布上文本内容的当前字体属性。
```js
ctx.font = 'font-style font-variant font-weight font-size font-family';
ctx.font = "italic small-caps bold 12px arial";
```
#### 绘制图形
##### 必会方法：
###### beginPath()
开始一条路径，或重置当前的路径。  
在使用这些方法绘制的时候，需要重置路径： moveTo()、lineTo()、quadricCurveTo()、bezierCurveTo()、arcTo() 以及 arc()
```js
ctx.beginPath();
```
###### fill()
填充当前绘图
```js
ctx.fill()
```
###### stroke()
绘制已定义的路径，不填充，即空心
```js
ctx.stroke();
```
##### 矩形
rect() 方法创建矩形，后续需要用 stroke() 或者 fill() 在画布上实际地绘制矩形。
```js
ctx.rect(x,y,width,height);
// x: 相对于画布矩形左上角的 x 坐标
// y: 相对于画布矩形左上角的 y 坐标
// width: 矩形的宽度
// height: 矩形的高度
```
还可以用：
ctx.strokeRect(x,y,width,height) 直接绘制矩形（不填充）  
ctx.fillRect(x,y,width,height) 直接绘制填充矩形
##### 圆形
arc() 方法创建弧/曲线（用于创建圆或部分圆），后续需要用 stroke() 或者 fill() 在画布上实际地绘制圆形。  
如果要绘制完整的圆形，起始角设置为 0，结束角设置为 2*Math.PI
```js
ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
// x: 圆的中心的 x 坐标
// y: 圆的中心的 y 坐标
// r: 圆的半径
// sAngle: 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）
// eAngle: 结束角，以弧度计
// counterclockwise: 是否逆时针绘图。False = 顺时针，true = 逆时针
```
#### 路径
##### 直线
直线需要几个方法同时使用才可以达到效果：
* beginPath(): 开始一条路径
* lineTo(): 添加一个新点，然后创建从该点到画布中最后指定点的线条（该方法并不会创建线条）
* moveTo(): 把路径移动到画布中的指定点，不创建线条( ctx.moveTo(x,y) )
```js
ctx.beginPath();
ctx.moveTo(200,20);
ctx.lineTo(40,20);
ctx.stroke();
```
##### 绘制复杂路径

#### 清除部分
clearRect(x,y,width,height)：在给定的矩形内清除指定的像素

#### 效果方法
###### shadowColor 阴影颜色：
```js
ctx.shadowColor = color;
// color: 阴影的 CSS 颜色值。默认值是 #000000
```
###### shadowBlur 阴影模糊级数：
```js
ctx.shadowBlur = number;
// number: 阴影的模糊级数
```
###### shadowOffsetX x轴阴影偏移距离：
```js
ctx.shadowOffsetX = number;
// number: 正值或负值，定义阴影与形状的水平距离。
```
相对应的有 shadowOffsetY y轴阴影距离




--------------
### 3D图形
HTML5有个WebGL规范，允许在Canvas中绘制3D图形。
var gl = canvas.getContext("webgl"); // 
