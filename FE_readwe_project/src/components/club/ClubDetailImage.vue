<template>
  <div class="image-container">
    <img :src="imageUrl || defaultImageUrl" alt="Book Cover" class="book-cover-image" />
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: {
    type: String,
    required: false,
    default: null
  }
})

const defaultImageUrl = 'https://images.velog.io/images/doradora/post/cacd3005-d208-45ce-a7a5-54e03cb732c9/Algorithm.jpeg'
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 300px;
  z-index: 0;
  opacity: 1;
}

.book-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>