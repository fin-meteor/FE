<template>
<div class="book-club-item">
<div class="avatar-container">
  <img :src="avatarUrl" alt="멤버 프로필 이미지" class="avatar">
</div>
<div class="info">
  <h3 class="name">{{ name }}</h3>
  <p class="role">{{ role }}</p>
</div>
</div>
</template>

<script>
import { defineComponent, withDefaults } from 'vue'

export default defineComponent({
props: {
  avatarUrl: {
    type: String,
    default: 'https://pimg.mk.co.kr/news/cms/202411/16/news-p.v1.20241116.adbe393330ec4680b0f2b4933d27e395_R.jpg'
  },
  name: {
    type: String,
    required: true,
    default: '이름'
  },
  role: {
    type: String,
    required: true,
    default: '역할'
  }
}
})
</script>

<style scoped>
.book-club-item {
position: static;
left: 0px;
top: 0px;
display: flex;
flex-direction: row;
align-items: center;
padding: 16px;
z-index: 0;
opacity: 1;
box-sizing: border-box;
border-width: 1px 0px 0px 0px;
border-style: solid;
border-color: rgba(209, 217, 224, 0.7);
}

.avatar-container {
width: 48px;
height: 48px;
border-radius: 50%;
overflow: hidden;
margin-right: 12px;
}

.avatar {
width: 100%;
height: 100%;
object-fit: cover;
}

.info {
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
}

.name {
font-size: 16px;
font-weight: 700;
color: #0969DA;
margin: 0;
}

.role {
font-size: 14px;
color: #59636E;
margin: 4px 0 0;
}
</style>