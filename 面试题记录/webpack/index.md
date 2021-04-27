#### 版本控制怎么做的
https://segmentfault.com/a/1190000015841186
因为是 PHP 模板 和 node 模板，而js文件是放到前端服务cdn上的，
所以没有用 webpack 版本控制，而是在部署服务器的时候做的版本控制。
部署服务器的时候对webpack打包后的文件按一定的规则生成一个新的版本号，然后这个版本号存储起来。
PHP或者node模板加载js、css文件的时候，动态的获取一下这个版本号，然后在渲染到模板上，引用对应版本的文件

#### webpack 常见面试题 
https://www.cnblogs.com/chengxs/p/11022842.html 
内有各模块大概介绍，应用，以及有 loader plugin 编写方式，热更新如何做到的，如何优化

#### webpack 热更新HMR过程
https://www.jianshu.com/p/95f5f51e6fc7

#### bundle 和 chunk 、module 
其实就是同一份逻辑代码在不同转换场景下的取了三个名字，可以参照下边的图片理解：   
* **module**: 就是我们写出来的代码。   
  无论是什么 commonJs 还是 ESModule，他们都是一个 module   
* **chunk**: webpack 处理时是叫 chunk。   
  当 module 源文件在webpack打包时，会根据文件引用关系生成 chunk 文件，webpack对这个chunk文件进行一些操作。   
* **bundle**: 最后生成的直接在浏览器中运行的代码。   
  webpack 处理好chunk后，最终输出bundle文件，这个文件包括了经过加载和编译的最终源文件。  
<img src="../../imgs/webpack/bundle_chunk.png" width=500>
> 一般一个chunk对应一个bundle，比如上图中的 utils.js -> chunks1 -> utils.bundle.js;
> 但是也有例外，比如上图中的，用 MiniCssExtractPlugin 从 chunk0 中抽离出了 index.bundle.css

#### webpack 打包过程
* 1、读取文件分析模块依赖
* 2、对模块进行解析执行(深度遍历)
* 3、针对不同的模块使用相应的loader
* 4、编译模块，生成抽象语法树AST
* 5、循环遍历AST树，拼接输出js。
#### loader
loader 是文件加载器，能够加载资源文件，并解析js 和 非js文件，并进行一些处理。如 编译、压缩等，让webpack有加载和解析非js文件的能力。     
* 处理一个文件可以使用多个loader，配置顺序与执行顺序是相反的
* 第一个执行的 loader 接收源文件内容为参数，后边的以上一个执行的loader返回值作为参数，最后执行的loader返回此模块的js代码
```
是个转换器，将A文件进行编译形成B文件，操作的是文件，
比如a.less转换为a.css，单纯的文件转换过程  
```
#### plugin
plugin 是个扩展器, webpack 生命周期中广播出许多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的api改变输出结果。   
```
丰富了webpack本身，针对 loader结束后，webpack打包的整个过程，
不直接操作文件，而是监听webpack打包过程中的某个节点，执行广泛的任务
```

#### bundle 版本控制

#### webpack 构建流程
* 初始化参数：从配置文件和Shell语句中读取与合并参数，得出最终参数   
* 开始编译： 用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始执行编译； 确定入口：根据配置中的entry找出所有的入口文件    
* 编译模块：从入口文件出发，调用所有配置的Loader对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；  
* 完成模块编译：在经过第 4 步使用Loader翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个Chunk转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会    
* 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统    
-------------------
#### 为什么选择webpack
常用构建工具： grunt、gulp、webpack、rollup   
*  grunt
```
// 缺点
1、配置项太多，难以维护
2、不同插件可能会有自己的扩展字段，繁琐
3、学习成本高，运用的时候需要明白各种插件的配置规则和配合方式
4、当时项目教老，甚至需要 node7 版本才可
```
*  gulp
```
是基于 nodejs 的 stream 流
1、api 较少，易于学习，适合多页面开发
2、异常处理比较麻烦
3、工作流程顺序难以精细控制 
4、不适合单页面开发，或者自定义模块开发
```
* webpack
```
优点：
1、可以模块化打包任何资源
2、适配任何模块系统
3、适合 spa 单页应用

缺点：
1、配置比较复杂
2、通过 babel 编译后的 js 代码，打包后体积较大
```
* rollup
```
优点：
1、是基于 ES6 模块设计的，利用 tree-shaking 生成更简洁，更简单的代码
2、用标准化的格式es6来写代码，减少死代码，尽可能的缩小包体积
缺点：
1、对代码拆分、静态资源、commonJs模块支持不好
```
---------------- 
#### sourceMap选择
* 开发环境使用：cheap-module-eval-source-map
* 生产环境使用：cheap-module-source-map
 
-------------------  
#### 常见 Loader 和 Plugin
|loader	| 解决问题|
| -- | -- |
|babel-loader |	把 ES6 或React转换成 ES5|
|css-loader |	加载 CSS，支持模块化、压缩、文件导入等特性|
|eslint-loader	| 通过 ESLint 检查 JavaScript 代码|
|file-loader |	把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件|
|url-loader |	和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去|
|sass-loader |	把Sass/SCSS文件编译成CSS|
|postcss-loader	|使用PostCSS处理CSS|
|css-loader|	主要来处理background:(url)还有@import这些语法。让webpack能够正确的对其路径进行模块化处理|
|style-loader	|把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。|

| Plugin	|解决问题|
| -- | -- |
|case-sensitive-paths-webpack-plugin	|如果路径有误则直接报错|
|terser-webpack-plugin|	使用terser来压缩JavaScript|
|pnp-webpack-plugin|	Yarn Plug'n'Play插件|
|html-webpack-plugin|	自动生成带有入口文件引用的index.html|
|webpack-manifest-plugin	|生产资产的显示清单文件|
|optimize-css-assets-webpack-plugin	|用于优化或者压缩CSS资源|
|mini-css-extract-plugin	|将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap|
|purgecss-webpack-plugin|清除没有使用的css|
|ModuleScopePlugin	|如果引用了src目录外的文件报警插件|
|InterpolateHtmlPlugin|	和HtmlWebpackPlugin串行使用，允许在index.html中添加变量|
|ModuleNotFoundPlugin	|找不到模块的时候提供一些更详细的上下文信息|
|DefinePlugin	|创建一个在编译时可配置的全局常量,如果你自定义了一个全局变量PRODUCTION,可在此设置其值来区分开发还是生产环境|
|HotModuleReplacementPlugin	|启用模块热替换|
|WatchMissingNodeModulesPlugin	|此插件允许你安装库后自动重新构建打包文件|

