let less = require('less')
// 如果遇到less里包含@import，就直接处理了
less.render(myCss, { plugins: [LessPlugin]}).then(function(output){}, function(error){})

// 可以命令行
// npm install less -g
// 命令行运行  lessc lessa.less lessa.css    把lessa.less文件编译成 lessa.css文件