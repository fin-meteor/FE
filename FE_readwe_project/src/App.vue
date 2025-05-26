<template>
  <div class="app-wrapper">

  <!-- 여기부터 로그인, 회원가입 부분입니다. -->
  <div>
    <!-- <nav v-if="!useToken">
      <RouterLink :to="{name:'LogInView'}">로그인</RouterLink> | 
      <RouterLink :to="{name:'SignUpView'}">회원가입</RouterLink>
    </nav>
    <nav v-else>
      <form @submit.prevent="logOut">
        <input type="submit" value="로그아웃">
      </form>
      <form @submit.prevent="deleteUser">
        <input type="submit" value="회원탈퇴">
      </form> 
      <RouterLink :to="{name: 'UserProfileView'}">프로필로 이동</RouterLink>
    </nav>
    <RouterLink :to="{name: 'BookListView'}">책 전체 목록</RouterLink> -->
    <!-- <LandingView/> -->
    <RouterView/>
  </div>
  <!-- 여기까지 -->
  <!-- 여기부터 프로필 입니다. -->
  <!-- <div>
    <RouterLink :to="{name: 'UserProfileView'}">프로필로 이동</RouterLink>
  </div> -->
  <!-- 여기까지 -->
  </div>

</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { ref, watch, computed } from 'vue'
  import InputField from '@/components/accounts/InputField.vue'
  import MainGNB from '@/components/main/MainGNB.vue'
  import MainFooter from '@/components/main/MainFooter.vue'
  import ClubCard from '@/components/club/ClubCard.vue'

  const isDark = ref(false)
  function toggleTheme() {
    isDark.value = !isDark.value
  }
  watch(isDark, v => {
    document.body.classList.toggle('dark-theme', v)
  })
  
  // accounts 로직 구간입니다.
  import { accountStore } from './stores/accounts';
import LandingView from './views/main/LandingView.vue'

  const userStore = accountStore()
  const logOut = function(){
    userStore.logOut()
  }
  const useToken = computed(()=>userStore.token)

  const deleteUser = function(){
    userStore.deleteUser()
  }
  // accounts 로직 구간입니다.

</script>

<style>
  /* scoped 제거! 전역 CSS 변수로 배경·텍스트 컬러를 제어하므로
    App.vue 스타일 블록은 scoped 가 필요 없습니다. */


</style>
