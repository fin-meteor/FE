<template>
  <div>
    <MainGNB />
    <div class="app-container">
      <div id="app">
        <ClubUpdateHeader @update-club="updateClub" @delete-club="deleteClub"/>
        <div class="detail-container">
          <div class="divider-line"></div>
          <form @submit.prevent="updateClub" class="d-flex flex-column gap-3">
            <input
              id="title"
              type="text"
              v-model="form.club_name"
              class="form-input"
              placeholder='dd'
            />

            <textarea
              id="content"
              v-model="form.club_description"
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
  import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import {useRouter, useRoute} from 'vue-router'
  import {useClubStore} from '@/stores/clubs.js'
  import {accountStore} from '@/stores/accounts.js'

  import ClubUpdateHeader from '@/components/club/ClubUpdateHeader.vue'
  import MainGNB from '@/components/main/MainGNB.vue'
  import MainFooter from '@/components/main/MainFooter.vue'

  const route = useRoute()
  const router = useRouter()
  const club = useClubStore()
  const account = accountStore()
  const clubmaster = ref('')

  // form, club_master, token
  const form = ref({
    club_name: club.clubs?.club_name||'',
    club_description: club.clubs?.club_description||'',
    club_img:null,
  })

  function onFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      form.value.club_img = file
    }
  }

  // 업데이트 화면 mounted 함수
  onMounted(() => {
    axios.get(`${club.BASE_URL}/api/v1/clubs/${route.params.club_pk}/`)
      .then(res => {
        form.value.club_name = res.data.club_name
        form.value.club_description = res.data.club_description
      })
  })
  
  // 업데이트 함수
  const updateClub = async function () {
    const success = await club.updateClub(form.value, route.params.club_pk)
    if (success) {
      router.push({ name: 'ClubDetailView', params: { id: route.params.club_pk } })
    } else {
      alert('❌ 클럽 수정 실패!')
    }
  }

  // 클럽 삭제 함수
  const deleteClub= async () => {
    const confirmDelete = confirm('정말 이 클럽을 삭제하시겠습니까?')
    if (confirmDelete) {
      const success = await club.deleteClub(route.params.club_pk)
      if (success) {
        alert('클럽이 삭제되었습니다.')
        router.push({ name: 'ClubListView' })  // 클럽 목록으로 이동
      } else {
        alert('클럽 삭제에 실패했습니다.')
      }
    }
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
