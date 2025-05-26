<template>
  <div>
    <nav class="navbar custom-navbar">
      <div class="container-fluid d-flex justify-content-between align-items-center px-3">
        <div class="d-flex align-items-center">
          <img
            src="@/assets/css/img/accounts/bi_b.png"
            alt="bi"
            class="icon-logo"
            style="width:40px; height:40px; object-fit:contain;"
          />
          <router-link :to="{ name: 'LandingView' }" class="navbar-brand text-light mb-0 ms-2">
            READ.WE
          </router-link>
        </div>

        <!-- 로그인 상태가 아닐 때만 보이도록 v-if -->
        <form class="d-flex align-items-center" role="search">
          <RouterLink
            v-if="!account.token"
            class="btn btn-outline-light ms-2"
            :to="{ name: 'SignUpView' }"
          >
            회원가입
          </RouterLink>
          <RouterLink
            v-if="!account.token"
            class="btn btn-light ms-2"
            :to="{ name: 'LogInView' }"
          >
            로그인
          </RouterLink>

          <!-- 깃허브 시작하기 버튼 : 소셜로그인 추가 시 활성화-->
          <!--
          <button class="btn btn-light btn-with-icon ms-2" type="button">
            <div class="icon-box">
              <img src="@/assets/css/img/accounts/bi_w.png" alt="bi" />
            </div>
            <span class="btn-text">깃허브로 시작하기</span>
          </button>
          -->
        </form>
      </div>
    </nav>

    <!-- 본문이 GNB 아래로 가려지지 않게 여백 확보 -->
    <div class="main-content">
      <!-- 본문 내용 -->
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { accountStore } from '@/stores/accounts'

const account = accountStore()
</script>

<style scoped>
.custom-navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 72px;
  background-color: #2D3138;
}

.custom-navbar .container-fluid {
  height: 100%;
  display: flex;
  align-items: center;
}

.btn-with-icon {
  width: 160px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.icon-box {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-box img {
  width: 150%;
  height: 150%;
  object-fit: contain;
}

.btn-text {
  flex: 1;
  text-align: right;
  white-space: nowrap;
  font-size: 0.9rem;
}

/* .main-content {
  padding-top: 72px;
} */
</style>
