const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// 读取 .env 这个文件，把里边配置的 key value 写入到 process.env 对象里
require('dotenv').config({
  path: '.env',
});

console.log('dotenv dotenv', process.env.NODE_ENV, process.env.test_ip);

module.exports = (env, args) => {
  console.log(env); // env.production = true
  console.log(args); // { env }
  return {
    mode: env.production ? 'production' : 'development',
    devtool: false,
    // optimize: [
    //   // env.production ? '启用压缩' : '不启用压缩'
    // ],
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // 输出目录
      filename: 'index.js', // 文件名
      publicPath: './', // 打包生成的 index.html 文件里边引用资源的前缀，如果放cdn时用，可写域名、路径等，默认是 空字符串
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
          test: /\.js$/,
          loader: 'eslint-loader',
          enforce: 'pre', // 给loader进行分类 pre -> normal -> inline -> post
          options: {
            fix: true, // 发现如果不合法的会自动修复
          },
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [ // 预设
              '@babel/preset-env', // ES6 转成 ES5
              '@babel/preset-react', // react 转成 ES5
            ],
            plugins: [ // 插件
              ['@babel/plugin-proposal-decorators', { legacy: true }], // 把类和对象装饰器编译成ES5
              ['@babel/plugin-proposal-class-properties', { loose: true }], // 转换静态类属性以及使用属性初始值化语法声明的属性
            ],
          },
        },
        {
          test: /\.txt$/,
          use: 'raw-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader', // 将css注入到js中，
            {
              loader: 'css-loader', // 对 @import url() 进行处理
              options: {
                importLoaders: 1, // 在处理引入别的css文件，要先把别的css文件经过几个loader处理后的结果合并到当前文件中；
                // 默认是0，则是 index.css 中引入的 a.css，是直接原文件引入的，a.css 文件不是经过后边 postcss-loader 处理后的样式；
                // 设置的值是几，就表示用几个后边的loader处理
              },
            },
            'postcss-loader', // css 预处理器，加浏览器兼容前缀
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader', // 将css注入到js中，
            {
              // less-loader 和 scss-loader 中已经对 @import 语句进行处理，所以 importLoaders 参数可以忽略，默认0也没有关系
              // 但是 url 还是需要 css-loader 来处理，所以不可以去掉此loader
              loader: 'css-loader', // 对 @import url() 进行处理
              options: {
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'less-loader', // 把less编译成css
          ],
        },
        {
          test: /\.sass$/,
          use: [
            'style-loader', // 将css注入到js中，
            {
              loader: 'css-loader', // 对 @import url() 进行处理
              options: {
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'sass-loader', // 把sass编译成css
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader', // 图片以 limit 为届，是否 base64 放入页面中
              options: {
                esModule: false,
                name: '[hash:10].[ext]', // hash值取前10位，ext是原本的扩展名
                limit: 8 * 1024, // 以8K为分界线
              },
            },
            {
              loader: 'file-loader', // 引入图片路径问题
              options: {
                esModule: false,
                name: '[hash:10].[ext]', // hash值取前10位，ext是原本的扩展名
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.DefinePlugin({
        // 本质是在编译时字符串的替换，不会定义变量
        // 记住一定要 stringify，否则会替换为变量的形式，导致页面报错未定义
        'process.env.NODE_ENV': JSON.stringify('development'),
        NODE_ENV: JSON.stringify('development'),
      }),
    ],
  };
};
