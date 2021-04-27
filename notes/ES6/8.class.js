// 在 es5 中没有类的概念的， 需要构造函数等方法继承
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);

// ----------------------------------------------
// es6 class
// 面试题： 如何实现一个类？
// 类的继承  三种属性  公有属性(__proto__)  私有属性  静态方法(静态属性)
// --- 继承私有属性  ----
function Parent() {
  // 构造函数中的 this 通过 new 方法调用的，那么 this 指向的是创建的实例
  this.name = 'parent';   // name 是私有属性
}
// Parent(); this 指向 window
// new Parent(); this 指向实例
Parent.prototype.eat = function() {
  // eat 是公有属性
  console.log('eat');
}
Parent.prototype.constructor === Parent;
function Child() {
  this.age = 9;
  Parent.call(this);  // 继承私有属性， 此句后，则 Child 有了 this.name = 'parent'
}
Child.prototype.smoking = function() {
  console.log('smoking')
}
Child.prototype.__proto__ = Parent.prototype
// let  parent = new Parent();
// 2）
// parent.__proto__ === Parent.prototype.constructor
// parent.__proto__.eat();  // 会先去找私有属性，找不到再去找公有属性
// 1)
// console.log(Parent.prototype.constructor === Parent)  ///  true

// 一、------ 继承私有属性  --------- 
// Parent.call(this);
// 二、------ 继承公有属性  ---------
// 1） (两种写法相同)
//     Child.prototype.__proto__ = Parent.prototype
//     Object.setPrototypeOf(Child.prototype, Parent.prototype)
// 2） Child.prototype = Object.create(Parent.prototype)
// 三、------ 继承公有和私有属性 ------ 
// Child.prototype = new Parent(); // 不会使用这种方式



