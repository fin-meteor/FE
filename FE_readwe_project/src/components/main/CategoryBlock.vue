<template>
  <!-- 카테고리 순서에 맞춰서 연결  -> 웹 모바일 네트워크 DB 알고리즘-->
  <router-link
    class="frame"
    :to="{ name: 'BookListViewCategory', params: { category_pk: id } }"
  >
    <!-- background image 레이어 -->
    <div
      class="bg"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>

    <!-- 검은 반투명 오버레이 + 텍스트 -->
    <div class="overlay">
      <span class="text">{{ text }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CategoryBlock',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.frame {
  position: relative;
  width: 181px;
  height: 104px;
  border-radius: 6.67px;
  overflow: hidden;
  display: block;
  text-decoration: none;
}

/* background image 레이어에 transition, transform-origin 추가 */
.bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;    /* 부드러운 줌 효과 */
  transform-origin: center center;    /* 중앙 기준 확대 */
}

/* 호버 시 이미지 줌 */
.frame:hover .bg {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  color: white;
  font-family: "Pretendard-Regular", Helvetica, sans-serif;
  font-size: 18.7px;
  font-weight: 500;
  text-align: center;
}
</style>
