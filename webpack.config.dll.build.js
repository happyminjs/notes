/**
 * 多入口文件配置
 * 应用glob查找路径，配置多个入口
 */

const path = require('path')
const webpack = require('webpack')
const manifestObj = require('./build/dll/manifest.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

console.log('manifestObj: ', manifestObj);
let pluginConfg = [
  new VueLoaderPlugin(),
  new webpack.DllReferencePlugin({
    context: path.resolve(__dirname),
    manifest: manifestObj
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  
]; // plugin Arr

// 入口 entry and plugin start
let entryArr = glob.sync('src/pages/*');
let entryObj = {}
for(let key = 0, klen = entryArr.length; key < klen; key++) {
  let keyStr = entryArr[key].replace(/src\/pages\//, '') + '/index'; // page/index
  entryObj[keyStr] = path.resolve(__dirname, entryArr[key]);
  pluginConfg.push(new HtmlWebpackPlugin({
    filename: keyStr + '.html',
    chunks: [keyStr, 'dll/dll', 'vendor'], 
    inject: true,
    // <%= htmlWebpackPlugin.options.title %> 在html中以这种方式获取title值
    title: 'tesssd title',
    template: path.resolve(__dirname, './src/pages/' + keyStr + '.html'),
  }))
}
console.log('entryObj: ', entryObj);

// 入口 entry end 
module.exports = function(options) {
  let env = Object.prototype.toString.call(options.env) == '[object Object]' ? Object.keys(options.env)[0] : 'production';
  console.log('options: ', env);
  let config = {
    entry: entryObj,
    stats: {
      children: false,
      entrypoints: false,
      modules: false,
      errors: true,
      errorDetails: true,
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './build'),
      publicPath: '/',
      chunkFilename: '[name].js',
      // library: ''
    },
    mode: env,
    optimization: {
      minimize: env == 'production', // 压缩js代码, 默认true
      occurrenceOrder: true,
      splitChunks: {  // 根据不同的策略来分割打包出来的bundle
        chunks: 'all', // async:分割异步打包的代码; all: 同时分割同步和异步代码
        minSize: 30000,
        minChunks: 1, // 生成的commons块最小为多少
        cacheGroups: {   // 默认的规则不会打包,需要单独定义。内部的参数可以覆盖外部的参数。
          commons: {    // 创建一个commons块，其中包括入口点之间共享的所有代码。
            name: 'vendor/vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/, // 正则匹配node_modules内的文件
            priority: -10, // 优先级
            reuseExistingChunk: false, // 是否复用存在的chunk
          },
          styles: {
            name: 'vendor/vendor',
            chunks: 'all',
            test: /\.css$/,
            enforce: true
          },
        },
        name: false,
      },
      
    },
    module: {
      rules: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel-loader" 
        },
        {
          test: /\.(css|less|s[a|c]ss)$/,
          exclude:/node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => {
                  return [
                    require('postcss-import')(),
                    require('autoprefixer')({
                      browsers: ['last 2 versions']
                    }),
                    require('postcss-adaptive')({
                      remUnit: 75,
                      autoRem: true
                    })
                  ]
                }
              }
            },
            'less-loader'
          ]
        },
        {
          test: /\.vue$/,
          exclude:/node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 100
          }
        }
      ]
    },
    plugins: pluginConfg,
    resolve: {
      // 自动解析确定的扩展
      extensions: ['.js', '.vue', '.less', '.json'],
      // 创建 import 或 require 的别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        // 'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js')
      }
    },
    devServer: {
      hot: true,
      contentBase: path.join(__dirname, "./build"),
      compress: true,
      host: '0.0.0.0',
      port: 3008,
      https: true,
      // open: true,
    }
  }
  console.log('config: ', config);
  return config;
}
