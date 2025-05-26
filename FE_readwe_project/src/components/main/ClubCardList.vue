<template>
  <div class="wrapper">
    <!-- 헤더 영역 -->
    <div class="container">
      <div class="text-group">
        <span class="subtitle">{{ subtitle }}</span>
        <span class="title">{{ title }}</span>
      </div>
    </div>

    <!-- 리스트 그리드 영역 -->
    <div class="book-grid">
      <ClubCard 
        v-for="club in randomClubs"
        :key="club.pk"
        :club="club" />
    </div>
  </div>
</template>

<script setup>
  import ClubCard from './ClubCard.vue';
  import {useClubStore} from '@/stores/clubs.js'
  import {ref, computed, onMounted} from 'vue'

  // 클럽 store
  const clubStore = useClubStore()
  const clubs = computed(() => clubStore.clubs)  // local 복사본
  onMounted(() => {
    clubStore.fetchClubs()
  })

  const randomClubs = computed(() => {
    const clubs = clubStore.clubs
    if (!clubs || clubs.length === 0) return []
    const shuffled = [...clubs].sort(()=> 0.5 - Math.random())
    return shuffled.slice(0,6)
  })

const props = defineProps({
  subtitle: {
    type: String,
    default: '내 기술스택에 맞는 북클럽이에요',
  },
  title: {
    type: String,
    default: '다양한 전문 분야에서 함께 성장할 사람들을 찾아 보세요.',
  },
});
</script>

<style scoped>
.wrapper {
  width: 960px;
  margin: 0 auto; /* 가운데 정렬 */
}

/* 헤더 스타일 */
.container {
  position: static;
  width: 100%;
  height: 86px;
  z-index: 0;

  display: flex;
  align-items: flex-start; /* 텍스트 상단 정렬 */
  color: #000000;
}

.text-group {
  display: flex;
  flex-direction: column; /* 세로 배치 */
  justify-content: center;
  line-height: 160%;
  gap: 12px; /* 자식 요소들 사이 간격 */
}

.subtitle {
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 4px; /* 아래 텍스트와 간격 */
}

.title {
  font-weight: 400;
  font-size: 18px;
}

/* 리스트 그리드 스타일 */
.book-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 */
  grid-auto-rows: auto;
  gap: 16px; /* 행·열 간격 */
  margin-top: 24px; /* 헤더와 리스트 간 간격 */
}
</style>
