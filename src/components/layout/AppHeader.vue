<template>
  <header class="app-header">
    <div class="header-content">
      <!-- 左侧：Logo和菜单按钮 -->
      <div class="header-left">
        <button 
          class="menu-toggle"
          @click="appStore.toggleSidebar"
          :class="{ active: appStore.sidebarOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <router-link to="/" class="logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" stroke-width="2"/>
            <path d="M12 22V12" stroke="currentColor" stroke-width="2"/>
            <path d="M2 7L12 12L22 7" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span class="logo-text">Vue3 应用</span>
        </router-link>
      </div>
      
      <!-- 中间：搜索框 -->
      <div class="header-center">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
          </svg>
          <input 
            type="text" 
            placeholder="搜索..." 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
      
      <!-- 右侧：用户菜单和工具 -->
      <div class="header-right">
        <!-- 主题切换 -->
        <button 
          class="theme-toggle"
          @click="appStore.toggleTheme"
          :title="appStore.isDarkTheme ? '切换到亮色主题' : '切换到暗色主题'"
        >
          <svg v-if="appStore.isDarkTheme" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/>
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        
        <!-- 通知 -->
        <div class="notification-bell" @click="toggleNotifications">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span v-if="appStore.unreadNotifications > 0" class="notification-badge">
            {{ appStore.unreadNotifications }}
          </span>
        </div>
        
        <!-- 用户菜单 -->
        <div class="user-menu" @click="toggleUserMenu" ref="userMenuRef">
          <div class="user-avatar">
            <img v-if="userStore.currentUser?.avatar" :src="userStore.currentUser.avatar" :alt="userStore.userName" />
            <svg v-else viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="user-name">{{ userStore.userName }}</span>
          <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/>
          </svg>
          
          <!-- 用户下拉菜单 -->
          <div v-if="showUserMenu" class="user-dropdown">
            <div v-if="!userStore.isAuthenticated" class="menu-item" @click="handleLogin">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="2"/>
                <polyline points="10,17 15,12 10,7" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
              </svg>
              登录
            </div>
            <div v-else>
              <router-link to="/dashboard" class="menu-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                </svg>
                仪表盘
              </router-link>
              <div class="menu-item" @click="handleLogout">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2"/>
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2"/>
                </svg>
                退出登录
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const searchQuery = ref('')
const showUserMenu = ref(false)
const userMenuRef = ref(null)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('搜索:', searchQuery.value)
    // 这里可以实现搜索功能
  }
}

const toggleNotifications = () => {
  // 切换通知面板显示
  console.log('切换通知')
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogin = () => {
  // 模拟登录
  const mockUser = {
    id: 1,
    name: '管理员',
    email: 'admin@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  }
  userStore.login(mockUser)
  showUserMenu.value = false
  appStore.addNotification({
    type: 'success',
    title: '登录成功',
    message: `欢迎回来，${mockUser.name}！`
  })
}

const handleLogout = () => {
  userStore.logout()
  showUserMenu.value = false
  router.push('/')
  appStore.addNotification({
    type: 'info',
    title: '已退出登录',
    message: '感谢您的使用！'
  })
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 2rem;
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-toggle span {
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
  transform-origin: center;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.25rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.header-center {
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.search-box input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle,
.notification-bell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.theme-toggle:hover,
.notification-bell:hover {
  background: var(--bg-primary);
}

.theme-toggle svg,
.notification-bell svg {
  width: 20px;
  height: 20px;
  color: var(--text-primary);
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--error-color);
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-menu:hover {
  background: var(--bg-primary);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--primary-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar svg {
  width: 20px;
  height: 20px;
  color: var(--primary-color);
}

.user-name {
  font-weight: 500;
  color: var(--text-primary);
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  transition: transform 0.3s ease;
}

.user-menu:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 8px 0;
  min-width: 200px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--bg-primary);
}

.menu-item svg {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }
  
  .header-center {
    margin: 0 1rem;
  }
  
  .user-name {
    display: none;
  }
  
  .logo-text {
    display: none;
  }
}
</style>
