// 用来描述对象形状的 interface
interface ISchool {
  readonly name: string, // 仅读
  age: number,
  address?: string // 可选
}

let school: ISchool = {
  name: 'zz',
  age: 11,
  address: ''
}

// 接口扩展
interface IZZ extends ISchool{
  type: string,
  [key:string]:any, // 除上边提出的必须有的3个类型，和可选的address外，其他任意类型的字段
}

let zz:IZZ = {
  name: '',
  age: 11,
  type: '',
  a:1,
  b: '2ssd'
}

// 类型断言 as： 表示这个对象就是这样的一个类型 ， 类型强转的意思吧
let school2: ISchool = ({
  name: 'zz',
  age: 11,
  address: '',
  lessons: ['']
}) as ISchool

let a: number;
// a as string // 不可随意断言
a as any as string // 可以和 any 断言