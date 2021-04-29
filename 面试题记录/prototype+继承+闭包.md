### this 问题
```js
var  name = 'window';
var  obj ={
    name:'obj',
    normal(){
        console.log('aaa', this.name)
        return ()=>{ // 此处返回箭头函数，this 是不能改变的
            console.log(this.name);
        };
    },
    arrow:()=>{
        console.log('bbb', this.name)
        return function(){
            console.log(this.name);
        };
    },
};
var obj1={name:'obj1'};
obj.normal.call(obj1)(); // aaa obj1     obj1
obj.arrow.call(obj1)(); // bbb window    window
obj.normal().call(obj1) // aaa obj       obj
obj.arrow().call(obj1) // bbb window     obj1
// 前两个就是直接两个 function.call， 
// 第一个就是call直接修改context为obj1
// 第二个因为obj.arrow是箭头函数，不能修改this，this只能是外层的，所以是window
// 第三个 obj.normal()输出 aaa obj，返回的是箭头函数，不能修改this，所以call之后依然是obj
// 第四个obj.arrow()箭头函数，所以输出的是 bbb window，返回的是个普通函数，所以call后是obj1
```
### prototype
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
    var a = new A();
##### 1、 instanceof
检测**构造函数（A）的 prototype** 属性是否出现在某个**实例对象（a）的原型链**
ps：字面量创建的对象，是无法使用instanceof运算符，例如 var a = 'sss'，不能使用 a instanceof String，会报错。
```js
a instanceof Object;   // true
a instanceof A;   // true
a instanceof Array; // false
```
##### 2、 isPrototypeOf
测试一个**对象**(A)是否存在于另一个**对象(a)的原型链**上
```js
Object.prototype.isPrototypeOf(a)  // true
A.prototype.isPrototypeOf(a)   // true
Array.prototype.isPrototypeOf(a)   // false
```
>可以看到两者的区别，前者是 **A的prototype**，后者是 **A 本身**
#### instanceof 原理
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
```js
function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}
```
--------------
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
----------------
### 原型链的问题
问题一: 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享  
问题二: 在创建子类型时,不能向超类型的构造函数中传递参数
```js
function father (){}
function son () {}
son.prototype = new father();
// 此时创建 son 的实例时，不能向 father 的构造函数中传递参数
```
##### 解决方法一  ------- 构造函数
```js
function father () {
  this.colors = ['red', 'blue']
}
function son () {
  father.call(this) // 继承了father，且向父类型传递采纳数
}
var aaa = new son();
aaa.colors.push('black') // ['red', 'blue', 'black']
var bbb = new son();    // ['red', 'blue']
```
### 原型链
https://juejin.im/post/58f94c9bb123db411953691b
### ES6 class extends
是继承所有属性和方法
在 constructor 中调用的 super(params) 方法，是调用父类的 constructor(params) 也就是es5中的new father(params)
### 继承及各种继承的优缺点
```js
// 父类
function Father(name){
  this.name = name
  this.getName = function(){
    return this.name
  }
}
Father.prototype.getAge = function(){
  return this.name + 'sss'
}
```
* 原型链继承   
就是让子实例的原型等于父类的实例      
特点：可以继承所有属性    
缺点：无法向父类构造函数传参； 继承单一； 所有新实例都共享父类实例。    
原型链继承的缺点 => 可以 Object.create() 继承干净的原型链    
```js
function Son(){
  this.name = 'son1'
}
Son.prototype = new Father() // 重点
var son1 = new Son();
```
* 构造函数继承   
重点： 用 call 和 apply 将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））   
特点： 只继承了父类构造函数的属性，没有继承父类原型的属性;  可以继承多个构造函数属性（即call多个）； 在子实例中可以向父实例传参；   
缺点：只能继承父类构造函数的属性(即只有name、getName，没有getAge)； 无法实现构造函数的复用；  每个实例都有父类构造函数的副本   
```js
function Son2(){
  Father.call(this, 'son2') // 重点
  this.age = 12;
}
var son2 = new Son2();
console.log(son2.name) // son2
console.log(son2.age) // 12
son2 instanceof Father // false
```
* 原型式继承   
重点: 用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了可以随意增添属性的实例或对象。   
特点： 类似于复制一个对象，用函数来包装   
缺点： 所有实例都会继承原型上的属性； 无法实现复用。   
```js
function content(obj) {
  function F(){}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
var father = new Father('ssss'); 
var sup1 = content(father);
```
https://blog.csdn.net/xuqinggangsls/article/details/51490390  
  
继承主要依靠原型链来实现的  
https://juejin.im/post/58f94c9bb123db411953691b  
### 闭包理解、实现、应用场景
闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数内部的变量和方法传递到外部。
#### 闭包的特性：
1.函数内再嵌套函数  
2.内部函数可以引用外层的参数和变量  
3.参数和变量不会被垃圾回收机制回收   
```js
function f1(){
    var n=999;
    nAdd=function(){n+=1}
    function f2(){
        console.log(n);
    }
    return f2;
}
var result=f1();
result(); 
# 999
nAdd();
result();  
# 1000

function createFunctions(){
    var result=new Array();
    for (var i=0;i<5;i++){
        result[i]=function(){
        return i;
        };
    }
    return result;
}
var aaa=createFunctions();
console.log(aaa); 
# [[Function], [Function], [Function], [Function], [Function] ]
console.log(aaa[1]());   # 5    
# 每个数组的函数元素都返回5，因为都引用同一个变量i，i的值是5
# 使用闭包后能取到预期i值
function createFunction2(){
    var result2=new Array();
    for (var j=0;j<5;j++){
        result2[j]=function(num){
            return function (){
            return num;
            };
        }(j);
    }
    return result2;
}
var bbb=createFunction2();
console.log(bbb[1]());  # 1   
```
