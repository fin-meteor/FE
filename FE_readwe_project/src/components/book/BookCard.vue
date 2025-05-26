<template>
  <RouterLink :to="{ name: 'BookDetailView', params: { book_pk: fetchedBook.bookPk } }" class="card">
    <!-- 1) 헤더: 제목/저자 + 별점 -->
    <div class="card-header">
      <div class="title-author">
        <h2 class="title">{{ fetchedBook.title }}</h2>
        <span class="author">/ {{ fetchedBook.author }}</span>
      </div>
      <div class="star-area">
        <svg class="star-icon" viewBox="0 0 24 24" fill="#1F2328" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <span class="star-text">Star</span>
        <span class="star-score">{{ fetchedBook.starScore }}</span>
      </div>
    </div>

    <!-- 2) 본문: 왼쪽 커버 / 오른쪽 태그+설명 -->
    <div class="card-body">
      <!-- 왼쪽: 책 커버 -->
      <img class="cover" :src="fetchedBook.imageUrl" alt="책 표지" />

      <!-- 오른쪽: 태그(chip) + 설명 -->
      <div class="content">
        <div class="tags">
          <span
            v-for="(tag, idx) in fetchedBook.tags"
            :key="idx"
            class="tag"
          >
            #{{ typeof tag === 'string' ? tag : tag.category_name }}
          </span>
        </div>
        <p class="description">{{ fetchedBook.description }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import defaultImage from '@/assets/css/img/book/bookcover10.png'

const props = defineProps({
  book: Object,
})

const fallback = {
  bookPk: 1,
  imageUrl: defaultImage,
  title: '곰돌이 푸, 행복한 일은 매일 있어',
  author: '서오',
  starScore: 4.5,
  starCount: 14,
  tags: ['힐링', '에세이', '2030', '동물', '위로'],
  description:
    '어떤 상황에서도 여유와 미소를 잊지 않는 곰돌이 푸를 다시 기억하고 만나는 일은, 반복되는 삶 속에서 무엇이 나를 행복하게 하는지를 잊어가는 우리에게, 다시 한번 행복에 관한 희망과 의미를 되새기게 해준다.',
}

const fetchedBook = computed(() => ({
  bookPk:       props.book?.pk             || fallback.bookPk,
  imageUrl:     props.book?.book_mid_cover || fallback.imageUrl,
  title:        props.book?.book_title     || fallback.title,
  author:       props.book?.book_author    || fallback.author,
  starScore:    props.book?.book_rating    || fallback.starScore,
  starCount:    props.book?.book_likes     || fallback.starCount,
  tags:         props.book?.book_category  || fallback.tags,
  description:  props.book?.book_description || fallback.description,
}))
</script>

<style scoped>
.card {
  width: 960px;
  border: 1px solid #D1D9E0;
  border-radius: 10px;
  background: #F6F8FA;
  box-shadow:
    0px 1.58px 1.58px rgba(31,35,40,0.06),
    0px 1.58px 4.74px rgba(31,35,40,0.06);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: block;
}

/* header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  background: #F6F8FA;
  border-bottom: 1px solid #D1D9E0;
}

/* 제목+저자 */
.title-author {
  display: flex;
  align-items: center;
  gap: 6px;
}
.title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1D7AF3;
}
.author {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: #1F2328;
  opacity: 0.7;
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
.star-text,
.star-score {
  font-size: 16px;
  font-weight: 700;
  color: #1F2328;
}
.star-score {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 2px 10px;
  min-width: 36px;
  text-align: center;
}

/* body */
.card-body {
  display: flex;
  padding: 20px;
  gap: 20px;
  background: #FFFFFF;
}
.cover {
  width: 140px;
  height: 200px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* 태그(chip) */
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

/* 설명 */
.description {
  font-family: PretendardVariable;
  font-size: 20px;
  line-height: 1.6;
  color: #59636E;
  white-space: pre-wrap;
}
</style>
