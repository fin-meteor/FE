import UserProfileEditView from "@/views/profile/UserProfileEditView.vue"
import UserProfileView from "@/views/profile/UserProfileView.vue"

// 사용자는 user_pk로 라우터 개별 설정

export default [
  {
    path: '/userProfileEditView',
    name: 'UserProfileEditView',
    component: UserProfileEditView
  },
  {
    path: '/userProfileView/:user_pk',
    name: 'UserProfileView',
    component: UserProfileView
  }
]