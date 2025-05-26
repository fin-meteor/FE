<template>
  <div class="container">
    <div class="text-group">
      <span class="subtitle">{{ subtitle }}</span>
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  subtitle: {
    type: String,
    default: '정원님을 위해 준비한'
  },
  title: {
    type: String,
    default: 'AI 추천도서'
  }
});
</script>

<style scoped>
.container {
  position: static;
  left: 0px;
  top: 0px;
  width: 960px;
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
  font-family: 'Noto Sans', sans-serif;
  line-height: 160%;
    gap: 12px; /* 자식 요소들 사이 간격을 8px로 설정 */

}

.subtitle {
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 4px; /* 아래 텍스트와 간격 */
}

.title {
  font-weight: 700;
  font-size: 28px;
}
</style>
