import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  // 状态
  const users = ref([])
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

  // 计算属性
  const userCount = computed(() => users.value.length)
  const activeUsers = computed(() => users.value.filter(user => user.active))
  const userName = computed(() => currentUser.value?.name || '游客')

  // 操作
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      users.value = response.data.map(user => ({
        ...user,
        active: Math.random() > 0.3, // 随机设置用户状态
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      }))
    } catch (err) {
      error.value = err.message
      console.error('获取用户失败:', err)
    } finally {
      loading.value = false
    }
  }

  const getUserById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      const user = response.data
      return {
        ...user,
        active: Math.random() > 0.3,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        posts: Math.floor(Math.random() * 50) + 1,
        followers: Math.floor(Math.random() * 1000) + 10
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = (user) => {
    currentUser.value = user
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }

  const updateUser = (updatedUser) => {
    const index = users.value.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updatedUser }
    }
  }

  const deleteUser = (userId) => {
    users.value = users.value.filter(user => user.id !== userId)
  }

  // 初始化当前用户
  const initCurrentUser = () => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      currentUser.value = JSON.parse(savedUser)
    }
  }

  return {
    // 状态
    users,
    currentUser,
    loading,
    error,
    isAuthenticated,
    
    // 计算属性
    userCount,
    activeUsers,
    userName,
    
    // 操作
    fetchUsers,
    getUserById,
    login,
    logout,
    updateUser,
    deleteUser,
    initCurrentUser
  }
})
