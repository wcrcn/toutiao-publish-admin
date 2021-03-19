import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/components/layout'
import Home from '@/views/home'
import Article from '@/views/article'
import ReleaseArticle from '@/views/article/ReleaseArticle'
import Material from '@/views/material'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/release',
        name: 'Release',
        component: ReleaseArticle
      },
      {
        path: '/image',
        name: 'Material',
        component: Material
      },
      {
        path: '/comment',
        name: 'Comment',
        component: Comment
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting
      },
      {
        path: '/fans',
        name: 'Fans',
        component: Fans
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const user = window.localStorage.getItem('user')
  if (to.name !== 'Login' && !user) next({ name: 'Login' })
  else next()
})

export default router
