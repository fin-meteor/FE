import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import {accountStore} from '@/stores/accounts.js'
import axios from 'axios'

export const useClubStore = defineStore('club', () => {
  const clubs = ref([])
  const BASE_URL = 'http://127.0.0.1:8000'
  const router = useRouter()
  const account = accountStore()
  const token = account.token

  // const getClubs = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/v1/clubs/`)
  //     clubs.value = res.data
  //   } catch (err) {
  //     console.error('클럽 전체 목록을 호출하는 데에 실패했습니다: ', err)
  //   }
  // }

  const getClub = async (club_pk) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/clubs/${club_pk}/`)
      return res.data
    } catch (err) {
      console.error(`${club_pk}번 클럽 정보를 호출하는 데에 실패했습니다: `, err)
    }
  }

  // 게시물 상세 정보 호출 (미래에 필요해질지도 모르니 일단 놔두기로)
  const getPost = async (club_pk, post_pk) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/clubs/${club_pk}/posts/${post_pk}/`)
      clubs.value = res.data
    } catch (err) {
      console.error('클럽 게시물을 호출하는 데에 실패했습니다: ', err)
    }
  }

  // 클럽 게시물 생성
  const updatePost = async (club_pk, post) => {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/v1/clubs/${club_pk}/posts/`, 
          post,
          {
            headers: {
              Authorization: `Token ${token}`,
            }
          }
        )
        return res.data
      } catch (err) {
        console.error(`${club_pk}번 클럽에 게시물을 생성하는 데에 실패했습니다: `, err)
      }
    }
  
  // 게시물 삭제
    const deletePost = async (club_pk, post_pk) => {
      try {
        const res = await axios.delete(
          `${BASE_URL}/api/v1/clubs/${club_pk}/posts/${post_pk}/`, 
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        return res.data
      } catch (err) {
        console.error(`${post_pk}번 게시물을 삭제하는 데에 실패했습니다: `, err)
      }
    }

    const likePost = async (club_pk, post_pk) => {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/v1/clubs/${club_pk}/posts/${post_pk}/likes/`, 
          null,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        return res.data
      } catch (err) {
        console.error(`${post_pk}번 게시물을 좋아요 하는 데에 실패했습니다: `, err)
      }
    }

    // 게시물에 댓글 생성
    const updateComment= async (club_pk, post_pk, comment) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/clubs/${club_pk}/posts/${post_pk}/comments/`, 
        comment,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return res.data
    } catch (err) {
      console.error(`${post_pk}번 게시물에 댓글을 생성하는 데에 실패했습니다: `, err)
    }
  }

    // 게시물에 댓글 삭제
  const deleteComment = async (club_pk, post_pk, comment_pk) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/clubs/${club_pk}/posts/${post_pk}/comments/${comment_pk}/`, 
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return res.data
    } catch (err) {
      console.error(`${post_pk}번 게시물에 댓글을 생성하는 데에 실패했습니다: `, err)
    }
  }

  // 북클럽 리스트 데이터 요청 axios
  const getClubs = function(){
    axios({
      method: 'GET',
      url:`${BASE_URL}/api/v1/clubs/`,
    })
    .then (res => {
      console.log(res)
      console.log(res.data)
      console.log("📥 클럽 리스트 받아옴:", res.data)
      clubs.value = res.data
    })
    .catch(err => {
      console.log(err)
      console.error('북클럽 생성 실패:', err.response?.data || err.message)
    })
  }


  // 북클럽 생성 axios
  const createClub = function(payload){
    const formData = new FormData()
    formData.append('club_name', payload.club_name)
    formData.append('club_description', payload.club_description)
    if(payload.club_img){
    formData.append('club_img',payload.club_img)
    }

    axios({
      method: 'POST',
      url:`${BASE_URL}/api/v1/clubs/create/`,
      data: formData,
      headers:{
        Authorization: `Token ${token}`,
        'Content-Type' : 'multipart/form-data'
      }
    })
    .then(res => {
      console.log('북클럽이 생성되었습니다.')
      console.log(res.data.id)
      router.push({name:'ClubDetailView', params: {club_pk : res.data.id}})
    })
    .catch(err => {
      console.log(err)
      console.error('북클럽 생성 실패:', err.response?.data || err.message)
    })
  }

  // 북클럽 수정 axios
  const updateClub = async function(payload, club_pk) {
    const formData = new FormData()
    formData.append('club_name', payload.club_name)
    formData.append('club_description', payload.club_description)
    if (payload.club_img) {
      formData.append('club_img', payload.club_img)
    }

    try {
      await axios.patch(`${BASE_URL}/api/v1/clubs/${club_pk}/update/`, formData, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      return true  // ✅ 성공 반환
    } catch (err) {
      console.error('❌ 수정 실패:', err)
      return false  // ✅ 실패 반환
    }
  }
  // 클럽 삭제
  const deleteClub = async function (club_pk) {
    try {
      await axios.delete(`${BASE_URL}/api/v1/clubs/${club_pk}/delete/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      return true  // 삭제 성공
    } catch (err) {
      console.error('❌ 클럽 삭제 실패:', err.response?.data || err.message)
      return false
    }
  }

  // 무한 스트롤 대비 함수
  const page = ref(1)

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/clubs/?page=${page.value}`)
      const newClubs = res.data  // 또는 res.data.results

      // 중복 ID 제거
      const uniqueClubs = newClubs.filter(
        newClub => !clubs.value.some(existing => existing.id === newClub.id)
      )

      clubs.value.push(...uniqueClubs)
      page.value += 1
      return true
    } catch (err) {
      console.error('❌ 클럽 리스트 로딩 실패:', err)
      return false
    }
  }

  // 클럽에 가입 & 탈퇴
  const joinClub = async (club_pk) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/clubs/${club_pk}/join/`,
        null,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      return res.data
    } catch (err) {
      console.error(`${club_pk}번 클럽에 가입 혹은 탈퇴하는 데에 실패했습니다: `, err)
    }
  }

  return { 
    clubs, token, BASE_URL,
    getClubs, getClub, createClub, updateClub, deleteClub, fetchClubs, joinClub,
    updatePost, deletePost, likePost,
    updateComment, deleteComment, }
})