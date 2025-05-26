import LoginView from '@/views/accounts/LoginView.vue'
import SignUpView from '@/views/accounts/SignUpView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import ProfileEditView from '@/views/accounts/ProfileEditView.vue'


export default [
  {
    path: '/login',
    name: 'LogInView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/profile/:user_name',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/profile/:user_name/update',
    name: 'ProfileEditView',
    component: ProfileEditView
  },
]