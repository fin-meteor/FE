<template>
<div class="book-detail-container">
  <BookDetailCard
    title="기본정보"
    :content="basicInfo"
  />
  <BookDetailCard
    title="목차"
    :content="tableOfContents"
  />
  <BookDetailCard
    title="설명"
    :content="description"
  />
  
  <!-- 댓글 섹션 -->
  <div class="comments-section">
    <h3 class="comments-title">댓글</h3>
    <div class="comment-list">
      <div class="comment-item" v-for="comment in comments" :key="comment.id">
        <div class="comment-header">
          <span class="commenter">{{ comment.author }}</span>
          <span class="comment-timestamp">{{ formatCommentTimestamp(comment.timestamp) }}</span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
      </div>
    </div>
    <div class="comment-input">
      <textarea v-model="newCommentContent" placeholder="댓글을 입력하세요." @keyup.enter="addComment"></textarea>
      <button @click="addComment" :disabled="!newCommentContent">댓글 작성</button>
    </div>
  </div>
</div>
</template>

<script setup>
import BookDetailCard from './BookDetailCard.vue';
import { ref } from 'vue';

const basicInfo = `160쪽135*188mm | ISBN : 9788925563350 
국내도서 > 에세이 > 사진/그림 에세이`;

const tableOfContents = `1장. 인생의 늪에서 빠져 나오는 힘
2장. 모든 문제는 생각보다 단순하다
3장. 인생이라는 숲속에서 나를 잃지 않으려면`;

const description = `"푸, 행복이 뭐라고 생각해?" 그 시절의 우리가 묻고 곰돌이 푸가 답하다.
월트 디즈니의 명작 애니메이션 「곰돌이 푸」 삽화 수 록!
세계에서 가장 유명한 곰 '곰돌이 푸'가 전하는 행복의 말!`;

const comments = ref([
{ id: 1, author: '사용자1', content: '이 책 정말 좋아요!', timestamp: Date.now() - 86400000 },
{ id: 2, author: '사용자2', content: '읽어보고 싶어요.', timestamp: Date.now() - 43200000 },
]);

const newCommentContent = ref('');

const addComment = () => {
if (newCommentContent.value.trim() !== '') {
  const newComment = {
    id: comments.value.length + 1,
    author: '나',
    content: newCommentContent.value,
    timestamp: Date.now(),
  };
  comments.value.push(newComment);
  newCommentContent.value = '';
}
};

const formatCommentTimestamp = (timestamp) => {
const date = new Date(timestamp);
return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
</script>

<style scoped>
.book-detail-container {
display: grid;
grid-template-columns: 1fr;
grid-template-rows: auto; /* 자동으로 높이 조정 */
gap: 16px; /* 16px 간격 유지 */
}

/* 댓글 섹션 스타일 */
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