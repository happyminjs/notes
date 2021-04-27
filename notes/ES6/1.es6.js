// 一、 var 不支持封闭作用域，会声明到全局作用域上，
// for(var i = 0; i < 3; i++) {
//   console.log(i);
// }
// console.log('aaa ' + i);
// console.log('bbb ' + window.i);
// 要修改的话，需要下边的方式
// 1、函数作用域
// 2、全局作用域
//  (function() {
//    for(var i = 0; i < 3; i++) {
//      console.log(i);
//    }
//  })()
// console.log('aaa' + i); // 报错 i not defined
// console.log('bbb' + window.i); // 报错 i not defined
// 
// for (var i = 0; i < 3; i++) {
//   (function(i) {
//     setTimeout(function() {
//       console.log(i)
//     }, 1000)
//   })(i)
// }

// let const 
// let 和 {} 配合可以产生一个块级作用域
// let 支持块级作用域声明的变量，只会声明在当前作用域内

// for(let i = 0; i < 3; i++) {
//   setTimeout(function() {
//     console.log(i)
//   }, 1000)
// }
// console.log(i)

// let 可以解决作用域污染问题和局部作用域的问题
// 二、在同一个作用域下可以多次声明同一个变量
// var a = 1;
// function b () {
//   let a = 1;
//   // var a = 1; // 会报错， Identifier ‘a' has already been declared
//   // let a = 2;  // 会报错， Identifier ‘a' has already been declared
//   // 变量被重复声明，如果用 let 声明过了，就不可再用 var 了
// }
// b();

// 三、域解释问题  let 不会变量提升
// a();
// function a () { }
// 暂存死区  如果作用域内，有 let 声明的变量，则此作用域内就会绑定这个变量，就不会向上查找了
// let a = 1; 
// {
//   console.log(a);  // 报错 Cannot access 'a' before initialization
//   let a = 2;
//   console.log(a);
// }
// 
// let a = 1;
// {
//   console.log('aa ', a);
//   var a = 2; // 报错 Identifier 'a' has already been declared
//   console.log('bb ', a);
// }

// 四、通过 const 声明的变量不能被修改，不能被修改引用空间
// const a = 1;
// a = 2; // 报错 Assignment to constant variable.
// 
// const a = {name: 'zfpx'}
// a.age = 9; // 可正常运行，因为引用空间并没有修改
// a = {} // 报错 Assignment to constant variable.