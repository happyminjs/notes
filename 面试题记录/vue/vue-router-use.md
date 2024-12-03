#### 匹配优先级
谁先定义的，谁的优先级就最高。
#### 传递参数
方法一： 路由router配置
```js
routes: [
  {
    path: '/user/:id/:name',
    name: 'user',
    component: () => {
      return import('../pages/user.vue')
    }
  }
]
// 使用时
<router-link to="/user/32/sss">User</router-link>
// 表示传入两个 params 参数 id = 32，name=sss 
// to 属性参数必须与 path 配置的个数、顺序一致
```

#### 路由参数的变化
例如从 /user/111/sss 导航到 /user/222/rrr, 因为要渲染的都同一个组件，所以原来的组件实例会被复用，虽然高效，但是组件的生命周期钩子不会再调用。
解决方法：
```js
// 方法一： 就是 watch (监测变化) $route 对象
watch: {
  '$route' (to, from) {
    // 对路由变化作出响应...
  }
}

// 方法二： 使用导航守卫 beforeRouteUpdate
beforeRouteUpdate (to, from, next) {
  // react to route changes...
  // don't forget to call next()
}
```
#### 404路径处理
```js
routes: [
  {
    path: '*',  // 会匹配所有路径
    path: '/user-*', // 会匹配以 `/user-` 开头的任意路径
    name: 'nopage',
    component () {
      return import('../pages/404.vue')
    }
  }
]
```
> 1、在使用通配符 * 时，要注意路由的配置顺序，要放在最后，因为有优先级限制

> 2、会自动添加一个 params 参数 pathMatch，值为 URL 通过通配符被匹配的部分，上例中 pathMatch = nopage
#### 嵌套路由
```js
routes: [
  {
    path: '/router/:id',
    name: 'router',
    component: () => import('../pages/router/router_child.vue'),
    children: [
      {
        // 当 /router/:id/one 匹配成功，
        // routerOne 会被渲染在 router 的 <router-view> 中
        path: 'one',
        name: 'routerOne',
        component: () => import('../pages/router/router_one.vue')
      },
      {
        // 当 /two 匹配成功，
        // routerTwo 会被渲染在 router 的 <router-view> 中
        path: '/two',
        name: 'routerTwo',
        component: () => import('../pages/router/router_two.vue')
      }
    ]
  },
]
```
#### 编程式的导航
声明式的 \<router-link :to="...">  **等于**  编程式的 router.push(...)
```js
router.push('/home')  // -> /home
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 在有path时，params 不生效，所以用path时，必须是完整的path
router.push({ path: '/user', params: { userId }}) // -> /user
```
