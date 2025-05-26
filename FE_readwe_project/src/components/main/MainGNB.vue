<template>
  <div>
    <nav class="navbar custom-navbar white-theme">
      <div class="container-fluid d-flex justify-content-between align-items-center px-3">
        <!-- 1) 로고 → 메인페이지 -->
        <router-link
          :to="{ name: 'MainView' }"
          class="d-flex align-items-center text-decoration-none"
        >
          <img
            src="@/assets/css/img/accounts/bi_w.png"
            alt="logo"
            class="icon-logo"
          />
          <span class="navbar-brand text-dark mb-0 ms-2">READ.WE</span>
        </router-link>

        <!-- 2) 검색바 → 북리스트 -->
        <form
          class="d-none d-md-flex align-items-center search-bar"
          role="search"
          @submit.prevent="onSearch"
        >
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="검색어를 입력하세요"
          />
          <button class="btn btn-search ms-2" type="submit">
            <img
              src="@/assets/css/img/accounts/search.jpg"
              alt="search"
              class="icon"
            />
          </button>
        </form>

        <!-- 3) 우측 버튼 그룹 -->
        <div class="d-flex align-items-center">
          <!-- Test → 온보딩 추가시에 주석해제 -->
          <!-- <button
            class="btn btn-outline-dark ms-2 d-flex align-items-center"
            type="button"
            @click="$router.push({ name: 'OnboardingView' })"
          >
            <img
              src="@/assets/css/img/accounts/test.svg"
              alt="Test"
              class="icon-btn"
            />
            <span class="ms-1">Test</span>
          </button> -->

          <!-- Club → 클럽리스트 -->
          <router-link
            :to="{ name: 'ClubListView' }"
            class="btn btn-outline-dark ms-2 d-flex align-items-center"
          >
            <img
              src="@/assets/css/img/accounts/club.svg"
              alt="Club"
              class="icon-btn"
            />
            <span class="ms-1">Club</span>
          </router-link>

          <!-- Logout -->
          <button
            class="btn btn-outline-dark ms-2 d-flex align-items-center"
            type="button"
            @click="onLogout"
          >
            <img
              src="@/assets/css/img/accounts/logout.svg"
              alt="로그아웃"
              class="icon-btn"
            />
            <span class="ms-1">Logout</span>
          </button>

          <!-- Profile → 사용자 프로필 디테일로 -->
          <router-link
            :to="{ name: 'ProfileView', params:{user_name: account.user.username}}"
            class="btn btn-profile ms-3 p-0"
          >
            <img
              src="@/assets/css/img/accounts/bi_w.png"
              alt="프로필"
              class="rounded-circle"
            />
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 본문이 GNB 아래로 가려지지 않도록 padding -->
    <div class="main-content">
      <!-- 페이지 컨텐츠 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { accountStore } from '@/stores/accounts'

const router = useRouter()
const searchQuery = ref('')

// Pinia store 인스턴스
const account = accountStore()

function onSearch() {
  // 검색어가 비어있으면 전체 리스트, 있으면 query 로 넘기기
  router.push({
    name: 'BookListView',
    query: { search_query: searchQuery.value || '' }
  })
}

function onLogout() {
  account.logOut()
}
</script>



<style scoped>
/* GNB 공통 */
.custom-navbar.white-theme {
  position: relative;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 72px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}

/* 컨테이너 세로 중앙 정렬 */
.custom-navbar.white-theme .container-fluid {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 로고 사이즈 고정 */
.icon-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

/* 검색바 스타일 */
.search-bar .form-control {
  width: 280px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0 12px;
}

.btn-search {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
}

.btn-search .icon {
  width: 20px;
  height: 20px;
}

/* 아이콘+텍스트 버튼 (Test, Club) */
.icon-btn {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

/* 프로필 버튼 */
.btn-profile {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
}

.btn-profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}


</style>
