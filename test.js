class Iterator {
  constructor () {
    this.middleware = [];
  }
  use (fn) {
    this.middleware.push(fn)
    return this
  }
  async run () {
    function createNext(middleware, oldNext) {
      return async () => {
        await middleware(oldNext)
      }
    }
    let len = this.middleware.length
    let next = async () => {
      return Promise.resolve()
    }
    for (let i = len - 1; i >= 0; i--) {
      let currentMiddleware = this.middleware[i]
      next = createNext(currentMiddleware, next)
    }
    await next()
  }
}

let app = new Iterator()
app.use(async (next) => {
  console.log('start aa')
  setTimeout(async () => {
    console.log('end aa')
    await next()
  }, 1000)
})
app.use(async (next) => {
  console.log('start bb')
  setTimeout(async () => {
    console.log('end bb')
    await next()
  }, 1000)
})
app.run();




var a = 23456563452.235
let arr = a.toString().split('.')
console.log(arr)
var str = arr[0].reduceRight((now, num, index, number) => {
  if (index % 3 == 0 && index != 0){
    return num + ',' + now
  } else {
    return num + now
  }
}, '')
console.log(str)