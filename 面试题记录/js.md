### 箭头函数和普通函数的区别
* 没有this，永远指向其上一级上下文的this，普通函数指向调用它的对象
* 箭头函数是匿名函数，不能作为构造函数，不能new 
    ```
    因为没有this啊，new的时候需要this指向新创建的对象呢
    ```
* 不能绑定arguments，而是用 解构... 解决
* 箭头函数没有原型属性 prototype
### 数组方法汇总
https://juejin.im/post/5902d56e1b69e60058c634d6
#### 数组遍历方法
* arr.forEach(fn(value, index, array), thisArg)  
没有返回值，若在fn中对 array 进行修改，则 arr 会改变
* arr.map(fn(value, index, arr), thisArg)  
遍历数组，并返回 fn return 值组成的新数组
```js
var array = [1, 3, 5];
var array2 = array.map(function(value,index,arr){
    return value*2
})
console.log(array2) // [2, 6, 10]
```
* arr.filter(fn(value, index, arr), thisArg)  
筛选 arr 中符合 fn 条件的元素，返回符合的新数组
```js
var array = [18, 9, 10, 35, 80];
var array2 = array.filter(function(value, index, array){
  return value > 20;
});
console.log(array2); // [35, 80]
```
* arr.reduce(fn(total, value, index, arr), startTotal = 0)  
一般累加器使用，数组中每个值开始合并，最终返回一个值
```js
var arr = [32, 33, 41, 8]
var arr2 = arr.reduce(function(total, value, index, arr){
    return total + value
}, 0)
console.log(arr2) // 114
```
* reduceRight(fn(total, value, index, arr), startTotal = 0)  
倒叙执行 reduce 
* arr.every(fn(value, index, arr), thisArg)  
检测数组 arr 中是否都符合 fn 的条件，都符合返回 true，有一项不符合返回 false，且剩余元素不再进行检查
* arr.some(fn(value, index, arr), thisArg)  
检测数组是否有符合 fn 的条件，有一个符合则返回 true
* entries 、 keys 、 values   
ES6 中的遍历数组的方法，都是返回遍厉器(Iterator)，不同的是分别遍历的是 键值对、键名、键值，返回的结果可以用 for...of 循环
```js
var arr = ['a', 'b', 'c']
for(let index of arr.keys()) {
    console.log(index)
}
// 输出 0  1  2
for(let index of arr.values()) {
    console.log(index)
}
// 输出 'a'  'b'  'c'
for(let [index, val] of arr.entries()) {
    console.log(index, val)
}
// 输出 0 'a'    1 'b'   2 'c'
```
* find(fn(value, index, arr), thisArg) & findIndex(fn(value, index, arr), thisArg)   
返回找到符合 fn 的第一个元素 / 第一个元素索引，没有则返回 undefined/-1
```js
var arr = [1,3,4,5,6,7]
var value = arr.find(function(value, index, arr){
    return value > 5
})
console.log(value)
// 6
// 如果是 findIndex，则返回 6 的索引 4
```
* Symbol.iterator
#### ES6 中新增的数组方法
* Array.of 除了只有一个整数参数时不同，其他时候都是相同的
```js
Array.of(8.0)  // [8]
Array(8) // [empty × 8]
```
若ie等浏览器不支持，可以实现一个polyfill
```js
if(!Array.of){
    Array.of = function(){
        return Array.prototype.slice.call(arguments)
        // return Array.from(arguments);  // 两行代码效果相同，只是此方法是ES6的
    }
}
```
* Array.from(arrayLike[,processingFn[, thisArg]])    
  将类数组arrayLike按照processingFn的方法生成新数组，thisArg是作用域，表示函数执行时this的值。
```js
var obj = {0: 'a', 1: 'b', 2:'c', length: 3}
Array.from(obj, function(value, index){
    console.log(value, index, this, arguments.length)
    return value.repeat(3); // 必须指定返回值，否则返回 undefined
}, obj)
// 执行结果如下： 
// a 0 {0: "a", 1: "b", 2: "c", length: 3} 2
// b 1 {0: "a", 1: "b", 2: "c", length: 3} 2
// c 2 {0: "a", 1: "b", 2: "c", length: 3} 2
// ["aaa", "bbb", "ccc"]
```
如果不传入第三个参数 obj，则this会是调用环境，即 window
* Array.fill(value, start[, end = this.length]) 用给定的数值value，填充一个数组的start到end之前的项。
```js
['a', 'b', 'c'].fill(7)  // [7,7,7]
new Array(3).fill(7)  // [7,7,7]
['a', 'b', 'c'].fill(7, 1, 2)   // ['a',7,'c']
```
* Array.flat([num = 1])    
将嵌套的数组拉平
```js
[1,2,[3,[4,5]]].flat()  // [1,2,3,[4,5]]  默认拉平一层
[1,2,[3,[4,5]]].flat(2) // [1,2,3,4,5]  参数设置拉平的层级，若不管几层都拉平为一维，则用关键字 Infinity 为参数
``` 
* Array.flatMap(fn(value,index,array), thisArg)  
对原数组每个成员执行 fn，然后执行 flat 方法，只能展开一层数组
```js
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2,4,3,6,4,8]
```

