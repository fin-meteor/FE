import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { accountStore } from './accounts'
import axios from 'axios'

export const profileStore = defineStore('profile', () => {
  const user = ref(null)
  const router = useRouter()
  const account = accountStore()
  
  const BASE_URL = 'http://127.0.0.1:8000'
  
  // profile 구성 axios
  const UserProfile = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/accounts/profile/${account.user.username}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      user.value = res.data
    } 
    catch (err) {
      console.error('유저 정보 불러오기 실패:', err)
    }
  }

  // profile 수정 구성 axios
  const EditUserProfile = async(form, passwordData, token) => {
    try {
      const profileForm = new FormData()
      profileForm.append('user_nick_name', form.user_nick_name || '')
      profileForm.append('user_name', form.user_name || '')
      profileForm.append('email', form.email || '')
      if(form.user_profile_img){
        profileForm.append('user_profile_img', form.user_profile_img)
      }

      await axios({
        method:'PATCH',
        url:`${BASE_URL}/accounts/profile/${account.user.username}/`,
        data:profileForm,
        headers:{
          Authorization: `Token ${token}`,
          'Content-Type' : 'multipart/form-data'
        },
        
      })
      
      if(passwordData.old_password && passwordData.new_password1){
        await axios({
          method:'POST',
          url:`${BASE_URL}/accounts/password/change/`,
          data: passwordData,
          headers:{
            Authorization: `Token ${token}`
          }
        })
      }

      return {success:true}      
    }
    catch(err){
      console.error('🔴 PATCH 실패:', err.response?.data || err.message);
      // console.error('프로필 수정 실패', err)
      return {success: false, error: err}
    }
  }

  return {
    user,
    UserProfile, EditUserProfile
  }


  
  
}, {persist:true})
