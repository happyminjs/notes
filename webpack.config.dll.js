/**
 * 多入口文件配置
 * 应用glob查找路径，配置多个入口
 */

const path = require('path')
const webpack = require('webpack');

// 入口 entry end 
module.exports = function(options) {
  let env = Object.prototype.toString.call(options.env) == '[object Object]' ? Object.keys(options.env)[0] : 'production';
  console.log('options: ', env);
  return {
    mode: env,
    entry: {
      // dll: ['vue','vue-lazyload']
      dll: ['vue']
    },
    output: {
      path: path.join(__dirname, './build/dll'),
      filename: '[name].js',
      library: '[name]',
    },
    plugins: [
      new webpack.DllPlugin({
        path:path.join(__dirname,'./build','dll','manifest.json'), // manifest json 文件的绝对路径 (输出文件)
        name: '[name]', // 暴露出的 DLL 的函数名 (TemplatePaths: [hash] & [name] )
        context: path.resolve(__dirname), // manifest 文件中请求的上下文(context)(默认值为 webpack 的上下文(context))
      })
    ]
  }
}
