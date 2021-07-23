let crypto = require('crypto')
let fs = require('fs')
const path = require('path')
let content = fs.readFileSync(path.resolve(__dirname, '../public/111.png'))
let hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 10)
// 生成一个 跟 public/111.png 路径相关的，16进制的 hash 字符串，然后取前 10 位
console.log('aaa', hash)