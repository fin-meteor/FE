<template>
<footer class="footer-container w-100">
  <div class="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
    <!-- 좌측: GitHub 아이콘 + 카피라이트 -->
    <div class="d-flex align-items-center mb-2 mb-md-0">
      <img
        src="@/assets/css/img/accounts/bi_b.png"
        alt="GitHub"
        width="32"
        height="32"
      />
      <span class="ms-2 text-dark">© 2025 READ.WE</span>
    </div>

    <!-- 우측: 링크 네비게이션 -->
    <nav class="nav flex-wrap justify-content-center justify-content-md-end">
      <a class="nav-link px-2 text-black-50" href="#">Terms</a>
      <a class="nav-link px-2 text-black-50" href="#">Privacy</a>
      <a class="nav-link px-2 text-black-50" href="#">Security</a>
      <a class="nav-link px-2 text-black-50" href="#">Status</a>
      <a class="nav-link px-2 text-black-50" href="#">Docs</a>
      <a class="nav-link px-2 text-black-50" href="#">Contact</a>
      <a class="nav-link px-2 text-black-50" href="#">Manage cookies</a>
      <a class="nav-link px-2 text-black-50" href="#">Do not share my personal information</a>
    </nav>
  </div>
</footer>
</template>

<script setup>
// 별도 로직 없음
</script>

<style scoped>
.footer-container {
background-color: #ffffff; /* 배경색을 흰색으로 변경 */
padding: 30px 16px 10px;
/* fixed-bottom, w-100 클래스가 position, bottom, width 처리를 대신 해줍니다 */
}

/* 링크 기본/호버 컬러 */
.nav-link {
font-size: 0.875rem;
}
.nav-link.text-black-50 {
color: rgba(0, 0, 0, 0.5); /* 텍스트 색상을 검정색으로 변경 */
}
.nav-link.text-black-50:hover {
color: #000000; /* 호버 시 검정색으로 변경 */
text-decoration: underline;
}
</style>