import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '九龙湾-登录', noCache: true },
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/ws',
    meta: { title: 'websocket', noCache: true },
    component: () => import('@/views/login/ws'),
    hidden: true
  },
  { path: '/pending',
    meta: { title: 'pending', noCache: true },
    component: () => import('@/views/errorPage/pending'),
    hidden: true
  },
  { path: '/fail',
    meta: { title: '支付失败', noCache: true },
    component: () => import('@/views/login/fail'),
    hidden: true
  },
  { path: '/pay',
    meta: { title: '支付成功', noCache: true },
    component: () => import('@/views/login/pay'),
    hidden: true
  },
  { path: '/ws2',
    meta: { title: 'websocket', noCache: true },
    component: () => import('@/views/login/ws2'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '九龙湾',
        meta: { title: '九龙湾', icon: 'index', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/system/user/center'),
        name: '个人中心',
        meta: { title: '九龙湾-个人中心', icon: 'user' }
      }
    ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
