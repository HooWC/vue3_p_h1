import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态
  const theme = ref(localStorage.getItem('theme') || 'light')
  const sidebarOpen = ref(false)
  const notifications = ref([])
  const pageLoading = ref(false)

  // 计算属性
  const isDarkTheme = computed(() => theme.value === 'dark')
  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  // 操作
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      read: false,
      timestamp: new Date(),
      ...notification
    }
    notifications.value.unshift(newNotification)
    
    // 自动清理老通知
    if (notifications.value.length > 50) {
      notifications.value = notifications.value.slice(0, 50)
    }
  }

  const markNotificationRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const clearAllNotifications = () => {
    notifications.value = []
  }

  const setPageLoading = (loading) => {
    pageLoading.value = loading
  }

  // 初始化主题
  const initTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  return {
    // 状态
    theme,
    sidebarOpen,
    notifications,
    pageLoading,
    
    // 计算属性
    isDarkTheme,
    unreadNotifications,
    
    // 操作
    toggleTheme,
    toggleSidebar,
    addNotification,
    markNotificationRead,
    clearAllNotifications,
    setPageLoading,
    initTheme
  }
})
