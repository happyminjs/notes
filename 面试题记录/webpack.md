### webpack打包原理
https://segmentfault.com/a/1190000016355127
https://www.jianshu.com/p/e24ed38d89fd

**两个核心原理：**
* 1、一切皆模块
```
将js、css、img、html 都视为一个模块。 ---- 原因是因为都有相应的loader进行转换
都可以用 require('myJSfile.js')，也可以require('myCSSfile.css')。
意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。
```
* 2、按需加载
```
分割代码然后生成多个“bundle”文件;
异步加载部分代码以实现按需加载
```
**编译出的代码**
1、webpack中的每个模块有一个唯一的id，是从0开始递增的
2、整个打包后的bundle.js是一个匿名函数自执行。参数则为一个数组。
3、数组的每一项都为个function，function的内容则为每个模块的内容，并按照require的顺序排列
```js
(function(modules){
  // 1、模块缓存对象
  var installedModules = {};
  // 2、webpack实现的require
  function __webpack_require__(moduleId) {
      // 3、判断是否已缓存模块
      if(installedModules[moduleId]) {
          return installedModules[moduleId].exports;
      }
      // 4、缓存模块
      var module = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
      };
      // 5、调用模块函数
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      // 6、标记模块为已加载
      module.l = true;
      // 7、返回module.exports
      return module.exports;
  }
  // 8、require第一个模块
  return __webpack_require__(__webpack_require__.s = 0);
})([
  function (module, exports, __webpack_require__) {
    /* 模块index.js的代码 */
  },
  function (module, exports, __webpack_require__) {
    /* 模块bar.js的代码 */
  }, 
  ...
])
```
> 我们说的模块在这里是一个函数
```
1、因为浏览器本身不支持模块化，那么webpack就用函数作用域来hack模块化的效果。
2、第一个参数module是当前缓存的模块，包含当前模块的信息和exports；
   第二个参数exports是module.exports的引用，这也符合commonjs的规范；
   第三个__webpack_require__ 则是require的实现。

```


**loader原理**
loader 本质上是一个函数，输入参数是一个字符串，输出参数也是一个字符串。
输出的参数会被当成是 JS 代码，从而解析成 AST，然后触发依赖解析。

**webpack流程**
1、读取文件分析模块依赖
2、对模块进行解析执行(深度遍历)
3、针对不同的模块使用相应的loader
4、编译模块，生成抽象语法树AST
5、循环遍历AST树，拼接输出js。

---------
### hash

