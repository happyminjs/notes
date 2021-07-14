let title = require('./title')
let content = require('./content.txt')
console.log(title)
console.log(content.default)
console.log(process.env.NODE_ENV)

const path = require('path')
const memoryFileSystem = require('memory-fs')
const fs = new memoryFileSystem();

fs.mkdirpSync(path.resolve('dir'))
fs.writeFileSync(path.resolve('dir/file.txt'), 'hello world', 'utf8')
const content = fs.readFileSync(path.resolve('dir/file.txt'))
console.log(content.toString())