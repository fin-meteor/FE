<template>
  <div>
    <!-- 상단 GNB -->
    <AccountsGNB />

    <!-- 전체 높이를 채우고 가운데 정렬 -->
    <div
      id="app"
      class="d-flex justify-content-center align-items-center min-vh-100"
    >
      <!-- 회원가입 폼 래퍼 -->
      <div class="signup-wrapper">

        <h1 class="page-title">함께 읽고, 함께 성장하는 곳 <br> READ.WE입니다.</h1>

        <form @submit.prevent="signUpUser" class="d-flex flex-column gap-3">
          <label class="input-label" for="username">아이디</label>
          <input
            id="username"
            type="text"
            v-model="username"
            class="form-input"
            placeholder="아이디를 입력해주세요"
          />

          <label class="input-label" for="email">이메일</label>
          <input
            id="email"
            type="text"
            v-model="email"
            class="form-input"
            placeholder="이메일을 입력해주세요"
          />

          <label class="input-label" for="password1">비밀번호</label>
          <input
            id="password1"
            type="password"
            v-model="password1"
            class="form-input"
            placeholder="비밀번호를 입력해주세요"
          />


          <label class="input-label" for="password2">비밀번호 확인</label>
          <input
            id="password2"
            type="password"
            v-model="password2"
            class="form-input"
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />

          <label class="input-label" for="user_nick_name">이름</label>
          <input
            id="user_nick_name"
            type="text"
            v-model="user_nick_name"
            class="form-input"
            placeholder="이름을 입력해주세요"
          />

          <label class="input-label" for="user_username">닉네임</label>
          <input
            id="user_username"
            type="text"
            v-model="user_username"
            class="form-input"
            placeholder="닉네임을 입력해주세요"
          />

          <label class="input-label" for="profile_img">프로필 이미지</label>
          <input
            id="profile_img"
            type="file"
            @change="onFileChange"
            class="form-input file-input"
          />
            <Onboarding @update:onboardData="handleOnboard" />

          <!-- 제출 버튼 -->
          <button type="submit" class="btn-submit">
            회원가입
          </button>
        </form>

        <!-- Github 소셜 로그인 -->
        <!-- <button class="btn-github">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path
              d="M12 .297a12 12 0 00-3.793 23.397c.6.111.793-.26.793-.578v-2.17c-3.226.702-3.905-1.555-3.905-1.555-.528-1.335-1.287-1.692-1.287-1.692-1.052-.719.08-.705.08-.705 1.163.082 1.774 1.195 1.774 1.195 1.033 1.77 2.709 1.258 3.374.962.105-.75.405-1.258.737-1.547-2.577-.294-5.287-1.287-5.287-5.732 0-1.266.465-2.302 1.227-3.112-.123-.295-.531-1.48.117-3.083 0 0 .998-.32 3.27 1.182a11.384 11.384 0 015.948 0c2.27-1.502 3.267-1.182 3.267-1.182.649 1.603.242 2.788.12 3.083.765.81 1.225 1.846 1.225 3.112 0 4.456-2.713 5.435-5.297 5.722.417.36.792 1.097.792 2.21v3.277c0 .32.192.695.8.577A12 12 0 0012 .297z"
            />
          </svg>
          깃허브로 시작하기
        </button> -->


      </div>
    </div>

    <!-- 하단 Footer -->
    <AccountsFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { accountStore } from '@/stores/accounts.js'
import AccountsGNB from '@/components/accounts/AccountsGNB.vue'
import AccountsFooter from '@/components/accounts/AccountsFooter.vue'
import Onboarding from '@/components/main/Onboarding.vue'

const signUpStore = accountStore()

const username = ref('')
const email = ref('')
const password1 = ref('')
const password2 = ref('')
const user_nick_name = ref('')
const user_username = ref('')
const user_profile_img = ref(null)

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return
  user_profile_img.value = file
}

function signUpUser() {
  const userData = {
    username: username.value,
    email: email.value,
    password1: password1.value,
    password2: password2.value,
    user_nick_name: user_nick_name.value,
    user_username: user_username.value,
    user_profile_img: user_profile_img.value,
  }
  signUpStore.signUp(userData)
}
</script>

<style scoped>
/* Pretendard 폰트 임포트 (프로젝트 상황에 맞게 경로 조절) */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

#app {
  background: url('@/assets/css/img/main/land.png') no-repeat center/cover;
}

.signup-wrapper {
  margin-right: 700px;  /* 필요 시 조정 */
  padding: 40px;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
}

.page-title {
  color: #fff;
  font-family: 'Pretendard';
  font-size: 2.5rem;
  font-weight: 800;
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

.btn-github {
  margin-top: 8px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-github:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
