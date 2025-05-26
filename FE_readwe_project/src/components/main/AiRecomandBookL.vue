<template>
  <!-- 클릭 시 'BookDetailView' 라우트로 이동 / book_pk -->
  <router-link
    class="frame"
    :to="{ name: 'BookDetailView', params: { book_pk : 1 } }"
  >
    <div class="overlap-group">
      <!-- 배경 마스크 -->
      <img
        class="mask-group"
        :src="background_src"
        alt="background"
      />

      <!-- 배경 마스크 오버레이 (그라데이션) -->
      <div class="mask-group-overlay"></div>

      <!-- 상단 오른쪽 Badge -->
      <div class="chip">
        <span>#{{ keyword }}</span>
      </div>

      <!-- 상단 헤드라인 -->
      <div
        class="text-wrapper-3"
        v-html="headline.replace(/\n/g, '<br/>')"
      />

      <!-- 책 커버 이미지 -->
      <img
        class="img"
        :src="cover_src"
        alt="cover"
      />

      <!-- 책 정보 -->
      <div class="book-info">
        <!-- ① title은 v-html로 포맷된 formattedTitle 렌더링 -->
        <div class="book-title" v-html="formattedTitle"></div>
        <!-- <div class="book-title">{{ title }}</div> -->
        <p
          class="book-desc"
          v-html="(
            '저자 [' + author + ']' +
            '\n' +
            publisher
          ).replace(/\n/g, '<br/>')"
        ></p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const DEFAULT_IMG =
  'https://image.aladin.co.kr/product/36444/15/cover200/8999734196_1.jpg'

const props = defineProps({
  book_pk: {
    type: [String, Number],
    required: true
  },
  background_src: {
    type: String,
    default: DEFAULT_IMG
  },
  cover_src: {
    type: String,
    default: DEFAULT_IMG
  },
  headline: {
    type: String,
    default: '지금 안읽으면 후회할 신작'
  },
  author: {
    type: String,
    default: '조규락, 김승재 (지은이)'
  },
  publisher: {
    type: String,
    default: '학지사'
  },
  keyword: {
    type: String,
    default: '키워드'
  },
  title: {
    type: String,
    default: '사례로 배우는 텍스트 마이닝'
  }
})
const MAX_PER_LINE = 10  // 한 줄에 최대 6글자
const MAX_LINES    = 2  // 최대 2줄
// ② title이 6글자 초과 시 첫 6글자 뒤에 <br/> 삽입
// computed 내부 수정
const formattedTitle = computed(() => {
  const t = props.title || ''

  // 1) 전체 길이가 1줄 분량 이하
  if (t.length <= MAX_PER_LINE) {
    return t
  }

  // 2) 2줄 분량 이하
  const first = t.slice(0, MAX_PER_LINE)
  const rest  = t.slice(MAX_PER_LINE)
  if (rest.length <= MAX_PER_LINE) {
    return first + '<br/>' + rest
  }

  // 3) 2줄 넘어가면 2줄째는 말줄임 처리
  const second = rest.slice(0, MAX_PER_LINE)
  return first + '<br/>' + second + '...'
})

</script>

<style scoped>
.frame {
  width: 312px;
  height: 360px;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #edeDED;
  display: block;
  text-decoration: none;
  color: inherit;
}

.overlap-group {
  position: relative;
  width: 100%;
  height: 100%;
}

.mask-group {
  position: absolute;
  top: 0;
  left: 0;
  width: 170%;
  height: 170%;
  object-fit: cover;
  border-radius: 6px;
  filter: blur(10px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 0;
}

.mask-group-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 170%;
  height: 170%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0%, #000 99%);
  opacity: 0.5;
  z-index: 1;
}

.chip {
  position: absolute;
  top: 35px;
  left: 26px;
  background: #fdfcfb;
  border-radius: 115.9px;
  padding: 2px 12px;
  font: 600 14px "pretendard", Helvetica;
  color: #24292F;
  z-index: 3;
}

.text-wrapper-3 {
  position: absolute;
  top: 74px;
  left: 26px;
  font: 600 28px "pretendard", Helvetica;
  color: #fdfcfb;
  line-height: 34.8px;
  z-index: 3;
}

.img {
  position: absolute;
  top: 196px;
  left: 26px;
  width: 104px;
  height: 150px;
  object-fit: cover;
}

.book-info {
  position: absolute;
  top: 256px;
  left: 157px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
}

/* ③ book-title은 HTML <br/>이 먹도록 white-space 조정 */
.book-title {
  font-size: 18px;
  font-weight: 700;
  color: #222;
  line-height: 1.3;        /* 1줄 높이 = 1.3em */
  
  /* 1. 자동 줄바꿈 허용 */
  white-space: normal;
  word-break: break-word;

  /* 2. 2줄까지만 보이도록 -webkit-line-clamp 세팅 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;     /* 2줄로 제한 */

  /* 3. 넘칠 때 말줄임 처리 + max-height 필수 */
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: calc(1.3em * 2);  /* = line-height × 2줄 */
}

.book-desc {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin: 0;
}
</style>
