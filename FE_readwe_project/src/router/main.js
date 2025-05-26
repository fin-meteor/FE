
// 메인, 랜딩페이지 라우터 설정
import MainView from "@/views/main/MainView.vue"
import LandingView from "@/views/main/LandingView.vue"

export default [
  {
    path: '/main',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/',
    name: 'LandingView',
    component: LandingView
  }
]