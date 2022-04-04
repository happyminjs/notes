// npm install typescript ts-node -g

// ts 中冒号后边的都是类型
const str : string = 'hello zz';
const num: number = 123
// 联合类型
let age: string | number = 1; // string或者number
// 数组
const arr:number[] = [1,3,4] // 每项都是number的数组
// 元组
const tuple: [string, number] = ['zz', 3] // 必须按照 string，number 类型顺序两项的数组

// 枚举
enum userRole{
  user = 'userss',
  manager = 'manager',
  admin = 'admin'
}
// any 
const arr2:[any, any] = ['1', 2]
const arr3: any = ['1', 2, 3]

// object 非原始数据类型
// Object.create(arr)
const create = (obj: object)=>{}
create({})
create([])
create(function(){})
console.log(userRole.user)

// 对象类型
// 看2.接口.ts