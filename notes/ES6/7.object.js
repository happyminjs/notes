let obj2 = { 
  age: 9,
  name: 'zfff'
}
let obj1 = { 
  name: 'zfpx',
  __proto__: obj2,  // 写法 1
  getPName() {
    // 可以通过关键字 super 获取到父属性， super 是指向当前对象的原型对象
    return super.name
  }
};
// Object.setPrototypeOf(obj1, obj2);  // 写法 2
console.log(Object.getPrototypeOf(obj1));
console.log(obj1.name);
console.log(obj1.getPName())