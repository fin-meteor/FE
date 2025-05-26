<template>
  <div class="onboarding-wrapper">
    <h2 class="onboarding-title">프로그래밍 도서 관심사를 알려주세요</h2>

    <div class="sections-row">
      <div
        v-for="(cat, idx) in categories"
        :key="idx"
        class="onboarding-section"
      >
        <h3>{{ cat.title }}</h3>

        <!-- 옵션들을 가로로 나열할 .options-list 래퍼 -->
        <div class="options-list">
          <div
            v-for="(opt, j) in cat.options"
            :key="j"
            class="form-check"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :id="`cat-${idx}-opt-${j}`"
              :value="opt"
              v-model="cat.selected"
            />
            <label
              class="form-check-label"
              :for="`cat-${idx}-opt-${j}`"
            >{{ opt }}</label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { defineEmits } from 'vue'

const emits = defineEmits(['update:onboardData'])

const categories = reactive([
  { title: '1. 선호하는 책 유형', options: ['소설', '비소설', '기술서적', '자기계발'], selected: [] },
  { title: '2. 프로그래밍 레벨', options: ['초급', '중급', '고급', '전문가'], selected: [] },
  { title: '3. 주력언어',     options: ['JavaScript', 'Python', 'Java', 'C#'], selected: [] },
  { title: '4. 도메인',       options: ['웹', '모바일', 'AI', '데이터베이스'], selected: [] }
])

watch(
  categories,
  () => {
    const data = categories.map(cat => ({
      title: cat.title,
      selected: [...cat.selected]
    }))
    emits('update:onboardData', data)
  },
  { deep: true }
)
</script>

<style scoped>
.onboarding-wrapper {
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}

/* 카테고리 섹션들을 가로로 배치 */
.sections-row {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.onboarding-title {
  font-family: 'Pretendard', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: #333;
}

.onboarding-section {
  display: flex;
  flex-direction: column;
  width: 100%; /* 필요에 따라 조정 */
}

.onboarding-section h3 {
  font-family: 'Pretendard', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
}

/* ① 옵션 리스트를 가로 flex로 */
.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* 옵션들 사이 간격 */
}

/* ② 개별 체크박스+레이블은 한 줄로 정렬 */
.form-check {
  display: flex;
  align-items: center;
}

.form-check-input {
  margin-right: 0.4rem;
}

.form-check-label {
  font-family: 'Pretendard', sans-serif;
  font-size: 0.9375rem;
  color: #333;
}
</style>
