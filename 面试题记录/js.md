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
### 原型链

---------

### 继承
-------------
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
### index db
客户端浏览器的存储。
##### 概述
* 键值对储存： 所有类型的数据都可以直接存入，包括 JavaScript 对象。每一个数据记录都有对应的主键，主键不能有重复，否则会抛出一个错误。
* 异步操作： 
* 支持事务: 意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
* **同源限制**
* 储存空间大, 一般来说不少于 250MB
* 支持二进制储存
##### 基本概念
* 数据库：IDBDatabase 对象
* 对象仓库：IDBObjectStore 对象： 类似与sql中的表
* 索引： IDBIndex 对象
* 事务： IDBTransaction 对象
```
数据记录的读写和删改，都要通过事务完成。
事务对象提供error、abort和complete三个事件，用来监听操作结果
```
* 操作请求：IDBRequest 对象
* 指针： IDBCursor 对象
* 主键集合：IDBKeyRange 对象
##### 打开数据库
```js
var request = window.indexedDB.open(databaseName, version);
```
* databaseName： 字符串，表示数据库的名字，如果不存在，则新建一个
* version： 数据库的版本， 默认当前版本；新建时默认是1
* return： IDBRequest 对象，可以通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果
```js
// error
request.onerror = function (event) {
  console.log('数据库打开报错');
};
// success
var db;
request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};
// 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded
// 通常也是新建数据库时的触发事件
var db;
request.onupgradeneeded = function (event) {
  db = event.target.result;
}
```
##### 表操作
```js
// 新建表，一般是在新建数据库的触发事件里新建
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore;
  // 最好先判断一下，这张表格是否存在，如果不存在再新建
  if (!db.objectStoreNames.contains('person')) {
    // 新增一张叫做person的表格，主键是id
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
}
```
##### 新建索引
```js
var db;
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
  // 参数： 索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
}
```
##### 新增数据
新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。
```js
function add() {
  var request = db.transaction(['person'], 'readwrite');
  // objectStore 拿到 IDBObjectStore 对象
  var presonStore = request.objectStore('person')
  // 表格对象的add()方法，向表格写入一条记录
  var insert = presonStore.add({ id: 1, name: '张三', age: 24, email: 'zhs@example.com' });
  insert.onsuccess = function (event) {
    console.log('数据写入成功');
  };
  insert.onerror = function (event) {
    console.log('数据写入失败');
  }
}
add()
```
db.transaction([tablename1, tablename2], model)
* tablename: 要打开的表的名字，数组，可一次多个表中取数据
* model：表格读取模式
  * readwrite: 可以进行读写操作
  * read：不能修改数据库数据，可以并发执行
  * verionchange： 版本变更
##### 读取数据
```js
function read() {
   var transaction = db.transaction(['person']);
   var objectStore = transaction.objectStore('person');
  //  objectStore.get 读取数据，参数是主键的值
   var request = objectStore.get(1);
   request.onerror = function(event) {
     console.log('事务失败');
   };
   request.onsuccess = function( event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
      } else {
        console.log('未获得数据记录');
      }
   };
}
read();
```
##### 遍历数据
遍历数据表格的所有记录，要使用指针对象 IDBCursor。
新建指针对象的 openCursor() 方法是一个异步操作，所以要监听success事件
```js
function readAll() {
  var objectStore = db.transaction('person').objectStore('person');
   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;
     if (cursor) {
       console.log('Id: ' + cursor.key);
       console.log('Name: ' + cursor.value.name);
       cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}
readAll();
```
##### 更新数据
使用 IDBObject.put() 方法
```js
function update() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    // put()方法自动更新了主键为1的记录
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };
  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}
update();
```
##### 删除数据
IDBObjectStore.delete()方法用于删除记录
```js
function remove() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1);
  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}
remove();
```
##### 使用索引
如果不建立索引，默认只能搜索主键（即从主键取值）。
```js
// 在上边的新建表格的时候，需要同时新建索引 ，以name为例
objectStore.createIndex('name', 'name', { unique: false });

// 有了name索引，就可以根据name搜索了
var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function (e) {
  var result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```
----------
### instanceof 原理
用于测试构造函数的prototype属性，是否出现在对象的原型链中的任何位置。
```js
function Car(mark,model,year){
    this.mark = mark;
    this.model = model;
    this.year = year;
}
var auto = new Car('Honda','Accord',1998);

console.log(auto instanceof Car);  //true
console.log(auto instanceof Object);  //true
```
理解原理就是： 判断构造函数的原型对象(如Car.prototype和Object.prototype)是否在实例对象（auto）的原型链上（proto）;
如果在对象的原型链上，就返回true，如果不在就返回false;

--------------
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

