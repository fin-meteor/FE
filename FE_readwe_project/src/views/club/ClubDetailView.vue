<template>
<div>
  <MainGNB />
  <ClubDetailImage />
  <div class="app-container">
    <div id="app" v-if="!club">
      로딩 중...
    </div>
    <div id="app" v-else>
      <ClubDetailHeader v-if="club" :club="club" :account="account"/>
      <div class="detail-container">
        <div class="divider-line"></div>
        <div class="feed-and-member-list">
          <ClubFeedList :posts="posts" />
          <div class=container>
            <ClubMeberList v-if="club" :club="club"/>
          </div>
        </div>
        <div class="divider-line"></div>
      </div>
    </div>
  </div>
  <MainFooter class="order-3 order-md-1" />
</div>
</template>

<script setup>

  import axios from 'axios'
  import {useClubStore} from '@/stores/clubs.js'
  import {accountStore} from '@/stores/accounts.js'
  import {useRoute, RouterLink} from 'vue-router'
  import {ref, onMounted, watch} from 'vue'

  const store = useClubStore()
  const route = useRoute()
  const account = accountStore()

  const club = ref(null)
  const posts = ref([])

  import ClubDetailHeader from '@/components/club/ClubDetailHeader.vue'
  import ClubDetailImage from '@/components/club/ClubDetailImage.vue'
  import ClubFeedList from '@/components/club/ClubFeedList.vue'
  import ClubFeed from '@/components/club/ClubFeed.vue'
  import ClubMeberList from '@/components/club/ClubMeberList.vue'
  import MainGNB from '@/components/main/MainGNB.vue'
  import MainFooter from '@/components/main/MainFooter.vue'

  // 북클럽 디테일 불러오기
  onMounted(async () => {
    if (route.params.club_pk) {
      club.value = await store.getClub(route.params.club_pk)
      posts.value = club.value.club_post || []
    }

    if (!account.user) {
      account.fetchUserInfo()
    }
  })
</script>

<style scoped>
.app-container {
width: 960px;
margin: 60px auto;
}

#app {
display: flex;
flex-direction: column;
align-items: center;
}

.detail-container {
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
}

.detail-content {
display: flex;
justify-content: space-between;
width: 100%;
gap: 40px;
}

.divider-line {
width: 100%;
height: 1px;
background-color: #CCD0D9;
margin: 40px 0;
}

.detail-content {
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
flex-grow: 1;
}

.feed-and-member-list {
display: flex;
flex-direction: row;
width: 100%;
gap: 40px;
}
</style>
