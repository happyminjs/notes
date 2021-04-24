// node + 文件名 执行  例如： node 2.js

// 默认 node 中的this是谁？
// 在文件中指向的是 module.exports 默认是 {}
// commonjs 规范 表示所有代码写到文件中 ，文件内部自带一个函数， 这个函数执行的时候改变了this
// console.log(this);
// console.log(global); 
// global 上的属性 { clearInterval, clearTimeout, queueMicrotask, setImmediate, clearImmediate }

// Buffer
// console.log(Buffer)
// console.log(process)
// 模块化 fs 手写 commonjs规范 npm的使用 内置的其他模块
// 流 http tcp


// 全局上可以直接访问的属性叫他全局变量
// process： process 代表进程 可以获得运行时的一些环境和参数
// Buffer : 二进制类，主要用于文件操作
// 所有模块都可以直接访问到下边5个变量，但是这5个变量不是在 global 上
// __dirname  __filename  require  module  exports

// ---------   process  -----------
// console.log(Object.keys(p  rocess))
// 常用的 process 的属性

// ----- process.platform -----
// win32 -> windows   darwin  -> mac  每个平台找一些用户文件 位置肯能不一样     写一个工具， 获取用户的目录时常用

// ----- process.chdir： 修改当前目录的 ------
// process.chdir('../')

// ----- process.cwd --------
// current working directory 当前工作目录, 运行时产生的一个路径 指向哪里执行的， 是可以改变的， 例如 webpack 运行找当前目录下的config
// console.log(process.cwd())   // 相对路径
// console.log(__dirname)  // 绝对路径
// 相对路径 相对的是工作目录，不是当前 文件所在的目录

// ------- process.env --------
// 环境变量，默认读取全局的 
// 我们一般设置临时变量  用插件 cross-env 就不用区分操作系统了
// set NODE_ENV=development // windows
// export NODE_ENV=development  // mac (注意不要有空格)
// cross-env NODE_ENV=development
// console.log(process.env.NODE_ENV)

// -------- process.argv -------
// 用户执行时传递的参数
// console.log(process.argv)  //例如 webpack --port 3000 --config webpack.config.js
// 运行命令  node 2-node基础\ /2.process.js --port 3000 --config webpack.config.js
// 输出的时个数组 
// [
//   '/usr/local/bin/node',   node 的可执行文件
//   '/Users/ym/Documents/private/zf/2-node基础 /2.process.js',  // node执行的文件时谁
//   '--port',  // 用户传递的参数
//   '3000', // 参数值
//   '--config',  // 用户传递的参数
//   'webpack.config.js' // 参数值
// ]
// let program = {}
// process.argv.slice(2).forEach((item, index, array) => {
//   if (item.startsWith('--')) {
//     program[item.slice(2)] = array[index + 1]
//   }
// });
// console.log(program)  // 输出 { port: '3000', config: 'webpack.config.js' }

// ----- 常用 commander 包 ----------
// 来解析node传入参数的，可以认为是命令行管家， git， npm
// const program = require('commander')
// program.option('-p,--port <v>','set user port')
// program.option('-c,--config <v>','set config file')
// program.command('create').description('create project').action(() => {
//   console.log('create project. ')
// })
// program.parse(process.argv)

// ------ process.nextTick -------
// 优先级高于微任务



// node 事件环
// 浏览器有两个任务队列：宏任务和微任务队列
// node 有多个宏任务队列
// ------- timers 存放所有定时器回调的 ------ 
// 执行已经被 setTimeout 和 seInterval 的调度回调函数
// pending callbacks 待定回调：延迟到下一个循环迭代到 I/O 回调，即 poll 队列中未执行部分的（因为poll队列可能较长，上一轮中执行时间超过了一次轮询的最大时间，会将未执行的部分放到这里来执行）
// idle，prepare 仅系统内部使用：
// ------- poll 轮询 -----------
// 检测新的 i/o 事件，执行与 i/o 相关的回调
// node中基本上所有的异步 api 的回调都会在这个阶段来处理
// ------- check 检测 -----------
// setImmediate 的回调函数在这里执行
// close callbacks ：一些关闭的函数回调，例如 socket.on('close')

// 默认是从上到下依次执行，依次清空每个队列中的回调方法，
// timers/poll/check 中的都是宏任务，每调用一个宏任务，就会清空微任务（老版本node中是在清空一个队列后才会清空一次微任务）
// 主栈 -> 检测时间有没有到达的定时，有就执行（清空任务） -> 下一个阶段poll（i/o操作）逐一清空（看 setImmediate队列中是否有内容，如果有内容则清空check阶段，如果没有就在这里阻塞） -> 不停的

setTimeout(() => {
  console.log('timeout')
}, 0);
Promise.resolve().then(data => {
  console.log('then')
})
process.nextTick(() => {
  console.log('nextTick')
})
setImmediate(() => {
  console.log('setImmediate')
})

// --------- setImmediate 和 setTimeout 对比 ------------

