// node 中模块  es6Module  commonjs 两种规范
// 用 webpack 打包后 es6Module 转为 commonjs 
// es6Module 是 静态模块(必须在头部先引入，即便写在后边，也是会提升到头部的)， 好处是可以 tree-shaking，可以在编译的时候进行分析
// commonjs 是 动态模块(可以在代码过程中再引入)， 可以在代码执行中引入模块，无法做 tree-shaking

// commonjs 模块规范
// 1、每个文件都是一个模块(每个模块外面都有一个函数)
// 2、文件需要被别人使用， 需要导出 module.exports = xxx
// 3、如果需要使用别人，则需要 require 语法

// commonjs 模块分类
// 1、核心模块(即内置模块)： fs，http，vm， 。。。。
// 2、第三方模块(使用别人的模块，需要安装)： co，
// 3、文件模块 别人引用的时候，需要通过相对路径或者绝对路径来引用

// 核心内置模块： fs path vm
const fs = require('fs')   // require 是同步方法，内部实现实际是使用 fs.readFileSync 来实现的
let exist =  fs.existsSync('./task.js') // 读取文件，如果不存在，会发生异常，所以可用 existsSync 先判断文件是否存在
if (exist){
  let r = fs.readFileSync('./task.js', 'utf8')
  console.log(r)
}


console.log(process.cwd())   // 当前运行目录，  /Users/ym/Documents/private/notes
const path = require('path')
console.log(path.resolve('a', 'b', 'c')); // 解析绝对路径，默认采用 process.cwd() 拼接    /Users/ym/Documents/private/notes/a/b/c
console.log(path.resolve(__dirname)) // 文件所在目录  /Users/ym/Documents/private/notes/notes/node/1.module
console.log(path.resolve(__dirname, 'a', 'b', 'c'))  // 解析绝对路径 遇到 / 会返回根目录 /Users/ym/Documents/private/notes/notes/node/1.module/a/b/c
console.log(path.join(__dirname, 'a', 'b', 'c'))  // 解析相对路径 ，仅仅是拼接，不会产生绝对路径，遇到 / 也会拼在一起  /Users/ym/Documents/private/notes/notes/node/1.module/a/b/c
console.log(path.extname('a.min.js'))  // 扩展名   .js
console.log(path.basename('abxx.js', '.js')) // 文件名   abxx
console.log(path.relative('a/b/c/1.js', 'a'))  // 根据路径获取相对路径   ../../..
console.log(path.dirname('a/b/c')); // 取当前文件的父路径   __dirname 的实现就是 path.dirname


// 字符串如何变成 js 来执行
// 1、eval 会受执行环境影响，作用域问题
// 2、new Function 模板引擎的实现原理，不受环境影响
console.log(new Function('a', 'b', 'console.log(1)').toString())  // function anonymous(a,b) {console.log(1)}
//  new Function 不会创建当前环境的闭包，总是创建于全局环境，所以运行时只能访问全局变量和自己的局部变量，看下边中，可以输出 a，不能输出 d
global.a = 100;  // 浏览器中的时候是 window.a
function c(){
  var d = 200;
  let fn = new Function('b', 'console.log(a,b,d)');
  fn('bbb')
}
c()  // 会报错 d is not defined
// node 中自己实现了一个模块 vm， 不受影响（沙箱环境）
// 如何用 js 实现一个沙箱
// 1、快照， 执行前记录信息，执行后还原信息
// 2、proxy 来实现
const vm = require('vm')
global.a = 100;
vm.runInThisContext('console.log(a)') // 100
vm.runInNewContext('console.log(a)') // a is not defined  是取不到 global 上的属性的
// node 中全局变量是在多个模块下共享的，所以不要通过 global 来定义属性
require('./a')
console.log(a)   // 能取到 a 文件中的 a 变量
// - 全局 1一个上下文
  // -- function(exports, module, require, __direname, filename){}， 默认全局在这个 function 内，有前边那几个参数
  // -- runInThisContext
// - runInNewContext，

// require 的实现
// 1、读取文件
// 2、读取文件后，给文件包装一个函数(看 b.js )
// 3、通过 runInThisContext 将他变成 js 语法
// 4、调用
console.log()
console.log()
console.log()
