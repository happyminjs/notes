## Promise
#### 特点
* 对象的状态不受外界影响：pending、fulfilled、rejected
* 一旦状态改变，就不会再变，任何时候都可以得到这个结果：只能pending --> fulfilled, pending --> rejected
#### 用法
* 属性： 
  * Promise.prototype.then(successcallback,failcallback)
  * Promise.prototype.catch(failcallback)
  * Promise.prototype.finally(callback): 不管 Promise 对象最后状态如何，都会执行的操作<font color=red>回调函数不接受任何参数</font>
```js
const promise = new Promise((resolve, reject) => {
  // ... some code
  setTimeout((value) => {
    if ('success'){
      resolve(value);
    } else {
      reject(error);
    }
  }, 1000)
});
promise.then((res) => {
  // ... some code
}, (err) => {
  console.log(err);
})
```
###### 1、Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。  
* resolve： 将Promise对象的状态从 pending 变为 resolved   
* reject： 将Promise对象的状态从 pending 变为 rejected    

###### 2、Promise 新建后就会立即执行
```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});
promise.then(function() {
  console.log('resolved.');
});
console.log('Hi!');
// Promise
// Hi!
// resolved.
```
Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
下面是一个异步加载图片的例子：
```js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.src = url;
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
  });
}
```
###### 3、resolve函数的参数除了正常的值以外，还可以是另一个 Promise 实例
```js
const p1 = new Promise(function (resolve, reject) {
  // ...
});
const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```
p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。  
<image src="/imgs/promise_param.png" width=400>
###### 4、最好在它们前面加上return语句
```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```
一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面，这样就不会有意外。  
#### Promise.all()
将多个 Promise 实例，包装成一个新的 Promise 实例
```js
const p = Promise.all([p1, p2, p3]);
```
* 参数： 一个数组，p1、p2、p3都是promise实例
* p的状态由p1、p2、p3决定
  * p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled。p1、p2、p3的返回值组成一个数组，传递给p的回调函数
  * p1、p2、p3之中有一个被rejected，p的状态就变成rejected，第一个被reject的实例的返回值，会传递给p的回调函数
#### Promise.race()
将多个 Promise 实例，包装成一个新的 Promise 实例，与all不同的是: 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
```js
const p = Promise.race([p1, p2, p3]);
```
可以用来添加超时时间：
```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p.then(console.log).catch(console.error);
// 如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
```
#### Promise.resolve() 
Promise.resolve() 可以将现有对象转为 Promise 对象。 
<font color=red>Promise.all() 和 Promise.race()的参数有非Promise对象时，都会自动先调用此方法，将参数转为 Promise 实例，再进一步处理。</font> 
用法：  
```js
const jsPromise = Promise.resolve('foo');
// 等价于
const jsPromise = new Promise((resolve) => {resolve('foo')})
```
参数说明：
* 参数是一个 Promise 实例：Promise.resolve将不做任何修改、原封不动地返回这个实例
* 参数是一个具有then方法的对象： Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行这个对象的then方法。
```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```
thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。
* 参数不是具有then方法的对象，或根本就不是对象: 返回一个新的 Promise 对象，状态为resolved.
```js
const p = Promise.resolve('Hello');
p.then(function (s){
  console.log(s)
});
// Hello
```
生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数.
* 不带有任何参数: 直接返回一个resolved状态的 Promise 对象。
```js
const p = Promise.resolve();
p.then(function () {
  // ...
});
```
注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
```js
setTimeout(function () {
  console.log('three');
}, 0);
Promise.resolve().then(function () {
  console.log('two');
});
console.log('one');
// one
// two
// three
```
setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
#### Promise.reject()
返回一个新的 Promise 实例，该实例的状态为rejected。
```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'));
p.then(null, function (s) {
  console.log(s);
});
// 出错了
```
Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。
```js
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```
Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。
