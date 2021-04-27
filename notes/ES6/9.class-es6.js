class Parent {
  constructor() {
    this.name = 'parent'  // 私有属性
  }
  static b() {  // 静态属性， 属于类上的方法
    return 2;
  }
  eat() { // 公有属性，即es5中的原型上定义的方法
    console.log('eat')
    return 'eat';
  }
}

class Child extends Parent{ // 要求继承父亲的私有和公有属性，用 extends 
  constructor() {
    super();  // 相当于 Parent.call(this), extends 和 super() 后，则可以继承公有属性和私有属性和静态方法
    this.age = 9;  // 私有属性
  }
  static a() {
    // 静态 属于类上的方法，调用是 Child.a，
    return 1;   
  }
  smoking() {
    // 公有属性，原型上的方法
    console.log('smokinng');
  }
}
let child = new Child();
console.log(child.name, child.eat(), Child.b())
// 1、 类只能 new
// 2、类可以继承公有、私有、静态方法
// 3、若父类的构造函数中有 return 一个引用类型，则会把这个引用类型作为子类的this
// Parent.constructor 中有 return {test: 'ss'}， 则 child 的属性是 {test: 'ss', age: 9}