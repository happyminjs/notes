
#### babel的作用
* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性
* 源码转换 (codemods)
#### babel的工作原理
> Code => AST => new AST => new Code
* Parser：解析我们的代码转换为 AST。(@babel/parser)
* Transformer：利用我们配置好的 plugins/presets 把 Parser 生成的 AST 转变为新的 AST。(@babel/preset-*)
* Generator：把转换后的 AST 生成新的代码(@babel/generator)
#### 使用
* 安装依赖
  ```bash
  npm install --save-dev @babel/core @babel/preset-env babel-loader
  npm install --save @babel/polyfill
  ```
* 创建 .babelrc 配置文件
  ```js
  {
    "presets": [
      ["@babel/preset-env", {
        "modules": "commonjs",
        "useBuiltIns": "usage", // preset-env如何处理 polyfill
        // false: 则是不做polyfill操作，要做的话，需要在 entry 单独引入
        // usage: 根据 corejs 自动按需加载处理 polyfill
        // entry: 根据配置的 browserslist 加载处理，具体看下文
        "corejs": "3.8.2",  // @babel/core 的版本号
      }],
    ],
    "plugins": [
      // ["@babel/plugin-transform-modules-commonjs", {
      //   "allowTopLevelThis": true
      // }],
      // "@babel/plugin-transform-runtime",
      // "@babel/plugin-proposal-class-properties"
    ]
  }
  ```
  * useBuiltIns 取值 false / usage / entry
    * false : 此值为false时，若扔想要 polyfill ，可在 webpack.config 的 entry 配置
      ```js
      module.exports = {
        entry: ['@babel/polyfill','./src/main.js']
      }
      ```
    * usage : 按需自动处理polyfill。使用时需指定corejs版本号，此方法会在全局添加新的方法，会污染全变量
    * entry
    根据配置的 browserslist 加载处理，使用时需指定corejs版本号，并在js**入口文件添加 import '@babel/polyfill'**，如果corejs是3.x版本的， 则 import '@babel/polyfill' 需要改成
      ```js
      import 'core-js/stable';
      import 'regenerator-runtime/runtime';
      ```
  * browserslist 配置位置
    * 独立的 browserslist.config.js 文件 或者 .browserslistrc 文件
    * package.json 中的 browserslist 项
    * 运行环境变量 BROWSERSLIST
    * 默认值是： > 0.5%, last 2 versions, Firefox ESR, not dead
#### 插件包
* @babel/core ： babel核心模块，必须要有
* @babel/preset-env ：  babel预设，将高级语法转为低级语法的预设
* @babel/polyfill ： babel只负责语法转换，比如将ES6的语法转换成ES5。但有些对象、方法，浏览器本身不支持，就需要 polyfill 来转换。
* babel-loader ： webpack 文件预处理器，在webpack.config 中的loader配置使用
* 
* ========== 上边是必须要有的，下边只是解说的 ==========
* 
* @babel/cli ： Babel带有内置CLI，可用于从命令行编译文件。
* @babel/parser ： 将源代码解析成 AST ，方便各个插件分析语法进行相应的处理
* @babel/generator ： 将修正后的AST解码生成js代码

---------------
* 注意：useBuiltIns: usage 时
  * babel-polyfill 此依赖用于开发应用，会在全局添加新的方法，会污染全变量。
  * 在入口文件index.js的顶部添加 import "@babel/polyfill"
  * 在webpcak.config.js中将 babel-polyfill 添加到 entry 数组中
// 7、第5、6步的polyfill改为这两个依赖。它们在局部添加新方法，不污染全局变量
npm install --save-dev @babel/runtime @babel/plugin-transform-runtime
// 8、.babelrc文件
{
  "presets": ["env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
https://www.cnblogs.com/qinyuandong/p/13649871.html