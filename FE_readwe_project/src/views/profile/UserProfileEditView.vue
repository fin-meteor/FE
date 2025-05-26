<template>
  <h1>d</h1>
</template>


<template>
  <div>
    <h1>프로필 수정 페이지</h1>
    <form @submit.prevent="onSubmit">

      <label for="">닉네임</label>
      <input type="text" v-model="form.user_nick_name">
      <br>
      <label for="">이름</label>
      <input type="text" v-model="form.user_name">
      <br>
      <label for="">이메일</label>
      <input type="text" v-model="form.email">
      <br>
      <label for="">프로필 사진</label>
      <input type="file" @change="onFileChange">
      <br>
      <label for="">현재 비밀번호</label>
      <input type="password" v-model="passwordData.old_password">
      <br>
      <label for="">새 비밀번호</label>
      <input type="password" v-model="passwordData.new_password1">
      <br>
      <label for="">비밀번호 확인</label>
      <input type="password" v-model="passwordData.new_password2">
      <br>
      <input type="submit" value="수정완료">
    </form>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import axios from 'axios'
  import {useRouter} from 'vue-router'
  import {profileStore} from '@/stores/profiles.js'
  import {accountStore} from '@/stores/accounts.js'

  const router = useRouter()
  const profile = profileStore()
  const account = accountStore()

  // form, passwordData, token
  const form = ref({
    user_nick_name: profile.user?.user_nick_name||'',
    user_name:profile.user?.user_name||'',
    email:profile.user?.email||'',
    user_profile_img:null,
  })

  const passwordData = ref({
    old_password:'',
    new_password1:'',
    new_password2:'',
  })

  function onFileChange(e){
    form.value.user_profile_img = e.target.files[0]
  }

  
  async function onSubmit() {
    const result = await profile.EditUserProfile(form.value, passwordData.value, account.token)

    if (result.success) {
      alert('수정 완료!')
      console.log(result.data)
      router.push('/profile')
    } else {
      alert('수정 실패!')
    }
  }
</script>