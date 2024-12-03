// 结构解析 声明和赋值都放到一起了

// let arr = ['zf', 9]
// let name = arr[0];
// let age = arr[1];
// console.log(name, age);
// 解构 表示等号左边和右边解构类似
// 数组的位置必须相同
// let [name, age] = ['zf', 9];
// // let [, age] = ['zf', 9];
// console.log(name, age);
// 对象解构时名字必须相同
// let {length} = ['zf', 9]
// console.log(length)
// 不能使用关键字(default)，若有的话，可以采用 ： 的形式更改名字
// let {name, age, default:d} = {name: 'zf', age: 9, default: 'xxx'}
// console.log(name, age, d)
// 如果想设置某个属性的默认值， 必须采用等号 = 的方式
// let [, {address: [ , a]}, hobby = '游泳'] = [
//   {name: 'zf'},
//   {age: 9, address: [1,2,3]}
// ]
// console.log(a, ' ddd ', hobby)

// 解构的应用 
function test() {
  return [1,2,3];
}
let [a, b, c] = test();
function ajax({url=new Error('no url'), type = 'get', data = {}}) {
  console.log(url, type, data);
}
ajax({
  url: '/test',
  type: 'get',
  data: {}
})
