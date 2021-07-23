module.exports = {
  // root: true, // 配置文件是可有继承关系的
  extends: 'airbnb', // 是继承或者说是扩展自 airbnb 的配置规范
  parser: 'babel-eslint', // 把源代码转成 AST 语法树的工具
  // parserOptions: {  // airbnb 中有此配置
  //   sourceType: 'module',
  //   ecmaVersion: 2015,
  // },
  env: { // 指定脚本运行环境
    browser: true,
    node: true,
  },
  rules: {
    'linebreak-style': 'off', // 关闭换行符检查
    // indent: 'off', // 缩进的风格
    indent: ['error', 2], // 缩进的风格，如果不是2，则报错
    quotes: 'off', // 引号的类型
    'no-console': 'off', // 不能出现 console
  },
};
