// 函数主要关心返回值和参数
function sum1(a:string, b:string):string{ // 参数 string类型a，string类型b，返回string类型
  return a+b
}
sum1('a', 'b');

// 可以通过表达式定义
const sum2 = (a: number, b:number):number => a+b
const sum3:(aa:number,bb:number)=>number = (a: number, b:number):number => a+b
// 类型别名
// 1.
type Sum = (aa:number,bb:number)=>number
const sum4:Sum = (a: number, b:number):number => a+b
// 2.
interface Sum2 {(aa:number,bb:number): number}
const sum5:Sum2 = (a: number, b:number):number => a+b
// type 和 interface 的区别
// interface 可以继承，可以被类来实现
// type 仅仅是一个别名， 一般在定义联合类型，定义临时变量时可以使用
type Sum22 = (aa:number,bb:number)=>number | string; // 可以是 function，或者 string

