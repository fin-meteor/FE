<template>
  <div class="profile-card">
    <div class="avatar-wrapper">
      <img :src="avatarUrl" alt="Avatar" class="avatar" />
    </div>

    <div class="info">
      <p class="nickname">{{ nickname }}</p>
      <p class="user-id">{{ userId }}</p>
    </div>
    
    <!-- 프로필 수정 버튼 -->
    <RouterLink 
      class="btn"
      v-if="props.user?.username && isMyProfile"
      :to="{name:'ProfileEditView', params:{user_name: props.user.username}}"
      >
      프로필 수정
    </RouterLink>

    <div class="follow">
      <span><strong>{{ followers }}</strong> followers</span>
      <span>·</span>
      <span><strong>{{ following }}</strong> following</span>
    </div>
<!-- 
    <div class="divider" /> -->

    <p class="badge-title">Badge</p>
    <div class="badges">
      <div v-for="i in 4" :key="i" class="badge-wrapper">
        <img
          v-if="badges[i - 1]"
          :src="badges[i - 1]"
          alt="badge"
          class="badge"
        />
        <div v-else class="skeleton-badge"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { accountStore } from '@/stores/accounts'
import { RouterLink } from 'vue-router'

const userStore = accountStore()


const props = defineProps<{
  user: {
    username: string
    email: string
    user_nick_name: string
    user_profile_img?: string | null
    is_following?: boolean
    followers_count?: number
    following_count?: number
    badges?: string[]
  }
}>()

const isMyProfile = computed(() => {
  return userStore.user?.username === props.user?.username
})

console.log('👤 내 사용자:', accountStore().user.username)
console.log('👤 프로필 대상:', props.user?.username)
console.log('🔍 isMyProfile:', isMyProfile.value)


console.log(userStore.user.username)
console.log(props.user.username)

// ✅ computed로 내부 구조 구성
const avatarUrl = computed(() =>
  props.user.user_profile_img || 'https://cdn.news2day.co.kr/data2/content/image/2017/03/20/20170320197471.jpg'
)

const nickname = computed(() => props.user.user_nick_name)
const userId = computed(() => props.user.username)
const followers = computed(() => props.user.followers_count || 0)
const following = computed(() => props.user.following_count || 0)
const badges = computed(() => props.user.badges || [])

</script>

<style scoped>
.profile-card {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
}

.avatar-wrapper {
  width: 186px;
  height: 186px;
  margin-bottom: 24px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  text-align: center;
  margin-bottom: 16px;
}
.nickname {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}
.user-id {
  font-size: 14px;
  color: #657085;
  margin: 4px 0 0;
}

.edit-btn {
  width: 100%;
  padding: 8px 0;
  margin: 16px 0;
  border: 1px solid #d1d9e0;
  border-radius: 4px;
  background: #ffffff;
  color: #1a1a1a;
  font-size: 14px;
  cursor: pointer;
}

.follow {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #657085;
  margin-bottom: 24px;
}

.divider {
  width: 100%;
  height: 1px;
  background: #d1d9e0;
  margin-bottom: 16px;
}

.badge-title {
  align-self: flex-start;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px;
  color: #1a1a1a;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

/* 래퍼를 하나 더 두어 레이아웃 고정 */
.badge-wrapper {
  width: 56px;
  height: 56px;
}

/* 실제 뱃지 */
.badge {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

/* 스켈레톤 스타일 */
.skeleton-badge {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #e1e5eb;
  animation: pulse 1.2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.7;
  }
}
</style>
