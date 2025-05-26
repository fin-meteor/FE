<template>
  <div>
    <MainGNB />

    <div id="app">
      <ClubCardList :clubs="clubStore.clubs"/>
      <MainFooter class="order-3 order-md-1" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { accountStore } from '@/stores/accounts'
import { useClubStore } from '@/stores/clubs'

const userStore = accountStore()
const clubStore = useClubStore()

import ClubCardList from '@/components/club/ClubCardList.vue'
import MainGNB from '@/components/main/MainGNB.vue'
import MainFooter from '@/components/main/MainFooter.vue'

onMounted(() => {
  clubStore.getClubs()
  console.log(clubStore.clubs)
})
</script>

<style scoped>
#app {
  margin: 40px 0;      
  display: flex;
  flex-direction: column;
  gap: 60px;         
}
</style>
