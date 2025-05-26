<template>
  <div>
    <MainGNB />
    <div
      id="app"
      class=""
    >
      <Carosel/>
       <CategoryBlockList/>

      <AiRecomandBookLList/>
      <ClubCardList/>
       <AiRecomandBookSList/>

      <MainFooter class="order-3 order-md-1" />
    </div>
  </div>

   
</template>

<script setup>
  import { ref, watch } from 'vue'
  import MainGNB from '@/components/main/MainGNB.vue'
  import MainFooter from '@/components/main/MainFooter.vue'
  import { accountStore } from '@/stores/accounts.js'
  import AiRecomandBookSList from '@/components/main/AiRecomandBookSList.vue';
  import ClubCardList from '@/components/main/ClubCardList.vue';
  import AiRecomandBookLList from '@/components/main/AiRecomandBookLList.vue';
  import CategoryBlockList from '@/components/main/CategoryBlockList.vue';
  import Carosel from '@/components/main/carosel.vue';


  const isDark = ref(false)
  function toggleTheme() {
    isDark.value = !isDark.value
  }
  watch(isDark, v => {
    document.body.classList.toggle('dark-theme', v)
  })
  
 

  const userStore = accountStore()
  const logOut = function(){
    userStore.logOut()
  }
  const useToken = userStore.token
  // accounts 로직 구간입니다.

</script>

<style>


  #app {
  margin: 40px 0; /* 상하단 마진 40px */
  display: flex;
  flex-direction: column;
  gap: 60px; /* 내부 컨텐츠 간격 60px */
}



</style>
