import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { accountStore } from '@/stores/accounts.js'
import axios from 'axios'

export const useBookStore = defineStore('book', () => {
  const account = accountStore()
  const books = ref([])
  const BASE_URL = 'http://127.0.0.1:8000'

  const getBooks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/books/`)
      books.value = res.data
    } catch (err) {
      console.error('책 전체 목록을 호출하는 데에 실패했습니다: ', err)
    }
  }

  const getBook = async (book_pk) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/books/${book_pk}/`)
      return {
        ...res.data,
        book_review: res.data.book_review ?? []
        }
    } catch (err) {
      console.error(`${book_pk}번 책 정보를 호출하는 데에 실패했습니다: `, err)
    }
  }

  const updateReview = async (book_pk, review) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/books/${book_pk}/reviews/`, 
        review,
        {
          headers: {
            Authorization: `Token ${account.token}`
          }
        }
      )
      return res.data
    } catch (err) {
      console.error(`${book_pk}번 책에 리뷰를 생성하는 데에 실패했습니다: `, err)
    }
  }

  const deleteReview = async (book_pk, review_pk) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/books/${book_pk}/reviews/${review_pk}/`, 
        {
          headers: {
            Authorization: `Token ${account.token}`
          }
        }
      )
      return res.data
    } catch (err) {
      console.error(`${book_pk}번 책에 리뷰를 삭제하는 데에 실패했습니다: `, err)
    }
  }

  const updateReviewLike = async (book_pk, review_pk, like) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/books/${book_pk}/reviews/${review_pk}/like/`, 
        like,
        {
          headers: {
            Authorization: `Token ${account.token}`
          }
        })
      return res.data
    } catch (err) {
      console.error(`${review_pk}번 리뷰에 좋아요 요청을 보내는 데에 실패했습니다: `, err)
    }
  }

  return { books, getBooks, getBook, updateReview, deleteReview, updateReviewLike, BASE_URL }
})