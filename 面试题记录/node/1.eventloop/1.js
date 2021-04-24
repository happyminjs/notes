// js 特点： 单线程 只能在同一时间内做一件事

// 宏任务(一般宿主环境提供的，例如 script 标签)： js渲染，ui渲染，script，ajax，事件， setTimeout, setInterval, requestFrameAnimation, setImmediate（ie下的方法）,MessageChannel，I/O，UI rending
// 微任务(一般语言本身的)： Promise.then， MutationObserve(监听dom树变化)， queueMicroTask(可以理解为 Promise的then方法)， process.nextTick
// 宏任务先执行，因为 script 默认是一个宏任务 
// 之后的执行过程都是先清空微任务，再来执行宏任务

setTimeout(() => {
  console.log('time1') // 3
  Promise.resolve().then(data => {
    console.log('success3')  //4
  })
}, 0);
Promise.resolve().then(data => {
  console.log('success1')  // 1
  setTimeout(() => {
    console.log('time2') // 5
  }, 0);
})
Promise.resolve().then(data => {
  console.log('success2') // 2
})

// success1 success2 time1 success3 time2
// 先执行主栈代码，执行后，清空一轮微任务队列，执行宏任务队列中的一个，执行完后会再次清空微任务，清空后再执行下一个宏任务


// --------  Vue.nextTick  -------------
// vue 的 dom 渲染都是异步的，下边是 Vue.nextTick 的判断执行顺序
// 1、Promise，则在 Promise.then 中渲染 （微任务）
// 2、非 ie 时， MutationObserve 方法 （微任务）
// 3、则是 ie， setImmediate 方法 （宏任务）
// 4、以上都不兼容的时候，则是 setTimeout  （宏任务）
// 原生的 dom 渲染是同步的，vue 中把dom渲染变成了异步的，nextTick 会放到异步渲染之后







