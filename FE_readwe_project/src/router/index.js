// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'   // ← 반드시 import!
import About from '@/views/About.vue'
import accountsRoutes from './account'  // accounts.js에서 라우트 가져오기
import booksRoutes from './book'
import clubRoutes from './club'  // club.js에서 라우트 가져오기
import mainRoutes from './main'  // main.js에서 라우트 가져오기
import Home from '@/views/Home.vue'
import { accountStore } from '@/stores/accounts'
import { useToast } from 'vue-toastification'

// import LandingView from '@/views/main/LandingView.vue'

const routes = [
  ...accountsRoutes,
  ...booksRoutes,
  ...clubRoutes,
  ...mainRoutes,
  { path: '/about', name: 'About', component: About },
  { path: '/landing', name: 'Home', component: Home },
  // { path: '/', name:'Landing', component: LandingView}
  // 추가 라우트 …
]

const router = createRouter({
  history: createWebHistory(),  // HTML5 history 모드
  routes,
})

router.beforeEach((to, from) => {
  const store = accountStore()
  const isAuthenticated = !!store.token  // 또는 store.isLogin

  const publicPages = ['LogInView', 'SignUpView', 'LandingView']  // 예외 허용할 라우트들

  if (!isAuthenticated && !publicPages.includes(to.name)) {
    alert('로그인이 필요합니다.')  // ✅ 경고창 띄우기
    return { name: 'LogInView' }   // ✅ 랜딩 페이지로 리다이렉트
  }
})
export default router
