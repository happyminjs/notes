

let a = require('./a')
console.log(a)

// let a = require('./a') 等价于下边
// let a = (function(exports, module, require, __direname, filename){
//   var a = 100
//   module.exports = 'aaaaa'
//   return module.exports
// })

// node 中的代码调试
// 1、直接 vscode,    左侧小红点断点，然后 create launch.json,run->start debugging
// 2、Chrome  1、node --inspect-brk b.js， 2、谷歌浏览器打开 chrome://inspect/#devices，remote target中点击 inspect 即可开始调试了
// 3、命令行中调试，很少用