<template>
<div>
  <div>
    <img :src="user.user_profile_img" alt="profile_img">
  </div>
  <div>
    <h2>{{ user.username }}님의 프로필</h2>
    <p>이메일: {{ user.email }}</p>
    <p>븍클럽에 사용하게 될 닉네임: {{ user.user_nick_name }}</p>
    <p>이름: {{ user.user_name }}</p>    
  </div>
</div>

</template>

<script setup>
const props = defineProps({
  user:{
    type: Object,
    required: true,
    
  },
})
console.log(props.user)
</script>