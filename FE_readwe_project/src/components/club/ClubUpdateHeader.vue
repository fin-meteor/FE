<template>
  <div class="wrapper">
    <div class="header-container">
      <div class="title-join-group">
        <div class="title-group">
          <span class="title">{{ clubName }}</span>
        </div>

        <div class="join-button">
          <div class="join-button">
          <button class="btn" @click="emit('update-club')">클럽 수정하기</button>
          </div>
          <div class="join-button">
          <button class="btn" @click="emit('delete-club')">클럽 삭제하기</button>
          </div>
        </div>



      </div>

    </div>
  </div>
</template>




<script setup>

const props = defineProps({
  clubName: {
    type: String,
    default: '클럽 수정하기'
  },

});

const emit= defineEmits(['update-club', 'delete-club'])  // 부모로 보낼 이벤트 등록
</script>




<style scoped>
.wrapper {
  width: 960px;
  margin: 0 auto; /* 가운데 정렬 */
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
}

.title-join-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.title-group {
  display: flex;
  align-items: center;
}

.title {
  font-weight: 600;
  font-size: 28px;
}

.join-button {
  display: flex;
  align-items: center;
}

.btn {
  background-color: #1D7AF3;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1565C0;
}

.description {
  margin-top: 24px;
  width: 100%;
}

.subtitle {
  font-weight: 400;
  font-size: 20px;
  color: #888D95;
}
.join-button {
  margin-left: 16px;
}
</style>