// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// 전역 스타일
import '@/assets/css/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(pinia) 
app.use(router)
app.mount('#app')

// app 패딩 삭제를 위해 추가
const root = document.getElementById('app')
if (root) {
  root.style.paddingBottom = '0'
}


