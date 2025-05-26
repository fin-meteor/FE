<template>
  <!-- 랜더링에 필요한 정보를 다 가져오기 전까지는 로딩 중 문구가 뜨도록 if문 설정 -->
  <div v-if="isLoading">
    <p>로딩 중...</p>
  </div>

  <!-- 책 정보가 출력되는 곳 -->
  <div v-else>
    <h1>{{ book.book_title }}</h1>
    <h3 v-if="book.book_subtitle">{{ book.book_subtitle }}</h3>
    <img :src="book.book_big_cover" :alt="book.book_title">
    <div>
      <p>{{ book.book_description }}</p>
    </div>
    <hr>
    <!-- 리뷰 작성란 (form) -->
    <label for="reviewForm">리뷰</label>
    <div>
      <form id="reviewForm" @submit.prevent="createReview">
        <label for="reviewRate">평점</label>
        <input id="reviewRate" v-model="newReviewRank" type="number" step="0.5" min="0" max="10"> <br>
        <textarea id="reviewInput" v-model="newReviewContent" cols="50"></textarea>
        <button>리뷰 작성</button>
      </form>
    </div>
    <hr>

    <!-- 리뷰 목록 -->
    <div v-if="reviews.length">
      <div v-for="review in reviews" :key="review.id">
        <h5>{{ review.review_user.username }}
          <span class="text-muted">(★ {{ review.review_rank }})</span>
          <span class="text-muted">(받은 좋아요 수: {{ review.review_likes.length }})</span>
        </h5>
        <p>{{ review.review_content }}</p>
        <button @click.prevent="toggleLike(review)">
          {{ review.is_liked ? '좋아요 취소' : '좋아요' }}
        </button>
        <button v-if="profile.user.pk === review.review_user.pk">수정</button>
        <button v-if="profile.user.pk === review.review_user.pk" @click.prevent="deleteReview(review.id)">삭제</button>
        <hr>
      </div>
    </div>
    <!-- 리뷰가 없을 경우 없다고 표기 (없을 시 오류남) -->
    <div v-else>
      <p>아직 작성된 리뷰가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/books'
import { profileStore } from '@/stores/profiles.js'
import { accountStore } from '@/stores/accounts.js'

const store = useBookStore()
const route = useRoute()
const profile = profileStore()
const account = accountStore()

const book = ref({})
const bookPk = route.params.book_pk
const reviews = ref([])
const isLoading = ref(true)

// 랜더링에 필요한 정보들을 연산
// 페이지 시작할 때 실행되기 때문에 어디에 붙이지 않아도 되는 function
onMounted(async () => {
  book.value = await store.getBook(bookPk)

  // 어떤 사용자가 지금 접속 중인지 user_pk를 가져옴
  if (account.token) {
    await profile.UserProfile(account.token)
  } else {
    profile.user = { pk: 0 }  // 정보를 못 불러올 경우를 대비해 0으로 설정
  }

  book.value.book_review.forEach((review, idx) => {
    console.log(`리뷰 ${idx + 1} (ID: ${review.id})의 좋아요 객체들:`, review.review_likes)
  })

  reviews.value = book.value.book_review.map(review => ({
    ...review,
    is_liked: review.review_likes.includes(profile.user.pk)  // 좋아요 혹은 좋아요 취소를 랜더링할지 매핑
  }))

  isLoading.value = false // 전부 다 실행되어야만 isLoading이 false로 전환
})

const newReviewContent = ref('')
const newReviewRank = ref(0.0)

// 새로운 리뷰 생성
async function createReview() {
  // 리뷰 object를 생성
  const payload = {
    review_content: newReviewContent.value,
    review_rank: newReviewRank.value,
    review_likes: []
  }

  const createdReview = await store.updateReview(bookPk, payload)

  if (createdReview) {
    reviews.value.push({
      ...createdReview,
      is_liked: False
    })
  }

  newReviewContent.value = ''
  newReviewRank.value = 0.0
}

// 리뷰 삭제
async function deleteReview(reviewPk) {
  await store.deleteReview(bookPk, reviewPk)
  reviews.value = reviews.value.filter(review => review.id !== reviewPk)
}

// 좋아요 버튼 토글
async function toggleLike(review) {
  const res = await store.updateReviewLike(bookPk, review.id)

  // r는 댓글 전체 목록에서의 각 댓글
  // review는 target이 되는 댓글
  const index = reviews.value.findIndex(r => r.id === review.id)
  if (index !== -1) {
    const updatedLikes = review.is_liked
      ? review.review_likes.filter(pk => pk !== profile.user.pk)
      : [...review.review_likes, profile.user.pk]

    const updatedReview = {
      ...review,
      is_liked: !review.is_liked,
      review_likes: updatedLikes
    }
    reviews.value.splice(index, 1, updatedReview)
  }
}
</script>
