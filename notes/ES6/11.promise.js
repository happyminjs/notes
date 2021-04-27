// Promise es6 的
// generator async await  都需要学 Promise

// koa --- generator --> async/await
// axios redux-saga  --- promise
// fetch ---  promise

// promise 是一种异步流程的控制手段
// 1、回调地狱，代码难以维护， 第一个的输出是后边的输入  --- Promise 可以链式调用
// 2、Promise 可以支持多个并发请求
// 3、Promise 可以解决异步的问题，但不能说 Promise 本身是异步，但是 then 方法是异步的 

// Promise 关键字
// 如果一旦 Promise 成功了就不能失败，相反也是一样的
// 只有 pending 状态才可以改变状态
// 每个 Promise 的实例上都有一个 then 方法，then 方法有两个参数，一个是成功函数，一个是失败函数
// promise 中发生错误 就会执行失败态
// Promise 中可实现不再传递回调函数

// 事件环
// Promise 只有一个参数 叫 executor 执行器，  默认 new 时就会调用了，即 executor 执行器是同步执行的
// 如果返回的是 Promise，则会取这个Promise的结果，如果成功会走外层的Promise的下一个then的成功，将数据传递到成功里
// Promise 实现链式调用，返回的不是 this，而是一个新的Promise
// 如果返回的是一个普通值，则会走到写一个then中的成功回调
// 如果有错误产生，则会走失败的回调
// let p = new Promise((resolve, reject) => {
//   resolve('success');
// })
// p.then(res => {  // res 成功的原因
//   console.log(res);
// }, (err) => {
//   console.log(err);s
// })
// p.then(res => { 
//   console.log(res);
// }, (err) => {
//   console.log(err);s
// })
// 一个Promise实例可以 then 多次


class Promises {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    let resolve = value => {
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = value
      }
    }
    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (onFulfilled, onRejected) {
    if (this.status === 'resolved') {
      onFulfilled(this.value)
    }
    if (this.status === 'rejected') {
      onRejected(this.reason)
    }
  }
}

let p = new Promises((resolve, reject) => {
  resolve('success s ');
})
p.then(res => {  // res 成功的原因
  console.log(res);
}, (err) => {
  console.log(err);s
})