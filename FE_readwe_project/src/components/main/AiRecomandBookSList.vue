<template>
  <div class="wrapper">
    <!-- 생략… -->

    <div class="book-grid">
      <!-- book_pk 만 필요하다면 이렇게 -->
      <AiRecomandBookS
        v-for="n in 8"
        :key="n"
        :book_pk="n"
        :book_title="`제목 예시 ${n}`"
        :book_cover="`https://picsum.photos/seed/${n}/200/300`"
      />
    </div>
  </div>
</template>

<script setup>
import AiRecomandBookS from './AiRecomandBookS.vue'
</script>


<style scoped>
.wrapper {
  width: 960px;
  margin: 0 auto;
}
.container {
  display: flex;
  align-items: flex-start;
  height: 86px;
}
.text-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.subtitle {
  font-size: 28px; font-weight: 600;
}
.title {
  font-size: 18px; font-weight: 400;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 24px;
}
</style>
