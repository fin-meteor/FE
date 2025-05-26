<template>
  <div class="wrapper">
    <!-- 헤더 영역 -->
    <div class="container">
      <div class="text-group">
        <span class="subtitle">{{ subtitle }}</span>
        <span class="title">{{ title }}</span>
      </div>
    </div>

    <!-- 무한 스크롤 클럽 리스트 -->
    <div class="club-list">
      <ClubCard
        v-for="club in clubs"
        :key="club.id"
        :data="club"
      />
      <div ref="sentinel" class="sentinel"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useClubStore } from '@/stores/clubs.js'
import ClubCard from './ClubCard.vue'

// Props
const props = defineProps({
  subtitle: { type: String, default: '정원님을 위해 준비한' },
  title: { type: String, default: '추천 북클럽' },
})

// 클럽 store
const clubStore = useClubStore()
const clubs = ref([])  // local 복사본
const sentinel = ref(null)
let observer = null

// loadMore: 다음 페이지 클럽들 불러오기
const loadMore = async () => {
  const success = await clubStore.fetchClubs()
  if (success) {
    clubs.value = [...clubStore.clubs]  // store에서 클럽 리스트 복사
  }
}

// mount 시 첫 로딩 + IntersectionObserver 등록
onMounted(() => {
  loadMore()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { root: null, threshold: 1 }
  )
  if (sentinel.value) observer.observe(sentinel.value)
})

// unmount 시 감시 해제
onBeforeUnmount(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value)
  }
})
</script>

<style scoped>
.wrapper {
  width: 960px;
  margin: 0 auto;
}

/* 헤더 스타일 (기존과 동일) */
.container {
  width: 100%;
  height: 86px;
  display: flex;
  align-items: flex-start;
  color: #000;
}
.text-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 160%;
  gap: 12px;
}
.subtitle { font-weight: 500; font-size: 28px; }
.title    { font-weight: 700; font-size: 28px; }

/* 인피니티 스크롤 리스트 스타일 */
.club-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 24px;
}
/* 관찰용 빈 엘리먼트 */
.sentinel {
  height: 1px;
}
</style>