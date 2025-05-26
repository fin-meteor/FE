<template>
  <div>
    <MainGNB />
    <div class="app-container">
      <div id="app">
        <ClubCreateHeader @create-club="newClub"/>
        <div class="detail-container">
          <div class="divider-line"></div>
          <form @submit.prevent="newClub" class="d-flex flex-column gap-3">
            <input
              id="title"
              type="text"
              v-model="club_name"
              class="form-input"
              placeholder="제목을 입력해주세요"
            />

            <textarea
              id="content"
              v-model="club_description"
              class="form-input"
              placeholder="내용을 입력해주세요"
              rows="5"
            ></textarea>

            <!-- <input
              id="tags"
              type="text"
              v-model="feedTags"
              class="form-input"
              placeholder="태그를 입력해주세요"
            /> -->

            <input
              id="image"
              type="file"
              @change="onFileChange"
              class="form-input file-input"
            />

            <!-- <button type="submit" class="submit-btn">작성하기</button> -->
          </form>
          <div class="divider-line"></div>
        </div>
      </div>
    </div>
    <MainFooter class="order-3 order-md-1" />
  </div>
</template>

<script setup>
import { accountStore } from '@/stores/accounts.js'
import { useClubStore } from '@/stores/clubs.js'
import { ref } from 'vue'
const userStore = accountStore()
const clubStore = useClubStore()

import ClubCreateHeader from '@/components/club/ClubCreateHeader.vue'
import MainGNB from '@/components/main/MainGNB.vue'
import MainFooter from '@/components/main/MainFooter.vue'

  const club_name = ref('')
  const club_description=ref('')
  const club_img=ref(null)

  function onFileChange(event) {
    const file = event.target.files[0]
    if (!file) return
    club_img.value = file
  }

  const newClub = function(){
    const clubData = {
      club_name: club_name.value,
      club_description: club_description.value,
      club_img : club_img.value,
    }

    clubStore.createClub(clubData)
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
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
