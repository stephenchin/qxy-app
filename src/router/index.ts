// 1 引入所需方法
// 路由创建：createRouter
// 路由模式(两者任选其一)：createWebHistory - history模式、createWebHashHistory - hash模式
// RouteRecordRaw：意为路由原始信息 （使用vue3+js的不用引入）
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/**
 *  路由懒加载
 *  定义：懒加载也叫延迟加载，即在需要的时候进行加载，随用随载。从而提升了系统性能。
 *
 */
const _import = (path: string) => () => import(/* @vite-ignore */ '../views/' + path + '.vue')

// 设置路由规则
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/child',
    name: 'child',
    component: _import('home/child')
  },
  {
    // 定义404路由
    path: '/404',
    name: '404',
    component: _import('notfound')
  },
  {
    // 匹配为定义路由然后重定向到404页面
    path: '/:pathMath(.*)',
    redirect: '/404'
  },
  {
    path: '/layout',
    name: 'layout',
    component: _import('layout/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: _import('home/index')
      },
      {
        path: '/classify',
        name: 'classify',
        component: _import('classify/index')
      },
      {
        path: '/videos',
        name: 'videos',
        component: _import('videos/index')
      },
      {
        path: '/my',
        name: 'my',
        component: _import('my/index')
      }
    ]
  }
]

// 设置路由
const router = createRouter({
  routes,
  //路由模式：history
  history: createWebHistory()
  //路由模式：hash
  // history:createWebHashHistory()
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // const token: string | null = localStorage.getItem('token')
  // if (!token && to.path !== '/login') {
  //     next('/login')
  // } else {
  next()
  // }
})

// 导出路由
export default router
