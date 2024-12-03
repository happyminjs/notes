// es6 模板字符串  特殊的字符串方法
// 模板字符串取代了原有的字符串拼接功能
// 可以支持换行， 可以支持不用转义取值
// let name = 'zfpx'
// let age = 9
// let str = `hello~'${name}'今年${age}岁了`
// console.log(str);

// 面试题： 如何自己实现一个类模板字符串的功能  --- 就是考验正则
// let name = 'zfpx'
// let age = 9
// let str = 'hello~${name}今年${age}岁了'
// str = str.replace(/\$\{([^}]*)\}/g, function() {
//   return eval(arguments[1])
// })
// console.log(str);
// 带标签的模板字符  自定义模板字符串的实现 --------------- 模板字符串课程 http://www.javascriptpeixun.cn/course/2216/task/153306/show
// hello~*zfpx*今年*9*岁了
// let name = 'zfpx'
// let age = 9
// function jw(){
//   console.log(arguments)   /// [Arguments] { '0': [ 'hello~', '今年', '岁了' ], '1': 'zfpx', '2': 9 }
//   return 1000;
// }
// let str = jw`hello~${name}今年${age}岁了`
// console.log(str);  //  1000

// 常用方法
// includes  是否包含
let url = 'http://www.zhufengpeixun.cn/logo.png'
console.log(url.includes('zhufengpeixun'));
// startsWith 以 xxx 开头
console.log(url.startsWith('http://'))
// endsWith
console.log(url.endsWith('.png'))
// padStart padEnd 补全
let i = 0;
let  time = setInterval(function(){
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let str = `${hour.toString().padStart(2,0)} : `
  str += `${minute.toString().padStart(2,0)} : `
  str += `${second.toString().padStart(2,0)}`
  console.log(str)
  i++
  if (i >10) {
    clearInterval(time)
  }
}, 1000)

