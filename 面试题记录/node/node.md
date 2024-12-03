#### setImmediate 与 setTimeout 对比
两者类似，但是基于调用的时机不同，所以有不同的表现。
* setImmediate: 设计为一旦当前轮询阶段完成，就执行脚本
* setTimeout: 在最小阀值(ms单位)过后运行脚本  

所以执行顺序会根据调用他们的上下文而异。看下边两种情况：
```js
// 主模块调用
setTimeout(() => {
    console.log('timeout')
}, 0)
setImmediate(() => {
    console.log('immediate')
})
// 此种情况下输出顺序会不确定，他会受进程性能的约束
// 有可能主进程性能好已结束，此时setTimeout未放入timers队列，则会先输出了immediate
// 若主进程结束时，setTimeout定时已到，已放入timers队列，则会先输出timeout
```
```js
// 如果两个函数都在一个 I/O 循环内调用，则 setImmediate 总是先调用
// 如下边这样，则固定先输出 immediate，后 timeout 
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout')
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
```