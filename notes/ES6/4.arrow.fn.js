// 箭头函数 es6 写起来简单  可以解决 this 的问题
// 函数 高阶函数
// 1、箭头函数没有 function 关键字
// 2、参数小括号和内容大括号之间有个箭头
// 3、如果参数只有一个， 可以省略小括号
// 4、如果直接 return，可以不写大括号


// 简化代码
// fn();
// function fn(a) {
//   return a;
// }
// let fn2 = (a) => a;
// let a = fn2(1);
// console.log(a)
// function fn3(c) {
//   return function(d) {
//     return c + d;
//   }
// }
// let fn4 = c => d => c + d;
// // fn3 和 fn4 等价的
// console.log(fn3(1)(2))
// console.log(fn4(1)(2))

// 解决 this 的问题，看 this 指代的是谁， 看 . 前面是谁就是谁
var b = 'ssss';
let obj = {
  b: 1,
  a: function() {
    console.log('a1 ', this, this.b);  // this指向的是obj，输出 { b: 1, a: [Function: a] }, 1
    setTimeout(function() {
      console.log('a2 ', this, this.b)  // this 取到的 window ，输出 window,  ssss
    }, 1000)
    let that = this;
    setTimeout(function() {
      console.log('a3 ', that, that.b)  // this指向的是obj，输出 { b: 1, a: [Function: a] }, 1
    }, 1000)
  },
  c: () => {
    console.log('c ', this, this.b); // this 指向的是 window， 输出 window ,  ssss
    setTimeout(() => {
      console.log('cc2 ', this, this.b); // this 指向的是 window， 输出 window, ssss
    }, 1000)
  }
}
console.log(obj.a())
console.log(obj.c())

// 箭头函数中没有 arguments
// ... 叫剩余运算符， 就是把多余的都放到数组中,且只能放到最后一个
let fn = (x, ...args) => {
  console.log(args)
}
fn('x', 1,2,3,4,5,6)  // 输出类数组  [ 1, 2, 3, 4, 5, 6 ]
let fn2 = (...arguments) => {
  let args = arguments.slice(1)
  console.log(args);
}

// 函数可以赋予默认参数
let fn = (a=1, b = 2) => {
  console.log(a, b)
}