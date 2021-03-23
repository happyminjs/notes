#### DOMContentLoaded 与 load 
* **Load** 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。
* **DOMContentLoaded** 事件触发代表初始的 HTML 被完全加载和解析，不需要等待 CSS，JS，图片加载。
```js
window.onload=function(){} // 等待所有的内容都加载完之后执行，包括图片，内容，js，css等。
$(window).load(function (){}) // 同上，等待所有的内容都加载完之后执行
$(function(){}) // 是等待DOM加载完之后执行，不包括图片等。
$(document).ready(function() { // ...代码... })  // 就是 $(function(){})
// 另外：
// 不管是外链js还是页面中的js的window.onload都只执行最后的一个
// $(window).load(function (){})可以有多个，而且都是顺序执行
```
ps：图片的加载判断
* 1、图片的onload事件
* 2、判断 readystatechange 加载状态

-------
### DOM 的各种宽度
名词解释：
* screen：屏幕。这一类取到的是关于屏幕的宽度和距离，与浏览器无关。
* client：使用区、客户区。指的是客户区，当然是指浏览器区域。
* offset：偏移。指的是目标甲相对目标乙的距离。
* scroll：卷轴、卷动。指的是包含滚动条的的属性。
* inner：内部。指的是内部部分，不含滚动条。
* avail：可用的。可用区域，不含滚动条，易与inner混淆。

常用方法：
* 屏幕宽度：window.screen.width
* 浏览器内宽度：window.innerWidth || document.documentElement.clientWidth
* 元素内容宽度：element.clientWidth
* 元素占位宽度：element.offsetWidth
##### window.innerWidth/innerHeight
浏览器可见区域的内宽度、高度（不含浏览器的边框，但包含滚动条）
##### window.outerWidth/outerHeight
浏览器外宽度（包含浏览器的边框，因各个浏览器的边框边一样，得到的值也是不一样的）
##### window.screenLeft/screenTop
浏览器的位移  
* ie浏览器的内边缘距离屏幕边缘的距离。  
* chrome浏览器的外边缘距离屏幕边缘的距离。  
##### window.screenX/screenY
也是 浏览器的位移 ，但是ie的包括边框等部分 
* ie9/10浏览器的外边缘距离屏幕边缘的距离
* chrome浏览器的外边缘距离屏幕边缘的距离
##### window.pageXOffset/pageYOffset
表示浏览器X轴（水平）、Y轴（垂直）滚动条的偏移距离
##### window.scrollX/scrollY
也是 浏览器X轴（水平）、Y轴（垂直）滚动条的偏移距离
##### screen.width/height
屏幕的宽度、高度
##### screen.availWidth/availHeight
屏幕的可用宽度、高度（通常与屏幕的宽度、高度一致）
##### elment.clientWidth/clientHeight
box-sizing: content-box;标准：
document.getElementsByClassName('B')[0].clientWidth
元素的content + padding * 2（不包括元素的滚动条宽度）即：
* 有滚动条时：clientWidth=元素左内边距宽度+元素宽度+元素右内边距宽度-元素垂直滚动条宽度  
* 无滚动条时：clientWidth=元素左内边距宽度+元素宽度+元素右内边距宽度
##### element.clientLeft/clientTop
clientLeft为左边框宽度，clientTop为上边框宽度。
##### element.offsetWidth/offsetHeight
元素的 content + padding * 2 + border * 2
##### element.offsetLeft/offsetTop
该元素相对于最近的定位祖先元素的距离
* chrome：offsetLeft = 定位祖先左边框宽度 + 定位祖先元素左内边距宽度 + 左位移 + 左外边距宽度
* 其他：offsetLeft=定位祖先元素左内边距宽度+左位移+左外边距宽度
##### element.scrollWidth/scrollHeight
* 有滚动条时： 左内边距宽度 + 内容宽度
* 无滚动条时：左内边距宽度+宽度+右内边距宽度
##### element.scrollLeft/scrollTop
获得水平、垂直滚动条的距离。

