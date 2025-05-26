<template>
  <div>
    <MainGNB />
    <div class="app-container">
      <div id="app">
        <FeedCreateHeader />
        <div class="detail-container">
          <div class="divider-line"></div>
          <form @submit.prevent="createFeed" class="d-flex flex-column gap-3">
            <input
              id="title"
              type="text"
              v-model="feedTitle"
              class="form-input"
              placeholder="제목을 입력해주세요"
            />

            <textarea
              id="content"
              v-model="feedContent"
              class="form-input"
              placeholder="내용을 입력해주세요"
              rows="5"
            ></textarea>

            <input
              id="tags"
              type="text"
              v-model="feedTags"
              class="form-input"
              placeholder="태그를 입력해주세요"
            />

            <input
              id="image"
              type="file"
              @change="onFileChange"
              class="form-input file-input"
            />

            <button type="submit" class="submit-btn">작성하기</button>
          </form>
          <div class="divider-line"></div>
        </div>
      </div>
    </div>
    <MainFooter class="order-3 order-md-1" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useClubStore } from '@/stores/clubs'
import { accountStore } from '@/stores/accounts'
const route = useRoute()
const clubStore = useClubStore()
const userStore = accountStore()

import FeedCreateHeader from '@/components/club/FeedCreateHeader.vue'
import ClubDetailImage from '@/components/club/ClubDetailImage.vue'
import ClubFeed from '@/components/club/ClubFeed.vue'
import ClubMeberList from '@/components/club/ClubMeberList.vue'
import MainGNB from '@/components/main/MainGNB.vue'
import MainFooter from '@/components/main/MainFooter.vue'

import { ref } from 'vue'

const feedTitle = ref('')
const feedContent = ref('')
const feedTags = ref('')
const feedImage = ref(null)

const onFileChange = (event) => {
  feedImage.value = event.target.files[0]
}

const createFeed = () => {
  // 피드 생성 로직 구현
  // 이미지를 첨부하려면 오브젝트 대신 formData 형태여야 한다고 하더라고요 - 정원
  const formData = new FormData()
  formData.append('post_title', feedTitle.value)
  formData.append('post_content', feedContent.value)
  formData.append('post_book', 1) // 책 PK, 나중에 바꿔야 함
  formData.append('post_img', feedImage.value)

  console.log('Creating feed:', formData)
  console.log(userStore.token)

  clubStore.updatePost(route.params.club_pk, formData)
}
</script>

<style scoped>
.app-container {
  width: 960px;
  margin: 60px auto;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.divider-line {
  width: 100%;
  height: 1px;
  background-color: #CCD0D9;
  margin: 40px 0;
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

textarea.form-input {
  height: auto;
  padding-top: 12px;
  padding-bottom: 12px;
}

.submit-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.9375rem;
  cursor: pointer;
}
</style>
