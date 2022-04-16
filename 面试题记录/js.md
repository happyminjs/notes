
### 数组方法汇总
https://juejin.im/post/5902d56e1b69e60058c634d6
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
#### 数组遍历方法
* arr.forEach(fn(value, index, array), thisArg)  
没有返回值，若在fn中对 array 进行修改，则 arr 会改变，
内部return是继续下一轮循环，不能用 break和continue，**不能跳出循环**。
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
#### fn.length：函数的形参个数
```js
function fn(a, b, c, d = 1, e){}
fn.length // 3
```
> 形参个数：仅包括第一个具有默认值之前的参数个数，即 d 前边的3个

#### js中的内存管理
----

---------
#### async/await 捕获具体错误
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


### es6 的代理
---------------

---------------

