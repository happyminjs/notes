/**
 * 多入口文件配置
 * 应用glob查找路径，配置多个入口
 */

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const glob = require('glob')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let pluginConfg = [
  new VueLoaderPlugin(),
  // new ExtractTextPlugin({
  //   filename: '[name].css',
  //   allChunks: true
  // }),
  new MiniCssExtractPlugin({
    // 类似 webpackOptions.output里面的配置 可以忽略
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new OptimizeCssAssetsPlugin(),  // css 压缩
  // new BundleAnalyzerPlugin(), // webpack 文件分析插件
]; // plugin Arr

// 入口 entry and plugin start
let entryArr = glob.sync('src/pages/*');
let entryObj = {}
for(let key = 0, klen = entryArr.length; key < klen; key++) {
  let keyStr = entryArr[key].replace(/src\/pages\//, '') + '/index'; // page/index
  entryObj[keyStr] = path.resolve(__dirname, entryArr[key]);
  pluginConfg.push(new HtmlWebpackPlugin({
    filename: keyStr + '.html',
    chunks: [keyStr, 'vendor'],   // keyStr,此处值需要与 entry 的key相同的
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
  return {
    entry: entryObj,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './build'),
      publicPath: '/'
    },
    mode: env,
    optimization: {
      minimize: true, // 压缩js代码, 默认true
      // minimizer: [],    // 允许使用配置的插件来覆盖默认的minimize使用的uglifyjs-webpack-plugin ，[Plugin] 或者 [function (compiler)]
      splitChunks: {  // 根据不同的策略来分割打包出来的bundle
        chunks: 'all', // async:分割异步打包的代码; all: 同时分割同步和异步代码
        cacheGroups: {   // 默认的规则不会打包,需要单独定义。内部的参数可以覆盖外部的参数。
          commons: {    // 创建一个commons块，其中包括入口点之间共享的所有代码。
            name: 'vendor/vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/, // 正则匹配node_modules内的文件
            minChunks: 2, // 生成的commons块最小为多少
            priority: -10, // 优先级
            reuseExistingChunk: true, // 是否复用存在的chunk
          },
          styles: {
            name: 'vendor/vendor',
            chunks: 'all',
            test: /\.css$/,
            // enforce: true
          },
        },
        // minSize: 30000,
        // maxSize: 0,
        // minChunks: 1, // 最小公用模块次数，默认为1
        // maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
        // maxInitialRequests: 3, // 一个入口最大的并行请求数
        // automaticNameDelimiter: '/',  // Chunk Names 分割符，默认 ~
        // automaticNameMaxLength: 30,
        // name: true, // 分割的js名称，默认为true，返回 ${cacheGroup的key} ${automaticNameDelimiter} ${moduleName},可以自定义。
        name: 'vendor', // 分割的js名称，默认为true，返回 ${cacheGroup的key} ${automaticNameDelimiter} ${moduleName},可以自定义。
      },
      
    },
    module: {
      rules: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel-loader" 
        },
        // {
        //   test:/\.css$/,
        //   exclude:/node_modules/,
        //   use: ExtractTextPlugin.extract({
        //       fallback: 'style-loader',
        //       use: ['css-loader']
        //   })
        // },
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
        // {
        //   test: /\.(css|less|s[a|c]ss)$/,
        //   exclude:/node_modules/,
        //   use: [
        //     'vue-style-loader',
        //     'css-loader',
        //     'less-loader'
        //   ]
        // },
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
        'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js')
      }
    },
    devServer: {
      hot: true,
      contentBase: path.join(__dirname, "./build"),
      compress: true,
      host: '0.0.0.0',
      port: 3008,
      // open: true,
    }
  }
}
