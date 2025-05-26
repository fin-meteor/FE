<template>
  <div>
    <!-- 상단 GNB -->
    <AccountsGNB />

    <!-- 전체 높이를 채우고 가운데 정렬 -->
    <div
      id="app"
      class="d-flex justify-content-center align-items-center min-vh-100"
    >
      <!-- 프로필 수정 폼 래퍼 -->
      <div class="profile-wrapper">
        <h1 class="page-title">프로필 수정</h1>

        <form @submit.prevent="onSubmit" class="d-flex flex-column gap-3">
          <label class="input-label" for="email">이메일</label>
          <input
            id="email"
            type="text"
            v-model="form.email"
            class="form-input"
          />

          <label class="input-label" for="user_nick_name">닉네임</label>
          <input
            id="user_nick_name"
            type="text"
            v-model="form.user_name"
            class="form-input"
            placeholder="닉네임을 입력해주세요"
          />

          <label class="input-label" for="user_old_password">현재 비밀번호</label>
          <input
            id="user_old_password"
            type="password"
            v-model="passwordData.old_password2"
            class="form-input"
            placeholder="현재 비밀번호를 입력해주세요"
          />

          <label class="input-label" for="user_new_password1">새 비밀번호</label>
          <input
            id="user_new_password1"
            type="password"
            v-model="passwordData.new_password1"
            class="form-input"
            placeholder="새로운 비밀번호를 입력해주세요"
          />

          <label class="input-label" for="user_new_password2">비밀번호 확인</label>
          <input
            id="user_new_password2"
            type="password"
            v-model="passwordData.new_password2"
            class="form-input"
            placeholder="새로운 비밀번호를 입력해주세요"
          />

          <label class="input-label" for="user_username">이름</label>
          <input
            id="user_username"
            type="text"
            v-model="form.user_nick_name"
            class="form-input"
            placeholder="이름을 입력해주세요"
          />

          <label class="input-label" for="profile_img">프로필 이미지</label>
          <input
            id="profile_img"
            type="file"
            @change="onFileChange"
            class="form-input file-input"
            accept="image/*"
          />

          <!-- 수정하기 버튼 -->
          <div class="	">
            <Onboarding @update:onboardData="handleOnboard" />

            <button type="submit" class="btn-submit">
              프로필 수정하기
            </button>


        </div>
        </form>
        
                <!-- 탈퇴하기 추가, 최대한 시인성 떨어뜨리고 클릭 어렵게 블럭사용 -->
          <button @click="deleteUser" class="btn btn-link  d-block  mx-auto mt-3">
            회원 탈퇴하기
          </button>
      </div>
    </div>

    <!-- 하단 Footer -->
    <AccountsFooter />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { profileStore } from '@/stores/profiles.js'
  import { accountStore } from '@/stores/accounts.js'
  import AccountsGNB from '@/components/accounts/AccountsGNB.vue'
  import AccountsFooter from '@/components/accounts/AccountsFooter.vue'
  import Onboarding from '@/components/main/Onboarding.vue'

  const router = useRouter()
  const profile = profileStore()
  const account = accountStore()
  const user = account.user.username

  const deleteUser = function(){
    account.deleteUser()
  }
  
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
  
// 초기 사용자 데이터 로드
  async function onSubmit() {
    const result = await profile.EditUserProfile(form.value, passwordData.value, account.token)

    if (result.success) {
      alert('수정 완료!')
      console.log(result.data)
      router.push(`/profile/${user}`)
    } else {
      console.log(account.user.username)
      alert('수정 실패!')
    }
  }
</script>

<style scoped>
/* Pretendard 폰트 임포트 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

#app {
  background: url('@/assets/css/img/main/land.png') no-repeat center/cover;
}

.profile-wrapper {
  margin-right: 700px; /* 화면에 맞게 조정 */
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-title {
  color: #fff;
  font-family: 'Pretendard';
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.5;
  text-align: left;
}



.input-label {
  display: block;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #fff;
  margin-bottom: 4px;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  font-size: 0.9375rem;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  outline: none;
}

.btn-submit {
  width: 100%;
  height: 48px;
  background-color: #ff5c35;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-submit:hover {
  background-color: #e14e2c;
}


.profile-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 8px;
}


</style>
