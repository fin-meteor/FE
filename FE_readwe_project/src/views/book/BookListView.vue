<template>
  <div>
    <MainGNB />

    <div id="app">
      <!-- <BookListHeader class="order-1 order-md-0" /> -->
      <BookCardList :books="bookStore.books"/>
      <MainFooter class="order-3 order-md-1" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { accountStore } from '@/stores/accounts'
import { useBookStore } from '@/stores/books'

const userStore = accountStore()
const bookStore = useBookStore()

import MainGNB        from '@/components/main/MainGNB.vue'
import MainFooter     from '@/components/main/MainFooter.vue'
import BookCardList    from '@/components/book/BookCardList.vue'
import BookListHeader from '@/components/book/BookListHeader.vue'

onMounted(() => {
  bookStore.getBooks()
})
</script>

<style scoped>
#app {
  margin: 40px 0;      
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;}
</style>
