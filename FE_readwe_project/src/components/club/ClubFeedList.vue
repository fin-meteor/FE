<template>
<div class="club-feed">
  <div class="feed-item" v-for="i in count" :key="i">
    <ClubFeed :post="posts[i]"/>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ClubFeed from './ClubFeed.vue'

const count = ref(0)
const maxCount = 20 // 최대 피드 개수

const props = defineProps({
  posts: Array
})

const handleScroll = () => {
const scrollHeight = document.documentElement.scrollHeight
const scrollTop = document.documentElement.scrollTop
const clientHeight = document.documentElement.clientHeight

if (scrollTop + clientHeight >= scrollHeight && count.value < maxCount) {
    if (count.value + 5 > props.posts.length ) {
      count.value = props.posts.length // 존재하는 피드 수를 초과해서 가짜 card 생성하지 않도록 강제
    } else {
      count.value += 5 // 5개씩 추가
    }
  }
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.club-feed {
width: 100%;
}

.feed-item {
margin-bottom: 16px;


}

</style>