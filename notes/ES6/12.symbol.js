// symbol 一种基本数据类型
// 独一无二的类型
// 默认不能枚举， for 不能取到
let s1 = Symbol('ymm')
let s2 = Symbol('ymm')
s1 === s2 // false

let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');  // 第一次是定义，后边的就是取之前的了
s1 === s2 // true

let obj = {
  name: 'zf',
  age: 23,
  [s1]: 'ok',
  [s2]: 'sss'
}
console.log(obj[s1])

Reflect.ownKeys(obj).forEach(item => {
  console.log(item)
})

// 用在 元编程能力  -》 改写语法本身
// 例如 typeof 判断类型时， Object.prototype.toString()
let obj1 = {
  [Symbol.toStringTag]: 'js'
}
console.log(Object.prototype.toString.call(obj1))  // [object js]
console.log(Object.prototype.toString.call({}))  // [object Object]

console.log({}+1)