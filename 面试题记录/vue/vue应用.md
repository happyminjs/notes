
#### 单页面权限管理
权限管理一般需要控制的有： 是否已登录、 相应页面访问的权限、 页面内按钮的操作权限
```js
// 1、是否已登录
// 在router.js 中使用全局的路由卫士，
router.beforeEach((to, from, next) => {
  // 判断是否有已登录的token存cookie，
  // 每次路由解析前根据token请求用户数据来判断token是否已过期
  // 若没有token 或者 请求数据的接口返回token 过期，则跳登录
  // 然后 next();
})
// 2、菜单权限
// 动态插入设置router
router.addRoutes(routerArr)
// 3、页面上的按钮等内容的展示和操作
// 在路由的meta属性传入参数，这样在页面的路由守卫内能取到meta属性来判断权限
```
