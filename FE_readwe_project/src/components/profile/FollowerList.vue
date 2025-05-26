<template>
<div class="card">
<!-- 헤더: 타이틀 -->
<div class="card-header">
  <div class="title-container">
    <h2 class="title">{{ title }}</h2>
  </div>
</div>

<!-- 팔로워 리스트 -->
<div class="follower-list">
  <follower-list-item
    v-for="follower in followers"
    :key="follower.name"
    :avatar-url="follower.avatarUrl"
    :name="follower.name"
    :role="follower.role"
  />
</div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
import FollowerListItem from './FollowerItem.vue';

const props = defineProps({
title: {
  type: String,
  default: '팔로워'
},
followers: {
  type: Array,
  required: false,
  default: () => [
    {
      avatarUrl: 'https://via.placeholder.com/48',
      name: '귤뭉',
      role: '프론트엔드 개발자'
    },
    {
      avatarUrl: 'https://via.placeholder.com/48',
      name: '전서구',
      role: '프론트엔드 개발자'
    },
    {
      avatarUrl: 'https://via.placeholder.com/48',
      name: '정원',
      role: '프론트엔드 개발자'
    },
    {
      avatarUrl: 'https://via.placeholder.com/48',
      name: '서구',
      role: '프론트엔드 개발자'
    }
  ]
}
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
align-items: center;
height: 55px;
padding: 0 20px;
background: #F6F8FA;
border-bottom: 1px solid #D1D9E0;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
box-sizing: border-box;
}

/* 제목 컨테이너 */
.title-container {
display: flex;
align-items: center;
}

/* 제목 */
.title {
margin: 0;
line-height: 1;
font-size: 14px;
font-weight: 400;
font-family: 'PretendardVariable', sans-serif;
color: #59636E;
}

/* 팔로워 리스트 */
.follower-list {
max-height: none;
overflow-y: auto;
border-top: 1px solid #D1D9E0;
}
</style>