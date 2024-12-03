// 使用看 webpack.config.js 中
// 作用：读取某个文件，把里边配置的 key value 写入到 process.env 对象里
let dotenv = require('dotenv')
const path = require('path/posix')
dotenv.config({
  path: path.resolve('../.env')
})

// dotenv.config 的实现
// 就是读取文件，然后按 换行符分隔，按等号分 key value
function config({path}) {
  let content = fs.readFileSync(path, 'utf8')
  content.split('\n').forEach(line => {
    let [key, value] = line.split('=')
    process.env[key] = value
  })
}