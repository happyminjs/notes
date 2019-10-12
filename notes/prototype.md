https://juejin.im/post/58f94c9bb123db411953691b

#### 先了解一下函数的三种角色：
* 普通函数
* 类
* 对象

一个函数 Fn 是函数还是类，是<font color=red>由调用方式决定</font>的，
* **var a = new Fn( )** 调用则 Fn 是类，a 是一个基于类 Fn 的实例，同时 a 是一个对象
* **Fn( )** 执行 调用则 Fn 是函数

#### 区分一下对象和类
* **类**:   (es6之前)js中没有类的概念，一般通过创造一个对象来实现，比如 new Fn()
* **实例**:  实例是类的具象化产品
* **对象**:  对象是一个具有多种属性的内容结构

可以说： 实例都是对象，而对象不全是实例。

#### 然后来区分一下下边两个：
* **\_\_proto__**: 对象的属性
* **prototype**： 函数的属性，也是类的属性

**Function的例子：**
```js
function A (){
  this.aa = 'sss';
  this.bb = 12;
  console.log(this.__proto__);
};
A.prototype.fnaa = function(){
  console.log('fnaaa');
}
var a = new A();

/** 
 * 1、A 是个普通函数，所以属性是 prototype
 * 2、A.prototype 是 Object 这个类的实例，所以也是个对象
 *    所以 A.prototype.__proto__ 指向的是 Object.prototype
 * 3、Object.prototype 也是个对象，但是 Object 是最顶层的基类，
 *    所以 Object.prototype.__proto__ == null
 * 4、A 是个普通函数，同时也是 Function 这个类的实例，等价于 new Function(参数1,参数2...,函数体)
 *    所以 A 也是个对象，他的 A.__proto__ 指向的是 Function.prototype
 *    js 中的 call、apply 这些方法都挂载在 Function.prototype 上
 * 5、Function.prototype 也是 Object 的一个实例，所以也是一个对象
 *    Function.prototype.__proto__ 指向的是 Object.prototype
*/
console.log('A: ', A);
console.log('A.prototype: ', A.prototype);
console.log('A.prototype.__proto__: ', A.prototype.__proto__);
console.log('Object.prototype.__proto__', Object.prototype.__proto__);
console.log('A.__proto__: ', A.__proto__);
console.log('A.__proto__.__proto__: ', A.__proto__.__proto__);

/**
 * 1、a 是 A 这个类的一个实例，所以 a 是个对象，
 *   所以属性是 _proto_，指向所属类的原型，即 A.prototype
 * 2、A.prototype 与 a.__proto__是完全相等的
*/
console.log('a: ', a);
console.log('a.__proto__: ', a.__proto__);
console.log(A.prototype === a.__proto__);
```
<image src='/imgs/prototype_1.png' width=700>

-------------------
**数组的例子**
```js
var arr = [1,2,3]

/**
 * 1、arr 是 Array 这个类的实例， 等价于 new Array(1,2,3)
 *   所以 arr 是个对象，他的 arr.__proto__ 指向 Array.prototype
 *   js 中数组的方法都挂载在 Array.prototype 上
 * 2、同 Function.prototype 一样，也是 Object 的一个实例，所以也是一个对象
 *   Array.prototype.__proto__ 指向的是 Object.prototype
*/
console.log('arr: ', arr);
console.log('arr.__proto__: ', arr.__proto__);
```
### 确定原型和实例的关系
##### 1、instanceof
##### 2、isPrototypeOf