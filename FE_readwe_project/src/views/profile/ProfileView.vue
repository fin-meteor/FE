<template>
  <div>
    <MainGNB />
    <ProfileImage v-if="userinfo" :user="userinfo" />
    <div class="app-container">
      <div id="app">
        <ProfileHeader v-if="userinfo && userinfo.username" :user="userinfo" />
        <div class="detail-container">
          <div class="divider-line"></div>
          <div class="feed-and-member-list">
            <ClubFeedList />
            <div class="detail-content">
              <ProfileCard v-if="userinfo && userinfo.username" :user="userinfo" />
              <FollowerList />
            </div>
          </div>
          <div class="divider-line"></div>
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { accountStore } from '@/stores/accounts'
const userStore = accountStore()

const userinfo = ref({})

import ProfileHeader  from '@/components/Profile/ProfileHeader.vue'
import ProfileImage   from '@/components/Profile/ProfileImage.vue'
import ClubFeedList   from '@/components/Club/ClubFeedList.vue'
import FollowerList   from '@/components/Profile/FollowerList.vue'
import ProfileCard    from '@/components/Profile/ProfileCard.vue'
import MainGNB        from '@/components/main/MainGNB.vue'
import MainFooter     from '@/components/main/MainFooter.vue'

const route = useRoute()

const fetchUserInfo = async () => {
  const userName = route.params.user_name
  userinfo.value = await userStore.getUserProfileByUserName(userName)
}

onMounted(async () => {
  await fetchUserInfo()
  console.log('✅ 최종 유저 데이터:', userinfo.value)
})

console.log('📦 프로필 유저 정보:', userinfo.value)
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

.divider-line {
  width: 100%;
  height: 1px;
  background-color: #CCD0D9;
  margin: 40px 0;
}

/* 좌우 레이아웃: 상단 정렬 */
.feed-and-member-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 40px;
  align-items: flex-start;
}

/* 우측 사이드바: 세로 스택 + 상단 정렬 */
.detail-content {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 16px;
  align-items: flex-start;
}
</style>
