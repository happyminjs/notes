// 泛型: 用来在代码执行时传入的类型，来确定结果
// 调用时传的 T 的类型，要求 val 类型是要和 T 保持一致的。
// 下边调用的时候就是要求 val 传入只能是 string 类型， 返回的是个数组，每项是 string 类型的
function createArray<T>(len:number, val:T):T[]{
  let result = [];

  for(let i = 0; i < len; i++){
    result.push(val)
  }
  return result;
}
let arr1 = createArray<string>(2, 'aa')
console.log(arr1)

// 多个泛型  元组的交换  [string, number] = [number, string]
const swap = <T, K>(tuple:[T, K]):[K, T] => {
  return [tuple[1], tuple[0]]
}
swap<number, string>([1,'sdfff'])
// export {}