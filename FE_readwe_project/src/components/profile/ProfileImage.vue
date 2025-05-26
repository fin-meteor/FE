<template>
  <div class="image-container">
    <img :src="imageUrl" alt="Profile_Img" class="profile-image" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const defaultImageUrl = 'https://images.unsplash.com/photo-1722182877533-7378b60bf1e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCVFQiU4RiU4NCVFQyU4NCU5QyVFQSVCNCU4MCUyMCVFQiVCMCVCMCVFQSVCMiVCRHxlbnwwfHwwfHx8MA%3D%3D'

// 프로필 이미지 아니면 디폴트 이미지
const imageUrl = computed(() => props.user?.user_profile_img || defaultImageUrl)
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 300px;
  z-index: 0;
  opacity: 1;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>