<template>
  <div class="wrapper">
    <!-- 헤더 영역 -->
    <div class="container">
      <div class="text-group">
        <span class="subtitle">{{ subtitle }}</span>
        <span class="title">{{ title }}</span>
      </div>
    </div>

    <!-- 카테고리 블록 리스트 영역 -->
    <div class="category-block-list">
      <CategoryBlock
        v-for="category in categories"
        :key="category.id"
        :id="category.id"
        :text="category.name"
        :imageUrl="category.imageUrl"
      />
    </div>
  </div>
</template>

<script setup>
import CategoryBlock from './CategoryBlock.vue'
import { ref } from 'vue'

const props = defineProps({
  subtitle: {
    type: String,
    default: '내 기술스택에 딱 맞게!',
  },
  title: {
    type: String,
    default: '스택별로 둘러보기',
  },
})

// 카테고리명, 이미지 URL, 그리고 id 추가
const categories = ref([
  {
    id: 1,
    name: '웹',
    imageUrl: 'https://fpost.co.kr/board/data/editor/2104/ebb6afeac1e4186feba13bdddd49a167_1618116895_0472.jpg',
  },
  {
    id: 2,
    name: '모바일',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLYh0-0gJLBNA3svFm58I7nbxwVNN-gP-iw&s',
  },
  {
    id: 3,
    name: '네트워크',
    imageUrl: 'https://appmaster.io/api/_files/SgiNYJJLGyxpZEuWWvQ7c5/download/',
  },
  {
    id: 4,
    name: 'DB',
    imageUrl: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202303/090918-821/%EB%B0%B1%EC%97%94%EB%93%9C-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80.png',
  },
  {
    id: 5,
    name: '알고리즘',
    imageUrl: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcm9IGb%2Fbtskfee9d5M%2FcPKqFG7hUgZogKwLYbJzgK%2Fimg.png',
  },
])
</script>

<style scoped>
.wrapper {
  width: 960px;
  margin: 0 auto;
}

/* 헤더 스타일 */
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

.subtitle {
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 4px;
}

.title {
  font-weight: 700;
  font-size: 28px;
}

/* 카테고리 블록 리스트 스타일 */
.category-block-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-top: 20px;
}
</style>
