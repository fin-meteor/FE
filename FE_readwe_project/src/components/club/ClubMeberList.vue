<template>
<div class="card">
<!-- 헤더: 클럽명 + 별점 -->
<div class="card-header">
  <div class="title-container">
    <h2 class="title">{{ club.club_name }}</h2>
  </div>
</div>

<!-- 클럽멤버 리스트 -->
<div class="member-list">
  <club-member-item
    v-for="member in club.club_members"
    :key="member.name"
    :avatar-url="member.avatarUrl"
    :name="member.name"
    :role="member.role"
  />
</div>
</div>
</template>

<script setup>
import ClubMemberItem from './ClubMemberItem.vue';

const props = defineProps({
  club: Object
});

</script>

<style scoped>
.card {
width: 300px;
border: 1px solid #D1D9E0;
border-radius: 10px;
background: #ffffff;
box-shadow:
  0px 1.58px 1.58px rgba(31,35,40,0.06),
  0px 1.58px 4.74px rgba(31,35,40,0.06);
overflow: hidden;
padding: 0;
}

/* 헤더영역 */
.card-header {
display: flex;
justify-content: space-between;
align-items: center;      /* 수직 가운데 정렬 */
height: 55px;
padding: 0 20px;
background: #F6F8FA;
border-bottom: 1px solid #D1D9E0;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
box-sizing: border-box;
}

/* 제목 컨테이너 */

/* 제목 */
.title {
margin: 0;                /* 기본 마진 제거 */
line-height: 1;           /* 높이 조정 */
font-size: 14px;
font-weight: 400;
font-family: 'PretendardVariable', sans-serif;
color: #59636E;
}

/* 클럽멤버 리스트 */
.member-list {
max-height: none;
overflow-y: auto;
border-top: 1px solid #D1D9E0;
}
</style>