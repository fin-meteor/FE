<template>
<div class="card">
<!-- 헤더: 클럽명 + 좋아요 버튼 -->
<div class="card-header">
  <div class="title-author">
    <h2 class="title">{{ fetchedPost.postTitle }}</h2>
  </div>
  <button class="like-button" @click="toggleLike">
    <span class="like-area">
      <svg class="like-icon" fill="#E1306C" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <span v-if="likes" class="like-count">{{ likes.length }}</span>
      <span v-else>0</span>
    </span>
  </button>
</div>

<!-- 이미지 -->
<div class="image-container">
  <img v-if="fetchedPost.postImg" class="cover" :src="fetchedPost.postImg" alt="북클럽 이미지" />
</div>

<!-- 본문: 태그 + 소개 -->
<div class="card-body">
  <div class="content">
    <div class="tags">
      <span v-for="(tag, idx) in fetchedPost.tags" :key="idx" class="tag">#{{ tag }}</span>
    </div>
    <p class="description">{{ fetchedPost.postContent }}</p>
    <div class="footer">
      <span class="timestamp">{{ formattedTimestamp }}</span>
    </div>
  </div>
</div>

<!-- 댓글 -->
<div class="comments-section">
  <h3 class="comments-title">댓글</h3>
  <div class="comment-list">
    <!-- 여기에 댓글 없을 때의 조건문 집어넣어줘야 함 -->
    <div class="comment-item" v-for="comment in comments" :key="comment.id">
      <div class="comment-header">
        <span class="commenter">{{ comment.comment_user }}</span>
        <span class="comment-timestamp">{{ formatCommentTimestamp(comment.timestamp) }}</span>
      </div>
      <div class="comment-content">{{ comment.comment_content }}</div>
    </div>
  </div>
  <div class="comment-input">
    <textarea v-model="newCommentContent" placeholder="댓글을 입력하세요." @keyup.enter="addComment"></textarea>
    <button @click="addComment" :disabled="invalidComment">댓글 작성</button>
  </div>
  <div>
    <p v-show="newCommentContent.length > 50" class="text-muted">50자 이하의 댓글만 작성 가능합니다.</p>
  </div>
</div>
</div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { accountStore } from '@/stores/accounts'
import { useClubStore } from '@/stores/clubs'
import defaultImage from '@/assets/css/img/club/image.png'

const route = useRoute()
const account = accountStore()
const clubStore = useClubStore()

// 상위 컴포넌트로부터 post의 정보를 상속 받음
const props = defineProps({
  post: Object
})

// post가 존재하지 않을 경우의 기본값
const fallback = {
  id: 0,
  post_title: '피드 제목',
  post_content: '북클럽 소개입니다. 북클럽 소개입니다. 북클럽 소개입니다. 북클럽 소개입니다. 북클럽 소개입니다. 북클럽 소개입니다. 북클럽 소개입니다.',
  post_user: {
      username: '익명',
    },
  post_img: defaultImage,
  post_created_at: '',
  post_updated_at: '',
  post_club: route.params.club_pk,
  post_book: 1,
  post_likes: [],
  post_comment: [],
  tags: ['독서', '토론', '친목', '북클럽', '문화'],
  timestamp: Date.now(), // 임의로 현재 시간을 넣음
}

// post를 상속 받지 못할 경우 기본값을 반환하도록 연산
const fetchedPost = computed(() => ({
  postPk: props.post?.id || fallback.id,
  postTitle: props.post?.post_title || fallback.post_title,
  postContent: props.post?.post_content || fallback.post_content,
  username: props.post?.post_user?.username || fallback.post_user.username,
  postImg: `http://localhost:8000${props.post?.post_img}` || fallback.post_img, // 나중에 이미지 경로를 위해 서버주소 부분 바꿔야 함
  postCreatedAt: props.post?.post_created_at || fallback.post_created_at,
  postUpdatedAt: props.post?.post_updated_at || fallback.post_updated_at,
  postClub: props.post?.post_club || fallback.post_club,
  postBook: props.post?.post_book || fallback.post_book,
  postComments: props.post?.post_comment || fallback.post_comment,
  postLikes: props.post?.post_likes || fallback.post_likes,
}))

const formattedTimestamp = computed(() => {
const date = new Date(fetchedPost.postPk)
return `작성일: ${date.toLocaleString()}`
})

// 좋아요랑 댓글
const comments = ref([])
const likes = ref([])

const newCommentContent = ref('')
const invalidComment = computed(() => {
  const content = newCommentContent.value.trim()
  return !(content.length > 0 && content.length <= 50)
})


