import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const accountStore = defineStore('account', () => {
  const token = ref(null)
  const router = useRouter()

  const BASE_URL = 'http://127.0.0.1:8000'

  // 회원가입 axios
  const signUp = function(payload){
    const formData = new FormData()
    formData.append('username', payload.username)
    formData.append('email',payload.email)
    formData.append('password1', payload.password1)
    formData.append('password2', payload.password2)
    formData.append('user_nick_name', payload.user_nick_name)
    formData.append('user_username', payload.user_username)
    if (payload.user_profile_img) {
      formData.append('user_profile_img', payload.user_profile_img)
    }
    axios({
      method: "POST",
      url:`${BASE_URL}/accounts/signup/`,
      data:formData,
      headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log('회원가입이 완료되었습니다.')
        // 로그인 페이지로 이동 등 처리 가능
        router.push({ name: 'LogInView' })
      })
      .catch(err => {
        console.log(payload)
        console.error('회원가입 실패:', err.response?.data || err.message)
      })
  }

  // 로그인 axios
  const logIn = function(payload){
    const username = payload.username
    const password = payload.password

    axios({
      method:'POST',
      url: `${BASE_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
    .then(res => {
      console.log('로그인 성공')
      token.value = res.data.key
      console.log('토큰:', token.value)

      // ✅ 로그인 성공 → 사용자 정보 불러오기
      fetchUserInfo()

      router.push({ name: 'MainView' })
    })
    .catch(err => console.log('로그인 실패', err))
  }

  // 로그아웃 axios
  const logOut = function() {
    axios({
      method:"POST",
      url: `${BASE_URL}/accounts/logout/`
    })
    .then((res) => {
      token.value = null
      router.push({name: 'LogInView'})
      console.log('로그아웃되었습니다.')
    })
    .catch(err => console.log(err))
  }

  // 회원탈퇴 axios
  const deleteUser = function() {
    const confirmed = window.confirm('정말로 회원을 탈퇴하시겠습니까?\n탈퇴 후에는 복구할 수 없습니다.')
    if (!confirmed) return

    axios({
      method: "DELETE",
      url: `${BASE_URL}/accounts/delete/`,
      headers: {
        Authorization: `Token ${token.value}`
      },
    })
    .then(res => {
      console.log('회원탈퇴되셨습니다.')
      token.value = null
      router.push({ name: "LandingView" })
    })
    .catch(err => {
      console.log('오류가 발생했습니다.', err)
    })
  }


    // 회원 정보 중 user_id 불러오기 => 클럽마스터 및 클럽회원 확인시 필요
  const user = ref(null)
  const fetchUserInfo = function() {
    axios({
      method: 'GET',
      url: `${BASE_URL}/accounts/user/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then(res => {
      user.value = res.data
      console.log('🙋 사용자 정보:', user.value)
    })
    .catch(err => {
      console.error('❌ 사용자 정보 불러오기 실패:', err.response?.data || err.message)
    })
  }

  // 프로필 불러오기
  const getUserProfileByUserName = async (user_name) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/accounts/profile/${user_name}/`,
        {
          headers: {
            Authorization: `Token ${token.value}`  // ✅ 인증 헤더 추가
          }
        }
      )
      return response.data
    } catch (err) {
      console.error(`❌ ${user_name} 프로필 요청 실패:`, err.response?.data || err.message)
      return null
    }
  }

  return {
    token, user, BASE_URL,
    signUp, logIn, logOut, deleteUser, fetchUserInfo, getUserProfileByUserName}

  
  
}, {persist:true})
