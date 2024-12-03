// 类的调用检测  检测实例是否是 new 出来的
function _classCallCheck (instance, constructor) {
  console.log(instance, constructor)
  if (!(instance instanceof constructor)) {
    console.log('222');
    throw new Error('Class constructor Child cannot be invoked without "new"');
  }
}
function defineProperties(target, arr) {
  for(let i = 0; i< arr.length; i++){
    Object.defineProperty(target, arr[i].key, {
      ...arr[i],
      configurable: true,
      enumerable: true,
      writable: true
    })
  }
}
/**
 * 
 * @param {*} constructor 构造函数
 * @param {*} protoProperties 是原型方法的描述
 * @param {*} staticProperties 是静态方法的描述
 */
function _createClass(constructor, protoProperties, staticProperties) {
  protoProperties.length > 0 && defineProperties(constructor.prototype, protoProperties);
  staticProperties.length > 0 && defineProperties(constructor.prototype, staticProperties);
}
let Parent = function() {
  function P() {
    _classCallCheck(this, P);
  }
  _createClass(P, [
    {
      key: 'eat',
      value: function() {
        console.log('eat');
      }
    }
  ], [
    {
      key: 'b',
      value: function() {
        console.log('bbb')
        return 2;
      }
    }
  ])
  return P;
}()

let parent = new Parent();
parent.eat();

/**
 * 子类继承父类 
 * @param {*} subClass 
 * @param {*} superClass 
 */
function _inherits (subClass, superClass) {
  // 继承公有属性
  subClass.prototype = Object.create(subClass.prototype, { constructor: {
    value: subClass
  }});
  // subClass.__proto__ = superClass
  Object.setPrototypeOf(subClass, superClass);
}
let Child = function(Parent){
  // 先实现继承父类的公有属性和静态方法
  _inherits(C, Parent);
  function C () {
    _classCallCheck(this, C);
    console.log(4);
    let Obj = Parent.call(this); // 继承父类的私有属性
    console.log(5);
    if (typeof Obj === 'object') {
      obj.age = 9
    }
    this.age = 9 // 解决了父类返回一个引用类型的问题
  }
  return C;
}(Parent)

let child = new Child();
// child.b();