<template class="bg">
  <form @submit.prevent="onSubmit">
    <!-- ID -->
    <div class="mb-3">
      <label for="user-id" class="form-label">ID</label>
      <input
        id="user-id"
        type="text"
        v-model="form.id"
        class="form-control custom-input"
        placeholder="아이디를 입력해주세요."
      />
    </div>

    <!-- 비밀번호 -->
    <div class="mb-3">
      <label for="user-pw" class="form-label">비밀번호</label>
      <input
        id="user-pw"
        type="password"
        v-model="form.password"
        class="form-control custom-input"
        placeholder="비밀번호를 입력해주세요."
      />
    </div>

    <!-- 이름 -->
    <div class="mb-3">
      <label for="user-name" class="form-label">이름</label>
      <input
        id="user-name"
        type="text"
        v-model="form.name"
        class="form-control custom-input"
        placeholder="이름을 입력해주세요."
      />
    </div>

    <!-- 닉네임 -->
    <div class="mb-3">
      <label for="user-nick" class="form-label">닉네임</label>
      <input
        id="user-nick"
        type="text"
        v-model="form.nickname"
        class="form-control custom-input"
        placeholder="닉네임을 입력해주세요."
      />
    </div>

    <!-- 프로필 사진 URL -->
    <div class="mb-3">
      <label for="user-photo" class="form-label">프로필사진</label>
      <input
        id="user-photo"
        type="text"
        v-model="form.profile"
        class="form-control custom-input"
        placeholder="프로필사진 URL을 입력해주세요."
      />
    </div>

    <button type="submit" class="btn btn-dark w-100">회원가입</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  id: '',
  password: '',
  name: '',
  nickname: '',
  profile: ''
})

function onSubmit() {
  console.log('폼 데이터:', form)
  // 가입 처리 로직...
}
</script>

<style scoped>

.custom-input {
  /* Smart layout */
  position: static;
  left: 0;
  top: 31px;

  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  z-index: 2;

  /* 크기 */
  width: 393px;
  min-width: 240px;
  height: 40px;

  /* 안쪽 여백 */
  padding: 12px 16px;

  /* 모양 */
  border-radius: 8px;
  background: #FFFFFF;
  border: 0 solid #D9D9D9;
  opacity: 1;

  /* Bootstrap 기본 스타일 override */
  box-shadow: none;
}

/* 포커스 시 outline 제거 및 강조 (선택사항) */
.custom-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(13,110,253,0.25);
}
</style>