// 좋아요와 댓글 표시를 위해 값을 불러옴
onMounted(() => {
  if (fetchedPost.value.postLikes && Array.isArray(fetchedPost.value.postLikes)) {
    likes.value.push(...fetchedPost.value.postLikes)
  }
  if (fetchedPost.value.postComments && Array.isArray(fetchedPost.value.postComments)) {
    comments.value.push(...fetchedPost.value.postComments)
  }
})

// 좋아요 & 좋아요 취소
const toggleLike = () => {
  clubStore.likePost(route.params.club_pk, fetchedPost.value.postPk)

  if (likes.value.includes(account.user.pk)){
    const idx = likes.value.indexOf(account.user.pk)
      if (idx !== -1) {
        likes.value.splice(idx, 1)
      } 
    } else {
      likes.value.push(account.user.pk)
  }
}

const addComment = () => {
if (newCommentContent.value.trim() !== '') {
    const newComment = {
      id: comments.value.length + 1,
      comment_user: '나',
      comment_content: newCommentContent.value,
      timestamp: Date.now(),
    }
    comments.value.push(newComment)
    newCommentContent.value = ''
  }
}

const formatCommentTimestamp = (timestamp) => {
const date = new Date(timestamp);
return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}
</script>

<style scoped>
.card {
width: 100%;
border: 1px solid #D1D9E0;
border-radius: 10px;
background: #F6F8FA;
box-shadow:
  0px 1.58px 1.58px rgba(31,35,40,0.06),
  0px 1.58px 4.74px rgba(31,35,40,0.06);
overflow: hidden;
}

/* 헤더영역 */
.card-header {
display: flex;
justify-content: space-between;
align-items: center;
height: 64px;
padding: 0 20px;
background: #F6F8FA;
border-bottom: 1px solid #D1D9E0;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
box-sizing: border-box;
}

/* 제목 컨테이너 */
.title-author {
display: flex;
align-items: center;
gap: 6px;
}

/* 제목 */
.title {
margin: 0;
line-height: 1;
font-size: 22px;
font-weight: 700;
color: #1D7AF3;
}

/* 좋아요 버튼 */
.like-button {
display: flex;
align-items: center;
background: none;
border: none;
cursor: pointer;
}

.like-area {
display: flex;
align-items: center;
}

.like-icon {
width: 20px;
height: 20px;
}

.like-count {
font-size: 16px;
font-weight: 700;
color: #1F2328;
background: #FFFFFF;
border-radius: 12px;
padding: 2px 10px;
min-width: 36px;
text-align: center;
}

/* 이미지 영역 */
.image-container {
width: 100%;
height: 300px;
overflow: hidden;
}
.cover {
width: 100%;
height: 100%;
object-fit: cover;
}

/* 본문영역 */
.card-body {
padding: 20px;
background: #FFFFFF;
}

/* 내용 */
.content {
display: flex;
flex-direction: column;
}
.tags {
margin-bottom: 12px;
}
.tag {
display: inline-block;
background: #D9EFFF;
color: #1D7AF3;
font-size: 14px;
font-weight: 600;
padding: 4px 10px;
border-radius: 20px;
margin-right: 8px;
}
.description {
font-family: PretendardVariable;
font-size: 20px;
line-height: 1.6;
color: #59636E;
white-space: pre-wrap;
}
.footer {
margin-top: auto;
font-size: 14px;
color: #888D95;
}
.timestamp {
display: block;
text-align: right;
}

/* 댓글 영역 */
.comments-section {
border-top: 1px solid #D1D9E0;
padding: 20px;
}

.comments-title {
font-size: 18px;
font-weight: 700;
color: #1F2328;
margin-bottom: 16px;
}

.comment-list {
margin-bottom: 20px;
}

.comment-item {
border-bottom: 1px solid #D1D9E0;
padding-bottom: 16px;
margin-bottom: 16px;
}

.comment-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 8px;
}

.commenter {
font-size: 16px;
font-weight: 700;
color: #1D7AF3;
}

.comment-timestamp {
font-size: 14px;
color: #59636E;
}

.comment-content {
font-size: 16px;
color: #59636E;
line-height: 1.5;
}

.comment-input {
display: flex;
align-items: center;
gap: 12px;
}

.comment-input textarea {
flex: 1;
padding: 12px;
border: 1px solid #D1D9E0;
border-radius: 8px;
font-size: 16px;
color: #59636E;
resize: none;
}

.comment-input button {
background-color: #1D7AF3;
color: #FFFFFF;
border: none;
border-radius: 8px;
padding: 12px 20px;
font-size: 16px;
font-weight: 700;
cursor: pointer;
}

.comment-input button:disabled {
background-color: #D1D9E0;
color: #59636E;
cursor: not-allowed;
}
</style>