-------------------
### Dom操作、事件（创建、插入位置、子元素、兄弟节点、父亲节点）
#### 事件监听
* onclick 和 addEventListener 的区别
```
onclick: 对同一个元素添加多次时，后边的会覆盖前边的
addEventListener: 不会覆盖上一个事件
```
* addEventListener 是在事件的捕获阶段还是冒泡阶段触发事件，最后一个参数值
```
最后一个参数可设置在什么阶段执行，
默认是 false，即在冒泡阶段执行
设置为 true 时，在捕获阶段执行
```
* event.target 和 event.currentTarget 的区别，以及应用场景
```html
target: 一直指向触发事件的元素
currentTarget: 在事件的冒泡或者捕获阶段执行到的元素
例如:
<div id="a">
    <div id="b"></div>
</div>
<script>
    document.getElementById('b').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + ' &currentTarget:' + e.currentTarget.id);
    });    
</script>
<!--
输出结果是(addEventListener 默认是冒泡，如果最后一个参数设置为true，则两行输出交换 顺序)： 
target:b &currentTarget:b 
target:b &currentTarget:a 
-->
```
```
应用场景
可以用来实现事件委托。
通过冒泡或者捕获给父元素添加事件监听，target指向触发事件的元素，例如li，
例如用户点击了 li ，由于冒泡，li 的点击冒泡到 ul 上，通过给 ul 添加监听事件，而达到给每一个 li 添加监听事件的效果，
e.currentTarget === this 返回true， e.target === this 返回false，
e.currentTarget 和 e.target 是不相等的。
```
###### 创建DOM
```js
var divDom = document.createElement('div');
```
###### 添加属性
```js
var divId = document.createAttribute("id");
divId.value = 'name';
divDom.setAttributeNode(divId);
```
###### 添加文本
```js
var pText = document.createTextNode("我是文本");
divDom.appendChild(pText);
```
###### 插入DOM
```js
// 向节点 fatherDom 添加最后一个子节点
fatherDom.appendChild(divDom)
// 向节点 fatherDom 所有子节点之前插入一个新的子节点
fatherDom.insertBefore(divDom)
// 拼接元素的字符串，可以利用父元素的innerHTML设置父元素的内容
fatherDom.innerHTML="<p>啊啊啊</p>"
```
<font color=red>注意: </font> <font size="2">如果是获取的页面中存在的元素，会删除原有节点。所以 appendChild 和 insertBefore 这两个方法都可以用来从一个元素向另一个元素中移动</font> 

###### 替换DOM
替换下例中的item的内部元素
```js
divDom.replaceChild(newnode,oldnode)
// 例：
var textnode = document.createTextNode("Water");
var item = document.getElementById("item");
item.replaceChild(textnode, item.childNodes[0]);
```

###### 删除DOM
如需删除某个 HTML 元素，您需要知晓该元素的父节点。
```js
fatherDom.removeChild(divDom);
```

###### 遍历
```js
node.children   // 只返回子元素节点，不支持ie低版本
node.childNodes // 所有的子节点，包括文本节点、注释节点
node.firstChild  // 第一个子元素
node.lastChild // 最后一个子元素
node.previousSibling // 相同的树层级中的上一个相邻元素，若没有返回 null
node.nextSibling // 相同的树层级中的下一个相邻元素，若没有返回 null
node.parentNode // node 的直接父元素
```
通过封装 childNodes + node.nodeType 可以实现 children 的效果：
```js
var nodeList = fatherDom.childNodes;
var ary = [];
for(var i = 0; i < nodeList.length; i++){
  var curNode = nodeList[i];
  if(curNode.nodeType ===1){
    ary[ary.length] = curNode;
  }
}
// nodeType 常用的取值：
// 1: node元素
// 2: 属性
// 3: 元素中或属性中的文本内容
// 8: 注释 
```
获取某个特定的元素，如：某个类型为 tagName 的子元素
```js
for(var k = 0; k < ary.length; k++){
  var curTag = ary[k]; // ary是children返回数组或者上边例子中返回的ary
  if (curTag.nodeName.toLowerCase() !== tagName.toLowerCase()){
    break;
  }
}
console.log(ary[k]);
```
###### 获取元素内容
```js
Dom.textContent // 只有本身及所有子元素的文本内容
Dom.innerHTML // 包括标签和属性
```
总结汇总： 
图片地址： https://github.com/happyminjs/notes/blob/master/imgs/dom.png
<image width=600 src="/imgs/dom.png"></image>

-----------------------------
