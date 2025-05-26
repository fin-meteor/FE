<template>
  <div class="wrapper">
    <div class="header-container">
      <div class="title-join-group">
        <div class="title-group">
          <span class="title">{{ user.username }}</span>
        </div>

        <div class="join-button">
          <!-- ✅ 내 프로필
          <RouterLink 
          class="btn" 
          v-if="isMyProfile" 
          :to="{name:'ProfileEditView', params:{username: props.user.user_name}}"
          >
          프로필 수정
        </RouterLink> -->
          <!-- ✅ 다른 사람 프로필 -->
          <button v-if="!isMyProfile" @click="toggleFollow" class="btn">
            {{ isFollowing ? '언팔로우' : '팔로우' }}
          </button>
        </div>
      </div>

      <!-- <div class="email">
        <span class="subtitle">{{ user.email }}</span>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { accountStore } from '@/stores/accounts'
import {RouterLink} from 'vue-router'
import axios from 'axios'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const userStore = accountStore()

const isMyProfile = computed(() => {
  return userStore.user?.username === props.user?.username
})

const isFollowing = computed(() => props.user?.is_following)

const toggleFollow = async () => {
  const url = `${userStore.BASE_URL}/accounts/follow/${props.user.username}/`

  try {
    if (isFollowing.value) {
      await axios.delete(url, {
        headers: {
          Authorization: `Token ${userStore.token}`
        }
      })
      props.user.is_following = false
    } else {
      await axios.post(url, {}, {
        headers: {
          Authorization: `Token ${userStore.token}`
        }
      })
      props.user.is_following = true
    }
  } catch (err) {
    console.error('팔로우/언팔로우 실패:', err)
  }
}


</script>

<style scoped>
.wrapper {
  width: 960px;
  margin: 0 auto; /* 가운데 정렬 */
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
}

.title-join-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.title-group {
  display: flex;
  align-items: center;
}

.title {
  font-weight: 600;
  font-size: 28px;
}

.join-button {
  display: flex;
  align-items: center;
}

.btn {
  background-color: #1D7AF3;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1565C0;
}

.description {
  margin-top: 24px;
  width: 100%;
}

.subtitle {
  font-weight: 400;
  font-size: 20px;
  color: #888D95;
}
</style>