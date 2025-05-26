import BookDetailView from "@/views/book/BookDetailView.vue"
import BookListView from "@/views/book/BookListView.vue"

export default [

  {
    path: '/books/:book_pk',
    name: 'BookDetailView',
    component: BookDetailView,
    props: true

  },

// 북리스트 페이지는 세 종류로 
// 1. 전체 북리스트 2. 카테고리 북리스트(카테고리 블럭의 5개만) 3. 검색결과 북리스트로 구분함
    {
    path: '/books',
    name: 'BookListView',
    component: BookListView
  },
  {
    path: '/books/:category_pk',
    name: 'BookListViewCategory',
    component: BookListView,
    props: true
  },
  {
    path: '/books/:search_query',
    name: 'BookListViewSearch',
    component: BookListView,
    props: true
  },

]