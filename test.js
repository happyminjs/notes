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