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

const defaultImageUrl = 'https://blog.kakaocdn.net/dn/cxMyHh/btsEaN1yWy1/ZKcuFGaUrA0lqpkZtizfN0/img.png'
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 561px;
  z-index: 0;
  opacity: 1;
  box-shadow: 8px 8px 12px 0px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 2.87px rgba(31, 35, 40, 0.15);
}

.book-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>