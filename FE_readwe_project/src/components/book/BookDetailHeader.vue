<template>
  <div class="wrapper">
    <!-- 헤더 영역 -->
      <div class="text-group">
        <div class="title-group">
          <span class="title">{{ title }}</span>
          <span class="subtitle">{{ subtitle }}</span>
        </div>
        <div class="author-info">
          <span class="author">{{ author }}</span>
          <span class="publisher">{{ publisher }}</span>
          <span class="publication-date">{{ publicationDate }}</span>
        </div>
      </div>
      <hr>
    </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: '제목'
  },
  subtitle: {
    type: String,
    default: '부제목'
  },
  author: {
    type: String,
    default: '저자명'
  },
  publisher: {
    type: String,
    default: '출판사'
  },
  publicationDate: {
    type: String,
    default: '0000-00-00'
  }
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
  height: auto;
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

.title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-weight: 600;
  font-size: 28px;
}

.subtitle {
  font-weight: 400;
  font-size: 28px;
  color: #888D95;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 400;
  font-size: 16px;
  color: #888D95;
}
</style>