### 基础类型
null、undefined、Boolean、String、Number
判断类型

```js
Object.prototype.toString.call({})  ==== '[object Object]'
Object.prototype.toString.call([])  ==== '[object Array]'
Object.prototype.toString.call('aaa')  ==== '[object String]'
Object.prototype.toString.call(null)  ==== '[object Null]'
Object.prototype.toString.call('aaa')  ==== '[object Undefined]'
Object.prototype.toString.call(true)  ==== '[object Boolean]'
Object.prototype.toString.call(1)  ==== '[object Number]'
```
----
### new() 发生了什么
* 创建一个新对象
* 将构造函数的作用域赋值给新对象（this指向这个新对象）
* 执行构造函数中的代码（为这个新对象添加属性）
* 返回新对象

**用js实现new方法：**
```js
function _new(fn, args){
  // 1、创建一个新对象
  let target = {};
  let [constructor, ...args] = [...arguments];  // 第一个参数是构造函数
  // 2、原型链连接
  target.__proto__ = constructor.prototype;
  // 3、将构造函数的属性和方法添加到这个新的空对象上。
  let result = constructor.apply(target, args);
  if(result && (typeof result == "object" || typeof result == "function")){
    // 如果构造函数返回的结果是一个对象，就返回这个对象
    return result
  }
  // 如果构造函数返回的不是一个对象，就返回创建的新对象。
  return target
}
function Person(name){
  this.name = name
}
let p2 = _new(Person, "小花")
console.log(p2.name)  // 小花
console.log(p2 instanceof Person) // true
```
---------
### Es6的class和普通的prototype有啥区别
* class实际上只是prototype的语法糖而已。
  * class更加贴近于面向对象的写法
  * class 实现继承更加简单易懂，易理解

* class内部只能写 原型方法 和静态方法
* 如果想要原型属性，就必须要用prototype了
* 操作符的写法，用class是不可能实现的

------------
### 模块化
将项目按照功能划分，理论上一个功能一个模块，互不影响，按需加载
**模块化分类：**
* CommonJS
```
1、一个单独的js就是一个模块
2、每个模块都有一个单独的作用域，
3、导出方式： exports.aa = aa; 和 module.exports = {}
4、模块导入： require()
```
* AMD
```
1、预加载
2、应用需要：RequireJS
```
* CMD
```
1、懒加载
2、应用需要： SeaJS
```
-----
### module.exports 、 exports 、 export 、 export default 、 import()
下面主要介绍的是CommonJS和ES6中的方法  
* 前者是值的拷贝，后者是值的引用
```
值拷贝的意思是一旦输出一个值，模块内的变化不会影响到这个值，
值的引用是说只会生成一个只读索引，脚本真正运行时，在根据这个地址到被加载的那个模块中去取值
```
* 前者只能一个对象；后者可以对象、变量、function都可以
* 前者是运行时加载，后者是编译时输出接口（只能在模块的顶层，不能在代码块之中，所以条件加载就不可能实现）
```
编译时：代码还没有提交到内存中运行起来，还在硬盘中保存，属于静态定义（编译器对代码进行语法检查等操作） 
运行时：代码编译没有问题后，提交到内存中跑起来了，属于动态定义
```
#### CommonJS 规范
node.js应用的此规范。
* 通过<font color=red>require</font>方法来<font color=red>同步</font>加载依赖的其他模块  
* 通过<font color=red>module.exports</font>导出需要暴露的接口  

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
##### module.exports
```js
// a.js
let appid = '123456'
let bar = function (id) {
  return id
}
// 通过module.exports将appid与bar暴露出去
module.exports = {
  appid, bar
}

// 通过require引入utils
let utils = require('./a');
console.log(utils.appid) // 123456
console.log(utils.bar(2)) // 2
```
##### exports
可以理解为module.exports的简写。因为Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行 let exports = module.exports 的命令。
<font color=red>注意：不能直接将exports变量赋值为一个值。</font>
```js
let appid = '123456'
// 错误写法
exports = {
	appid
}
// 正确写法
exports.appid = appid
```
#### ES6 规范
使用 export 和 import 来导出、导入模块。其中 export 和 export default 之间也有些区别：  

##### export
<font color="red">export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。</font>看下边例子：
```js
export 1; // 报错

var m = 1;
export m; // 报错

function f() {}
export f; // 报错
```
因为没有提供对外的接口。
第一种写法直接输出 1，第二种写法通过变量m，还是直接输出 1。
1只是一个值，不是接口。 正确的应该下边这样用：  
```js
// a.js
export const m = '1'
export function getAppid() {
  return '1'
}
function f() {}
export {f};
// ------------------------------------------------------
// 导出的几种方式：
import { appid , getAppid } from './utils' // 导入多个导出
import * as utils from 'utils' // 作为命名空间导入整个模块
console.log(appid) // 123234
console.log(getAppid ()) // 123456
```
##### export default
为模块指定默认输出。本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。  
所以：
* import命令可以为导出的内容指定任意名字。  
```js
// a.js
export default function() {}

// b.js
import utils from './a'
```
* 不能跟变量声明语句  
```js
export default const appid = '123456'  // 报错
```
* 可以直接将一个值写在export default之后。  
```js
export default 42;
```
同时输入默认方法和其他接口  
```js
import fn3, { a, fn1} from './a';
// let module = await import('./a'); // 支持await关键字
```
##### import()
为解决es6中的 import 不能动态按需加载提出的提案。  
import()返回一个 Promise 对象。  
```js
import('./dialogBox.js').then(dialogBox => {
  dialogBox.open();
}).catch(error => {
  /* Error handling */
})
```
--------------
### es6 的代理
---------------
### 正则
```js
// 去除空格
str.trim();  // 去除两边空格
str.replace(/(^\s*)|(\s*$)/g, ""); // 去除两边空格
str.replace(/\s*/g, ''); // 去除所有空格

// 手机号
/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)
```
### call/apply/bind
使用的区别
```js
arg.call(this, arguments1, arguments2, ...)
arg.apply(this, [arguments1, arguments2, ...])
arg.bind(this, arguments1, arguments2, ...)()
```
---------------
### escape 、 encodeURI 和 encodeURIComponent
##### escape
简单来说，escape是对字符串(string)进行编码(而另外两种是对URL)   
ASCII字母、数字、@*/+这几个字符不会被编码,由于js是unicode编码，中文会被编为unicode  
<img src="/imgs/escape.png" width=200></img>
##### encodeURI
encodeURI方法不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'
##### encodeURIComponent
不会对下列字符编码 ASCII字母、数字、~!*()'
##### 应用场景
* 只是编码字符串，不和URL有半毛钱关系，那么用escape
* 码整个URL，然后需要使用这个URL，那么用encodeURI
* 当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法
```
注意不要使用encodeURIComponent编码要直接使用的完整的url，
因为编码后的字符串，浏览器不认为是一个网址
```
<img src="/imgs/encode.png" width=400></img>

------------------
### DOMContentLoaded 与 load 
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
### 获取页面元素相对于视窗的位置
**dom.getBoundingClientRect**
返回这样一个对象
```js
{
    width: 690,         // 元素宽度
    height: 26,         // 元素高度
    bottom: 220.875,    // 底边距离可视区顶部的距离
    left: 354.5,        // 左边距离可视区左边的距离
    right: 1044.5,      // 右边距离可视区左边的距离
    top: 194.875,       // 顶边距离可视区顶部的距离
    x: 354.5,           // 元素左上角的可视区x坐标
    y: 194.875          // 元素的左上角可视区y坐标
}
```
--------
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
<image width=600 src="/imgs/dom.png"></image>

-----------------------------

