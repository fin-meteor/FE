<template>
  <div class="card-container">
    <div class="card-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="card-content">
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: '제목'
    },
    content: {
      type: String,
      default: '내용이 들어갑니다.'
    }
  }
}
</script>

<style scoped>
.card-container {
  position: static;
  width: 100%;
  height: 155px;
  display: flex;
  flex-direction: column;
  padding: 17px 14px;
  gap: 12px;
  z-index: 1;
  border-radius: 6px;
  opacity: 1;
  box-sizing: border-box;
  border: 1px solid #D1D9E0;
  font-family: 'Pretendard', sans-serif;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1F2328;
}

.card-content p {
  margin: 0;
  overflow: auto;
  font-size: 14px;
  font-weight: 400;
  color: #1F2328;
}
</style>