#### js 判断一个对象是否是数组
```js
var a = []
Array.isArray(a)  // ES6
Object.prototype.toString.call(a) === '[object Array]'  // ES5中能准确判断类型的方法
// 下边的如果用户手动设置来 var a = {__proto__: Array.prototype}，则下边方法都会返回true，所以保险方法是上边的方法
a instanceof Array
a.constructor === Array
Array.prototype.isPrototypeOf(a)
Object.getPrototypeOf(a) === Array.prototype
```
#### arguments 是不是数组，如果不是，怎么转为数组
```js
var arr = Array.prototype.slice.call(arguments);
var arr = [].slice.call(arguments);
var arr = Array.from(arguments);  // ES6
```
若ie等浏览器不支持，实现 polyfill 方法
```js
if(!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
}
```
--------------
#### 基础类型
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
ES6中新增了 Symbol 类型，当在使用了他人提供的对象，但是又想添加新方法，为了避免 新名字导致冲突而提出的，保证每个属性的名字都是独一无二的。要注意做为object的属性名时不能被for、Object.keys 等方法遍历到，需要使用 Object.getOwnPropertySymbols(obj) 取Symbol类型的属性。或者 Reflect.ownKeys(obj) 可以取到普通key和Symbol的key。
```js
Object.prototype.toString.call(Symbol()) === '[object Symbol]'
```
----------------
#### 基础类型与引用类型的区别
引用类型： Array，Object  
存储位置：   
* 基本类型的值直接存储在栈区，访问直接是实际的值  
* 引用类型在栈区存储的是引用地址，实际数据是存储在堆内存中，访问的是保存的地址。  

----------
### js中的内存管理
----

### call/apply/bind
使用的区别
```js
arg.call(this, arguments1, arguments2, ...)
arg.apply(this, [arguments1, arguments2, ...])
arg.bind(this, arguments1, arguments2, ...)()
```

---------
### async/await 捕获具体错误
```js
function to (promise) {
  return promise.then(data => {
      return [null, data]
  }).catch(err => [err])
}
function asyncFn(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(res)
        }, 1000)
    })
}
let [err, id] = await to(asyncFn())
```
--------------
### Es6的class和普通的prototype有啥区别
* class实际上只是prototype的语法糖而已。
  * class更加贴近于面向对象的写法
  * class 实现继承更加简单易懂，易理解

* class内部只能写 原型方法 和静态方法
* 如果想要原型属性，就必须要用prototype了
* 操作符的写法，用class是不可能实现的

------------


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

---------------
### escape 、 encodeURI 和 encodeURIComponent
##### escape
简单来说，escape是对字符串(string)进行编码(而另外两种是对URL)   
ASCII字母、数字、@*/+这几个字符不会被编码,由于js是unicode编码，中文会被编为unicode  
```js
escape('啊')  // %u554A
unescape('%u554A') // 啊
```
##### encodeURI
encodeURI方法不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'
##### encodeURIComponent
不会对下列字符编码 ASCII字母、数字、~!*()'
```js
location.href
// "https://www.baidu.com/?aa=1w12&bb=dfew"
encodeURI(location.href)
// "https://www.baidu.com/?aa=1w12&bb=dfew"
encodeURIComponent(location.href)
// "https%3A%2F%2Fwww.baidu.com%2F%3Faa%3D1w12%26bb%3Ddfew"
```
##### 应用场景
* 只是编码字符串，不和URL有半毛钱关系，那么用escape
* 编码整个URL，然后需要使用这个URL，那么用encodeURI
* 当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法
```
注意不要使用encodeURIComponent编码要直接使用的完整的url，
因为编码后的字符串，浏览器不认为是一个网址
```
------------------
#### 对requestAnimationFrame 的了解？与setTimeout 有什么区别
```bash
requestAnimationFrame 是H5新增定时器，不需要设置时间间隔，
计时器一直是js动画的核心技术，而编写动画循环的关键需要知道延迟多少时间合适，一方面需要足够短，才能显得流畅，另一方面需要足够长，才能保证浏览器有能力渲染产生的变化。
大多数显示器刷新频率是60Hz，大约等于每秒重绘60次。所以最佳的循环间隔就是每秒60次。
settimeout和setinterval的运行机制决定了他们的时间间隔是不准确的。而 对requestAnimationFrame 采用系统时间间隔，能保持最佳的绘制效率，不会因为间隔过短导致多度重绘浪费，也不会因你我时间太长不流畅。
```
特点：
```
1、会把每一帧中所有 dom 操作集中起来，在一次重绘或回流中完成，并且间隔紧随浏览器刷新频率
2、在隐藏或不可见元素中，不会进行重绘和回流
3、是浏览器专为动画提供的 API，浏览器会有自动优化方案的调用，页面未激活状态，动画自动暂停，节省 CPU 开销
```
