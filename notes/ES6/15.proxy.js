// 
let obj = {
  xxx: 'xxxxx'
}
let proxy = new Proxy(obj, {
  get(target, propKey, receiver){ // proxy.xxx  => xxxxx

  },
  set(target, propKey, value, receiver){ // proxy.xxx = 100 触发

  },
  has(target, key){ // ’xxx' in proxy 时触发

  },
  apply(){ // obj 是function 时， proxy() 执行的时候触发 

  }, 
  ownKeys(target){ // Object.getOwnPropertyNames 和 Object.getOwnPropertySymbols 时

  },
  deleteProperty(target, propKey){ // delete proxy[xxx]
    
  }
})