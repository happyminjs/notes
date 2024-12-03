## Object.assign(target, source1, source2)
将源对象（source）的所有可枚举属性，复制到目标对象（target）。  
* 是浅拷贝
* 源对象属性的值是基础类型的，则深复制此属性  
* 源对象属性的值是对象数组等，则是浅复制，拷贝的对象的引用
* 同名的属性会是替换，而不是追加属性
* 可以用来处理数组，但是会视为对象处理
```js
Object.assign([1, 2, 4, 3], [4, 5])
// 输出 [4, 5, 4, 3]
是将[1,2,4,3] 当做对象{0: 1, 1: 2, 2: 4, 3: 3}
```
* 只能进行值的复制，如果是取值函数，则求值后再复制
```js
const source = {
  get foo() { return 1 }
};
const target = {};
Object.assign(target, source)
// { foo: 1 }
```
#### 常见用途
* 为对象添加属性  
```js
class Point {
  constructor(x, y) {
    // 将x属性和y属性添加到Point类的对象实例
    Object.assign(this, {x, y});
  }
}
```
* 为对象添加方法  
```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});
// 等同于下面的写法  
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```
* 克隆对象  
* 合并多个对象  
```js
const merge = (...sources) => { Object.assign({}, ...sources)};
```


<!-- ## es6 对象深复制 -->


------------


## es6 的 Object.create() 与 es5 的 new Object() 
###### Object.create()
创建一个新对象，使用现有的对象来提供新创建的对象的proto。
```js
Object.create(proto, [propertiesObject])
// proto: 表示新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）
// propertiesObject:  添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
// return: 在指定原型对象上添加新属性后的对象
```
* 创建对象的方式不同
new Object() 通过构造函数来创建对象, 添加的属性是在自身实例下。  
Object.create() 是创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。
```js
// new Object() 方式创建
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}
```
<font color="red">Object.create()方法创建的对象时，属性是在原型下面的，也可以直接访问 b.rep // {rep: "apple"},此时这个值不是b自身的，是它通过原型链proto来访问到b的值。</font> 看下图比较直接：  
<img src="/imgs/new_object.png" width=300>   <img src="/imgs/object_create.png" width=300>
* 创建对象属性的性质不同


----------



<font color=red>同步</font>

