https://mp.weixin.qq.com/s/ZJNCdKiCPJ5v5kal7FqaGQ
https://mp.weixin.qq.com/s/T5jrgTZvDB63fnEOuyvTgg
#### 灵魂五问
* localStorage 存储的键值采用什么字符编码
```
键和值都采用的 UTF-16 编码。
每个字符使用两个字节。与对象一样，整数键将自动转换为字符串
(若码点大于0xFFFF(65535)的， 是四个字节)
```
* 5M 的单位是什么
```
字符串的长度，或者是 utf-16 编码单元，最合适的是 10M 的字节空间(一个字符占2个字节空间)
```
* localStorage 键占不占存储空间
```
占存储空间
```
* localStorage 存储满了会怎么样？怎么处理
```
1、划分子域名，按业务线统一规划使用
2、跨页面传数据，考虑单页面应用，优先采用url传数据
3、最后兜底方法，清掉别人的存储，所以前提是自己存储时要有统一前缀
```
```js
// 存储满了会报错，错误码是 22
// Uncaught QuotaExceededError: Failed to set the 'YourStorageKey' property on 'Storage': Setting the value of 'YourStorageKey' exceeded the quota.
const QUOTA_EXCEEDED_ERR_CODE = 22;
function writeStorage(key, data){
  try {
    localStorage.setItem(key, data);
  } catch (e) {
    if(e.code === QUOTA_EXCEEDED_ERR_CODE) {
      localStorage.clear(); // 此处的清除方案不是很好
      localStorage.setItem(key, data);
    }
  }
}
```
* localStorage 的键的数量，对写和读性能的影响
```
键的数量对读取性能有影响，但是不大。
值的大小对性能影响更大，不建议保存大的数据。
(因为storage是同步的，所以值比较大的时候，建议更换 indexDB)
```
* 写个方法统计一个 localStorage 已使用空间
```js
function sieOfLS() {
    return Object.entries(localStorage).map(v => {
      return v.join('');
    }).join('').length;
}
// Object.entries(localStorage) 返回每项是[key, value]数组格式的数组
```
* localStorage 加时间控制非永久存储怎么处理
```js
// 思路就是重写set和get方法，在 key 或者 value 上拼接时间戳

```