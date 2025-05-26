<template>
  <router-link
    class="card-custom"
    :to="{
      name: 'BookDetailView',
      params: { book_pk }     // ← path 와 키 이름을 똑같이!
    }"
  >
    <img
      class="card-image"
      :src="bookCover"
      alt="book cover"
    />
    <div class="card-content">
      <div class="card-header">
        <h5 class="card-title">{{ book_title }}</h5>
        <div class="chip">
          <span class="chip-content">#{{ keyward }}</span>
        </div>
      </div>
      <p class="card-description">{{ book_description }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'
import defaultImage from '@/assets/css/img/book/bookcover2.png'

const props = defineProps({
  book_pk: {
    type: [Number, String],
    required: true         // 라우터 param 으로 반드시 넘어와야 함
  },
  bookCover: {
    type: String,
    default: defaultImage
  },
  book_title: {
    type: String,
    default: '책이름'
  },
  keyward: {
    type: String,
    default: '키워드'
  },
  book_description: {
    type: String,
    default: '책 설명입니다. 책 설명입니다. 책 설명입니다.'
  }
})
</script>

<style scoped>
.card-custom {
  position: relative;
  width: 472px;
  height: 104px;
  display: flex;
  flex-direction: row;
  padding: 17px;
  gap: 16px;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px solid #D1D9E0;
  border-radius: 6px;
  box-shadow:
    0px 1px 1px 0px rgba(31, 35, 40, 0.06),
    0px 1px 3px 0px rgba(31, 35, 40, 0.06);
  text-decoration: none;   /* router-link 에서 underline 제거 */
  color: inherit;
}

.card-image {
  flex-shrink: 0;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1F2328;
}

.chip {
  display: inline-flex;
  align-items: center;
  background-color: #e5e5e5;
  border-radius: 16px;
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  color: #333333;
}

.chip-content {
  user-select: none;
}

.card-description {
  margin: 4px 0 0;
  font-size: 14px;
  color: #333333;
  line-height: 1.4;
}
</style>
