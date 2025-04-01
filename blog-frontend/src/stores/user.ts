import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '../utils/axios'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref('')
  const userInfo = ref({
    id: 0,
    username: '',
    nickname: '',
    avatar: '',
    email: '',
    role: ''
  })

  // 计算属性
  const isLoggedIn = computed(() => Boolean(token.value))
  const isAdmin = computed(() => userInfo.value.role === 'ADMIN')

  // 动作
  async function login(username: string, password: string) {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      })
      
      token.value = response.data.data.token
      await getUserInfo()
      return true
    } catch (error) {
      console.error('登录失败', error)
      return false
    }
  }

  async function register(userData: {
    username: string;
    password: string;
    email: string;
    nickname: string;
  }) {
    try {
      await axios.post('/api/auth/register', userData)
      return true
    } catch (error) {
      console.error('注册失败', error)
      return false
    }
  }

  async function getUserInfo() {
    try {
      const response = await axios.get('/api/user/info')
      userInfo.value = response.data.data
      return true
    } catch (error) {
      console.error('获取用户信息失败', error)
      return false
    }
  }

  function logout() {
    token.value = ''
    userInfo.value = {
      id: 0,
      username: '',
      nickname: '',
      avatar: '',
      email: '',
      role: ''
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    isAdmin,
    login,
    register,
    getUserInfo,
    logout
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['token']
  }
}) 