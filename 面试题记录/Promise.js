const { resolve } = require("path");

const RESOLVE = 'RESOLVED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';

function resolvePromise(promise2, x, resolve, reject){
  // 如果不考虑乱七八糟的，面试时可以直接说 resolve(x)，其他情况具体问了再说
  if (promise2 === x) {
    // 错误使用时， let p = new Promise((resolve, reject) => {return p})    p.then(()=>{}, (err)=>{console.log(err)  此处的 error 报这个错误})
    return reject(new TypeError('chaining cycle detected for promise #<Promise>'))
  }
  if((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try{ 
      let then = x.then
      if (typeof then === 'function') {
        // x 是 function，则 then 应该是一个 promise，
        then.call(x, y => { // 根据 promise 的状态决定是成功还是失败
          resolve(y)
        }, e => {
          reject(e)
        })  // 不要写成 x.then()，因为 x.then 会再次取值
      } else {
        // x 是个对象，也直接返回
        resolve(x)
      }
    } catch (err) {
      // 如果外部有人定义了promise，为了防止出错
      reject(err)
    }
  } else { // x 是常量，则直接返回 resolve
    resolve(x)
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []  // 成功回调存放数组
    this.onRejectedCallbacks = []  // 失败回调存放数组
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVE
        this.onResolvedCallbacks.forEach(fn => fn(this.value))
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn(this.reason))
      }
    }
    try {
      executor(resolve, reject)
    } catch(e) {
      console.log('inner error', e)
      reject(e)
    }
  }
  then(onFufilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {  
      // 为了可以链式调用 then，所以需要返回一个新的 promise, 
      // 为了可以在 promise2 中取到 resolve 和 reject，可以直接将 promise2 把回调处理放到 new promise 内，因为 new promise 是立即执行的
      if (this.status === RESOLVE) {
        setTimeout(() => {
          try {
            let x = onFufilled(this.value)
            resolvePromise(promise2, x, resolve, reject) // 为了能在这里取到 promise2 这个实例，所以要放到 setTimeout 中
          } catch(e) { // 因为加了 setTimeout，在 constructor 中的 catch 就不能捕获到异常了，所以要在这里自己添加一个 catch 捕获异常
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject) // 为了能在这里取到 promise2 这个实例，所以要放到 setTimeout 中
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        // 发布订阅模式，在 pending 状态时，将成功的回调和失败的回调存放起来，稍后调用resolve和reject的时候重新执行
        this.onResolvedCallbacks.push(() => {
          // 注意不要直接存放 onFufilled，要放到箭头函数包起来，这样可以在箭头函数中进行一些操作，即 AOP 思想，来处理一些特殊的处理（下边的 promise 链式调用规则）
          setTimeout(() => {
            try {
              let x = onFufilled(this.value)
              resolvePromise(promise2, x, resolve, reject) // 为了能在这里取到 promise2 这个实例，所以要放到 setTimeout 中
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject) // 为了能在这里取到 promise2 这个实例，所以要放到 setTimeout 中
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2; // 为了可以链式调用 then，所以需要返回一个新的 promise
  }
}

let promise1 = new Promise((resolve, reject) => {
  // resolve(111)
  setTimeout(() => {
    resolve('success 1')
  }, 1000)
})
let p2 = promise1.then(res => {
  console.log(res)
  // return 123
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 1000)
  })
},(err) => {

})
p2.then(res => {
  console.log('promise222', res)
},(err) => {

})

// ------------------ promise 链式调用规则 ------------------ 
// 如果 return 的是普通值，则传递到下一个 then 的成功中； 
// 如果 return 的是 error 的话，则下一个 then 会走 reject，将 error 传递； 
// 如果 return 的还是一个 promise， 则下一个 then 采用返回的 promise 的状态

//  ------------------ promise 错误处理 ------------------ 
// 如果离自己最近的 then 没有错误处理，则会继续向下找

//  ------------------ 问题一： promise 是怎么解决回调问题的 ------------------ 
// 主要是 then 方法的实现，在then 方法中应用了观察者模式，会判断status状态，在是 pending 状态时，会将 callback 存放到数组中，等用户异步操作成功后调用了 resolve 或者 reject 方法，才会遍历 callbackFnArr，执行回调方法
//  ------------------ 问题二： promise 的链式调用 ------------------ 
// 每次执行完 promise.then 后，返回的都是一个 “ 新的 promise （promise一旦成功或者失败，就不可以修改状态）”

