<template>
  <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/css/img/main/ca1.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="@/assets/css/img/main/ca2.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="@/assets/css/img/main/ca3.png" class="d-block w-100" alt="...">
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleRide"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleRide"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
// 별도 로직이 없으면 비워두세요.
</script>

<style scoped>
/* 1) 가로는 무조건 부모에 꽉 채우기, 반응형 */
/* 2) 높이는 300px로 고정 */
.carousel,
.carousel-inner,
.carousel-item {
  width: 100%;
  height: 300px;
}

/* 이미지도 부모(.carousel-item) 높이에 딱 맞추기 */
.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 작으면 확대, 넘치면 잘림 */
}
</style>