------------
### 打包速度优化
##### 1、优化 Loader 的文件搜索范围，设置 **test & include & exclude**
test：必须满足的条件（正则表达式，不要加引号，匹配要处理的文件）
exclude：排除不处理的目录
include：要处理的文件路径或者路径数组
loader：一串“！”分隔的装载机（2.0版本以上，”-loader”不可以省略）
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // js 文件才使用 babel
        loader: 'babel-loader',
        include: [resolve('src')], // 只在 src 文件夹下查找
        exclude: /node_modules/   // 不会去查找的路径
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
        exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        exclude: /assets\/icons/,
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
// 还可以将 Babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，
// 这样可以大幅度加快打包时间
loader: 'babel-loader?cacheDirectory=true'
```
##### 2、配置 resolve.modules 和 resolve.alias, 减少文件搜索范围
  默认的配置是采用向上递归搜索的方式去寻找，但通常项目目录里只有一个 node_modules，且是在项目根目录，所以配置此项可以减少检索范围
```js
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      // ...
      'store': resolve('src/store')
    }
  }
}
```
##### 3、HappyPack： 将 Loader 的同步执行转换为并行的
受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的
```js
// 1、引入
const HappyPack = require('happypack')
const HappyTheadPool = HappyPack.ThreadPool({size: 3}) // size 为 HappyPack 处理时共享进程数
// 2、配置 config
module: {
  rules: [
    {
      test: /\.(jsx|js)$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // 把.jsx 和 .js 文件交给id为happyBabel的happypack实例
      loader: 'happypack/loader?id=happyBabel'
    },
    {
      test: /\.css$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        // 把.css文件交给id为happyCss的happypack实例
        use: ['happypack/loader?id=happyCss']
      })
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happyBabel',
    loaders: ['babel-loader?cacheDirectory=true'],
    // 开启 HappyTheadPool 个线程
    threadPool: HappyTheadPool
  }),
  new HappyPack({
    id: 'happyBabel',
    loaders: ['css-loader'],
    // 开启 HappyTheadPool 个线程
    threadPool: HappyTheadPool
  }),
  new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
  }),
]
```
##### 4、DllPlugin 和 DllReferencePlugin: 将特定的类库提前打包然后引入
减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案
```js
// 使用方法看后边的体积优化
```
##### 5、修改为使用webpack-parallel-uglify-plugin插件，它可以并行运行UglifyJS，减少构建时间。
webpack 3 中需要UglifyJS插件来压缩代码，这个是单线程的；webpack 4 中只需要将 mode 设置为 production 自动开启压缩js，由于webpack默认使用UglifyJS插件进行压缩，是单线程，速度慢。
```js
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
new ParallelUglifyPlugin({
  cacheDir: '.cache/',
  uglifyJS:{
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }
})
```
##### 5、设置 module.noParse
Webpack 将不再扫描这个文件中的依赖，比如jQuery、zepto等类库
```js
// 下边两种方式都可以
module: {
  noParse: /node_modules\/(element-ui\.js)/,
  noParse: function (content) {
    return /Zepto|zepto|jQuery|WBAPP/.test(content);
  }
}
```

----------
### 体积优化
##### 1、配置 optimization.splitChunks 对第三方代码库或者公用代码进行拆分打包
##### 2、使用 DllPlugin 和 DllReferencePlugin 抽离打包固定公用包，如 vue等
```js
const path = require('path')
const webpack = require('webpack')
// 1、先执行生成dll命令，需要引入下边 plugins，会生成要打的包和
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['vue']
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
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
// 2、在打包命配置文件添加 plugins 
const manifestObj = require('../build/dll/manifest.json');
new webpack.DllReferencePlugin({
  context: path.resolve(__dirname), // 要与 DllPlugin 的context保持一致
  manifest: manifestObj  // 第一步中生成的manifest.json文件
});
```
##### 3、按需加载 
将每个路由页面单独打包为一个文件。当然不仅仅路由可以按需加载，对于 loadash 这种大型类库同样可以使用这个功能。 
**底层的机制**当使用的时候再去下载对应文件，返回一个 Promise，当 Promise 成功以后去执行回调。
```js	
const Foo = () => import('./Foo.vue')
```
##### 4、Scope Hoisting
分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去
```js
// webpack 4 
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```
##### 5、Tree Shaking: 删除项目中未被引用的代码
```js
// webpack 4 中只需要将 mode 设置为 production
```

-----------
### 命令解读
* --mode: 取值： development、production

### webpack常用插件
#### glob
查找符合特定规则的文件路径名，一般用于多页面多入口时匹配路径
```js
const glob = require('glob')
let entryArr = glob.sync('src/pages/*');
/**
 *  获取到 src/pages/ 目录下一级的所有目录的数组  
 * 对应此项目结构返回下边的数据  
 * [ 'src/pages/index', 'src/pages/test2' ]
*/
let entryObj = {}
for(let key = 0, klen = entryArr.length; key < klen; key++) {
  let keyStr = entryArr[key].replace(/src\/pages\//, '');
  entryObj[keyStr] = path.resolve(__dirname, entryArr[key]);
}
/**
 * entryObj 就是entry 的参数值
 * {
 *    index: '/Users/minyang/document/private/notes/src/pages/index',
 *    test2: '/Users/minyang/document/private/notes/src/pages/test2'
 * }
*/
```
--------------
#### extract-text-webpack-plugin
将js中import的css/less/scss等，单独打包一个css文件，在 module.rules中配置use参数调用，另外配置plugins。
如果不配置则会打包到引入css的js文件中。
```js
module: {
  rules: [
    {
      test:/\.css$/,
      exclude:/node_modules/,
      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
      })
    }
  ]
},
plugins: [
  new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
  })
]
```
---------
#### mini-css-extract-plugin
**只能用在webpack4中** 。 目前缺失功能----HMR。
将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap。
与上一个插件 extract-text-webpack-plugin 相比：
* 异步加载
* 不重复编译，性能更好
* 更容易使用
* 只针对CSS
-----------
#### html-webpack-plugin
生成一个HTML5文件，该文件的 body 中使用 script 和 link 引用了编译后文件。（link 需要是使用了extract-text-webpack-plugin插件提出css后才会有的）;如果多页面的时候，需要和entry一样push多个。一般下边这样配置：
```js
let pluginConfg = [];
let entryArr = glob.sync('src/pages/*');
let entryObj = {}
for(let key = 0, klen = entryArr.length; key < klen; key++) {
  let keyStr = entryArr[key].replace(/src\/pages\//, '') + '/index'; // page/index
  entryObj[keyStr] = path.resolve(__dirname, entryArr[key]);
  pluginConfg.push(new HtmlWebpackPlugin({
    filename: keyStr + '.html',
    chunks: [keyStr],
    inject: true,
    template: path.resolve(__dirname, './src/pages/' + keyStr + '.html'),
  }))
}
```
常用参数解释： 
**title:** 生成html文件的标题
**filename:** 输出的html的文件名称
**template:** html模板所在的文件路径
>> 如果所有页面都用同一个HTML模板的话，可以都写成一个固定路径
**inject:** js的注入选项。有四个选项值 true, body, head, false.
* true：默认值，script标签位于html文件的 body 底部
* body：script标签位于html文件的 body 底部（同 true）
* head：script 标签位于 head 标签内
* false：不插入生成的 js 文件，只是单纯的生成一个 html 文件

**favicon:** 给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名
**chunks：** 主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么 chunks 就能选择你要使用那些js文件。如果没有指定 chunks 选项，默认会全部引用。 看下例： 
```js
entry: {
    index: path.resolve(__dirname, './src/index.js'),
    devor: path.resolve(__dirname, './src/devor.js'),
    main: path.resolve(__dirname, './src/main.js')
}
plugins: [
    new httpWebpackPlugin({
        chunks: ['index','main']
    })
]
```
编译后： 
```js
<script type=text/javascript src="index.js"></script>
<script type=text/javascript src="main.js"></script>
```
**minify：** 是否对 html 文件进行压缩，默认false
**hash：** 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 
**cache：** 内容变化的时候生成一个新的文件，默认true

------------
#### clean-webpack-plugin
在每次生成dist目录前，先删除本地的dist文件
```js
// 1、安装  clean-webpack-plugin
npm install -D clean-webpack-plugin
// 2、配置config
const cleanWebpackPlugin=require('clean-webpack-plugin');
plugins:[
  new CleanWebpackPlugin(['build']), //传入数组,指定要删除的目录
]
```
-----
### js需要插件
#### es6
* **babel-loader:** 在import或加载模块时，对es6代码进行预处理，es6语法转化为es5语法
* **babel-core:** 允许我们调用babel的api，可以将js代码分析成ast（抽象语法树），方便各个插件分析语法进行相应的处理.
* **babel-preset-env:** 指定规范，比如es2015，es2016，es2017，latest，env（包含前面全部）
* **babel-polyfill:** 它效仿一个完整的ES2015+环境，使得我们能够使用新的内置对象比如 Promise，静态方法比如Array.from 或者 Object.assign, 实例方法比如 Array.prototype.includes 和生成器函数（提供给你使用 regenerator 插件）。为了达到这一点， polyfill 添加到了全局范围，就像原生类型比如 String 一样。
* **babel-runtime 和 babel-plugin-transform-runtime:** 与babel-polyfill作用一样，使用场景不一样。
>@babel开头是新版本的名字，请用新版本babel
```js
// 1、安装babel-loader和babel-core
npm install -D babel-loader @babel/core
// 2、配置 webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader"
    }
  ]
}
// 3、安装babel-preset-env
npm install @babel/preset-env -D
// 4、新建 .babelrc 文件
{
  "presets": ["@babel/preset-env"]
}
// 5、安装babel-polyfill
npm install -D @babel/polyfill
// 此依赖用于开发应用，会在全局添加新的方法，会污染全变量。
// 在入口文件index.js的顶部添加
import "@babel/polyfill"
// 6、在webpcak.config.js中将babel-polyfill添加到entry数组中
// 7、第5、6步的polyfill改为这两个依赖。它们在局部添加新方法，不污染全局变量
npm install --save-dev @babel/runtime @babel/plugin-transform-runtime
// 8、.babelrc文件
{
  "presets": ["env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```
----------
#### vue 
```js
// 1、安装插件 vue vue-loader vue-template-compiler vue-style-loader
```
* **vue-loader:** 解析和转换 .vue 文件。提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
webpackConfig= {
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude:/node_modules/,
        loader: 'vue-loader'
      }
    ]
  }
}
```
* **vue-template-compiler:** 把 vue-loader 提取出的 HTML 模版编译成对应的可执行的 JavaScript 代码，vue-loader 需要此插件，不需要我们手动配置，只需要下载即可
* **vue-style-loader:** 处理vue文件中的style标签
```js
webpackConfig= {
  module: {
    rules: [
      {
        test: /\.(css|less|s[a|c]ss)$/,
        exclude:/node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```
如果需要提取css文件，则将 vue-style-loader 修改为 MiniCssExtractPlugin.loader

------------
### 样式需要插件
#### css-loader
处理css文件中的 @import 和 url(...)  
#### style-loader
将css-loader的输出生成js中的函数调用将css动态添加到html文件中。
```js
// 1、配置webpack.config.js
// 使webpack可以将css文件当做module对待（即可以进行import操作）
// 以及使用css-loader和style-loader对css文件进行处理
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude:/node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
// 2、在index.js文件中直接import main.css
import './main.css'
//  
```
#### less-loader + less
```js
// 1、需要安装 style-loader css-loader less-loader less
npm install -D style-loader css-loader less-loader less
// 2、配置 module.rules 
// MiniCssExtractPlugin 是从js中提取css文件
module: {
  rules: [
    {
      test: /\.less$/,
      exclude:/node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }
  ]
},
plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  })
]
```
-------
#### sass-loader + node-sass
```js
// 1、需要安装 style-loader css-loader sass-loader node-sass
npm install -D style-loader css-loader sass-loader node-sass
// 2、配置 module.rules 
```
-----------  
#### optimize-css-assets-webpack-plugin
压缩css代码，webpack4在product时，默认压缩了js，但是css没有压缩，需要此插件来可以
```js
// 1、安装插件
npm install -D optimize-css-assets-webpack-plugin
// 2、配置config
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
config = {
  plugins: [
    new OptimizeCssAssetsPlugin()
  ],
  mode: 'production'
}
```
> 需要结合mode：production 时才管用

----------
#### postcss
主要功能只有两个：
* 把 CSS 解析成 JavaScript 可以操作的 AST
* 调用插件来处理 AST 并得到结果

一般postcss要与相应的插件一起使用
**autoprefixer ：** 自动补全css前缀的东西
**postcss-import ：** 处理css中的@import
**postcss-adaptive ：** 生成自适应的css代码，比如rem和0.5px，需要在在样式前添加js，手动设置html的font-size
```js
// 需要在在样式前设置HTML的font-size
(function (win, doc) {
  var docEl = doc.documentElement;
  function setRemUnit () {
    var docWidth = docEl.clientWidth;
    var rem = docWidth / 7.5;
    docEl.style.fontSize = rem + 'px';
  }
  win.addEventListener('resize', function () {
    setRemUnit();
  }, false);
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  }, false);
  setRemUnit();
// 设置1px 的border
  if (win.devicePixelRatio && win.devicePixelRatio >= 2) {
    var testEl = doc.createElement('div');
    var fakeBody = doc.createElement('body');
    testEl.style.border = '0.5px solid transparent';
    fakeBody.appendChild(testEl);
    docEl.appendChild(fakeBody);
    if (testEl.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
```
**postcss-url ：** url()上重设基础、内联或复制。
**postcss-preset-env ：** 将现代CSS转换为大多数浏览器都能理解的内容
**postcss-loader：** 对.css 文件进行处理，一般添加在 style-loader 和 css-loader 之后，其他预处理装载机例如 sass、less 之前。
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less|s[a|c]ss)$/,
        use: [
          'style-loader', // 如果需要单独提取css，则改为 MiniCssExtractPlugin.loader
          'postcss-loader', // 可用配置项看下文
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
}
```
常用配置项 options：
| Name | Type | Default | Description |
| -- | -- | -- | -- | 
| exec | Boolean | undefined | 在CSS-in-JS中启用PostCSS Parser支持 |
| parser(解析器) | String/Object | undefined | 设置PostCSS Parser |
| syntax(语法) | String/Object | undefined | 设置PostCSS语法 |
| stringifier | String/Object | undefined | 设置PostCSS Stringifier |
| config | Object | undefined | 设置postcss.config.js配置路径&& ctx |
| plugins | Array/Function | [] | 设置PostCSS插件 |
| ident | String | undefined | 当plugins使用{Function}/require(复杂选项)时，此项必须添加，可自己定义，需是唯一的。建议：ident: 'postcss' |
| sourceMap | String/Boolean | false | 启用sourceMap |
**使用postcss插件**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less|s[a|c]ss)$/,
        use: [
          'style-loader',
          {
            loader: 'postcss-loader',
            config: {
              // 如果使用了配置文件，则需要配置postcss.config.js 的路径
              path: './postcss.config.js', 
              ctx: {}
            },
            options: {
              ident: 'postcss',
              plugins: (loader) => {
                return [
                  require('postcss-import')(),
                  require('autoprefixer')({
                    browsers: ['last 2 versions']
                  }),
                  require('postcss-adaptive')({
                    remUnit: 100,
                    autoRem: true, 
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```
postcss.config.js 格式，如果在webpack.config.js中配置了options，则不需要配置此文件
```js
module.exports = ({ file, options, env }) => {
  // return 的即是 postcss-loader 的 options 的配置。
  return ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
      'postcss-import': { root: file.dirname },
      'postcss-cssnext': options.cssnext ? options.cssnext : false,
      'autoprefixer': env == 'production' ? options.autoprefixer : false,
      'cssnano': env === 'production' ? options.cssnano : false
    }
  })
}
```
>在没有与css-loader一起使用时，最好不要在css中使用@import，否则会生成很大的包

---------
### 处理图片
可处理的图片包括： css背景图片、img元素指向的网络图片、使用es6的import引入的图片
**url-loader**可以将图片转为base64字符串
**file-loader**可以加载任何文件
故一般设置 url-loader 的limit选项，当超过多少字节时，使用file-loader加载图片
```js
// 1、下载 url-loader file-loader
npm install -D url-loader file-loader
// 2、config配置
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }
  ]
}
```
**imagemin-pngquant** 可以压缩png图片
```js
{
  test: /\.(png|jpg|jpeg|gif)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        name: "[name]-[hash:5].min.[ext]",
        limit: 1000, // size <= 1KB
        publicPath: "static/",
        outputPath: "static/"
      }
    },
    // img-loader for zip img
    {
      loader: "img-loader",
      options: {
        plugins: [
          require("imagemin-pngquant")({
            quality: "80" // the quality of zip
          })
        ]
      }
    }
  ]
}
```

--------

### 分析
#### webpack-bundle-analyzer
```js
// 1、安装
npm install --save-dev webpack-bundle-analyzer
// 2、配置
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
 }
// 3、添加命令
"analyz": "NODE_ENV=production npm_config_report=true npm run build"
```

-----





