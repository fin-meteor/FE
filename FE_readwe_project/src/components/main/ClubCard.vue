<template>
  <div class="card custom-card" @click="goToDetail" style="cursor:pointer">
    <img
      :src="resolvedImage"
      class="card-img-top"
      :alt="props.club?.club_name || '북클럽 이미지'"
    />
    <div class="card-body">
      <h5 class="card-title">{{ club.club_name }}</h5>
      <p class="card-text">{{ club.club_description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import defaultImage from '@/assets/css/img/club/image.png'

const props = defineProps({
  club:{
    type:Object,
    required:true
  }
})
const resolvedImage = computed(() => {
  const base = 'http://127.0.0.1:8000'  // Django 백엔드 서버 주소
  if (props.club?.club_img?.trim()) {
    return `${base}${props.club.club_img}`
  }
  return defaultImage
})

const router = useRouter()
function goToDetail() {
  router.push({
    name: 'ClubDetailView',
    params: { club_pk: props.club.id }
  })
}
</script>

<style scoped>
.custom-card {
  position: relative;
  width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #D1D9E0;
  border-radius: 6px;
  box-shadow:
    0px 1px 1px 0px rgba(31, 35, 40, 0.06),
    0px 1px 3px 0px rgba(31, 35, 40, 0.06);
  overflow: hidden;
  cursor: pointer; /* 클릭 가능 표시 */
  transition: transform 0.1s ease-in-out;
}
.custom-card:hover {
  transform: translateY(-2px);
}

.card-img-top {
  width: 100%;
  height: 140px;
  object-fit: cover;
  flex-shrink: 0;
}

.card-body {
  padding: 10px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.card-title,
.card-text {
  word-break: break-word;
  white-space: normal;
  overflow: hidden;
}

.card-title {
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
  color: #1F2328;
  margin-bottom: 4px;
}

.card-text {
  font-size: 12px;
  line-height: 18px;
  color: #59636E;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
