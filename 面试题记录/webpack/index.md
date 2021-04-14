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
#### webpack 构建流程
* 初始化参数：从配置文件和Shell语句中读取与合并参数，得出最终参数   
* 开始编译： 用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始执行编译； 确定入口：根据配置中的entry找出所有的入口文件    
* 编译模块：从入口文件出发，调用所有配置的Loader对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；  
* 完成模块编译：在经过第 4 步使用Loader翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个Chunk转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会    
* 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统    
-------------------
#### sourceMap选择
* 开发环境使用：cheap-module-eval-source-map
* 生产环境使用：cheap-module-source-map
#### Loader 和 Plugin 的不同
* Loader：让webpack有加载和解析非js文件的能力    
* Plugin：扩展webpack的功能，webpack运行的生命周期中会广播出许多事件，plugin会监听这些事件，在合适的时机通过webpack提供的api改变输出结果   
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

