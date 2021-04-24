// 不算全局属性的全局属性
// __dirname __filename require module exports

// node 模块化机制    （之前是：seajs(cmd 按需依赖)  requirejs(amd 依赖前置)）
// 之前是：单例模式(无法解决命名冲突，变量名过长，调用不便)  
// 后来是 iife 来解决模块化，就是自执行函数
// 为什么需要模块化？
// 解决冲突，实现高内聚低耦合


// -------- commonjs规范 / esModule规范/ umd规范  ---------
// commonjs规范 依赖于 node 的特性，可以按需依赖 ，无法实现 tree-shaking
// es模块 只能静态依赖， 可以实现 tree-shaking

// commonjs 规范
// 1.每个文件都是一个模块
// 2.需要通过 module.exports 导出需要给别人使用对值
// 3.通过 require 引入需要对结果

// ---------- commonjs规范里，有三种模块 ---------
// 自定义模块/文件模块/第三方模块/内置模块(核心模块)/
// ------- 内置模块 -----------
// 不需要安装，引用时不需要添加路径
// ---------- fs -----------
// const fs = require('fs') // 文件
// let r2 = fs.existsSync('./1.txt'); // 同步判断文件是否存在
// let r1 = fs.readFileSync('./1.txt', 'utf8') // 同步读取文件
// console.log(r2, r1)
// --------- path ---------
// const path = require('path') // 处理路径
// // 此时可以传入解析对路径来查找到
// console.log(path.resolve(__dirname, './1.txt')) // 解析出一个绝对路径， 默认以 process.cwd() 解析 输出目录是 /Users/ym/Documents/private/zf/2-node基础 /2.globalObject/1.txt
// console.log(path.resolve(__dirname, './1.txt', '2.js'))  // 会直接拼接  输出目录是 /Users/ym/Documents/private/zf/2-node基础 /2.globalObject/1.txt/2.js
// console.log(path.resolve(__dirname, './1.txt', '/'))  // 斜线开头则会直接到系统根目录  输出目录是 /
// console.log(path.join(__dirname, 'a', 'b', '/')) // join 是直接拼接 输出目录是  /Users/ym/Documents/private/zf/2-node基础 /2.globalObject/a/b/
// path.extname('a.min.js') // 取文件后缀，输出 .js
// path.relative('a', 'a/b/2.js') // 相对路径，取两者差值  输出 b/2.js  
// path.dirname('a/b.js') // 取目录名字 输出 a
// -------- vm ----------
const vm = require('vm') // 很少用， 可以执行字符串代码
// 与 eval 的区别， eval 执行时不会产生沙箱机制，会依赖外层的变量
let b = 1;
eval('console.log(b)')
// vm 可以指定运行上下文。 运行方式同 new Function 不需要把字符串包装成函数，能取到全局的变量，不能取到 let const 等变量
// let a = 1;
global.a = 2;
vm.runInThisContext('console.log(a)')