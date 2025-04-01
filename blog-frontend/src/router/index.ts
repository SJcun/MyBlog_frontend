import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import Category from '../views/Category.vue'
import Tag from '../views/Tag.vue'
import Search from '../views/Search.vue'

import AuthLayout from '../layouts/AuthLayout.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

import AdminLayout from '../layouts/AdminLayout.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import ArticleManage from '../views/admin/ArticleManage.vue'
import ArticleEdit from '../views/admin/ArticleEdit.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail,
        meta: {
          title: '文章详情'
        }
      },
      {
        path: 'category/:id?',
        name: 'Category',
        component: Category,
        meta: {
          title: '分类'
        }
      },
      {
        path: 'tag/:id?',
        name: 'Tag',
        component: Tag,
        meta: {
          title: '标签'
        }
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: {
          title: '搜索'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          title: '关于我'
        }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          title: '登录'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: {
          title: '注册'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: '控制台'
        }
      },
      {
        path: 'article',
        name: 'ArticleManage',
        component: ArticleManage,
        meta: {
          title: '文章管理'
        }
      },
      {
        path: 'article/edit/:id?',
        name: 'ArticleEdit',
        component: ArticleEdit,
        meta: {
          title: '编辑文章'
        }
      },
      {
        path: 'category',
        name: 'CategoryManage',
        component: () => import('../views/admin/CategoryManage.vue'),
        meta: {
          title: '分类管理'
        }
      },
      {
        path: 'tag',
        name: 'TagManage',
        component: () => import('../views/admin/TagManage.vue'),
        meta: {
          title: '标签管理'
        }
      },
      {
        path: 'comment',
        name: 'CommentManage',
        component: () => import('../views/admin/CommentManage.vue'),
        meta: {
          title: '评论管理'
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/admin/Profile.vue'),
        meta: {
          title: '个人资料'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 - 页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || '首页'} - 我的博客`
  
  // 这里后续可以添加权限验证等逻辑
  // if (to.meta.requiresAuth && !userStore.isLoggedIn) {
  //   next({ name: 'Login' })
  // } else {
  //   next()
  // }
  
  next()
})

export default router 