const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = (env, args) => {
  console.log(env) // env.production = true
  console.log(args) // { env }
  return {
    mode: env.production ? 'production' : 'development',
    devtool: false,
    // optimize: [
    //   // env.production ? '启用压缩' : '不启用压缩'
    // ],
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // 输出目录
      filename: 'index.js',  // 文件名
      publicPath: './',  // 打包生成的 index.html 文件里边引用资源的前缀，如果放cdn时用，可写域名、路径等，默认是 空字符串
    },
    devServer: { // 通过 express 提供一个 http服务器，通过它可以访问产出的文件
      publicPath: '', // 打包生成的静态文件所在位置，默认取 output.publicPath
      contentBase: path.resolve(__dirname, './dist/'), // 配置提供额外静态文件内容的目录，默认项目根目录
      compress: false, // 是否启用压缩
      port: 8001, // 端口号
      open: true, // 是否打开浏览器提供访问
      
    },
    module: {
      rules: [ // 所有 loader 的最后输出都是js，因为输出的结果就是给 webpack 使用了
        {
          test: /\.txt$/,
          use: 'raw-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader', // 将css注入到js中，
            {
              loader: 'css-loader', // 对 @import url() 进行处理
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',  // css 预处理器，加浏览器兼容前缀
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader', // 将css注入到js中，
            {
              loader: 'css-loader', // 对 @import url() 进行处理
              options: {
                importLoaders: 1
              }
            },
            'less-loader',  // 把less编译成css
          ]
        },
        {
          test: /\.sass$/,
          use: [
            'style-loader', // 将css注入到js中，
            {
              loader: 'css-loader', // 对 @import url() 进行处理
              options: {
                importLoaders: 1
              }
            },
            'sass-loader',  // 把sass编译成css
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.DefinePlugin({ 
        // 本质是在编译时字符串的替换，不会定义变量
        // 记住一定要 stringify，否则会替换为变量的形式，导致页面报错未定义
        'process.env.NODE_ENV': JSON.stringify('development'),
        'NODE_ENV': JSON.stringify('development')
      })
    ]
  }
}