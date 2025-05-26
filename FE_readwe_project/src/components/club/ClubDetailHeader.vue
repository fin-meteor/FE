<template>
  <div v-if="club" class="wrapper">
    <div class="header-container">
      <div class="title-join-group">
        <div class="title-group">
          <span class="title">{{ club.club_name }}</span>
        </div>

        <div class="join-button">
          <!-- club_master에게만 버튼 보이게 하기 -->
          <div class="join-button" v-if="isClubMaster">
            <RouterLink :to="{name: 'ClubUpdateView', params: {club_pk: route.params.club_pk}}" class="btn">클럽 수정하기</RouterLink>
          </div>
          <div class="join-button" v-if="isMember">
            <RouterLink :to="{name: 'FeedCreateView', params: {club_pk: route.params.club_pk}}" class="btn">피드 올리기</RouterLink>
          </div>
          <div class="join-button">
            <button class="btn" @click="joinClub">
              {{ isMember ? '클럽 탈퇴하기' : '클럽 가입하기' }}
            </button>
          </div>
        </div>
      </div>

      <div class="description">
        <span class="subtitle">{{ club.club_description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { accountStore } from '@/stores/accounts.js'
  import { useClubStore } from '@/stores/clubs.js'
  import { useRoute, RouterLink  } from 'vue-router'

  const route = useRoute()

  const props = defineProps({
    club: {
      type: Object,
      required: true
    },
  })

  const account = accountStore()
  const clubStore = useClubStore()

  const isClubMaster = computed(() => {
    return props.club?.club_master?.pk === account.user?.id
  })

  // 가입/탈퇴 버튼을 토글형으로 만들기 위한 반응형 변수들
  const clubMembers = ref([...props.club.club_members])

  const isMember = computed(() =>
    clubMembers.value.some(member => member.pk === account.user?.pk)
  )

  const joinClub = async () => {
    try {
      await clubStore.joinClub(route.params.club_pk)

      const userPk = account.user?.pk
      if (!userPk) return

      if (isMember.value) {
        clubMembers.value = clubMembers.value.filter(member => member.pk !== userPk)
      } else {
        clubMembers.value.push(account.user)
      }
    } catch (error) {
      console.error('클럽 가입/탈퇴 실패:', error)
    }
  }
</script>

<style scoped>
.wrapper {
  width: 960px;
  margin: 0 auto; /* 가운데 정렬 */
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
}

.title-join-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.title-group {
  display: flex;
  align-items: center;
}

.title {
  font-weight: 600;
  font-size: 28px;
}

.join-button {
  display: flex;
  align-items: center;
}

.btn {
  background-color: #1D7AF3;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1565C0;
}

.description {
  margin-top: 24px;
  width: 100%;
}

.subtitle {
  font-weight: 400;
  font-size: 20px;
  color: #888D95;
}
.join-button {
  margin-left: 16px;
}
</style>