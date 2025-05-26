<template>

  <h1>232</h1>
</template>


<!-- <template>
  <div>
    <h1>프로필 페이지</h1>
    <ProfileCard
      v-if="profile.user"
      :user="profile.user"
    />
  </div>
  <div>
    <RouterLink :to="{name:'UserProfileEditView'}">회원정보수정</RouterLink>
  </div>
</template>

<script setup>
import ProfileCard from '@/components/UserProfilesView/ProfileCard.vue'
import {ref, onMounted} from 'vue'
import {profileStore} from '@/stores/profiles.js'
import {accountStore} from '@/stores/accounts.js'
import {RouterLink} from 'vue-router'

const profile = profileStore()
const account = accountStore()

onMounted(() => {

  if(account.token){
    profile.UserProfile(account.token)
  }
})


</script> -->