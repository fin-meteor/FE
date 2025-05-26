<template>
  <div class="card" @click="goToDetail" style="cursor: pointer;">
    <!-- 헤더: 클럽명 + 별점 -->
    <div class="card-header">
      <div class="title-author">
        <h2 class="title">{{ data.club_name }}</h2>
      </div>
      <div class="star-area">
        <svg class="star-icon" viewBox="0 0 24 24" fill="#1F2328" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2
            9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <span class="star-score">{{ (data.starScore || 4.5).toFixed(1) }}</span>
      </div>
    </div>

    <!-- 본문: 이미지 + 태그 + 소개 -->
    <div class="card-body">
      <img class="cover" :src="data.club_img || defaultImage" alt="북클럽 이미지" />
      <div class="content">
        <div class="tags">
          <span v-for="(tag, idx) in data.tags || []" :key="idx" class="tag">#{{ tag }}</span>
        </div>
        <p class="description">{{ data.club_description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import defaultImage from '@/assets/css/img/club/image.png'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push({ name: 'ClubDetailView', params: { club_pk: props.data.id } })
}
</script>

<style scoped>
.card {
  display: block;        /* router-link 는 inline 이므로 block 처리 */
  width: 960px;
  border: 1px solid #D1D9E0;
  border-radius: 10px;
  background: #F6F8FA;
  box-shadow:
    0px 1.58px 1.58px rgba(31,35,40,0.06),
    0px 1.58px 4.74px rgba(31,35,40,0.06);
  overflow: hidden;
  text-decoration: none; /* 링크 기본 밑줄 제거 */
  color: inherit;        /* 링크 클릭 시 색 유지 */
}

/* 헤더영역 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;      /* 수직 가운데 정렬 */
  height: 64px;
  padding: 0 20px;
  background: #F6F8FA;
  border-bottom: 1px solid #D1D9E0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
}

/* 제목 컨테이너 */
.title-author {
  display: flex;
  align-items: center;      /* 수직 가운데 정렬 */
  gap: 6px;
}

/* 제목 */
.title {
  margin: 0;                /* 기본 마진 제거 */
  line-height: 1;           /* 높이 조정 */
  font-size: 22px;
  font-weight: 700;
  color: #1D7AF3;
}

/* 별점 */
.star-area {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #E6EBF0;
  padding: 6px 12px;
  border-radius: 12px;
}
.star-icon {
  width: 20px;
  height: 20px;
}
.star-score {
  font-size: 16px;
  font-weight: 700;
  color: #1F2328;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 2px 10px;
  min-width: 36px;
  text-align: center;
}

/* 본문영역 */
.card-body {
  display: flex;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;
  background: #FFFFFF;
}

/* 이미지 */
.cover {
  width: 140px;
  height: 140px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 내용 */
.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.tags {
  margin-bottom: 12px;
}
.tag {
  display: inline-block;
  background: #D9EFFF;
  color: #1D7AF3;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  margin-right: 8px;
}
.description {
  font-family: PretendardVariable;
  font-size: 20px;
  line-height: 1.6;
  color: #59636E;
  white-space: pre-wrap;
}
</style>