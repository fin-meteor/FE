<template>
  <div class="wrapper">
    <!-- 헤더 영역 -->
    <div class="container">
      <div class="text-group">
        <span class="subtitle">{{ subtitle }}</span>
        <span class="title">{{ title }}</span>
      </div>
    </div>

    <!-- AiRecomandBookL 그리드 영역 -->
    <div class="book-grid">
      <AiRecomandBookL
        v-for="book in books"
        :key="book.id"
        :book_pk="book.id"
        :background_src="book.backgroundSrc"
        :cover_src="book.coverSrc"
        :headline="book.headline"
        :author="book.author"
        :publisher="book.publisher"
        :keyword="book.keyword"
        :title="book.title"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AiRecomandBookL from './AiRecomandBookL.vue'

// props 정의 + 기본값(default) 설정
const props = defineProps({
  subtitle: {
    type: String,
    default: '나만을 위해 준비된'
  },
  title: {
    type: String,
    default: 'AI 추천도서'
  }
})

// AI추천 도서 정보로 연동 필요
const books = ref([
  {
    id: 1,
    backgroundSrc: 'https://image.aladin.co.kr/product/36223/75/cover500/k872038602_1.jpg',
    coverSrc: 'https://image.aladin.co.kr/product/36223/75/cover500/k872038602_1.jpg',
    headline: '지금 안읽으면 후회할 신작',
    author: '홍길동',
    publisher: '지필미디어',
    keyword: '딥러닝',
    title: '구글 코랩으로 배우는 인공지능 기술',
  },
  {
    id: 4,
    backgroundSrc: 'https://image.aladin.co.kr/product/36280/71/cover500/k502038936_1.jpg',
    coverSrc:      'https://image.aladin.co.kr/product/36280/71/cover200/k502038936_1.jpg',
    headline:      '관심사 맞춤형 추천도서',
    author:        '서지영 (지은이)',
    publisher:     '길벗',
    keyword:       '파이썬',
    title:         '랭체인으로 RAG 개발하기 : VectorRAG & GraphRAG'
  },
  {
    id: 5,
    backgroundSrc: 'https://image.aladin.co.kr/product/36281/74/cover500/k842038030_1.jpg',
    coverSrc:      'https://image.aladin.co.kr/product/36281/74/cover200/k842038030_1.jpg',
    headline:      '도메인 기반  BEST 추천도서',
    author:        '조태호 (지은이)',
    publisher:     '길벗',
    keyword:       '딥러닝',
    title:         '모두의 딥러닝'
  },
])
</script>

<style scoped>
.wrapper { width: 960px; margin: 0 auto; }
.container { display: flex; align-items: flex-start; height: 86px; }
.text-group { display: flex; flex-direction: column; gap: 12px; line-height: 160%; }
.subtitle { font-size: 28px; font-weight: 500; }
.title    { font-size: 28px; font-weight: 700; }
.book-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-top:24px; }
</style>
